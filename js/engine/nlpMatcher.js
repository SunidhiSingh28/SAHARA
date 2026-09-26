/**
 * SAHARA Natural Language & Intent Parser
 * Understands everyday citizen phrasing in English, Hindi/Hinglish, and regional phrases.
 * Automatically extracts already stated facts (Age, State, Intent) so Sahara NEVER repeats questions.
 */

import { SERVICES_DATA } from '../data/services.js';
import { SCHEMES_DATA } from '../data/schemes.js';
import { LIFE_EVENTS_DATA } from '../data/lifeEvents.js';

export class NlpMatcher {
  constructor() {
    this.services = SERVICES_DATA;
    this.schemes = SCHEMES_DATA;
    this.lifeEvents = LIFE_EVENTS_DATA;
  }

  /**
   * Main parsing function
   * @param {string} text - The raw input from voice transcript or typing
   * @returns {Object} Extracted context, matched services, schemes, and ambiguities
   */
  parse(text) {
    if (!text || typeof text !== 'string') {
      return { confidence: 0, matchedServices: [], matchedSchemes: [], extractedContext: {} };
    }

    const cleaned = text.trim().toLowerCase();
    const context = this.extractContext(cleaned);

    // 1. Strict Primary Service Matchers (Precedence over generic queries)
    const PRIMARY_SERVICE_PATTERNS = [
      {
        id: 'aadhaar-card',
        regex: /(?:\baadhaar\b|\baadhar\b|\badhar\b|\buidai\b|\beaadhaar\b|\be-aadhaar\b|\bmyaadhaar\b|आधार)/i
      },
      {
        id: 'passport-service',
        regex: /(?:\bpassport\b|\bpassports\b|\btravel abroad\b|\bforeign travel\b|\bvisa\b|\bpsk\b|\btatkaal\b|पासपोर्ट|पारपत्र)/i
      },
      {
        id: 'voter-id',
        regex: /(?:\bvoter\b|\belection card\b|\bepic\b|\bvoter id\b|\bmatdan\b|\bmatdata\b|मतदान|मतदाता|वोटर)/i
      },
      {
        id: 'pan-card',
        regex: /(?:\bpan card\b|\bpan\b|\bnsdl\b|\butiitsl\b|\bincome tax pan\b|पॅन|पैन)/i
      },
      {
        id: 'driving-licence',
        regex: /(?:\bdriving\b|\blicence\b|\blicense\b|\bdl\b|\blearner licence\b|\blearner license\b|\bdriver licence\b|\bdriver license\b|\bsarathi\b|\bparivahan\b|वाहन चालक|लाइसेंस|ड्राइविंग)/i
      },
      {
        id: 'birth-certificate',
        regex: /(?:\bbirth certificate\b|\bbirth\b|\bnewborn\b|\bbaby birth\b|जन्म दाखला|जन्म प्रमाणपत्र|जन्म प्रमाण पत्र)/i
      },
      {
        id: 'ration-card',
        regex: /(?:\bration card\b|\bration\b|\bnfsa\b|\brashan\b|राशन कार्ड|रेशन कार्ड|राशन|रेशन)/i
      },
      {
        id: 'domicile-certificate',
        regex: /(?:\bdomicile\b|\bresidence certificate\b|\bnivas\b|निवास प्रमाण पत्र|अधिवास|रहिवासी दाखला)/i
      },
      {
        id: 'income-certificate',
        regex: /(?:\bincome certificate\b|\bincome\b|\butpanna\b|आय प्रमाण पत्र|उत्पन्नाचा दाखला|उत्पन्न)/i
      },
      {
        id: 'caste-certificate',
        regex: /(?:\bcaste certificate\b|\bcaste\b|जाति प्रमाण पत्र|जातीचा दाखला|जात प्रमाणपत्र)/i
      },
      {
        id: 'msme-udyam',
        regex: /(?:\bmsme\b|\budyam\b|\budyog\b|\bbusiness registration\b|उद्योग आधार|उद्यम|उद्योग)/i
      }
    ];

    for (const p of PRIMARY_SERVICE_PATTERNS) {
      if (p.regex.test(cleaned)) {
        const found = this.services.find(s => s.id === p.id);
        if (found) {
          return {
            rawQuery: text,
            extractedContext: context,
            lifeEvent: null,
            topService: found,
            matchedServices: [found],
            matchedSchemes: [],
            confidence: 100,
            isAmbiguous: false,
            didYouMean: []
          };
        }
      }
    }

    // 2. Direct Life Event match check
    const matchedLifeEvent = this.matchLifeEvent(cleaned);

    // 3. Score services
    const scoredServices = this.scoreServices(cleaned, context, matchedLifeEvent);

    // 4. Score schemes (integrated into recommendation, never isolated)
    const scoredSchemes = this.scoreSchemes(cleaned, context, matchedLifeEvent);

    // 5. Determine primary recommendation & ambiguity
    const topService = scoredServices[0] || null;
    const topScheme = scoredSchemes[0] || null;

    let isAmbiguous = false;
    let didYouMean = [];

    if (scoredServices.length > 1 && scoredServices[0].score - scoredServices[1].score < 15 && scoredServices[0].score < 75) {
      isAmbiguous = true;
      didYouMean = scoredServices.slice(0, 3).map(s => ({
        id: s.item.id,
        name: s.item.name,
        type: s.item.type,
        snippet: s.item.description
      }));
    }

    return {
      rawQuery: text,
      extractedContext: context,
      lifeEvent: matchedLifeEvent,
      topService: topService ? topService.item : null,
      matchedServices: scoredServices.slice(0, 3).map(s => s.item),
      matchedSchemes: scoredSchemes.slice(0, 3).map(s => s.item),
      confidence: topService ? topService.score : (topScheme ? topScheme.score : 0),
      isAmbiguous,
      didYouMean
    };
  }

  /**
   * Extract facts already given in text so we never re-ask them
   */
  extractContext(text) {
    const ctx = {
      ageKnown: false,
      ageValue: null,
      isAbove18: null,
      stateKnown: false,
      stateName: null,
      intentType: 'new', // new | renewal | correction | replacement
      documentLost: false
    };

    // Age extraction
    const ageMatch = text.match(/(?:i am|i'm|age|turned)\s+(\d{1,2})/i);
    if (ageMatch) {
      const age = parseInt(ageMatch[1], 10);
      ctx.ageKnown = true;
      ctx.ageValue = age;
      ctx.isAbove18 = age >= 18;
    } else if (text.includes('turned 18') || text.includes('18 saal') || text.includes('above 18') || text.includes('adult')) {
      ctx.ageKnown = true;
      ctx.isAbove18 = true;
      ctx.ageValue = 18;
    }

    // State extraction (e.g. "I moved to Maharashtra", "I live in Maharashtra")
    const states = [
      'maharashtra', 'delhi', 'karnataka', 'uttar pradesh', 'bihar', 'tamil nadu',
      'gujarat', 'rajasthan', 'punjab', 'kerala', 'west bengal', 'telangana'
    ];
    for (const state of states) {
      if (text.includes(state)) {
        ctx.stateKnown = true;
        ctx.stateName = state.charAt(0).toUpperCase() + state.slice(1);
        break;
      }
    }

    // Action Intent
    if (text.includes('lost') || text.includes('gum gaya') || text.includes('kho gaya') || text.includes('duplicate') || text.includes('replace')) {
      ctx.intentType = 'replacement';
      ctx.documentLost = true;
    } else if (text.includes('renew') || text.includes('expiry') || text.includes('expire') || text.includes('update') || text.includes('correct')) {
      ctx.intentType = 'correction';
    } else {
      ctx.intentType = 'new';
    }

    return ctx;
  }

  matchLifeEvent(text) {
    for (const event of this.lifeEvents) {
      const titleLower = event.title.toLowerCase();
      if (text.includes(titleLower)) return event;

      if (event.id === 'baby-born' && (text.includes('baby') || text.includes('born') || text.includes('baccha') || text.includes('child delivery') || text.includes('birth'))) {
        return event;
      }
      if (event.id === 'retired' && (text.includes('retire') || text.includes('retired') || text.includes('pension') || text.includes('senior citizen'))) {
        return event;
      }
      if (event.id === 'start-business' && (text.includes('business') || text.includes('startup') || text.includes('company') || text.includes('shop') || text.includes('dukaan'))) {
        return event;
      }
      if (event.id === 'farmer' && (text.includes('farmer') || text.includes('kisan') || text.includes('kheti') || text.includes('agriculture'))) {
        return event;
      }
      if (event.id === 'moved-city' && (text.includes('moved to') || text.includes('shifted') || text.includes('relocated'))) {
        return event;
      }
      if (event.id === 'travel-abroad' && (text.includes('travel abroad') || text.includes('foreign') || text.includes('overseas'))) {
        return event;
      }
    }
    return null;
  }

  scoreServices(text, context, lifeEvent) {
    const scores = [];

    for (const s of this.services) {
      let score = 0;

      // Check keywords
      for (const kw of s.keywords) {
        if (text.includes(kw)) {
          score += 35;
        }
      }

      // Check aliases
      for (const alias of s.aliases) {
        if (text.includes(alias.toLowerCase())) {
          score += 45;
        }
      }

      // Check example queries
      for (const eq of s.exampleQueries) {
        if (text.includes(eq.toLowerCase()) || eq.toLowerCase().includes(text)) {
          score += 50;
        }
      }

      // Check life event link
      if (lifeEvent && s.lifeEvents && s.lifeEvents.includes(lifeEvent.id)) {
        score += 40;
      }

      // Specific phrase boosters
      if ((text.includes('aadhar') || text.includes('aadhaar') || text.includes('adhar') || text.includes('uidai') || text.includes('आधार')) && s.id === 'aadhaar-card') {
        score += 150;
      }
      if ((text.includes('driving') || text.includes('licence') || text.includes('license') || text.includes('driver') || text.includes('sarathi') || text.includes('parivahan') || text.includes('लाइसेंस')) && s.id === 'driving-licence') {
        score += 150;
      }
      if ((text.includes('vote') || text.includes('election card') || text.includes('voter card') || text.includes('matdan')) && s.id === 'voter-id') {
        score += 60;
      }
      if ((text.includes('passport') || text.includes('travel abroad')) && s.id === 'passport-service') {
        score += 60;
      }
      if ((text.includes('pan card') || text.includes('pan')) && s.id === 'pan-card') {
        score += 60;
      }
      if ((text.includes('bike') || text.includes('car')) && s.id === 'driving-licence') {
        score += 60;
      }
      if ((text.includes('baby') || text.includes('born') || text.includes('birth certificate')) && s.id === 'birth-certificate') {
        score += 60;
      }
      if ((text.includes('domicile') || text.includes('residence certificate') || text.includes('maharashtra')) && s.id === 'domicile-certificate') {
        score += 50;
      }
      if ((text.includes('business') || text.includes('msme') || text.includes('udyam')) && s.id === 'msme-udyam') {
        score += 60;
      }

      if (score > 15) {
        scores.push({ item: s, score: Math.min(score, 100) });
      }
    }

    return scores.sort((a, b) => b.score - a.score);
  }

  scoreSchemes(text, context, lifeEvent) {
    const scores = [];

    for (const sc of this.schemes) {
      let score = 0;

      for (const kw of sc.keywords) {
        if (text.includes(kw)) score += 35;
      }

      for (const alias of sc.aliases) {
        if (text.includes(alias.toLowerCase())) score += 40;
      }

      if (lifeEvent && sc.lifeEvents && sc.lifeEvents.includes(lifeEvent.id)) {
        score += 50;
      }

      if ((text.includes('farmer') || text.includes('kisan')) && sc.id === 'scheme-pm-kisan') {
        score += 70;
      }
      if ((text.includes('baby') || text.includes('mother') || text.includes('maternity')) && sc.id === 'scheme-pmmvy') {
        score += 70;
      }
      if ((text.includes('retire') || text.includes('pension')) && sc.id === 'scheme-senior-pension') {
        score += 70;
      }

      if (score > 20) {
        scores.push({ item: sc, score: Math.min(score, 100) });
      }
    }

    return scores.sort((a, b) => b.score - a.score);
  }
}
