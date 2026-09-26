/**
 * SAHARA — Main Application Bootstrap & UI Controller
 * Integrates exact Framer Motion Spring Mouse Follow & 2500ms Preloader Transition
 */

import { SAHARA_CONFIG } from './config.js';
import { i18n, LANGUAGES } from './i18n.js';
import { SERVICES_DATA } from './data/services.js';
import { SCHEMES_DATA } from './data/schemes.js';
import { LIFE_EVENTS_DATA } from './data/lifeEvents.js';
import { SERVICE_CATEGORIES } from './data/categories.js';
import { OFFICES_DATA } from './data/offices.js';
import { SaharaSpeech } from './speech.js';
import { NlpMatcher } from './engine/nlpMatcher.js';
import { SmartQuestionEngine } from './engine/smartQuestion.js';
import { DocumentMatcher } from './engine/documentMatcher.js';
import { SpringMouseFollower } from './mouseFollow.js';

class SaharaApp {
  constructor() {
    this.speech = null;
    this.nlp = new NlpMatcher();
    this.smartQuestions = new SmartQuestionEngine();
    this.docMatcher = new DocumentMatcher();
    this.mouseFollower = null;

    this.currentContext = {};
    this.activeService = null;
    this.activeLifeEvent = null;

    // Changing recommendations
    this.tickerPrompts = [
      'My baby was born. What documents do I need?',
      'I want to make a voter ID.',
      'I retired. What government services do I need?',
      'I turned 18. What documents should I get?',
      'I want to start a business. What registrations do I need?',
      'I moved to Maharashtra. What documents do I need to update?',
      'I want to travel abroad. What do I need?',
      'I am a farmer. What government benefits can I get?'
    ];
    this.tickerIndex = 0;
    this.tickerInterval = null;
  }

  init() {
    window.saharaApp = this;
    this.initIntroScreen();
    this.initLanguageSelector();
    this.initSpeechEngine();
    this.initSearchInputs();
    this.initThreeOptions();
    this.initTicker();
    this.initModals();
    this.initSpeakers();
    this.updateStaticTranslations();
  }

  /* =========================================================================
     1. CINEMATIC LOGO STORYBOARD SEQUENCE (EXACT USER SPEC):
        - Stairs fade in on white (no ring)
        - Human walks up stairs & simultaneously big hand reaches out to meet
        - Logo figures fade away completely
        - ONLY AFTER logo fades, English SAHARA appears at center
        - English SAHARA glides up to corner:
          - Full uploaded colored logo appears beside it
          - Brand text alternates slowly between English & Hindi
        - Faded rotating chakra appears centered behind search bar
     ========================================================================= */
  initIntroScreen() {
    const brandContainer = document.getElementById('sahara-brand-container');
    const mainUi = document.getElementById('sahara-main-ui');
    if (!brandContainer) return;

    let timeoutIds = [];
    const clearAllTimeouts = () => {
      timeoutIds.forEach(id => clearTimeout(id));
      timeoutIds = [];
    };

    const runLogoStoryboard = () => {
      clearAllTimeouts();
      if (this.brandAlternatorInterval) clearInterval(this.brandAlternatorInterval);

      // Reset all animation step classes
      brandContainer.classList.remove(
        'in-corner', 
        'step-stairs', 
        'step-figures', 
        'step-fadeout',
        'step-english'
      );

      // Reset wordmarks
      const enWordmark = document.getElementById('sahara-english-wordmark');
      const hiWordmark = document.getElementById('sahara-hindi-wordmark');
      if (enWordmark) enWordmark.classList.add('active');
      if (hiWordmark) hiWordmark.classList.remove('active');

      // Step 1: White background, fade in the stairs (no ring) (~150ms)
      timeoutIds.push(setTimeout(() => {
        brandContainer.classList.add('step-stairs');
      }, 150));

      // Step 2: Human walks up stairs AND simultaneously big hand reaches out (~850ms)
      timeoutIds.push(setTimeout(() => {
        brandContainer.classList.add('step-figures');
      }, 850));

      // Step 3: Logo figures (hand, human, ladder) fade out completely FIRST (~2000ms)
      timeoutIds.push(setTimeout(() => {
        brandContainer.classList.add('step-fadeout');
      }, 2000));

      // Step 4: ONLY AFTER logo fades, English SAHARA appears at center (~2600ms)
      timeoutIds.push(setTimeout(() => {
        brandContainer.classList.add('step-english');
      }, 2600));

      // Step 5: And then English SAHARA goes up to corner (~3600ms)
      timeoutIds.push(setTimeout(() => {
        brandContainer.classList.add('in-corner');
        this.startBrandTextAlternator();

        // Reveal the main minimal interface smoothly (~3950ms)
        timeoutIds.push(setTimeout(() => {
          if (mainUi) {
            mainUi.classList.add('visible');
            mainUi.removeAttribute('aria-hidden');
          }
        }, 350));
      }, 3600));
    };

    runLogoStoryboard();

    // Clicking the corner logo replays the full cinematic sequence
    brandContainer.addEventListener('click', () => {
      if (brandContainer.classList.contains('in-corner')) {
        if (mainUi) mainUi.classList.remove('visible');
        runLogoStoryboard();
      }
    });
  }

  /* Alternates brand text slowly between English SAHARA & Hindi सहारा */
  startBrandTextAlternator() {
    if (this.brandAlternatorInterval) clearInterval(this.brandAlternatorInterval);
    const enWordmark = document.getElementById('sahara-english-wordmark');
    const hiWordmark = document.getElementById('sahara-hindi-wordmark');
    if (!enWordmark || !hiWordmark) return;

    let isEnglish = true;
    this.brandAlternatorInterval = setInterval(() => {
      isEnglish = !isEnglish;
      if (isEnglish) {
        hiWordmark.classList.remove('active');
        setTimeout(() => enWordmark.classList.add('active'), 250);
      } else {
        enWordmark.classList.remove('active');
        setTimeout(() => hiWordmark.classList.add('active'), 250);
      }
    }, 3500);
  }

  /* =========================================================================
     2. GLOBAL LANGUAGE SELECTOR
     ========================================================================= */
  initLanguageSelector() {
    const langBtn = document.getElementById('lang-select-btn');
    const langDropdown = document.getElementById('lang-dropdown-menu');
    const langLabel = document.getElementById('current-lang-label');

    if (!langBtn || !langDropdown) return;

    langDropdown.innerHTML = LANGUAGES.map(l => `
      <button class="lang-option ${l.code === i18n.getCurrentLanguage() ? 'active' : ''}" data-code="${l.code}">
        <span>${l.native}</span>
        <small style="opacity:0.6; font-size:11px;">${l.name}</small>
      </button>
    `).join('');

    const updateLabel = () => {
      const cur = i18n.getCurrentLanguageObj();
      if (langLabel) langLabel.textContent = cur.native || cur.name;
    };
    updateLabel();

    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      langDropdown.classList.remove('show');
    });

    langDropdown.addEventListener('click', (e) => {
      const opt = e.target.closest('.lang-option');
      if (!opt) return;
      const code = opt.getAttribute('data-code');
      this.switchLanguage(code);
      langDropdown.classList.remove('show');
    });
  }

  switchLanguage(code) {
    if (!code) return;
    i18n.setLanguage(code);

    const langLabel = document.getElementById('current-lang-label');
    const cur = i18n.getCurrentLanguageObj();
    if (langLabel) langLabel.textContent = cur.native || cur.name;

    const langDropdown = document.getElementById('lang-dropdown-menu');
    if (langDropdown) {
      langDropdown.querySelectorAll('.lang-option').forEach(el => {
        if (el.getAttribute('data-code') === code) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    }

    this.updateStaticTranslations();

    // Re-render open application kit modal if present
    const kitModal = document.getElementById('application-kit-modal');
    if (kitModal && kitModal.classList.contains('open') && this.activeService) {
      this.showApplicationKit(this.activeService, null, null, false);
    }
  }

  detectInputLanguage(text) {
    if (!text || typeof text !== 'string') return null;
    const str = text.trim();

    // 1. Script checks (Direct Unicode Block ranges)
    if (/[\u0900-\u097F]/.test(str)) {
      // Devanagari script: detect if Marathi or Hindi
      const marathiDevanagariWords = ['आहे', 'पाहिजे', 'कसे', 'काय', 'करायचे', 'माझे', 'माझी', 'नवीन', 'अर्ज', 'काढायचे', 'दाखला', 'प्रमाणपत्र', 'नागरिक', 'योजना', 'कसा', 'केले'];
      const words = str.split(/\s+/);
      if (words.some(w => marathiDevanagariWords.includes(w))) {
        return 'mr';
      }
      return 'hi';
    }
    if (/[\u0980-\u09FF]/.test(str)) return 'bn';
    if (/[\u0B80-\u0BFF]/.test(str)) return 'ta';
    if (/[\u0C00-\u0C7F]/.test(str)) return 'te';
    if (/[\u0C80-\u0CFF]/.test(str)) return 'kn';
    if (/[\u0D00-\u0D7F]/.test(str)) return 'ml';
    if (/[\u0A80-\u0AFF]/.test(str)) return 'gu';
    if (/[\u0A00-\u0A7F]/.test(str)) return 'pa';
    if (/[\u0600-\u06FF]/.test(str)) return 'ur';
    if (/[\u0B00-\u0B7F]/.test(str)) return 'or';

    // 2. Romanized Indian phrases / Hinglish detection
    const lower = str.toLowerCase();

    // Romanized Marathi
    if (/\b(mala|pahije|aahe|kasa|kase|kiti|mahiti|shasan|arja|karaycha|navin|dakhla)\b/i.test(lower)) {
      return 'mr';
    }

    // Romanized Hindi / Hinglish (excluded general service keywords like aadhaar)
    const hinglishRegex = /\b(mujhe|chahiye|banana|banwana|karna|kare|kaise|kya|kyun|mera|meri|mere|banaun|dastavez|sarkari|yojana|saal|umar|pata|namaste|janm|khata|pension|sudhar|batao|bataiye|lagti|lagte|lagta|kahan|jana|nikalna)\b/i;
    if (hinglishRegex.test(lower)) {
      return 'hi';
    }

    // Romanized Tamil
    if (/\b(enakku|vendum|eppadi|seyyavendum|theriyavendum)\b/i.test(lower)) {
      return 'ta';
    }

    // Romanized Telugu
    if (/\b(naaku|kaavali|ela|cheyali)\b/i.test(lower)) {
      return 'te';
    }

    // Romanized Bengali
    if (/\b(aami|amar|chai|kivabe|korbo|dorokar)\b/i.test(lower)) {
      return 'bn';
    }

    return 'en';
  }

  updateStaticTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = i18n.t(key);
      }
    });

    const searchInput = document.getElementById('main-search-input');
    if (searchInput) {
      searchInput.placeholder = i18n.t('heroTitle');
    }
  }

  /* =========================================================================
     3. SPEECH RECOGNITION & SYNTHESIS
     ========================================================================= */
  initSpeechEngine() {
    const micBtn = document.getElementById('main-mic-btn');
    const searchBox = document.querySelector('.sahara-search-box');
    const voiceBar = document.getElementById('voice-assistant-bar');
    const voiceDot = document.getElementById('voice-pulse-dot');
    const transcriptEl = document.getElementById('voice-transcript');
    const stopVoiceBtn = document.getElementById('stop-voice-btn');
    const replayVoiceBtn = document.getElementById('replay-voice-btn');
    const searchInput = document.getElementById('main-search-input');

    this.speech = new SaharaSpeech({
      onListeningStart: () => {
        if (micBtn) micBtn.classList.add('active');
        if (searchBox) searchBox.classList.add('listening');
        if (voiceBar) voiceBar.classList.add('visible');
        if (voiceDot) voiceDot.className = 'voice-dot listening';
        if (transcriptEl) transcriptEl.textContent = i18n.t('listening');
      },
      onListeningEnd: () => {
        if (micBtn) micBtn.classList.remove('active');
        if (searchBox) searchBox.classList.remove('listening');
      },
      onTranscript: (text, isFinal) => {
        if (transcriptEl) transcriptEl.textContent = `“${text}”`;
        if (searchInput) searchInput.value = text;
        if (isFinal && text.trim().length > 2) {
          this.processCitizenInput(text, true);
        }
      },
      onSpeakingStart: () => {
        if (voiceBar) voiceBar.classList.add('visible');
        if (voiceDot) voiceDot.className = 'voice-dot speaking';
        if (transcriptEl) transcriptEl.textContent = i18n.t('speaking');
      },
      onSpeakingEnd: () => {
        if (voiceDot) voiceDot.className = 'voice-dot';
      },
      onError: (err) => {
        if (micBtn) micBtn.classList.remove('active');
        if (searchBox) searchBox.classList.remove('listening');
        if (err === 'not_supported') {
          alert(i18n.t('voiceFallback'));
        }
      }
    });

    if (micBtn) {
      micBtn.addEventListener('click', () => {
        if (this.speech.isListening) {
          this.speech.stopListening();
        } else {
          this.speech.startListening();
        }
      });
    }

    if (stopVoiceBtn) {
      stopVoiceBtn.addEventListener('click', () => {
        this.speech.stopSpeaking();
        this.speech.stopListening();
        if (voiceBar) voiceBar.classList.remove('visible');
      });
    }

    if (replayVoiceBtn) {
      replayVoiceBtn.addEventListener('click', () => {
        this.speech.replay();
      });
    }
  }

  /* =========================================================================
     4. SEARCH & NATURAL LANGUAGE PROCESSING
     ========================================================================= */
  initSearchInputs() {
    const searchInput = document.getElementById('main-search-input');
    const searchSubmit = document.getElementById('main-search-submit');

    const handleSearch = () => {
      if (!searchInput) return;
      const val = searchInput.value.trim();
      if (val) {
        this.processCitizenInput(val);
      }
    };

    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSearch();
      });
    }

    if (searchSubmit) {
      searchSubmit.addEventListener('click', handleSearch);
    }
  }

  processCitizenInput(text, isVoice = false) {
    // Only adapt language if user has NOT explicitly chosen one in session, or if input is in non-Latin Indic script
    const userSelected = sessionStorage.getItem('sahara_user_selected_lang');
    const hasIndicScript = /[\u0900-\u0D7F]/.test(text);

    if (!userSelected || hasIndicScript) {
      const detectedLang = this.detectInputLanguage(text);
      if (detectedLang && detectedLang !== i18n.getCurrentLanguage()) {
        this.switchLanguage(detectedLang);
      }
    }

    this.smartQuestions.reset();
    const result = this.nlp.parse(text);

    this.currentContext = result.extractedContext;
    this.smartQuestions.setExtractedContext(result.extractedContext);

    if (result.isAmbiguous && result.didYouMean.length > 0) {
      this.showAmbiguityDialog(result.didYouMean);
      return;
    }

    if (result.lifeEvent) {
      this.handleLifeEventSelected(result.lifeEvent);
      return;
    }

    if (result.topService) {
      this.handleServiceSelected(result.topService);
      return;
    }

    if (result.matchedSchemes.length > 0) {
      const scheme = result.matchedSchemes[0];
      const localizedSchemeName = i18n.localize(scheme, 'name');
      const schemeUnderstanding = i18n.format('understandingScheme', { name: localizedSchemeName });
      this.showApplicationKit(scheme, schemeUnderstanding);
      return;
    }

    this.showDidYouMeanGeneral(text);
  }

  /* =========================================================================
     5. THREE OPTIONS (TOP MENU)
     ========================================================================= */
  initThreeOptions() {
    const optVault = document.getElementById('opt-doc-upload');
    const optLifeEvents = document.getElementById('opt-life-events');
    const optServices = document.getElementById('opt-services-explore');
    const trackBtn = document.getElementById('header-track-btn');

    if (optVault) optVault.addEventListener('click', () => this.showVaultModal());
    if (optLifeEvents) optLifeEvents.addEventListener('click', () => this.showLifeEventsModal());
    if (optServices) optServices.addEventListener('click', () => this.showServicesExplorerModal());
    if (trackBtn) trackBtn.addEventListener('click', () => this.showTrackerModal());
  }

  /* =========================================================================
     6. CHANGING RECOMMENDATION TICKER
     ========================================================================= */
  initTicker() {
    const tickerText = document.getElementById('ticker-recommendation-text');
    const tickerBtn = document.getElementById('ticker-recommendation-btn');

    const updateTicker = () => {
      if (!tickerText) return;
      tickerText.style.opacity = '0';
      setTimeout(() => {
        tickerText.textContent = this.tickerPrompts[this.tickerIndex];
        tickerText.style.opacity = '1';
        this.tickerIndex = (this.tickerIndex + 1) % this.tickerPrompts.length;
      }, 250);
    };

    updateTicker();
    this.tickerInterval = setInterval(updateTicker, 4000);

    if (tickerBtn) {
      tickerBtn.addEventListener('click', () => {
        const text = tickerText.textContent;
        const searchInput = document.getElementById('main-search-input');
        if (searchInput) searchInput.value = text;
        this.processCitizenInput(text);
      });
    }
  }

  /* =========================================================================
     7. SMART QUESTION ENGINE
     ========================================================================= */
  handleServiceSelected(service) {
    this.activeService = service;
    const nextQ = this.smartQuestions.getNextQuestion(service);

    if (nextQ) {
      this.showSmartQuestion(nextQ, () => {
        this.handleServiceSelected(service);
      });
    } else {
      const localizedName = i18n.localize(service, 'name');
      const understanding = i18n.format('understandingService', { name: localizedName });
      this.showApplicationKit(service, understanding);
    }
  }

  handleLifeEventSelected(lifeEvent) {
    this.activeLifeEvent = lifeEvent;

    if (lifeEvent.smartQuestions && lifeEvent.smartQuestions.length > 0) {
      const dummyItem = { questions: lifeEvent.smartQuestions };
      const nextQ = this.smartQuestions.getNextQuestion(dummyItem);

      if (nextQ) {
        this.showSmartQuestion(nextQ, () => {
          this.handleLifeEventSelected(lifeEvent);
        });
        return;
      }
    }

    const service = SERVICES_DATA.find(s => lifeEvent.suggestedServices && lifeEvent.suggestedServices.includes(s.id));
    const scheme = SCHEMES_DATA.find(sc => lifeEvent.suggestedSchemes && lifeEvent.suggestedSchemes.includes(sc.id));

    const item = service || scheme;
    const localizedTitle = i18n.localize(lifeEvent, 'title') || lifeEvent.title;
    const currentLang = i18n.getCurrentLanguage();
    const understanding = currentLang === 'mr'
      ? `सहाराचे आकलन: जीवन प्रसंग — "${localizedTitle}". संबंधित सेवा व कल्याणकारी योजना.`
      : currentLang === 'hi'
        ? `सहारा की समझ: जीवन स्थिति — "${localizedTitle}"। संबंधित सरकारी सेवाएं एवं योजनाएं।`
        : `What Sahara understood: Life event selected — “${lifeEvent.title}”. Showing comprehensive services and welfare schemes.`;
    this.showApplicationKit(item, understanding, scheme);
  }

  showSmartQuestion(questionObj, onAnswered) {
    const modal = document.getElementById('smart-question-modal');
    const titleEl = document.getElementById('smart-q-title');
    const optionsEl = document.getElementById('smart-q-options');

    if (!modal || !titleEl || !optionsEl) return;

    const currentLang = i18n.getCurrentLanguage();
    const localizedQuestion = questionObj['question_' + currentLang] || questionObj.question;
    const localizedOptions = (questionObj.options || []).map(opt => ({
      ...opt,
      label: opt['label_' + currentLang] || opt.label
    }));

    titleEl.textContent = localizedQuestion;
    optionsEl.innerHTML = localizedOptions.map(opt => `
      <button class="question-btn" data-val="${opt.value}">
        ${opt.label}
      </button>
    `).join('');

    const handleOptionClick = (e) => {
      const btn = e.target.closest('.question-btn');
      if (!btn) return;
      const val = btn.getAttribute('data-val');
      this.smartQuestions.recordAnswer(questionObj.id, val);

      optionsEl.removeEventListener('click', handleOptionClick);
      this.closeModal(modal);

      if (onAnswered) onAnswered();
    };

    optionsEl.addEventListener('click', handleOptionClick);
    this.openModal(modal);

    this.speech.speak(localizedQuestion);
  }

  /* =========================================================================
     8. APPLICATION KIT VIEW
     ========================================================================= */
  showApplicationKit(item, understandingText, secondaryScheme = null, shouldSpeak = true) {
    const modal = document.getElementById('application-kit-modal');
    const bodyEl = document.getElementById('kit-modal-body');
    const titleEl = document.getElementById('kit-modal-title');

    if (!modal || !bodyEl || !titleEl || !item) return;

    this.activeService = item;
    const currentLang = i18n.getCurrentLanguage();
    const localizedName = i18n.localize(item, 'name');
    titleEl.textContent = localizedName;
    const docMatch = this.docMatcher.matchRequirements(item.documents || []);
    const office = OFFICES_DATA[item.id] || null;

    const displayUnderstanding = understandingText || i18n.format('understandingService', { name: localizedName });
    const criteriaText = (item.eligibility && item.eligibility['criteria_' + currentLang]) 
      || (item.eligibility ? item.eligibility.criteria : 'Standard citizen criteria apply.');
    const verificationNote = (item.eligibility && item.eligibility['verificationNote_' + currentLang])
      || (item.eligibility ? item.eligibility.verificationNote : 'Subject to official scrutiny.');
    const physicalVisitDesc = (item.verification && item.verification['physicalVisitDesc_' + currentLang])
      || (item.verification ? item.verification.physicalVisitDesc : (item['physicalVisitDesc_' + currentLang] || item.physicalVisitDesc || 'Verification specified by the authority.'));

    const checklist = (item.verification && item.verification['checklistItems_' + currentLang])
      || (item.verification && item.verification.checklistItems)
      || ['Signed official application form', 'Valid proof of identity', 'Valid proof of address'];

    bodyEl.innerHTML = `
      <div class="kit-header-summary">
        <div class="kit-summary-label">${i18n.t('whatSaharaUnderstood')}</div>
        <div class="kit-summary-text">${displayUnderstanding}</div>
        <div style="font-size:11px; color:var(--sahara-text-secondary); margin-top:6px;">
          ${i18n.t('applicability')}: <strong>${item.stateApplicability || 'All India'}</strong> • ${i18n.t('processing')}: <strong>${item.processingTimeline || '7-15 days'}</strong>
        </div>
      </div>

      <div class="kit-section">
        <h3 class="kit-section-title">🔍 ${i18n.t('eligibilityTitle')}</h3>
        <p style="font-size:0.875rem; color:var(--sahara-text-secondary);">
          ${i18n.t('eligibilitySub')}
        </p>
        <div style="background:var(--sahara-surface-elevated); border:1px solid rgba(0,0,0,0.08); padding:12px; border-radius:6px; margin-top:6px; font-size:0.85rem;">
          ${criteriaText}
          <div style="font-size:11px; color:#b45309; margin-top:4px;">
            ⚠️ ${verificationNote}
          </div>
        </div>
      </div>

      <div class="kit-section">
        <h3 class="kit-section-title">📁 ${i18n.t('documentsNeeded')} (${docMatch.available.length}/${docMatch.total} ${i18n.t('available')})</h3>
        <div class="doc-matching-list">
          ${docMatch.available.map(d => {
            const dName = d['name_' + currentLang] || d.name;
            const dReason = d['reason_' + currentLang] || d.reason;
            return `
              <div class="doc-item">
                <div class="doc-info">
                  <span class="doc-name">${dName}</span>
                  <span class="doc-reason">${dReason}</span>
                </div>
                <span class="doc-status-badge available">✅ ${i18n.t('available')}</span>
              </div>
            `;
          }).join('')}

          ${docMatch.missing.map(d => {
            const dName = d['name_' + currentLang] || d.name;
            const dReason = d['reason_' + currentLang] || d.reason;
            return `
              <div class="doc-item">
                <div class="doc-info">
                  <span class="doc-name">${dName}</span>
                  <span class="doc-reason">${dReason}</span>
                </div>
                <span class="doc-status-badge missing">❌ ${i18n.t('missing')}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="verification-box">
        <div style="font-weight:600; font-size:0.85rem; color:#b45309;">
          ⚖️ ${i18n.t('verificationRequirements')}
        </div>
        <div class="verification-tag-list">
          ${item.verification && item.verification.signatureRequired ? `<span class="verification-tag">✍️ ${i18n.t('signatureRequired')}</span>` : ''}
          ${item.verification && item.verification.physicalVisitRequired ? `<span class="verification-tag">📍 ${i18n.t('physicalVisitRequired')}</span>` : `<span class="verification-tag" style="background:rgba(34,197,94,0.15); color:#15803d;">💻 ${i18n.t('onlineAvailable')}</span>`}
          <span class="verification-tag">🏛️ ${i18n.t('officialVerification')}</span>
        </div>
        <p style="font-size:11px; color:var(--sahara-text-secondary); margin-top:6px;">
          ${physicalVisitDesc}
        </p>
      </div>

      ${item.forms && item.forms.length > 0 ? `
        <div class="kit-section">
          <h3 class="kit-section-title">📄 ${i18n.t('officialForms')}</h3>
          <p style="font-size:12px; color:var(--sahara-text-secondary); margin-bottom:8px;">
            ${i18n.t('officialFormsSub')}
          </p>
          <div style="display:flex; flex-direction:column; gap:8px;">
            ${item.forms.map(f => `
              <div style="background:var(--sahara-surface-elevated); padding:10px 14px; border-radius:6px; border:1px solid rgba(0,0,0,0.08);">
                <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:10px; flex-wrap:wrap;">
                  <div>
                    <div style="font-weight:700; font-size:0.9rem; color:var(--sahara-text-primary);">
                      🏛️ ${f.formNumber}: ${f.title}
                    </div>
                    <div style="font-size:11px; color:var(--sahara-text-muted); margin-top:2px;">
                      ${i18n.t('officialSource')}: <strong>${item.officialSource || 'Govt of India'}</strong>
                    </div>
                  </div>
                  <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                    <a href="${f.officialUrl || item.officialPortal}" target="_blank" rel="noopener noreferrer" class="route-btn primary" style="padding:6px 14px; font-size:11px; text-decoration:none; margin-top:0; display:inline-flex; align-items:center; gap:5px;">
                      <span>📥 ${i18n.t('downloadOfficialForm')}</span> <span>↗</span>
                    </a>
                    <button class="route-btn secondary" style="padding:6px 12px; font-size:11px; margin-top:0;" onclick="window.saharaApp.printOfficialForm('${item.id}', '${f.formNumber}')">
                      🖨️ ${i18n.t('officialPrintout')}
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${item.filledDemo ? `
        <div class="kit-section">
          <h3 class="kit-section-title">✍️ ${i18n.t('filledDemoTitle')}</h3>
          <div class="demo-form-container">
            <div class="demo-banner">${item.filledDemo.disclaimer}</div>
            <div style="font-weight:600; font-size:13px; margin-bottom:8px; color:#18181b;">${item.filledDemo.title}</div>
            <div class="demo-field-grid">
              ${item.filledDemo.fields.map(fld => `
                <div class="demo-field">
                  <div class="demo-field-label">${fld.label}</div>
                  <div class="demo-field-value">${fld.value}</div>
                  <div class="demo-field-tip">💡 ${fld.tip}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}

      ${item.tutorial && item.tutorial.length > 0 ? `
        <div class="kit-section">
          <h3 class="kit-section-title">📖 ${i18n.t('tutorialTitle')}</h3>
          <div style="display:flex; flex-direction:column; gap:8px;">
            ${item.tutorial.map(t => {
              const tTitle = t['title_' + currentLang] || t.title;
              const tDesc = t['desc_' + currentLang] || t.desc;
              return `
                <div style="display:flex; gap:10px; background:var(--sahara-surface-elevated); padding:8px 12px; border-radius:6px;">
                  <div style="font-weight:700; color:var(--sahara-accent); font-size:0.85rem;">${t.step}.</div>
                  <div>
                    <div style="font-weight:600; font-size:0.85rem; color:var(--sahara-text-primary);">${tTitle}</div>
                    <div style="font-size:0.75rem; color:var(--sahara-text-secondary); margin-top:2px;">${tDesc}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      ${secondaryScheme ? `
        <div class="kit-section" style="border:1px solid rgba(139,92,246,0.25); background:rgba(139,92,246,0.06); border-radius:6px; padding:12px;">
          <h3 class="kit-section-title" style="color:#7c3aed;">🎁 ${i18n.localize(secondaryScheme, 'name')}</h3>
          <p style="font-size:0.85rem; color:var(--sahara-text-primary);">${i18n.localize(secondaryScheme, 'description') || secondaryScheme.benefits}</p>
        </div>
      ` : ''}

      <div class="kit-section">
        <h3 class="kit-section-title">🚀 ${i18n.t('whereToApply')}</h3>
        <div class="action-route-grid">
          ${(item.officialPortal || (item.forms && item.forms[0] ? item.forms[0].officialUrl : null)) ? `
            <div class="route-card">
              <div>
                <div style="font-weight:600; color:#0284c7; font-size:0.85rem;">${i18n.t('applyOnline').toUpperCase()}</div>
                <div style="font-size:11px; color:var(--sahara-text-muted); margin-top:4px;">${i18n.t('officialPortalLabel')}: ${item.officialSource || 'Govt of India'}</div>
              </div>
              <a href="${item.officialPortal || (item.forms && item.forms[0] ? item.forms[0].officialUrl : '#')}" target="_blank" rel="noopener noreferrer" class="route-btn primary">${i18n.t('applyOnline')} ↗</a>
            </div>
          ` : ''}

          ${office ? `
            <div class="route-card">
              <div>
                <div style="font-weight:600; color:#d97706; font-size:0.85rem;">${i18n.t('visitOffice').toUpperCase()}</div>
                <div style="font-size:11px; color:var(--sahara-text-primary); margin-top:4px;">${office.officeName}</div>
                <div style="font-size:10px; color:var(--sahara-text-muted);">${office.address}</div>
              </div>
              <a href="https://maps.google.com/?q=${encodeURIComponent(office.mapsQuery)}" target="_blank" rel="noopener noreferrer" class="route-btn secondary">${i18n.t('visitOffice')} ↗</a>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="kit-section">
        <h3 class="kit-section-title">☑️ ${i18n.t('checklistTitle')}</h3>
        <div class="printable-checklist">
          ${checklist.map(itemText => `
            <label class="checklist-item">
              <input type="checkbox" class="checklist-checkbox" checked />
              <span>${itemText}</span>
            </label>
          `).join('')}
        </div>
        <button class="route-btn secondary" style="width:100%; margin-top:8px; display:inline-flex; align-items:center; justify-content:center; gap:8px;" onclick="window.saharaApp.printChecklistPoints(window.saharaApp.activeService)">
          <span>🖨️</span> <span>${i18n.t('downloadChecklist')}</span>
        </button>
      </div>

      <div style="padding-top:10px; border-top:1px solid rgba(0,0,0,0.08); font-size:11px; color:var(--sahara-text-muted); display:flex; justify-content:space-between;">
        <span>${i18n.t('officialSource')}: ${item.officialSource || 'Govt of India'}</span>
        <span>${i18n.t('lastVerified')}: ${item.lastVerified || '2026-03-01'}</span>
      </div>
    `;

    this.openModal(modal);

    if (shouldSpeak) {
      const docNames = (item.documents || []).map(d => d['name_' + currentLang] || d.name).slice(0, 3).join(', ');
      const spokenIntro = i18n.format('kitIntroAudio', {
        name: localizedName,
        authority: item.officialSource || 'Government of India',
        timeline: item.processingTimeline || '15 days',
        docs: docNames
      });
      this.speech.speak(spokenIntro);
    }
  }

  /* =========================================================================
     9. APPLICATION TRACKING & DELAY GRIEVANCE (FLOW 3)
     ========================================================================= */
  showTrackerModal() {
    const modal = document.getElementById('application-tracker-modal');
    const container = document.getElementById('tracker-modal-content-area');
    if (!modal || !container) return;

    const demoCase = SAHARA_CONFIG.demoTrackedCase;

    container.innerHTML = `
      <div class="tracker-container">
        <div class="tracker-card">
          <div class="tracker-case-header">
            <div>
              <div style="font-size:11px; color:var(--sahara-text-muted); text-transform:uppercase;">Application Case ID</div>
              <div class="tracker-case-id">${demoCase.referenceNumber}</div>
              <div style="font-size:0.9rem; font-weight:600; margin-top:4px;">${demoCase.serviceName}</div>
              <div style="font-size:11px; color:var(--sahara-text-muted);">${demoCase.department}</div>
            </div>
            <div>
              <span class="tracker-badge-current under_verification">🟠 Under Verification</span>
            </div>
          </div>

          <div class="timeline-stepper">
            ${demoCase.history.map(h => `
              <div class="timeline-step ${h.completed ? 'completed' : (h.active ? 'active' : '')}">
                <div class="timeline-dot"></div>
                <div class="timeline-step-title">${h.step}</div>
                <div class="timeline-step-meta">${h.date}</div>
              </div>
            `).join('')}
          </div>

          <div class="delay-warning-card">
            <div class="delay-warning-title">⚠️ ${i18n.t('beyondTimelineWarning')}</div>
            <div class="delay-warning-desc">
              <strong>Official Published Timeline:</strong> ${demoCase.officialProcessingTimelineDays} working days.<br />
              <strong>Current Elapsed Time:</strong> ${demoCase.daysElapsed} days since submission.<br />
              Your application has exceeded the statutory completion timeframe without formal objection.
            </div>
          </div>

          <div class="grievance-escalation-box">
            <div class="grievance-heading">⚖️ ${i18n.t('officialGrievanceRoutes')}</div>
            <p style="font-size:11px; color:var(--sahara-text-secondary);">
              Sahara helps you follow verified legal escalation routes without unofficial intermediaries:
            </p>
            <div class="grievance-options-list">
              ${demoCase.grievancePortals.map(gp => `
                <div class="grievance-option-item">
                  <div>
                    <div class="grievance-name">${gp.name}</div>
                    <div class="grievance-detail">${gp.description}</div>
                  </div>
                  <a href="${gp.url}" target="_blank" rel="noopener noreferrer" class="grievance-link-btn">Lodge Escalation ↗</a>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.openModal(modal);
  }

  /* =========================================================================
     10. DOCUMENT VAULT (MY DOCUMENTS)
     ========================================================================= */
  showVaultModal() {
    const modal = document.getElementById('document-vault-modal');
    const container = document.getElementById('vault-modal-content-area');
    if (!modal || !container) return;

    const renderVault = () => {
      const docs = this.docMatcher.getVaultDocuments();
      container.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:14px;">
          <div style="background:var(--sahara-surface-elevated); border-left:3px solid var(--sahara-accent); padding:10px 14px; border-radius:0 6px 6px 0; font-size:0.8rem; color:var(--sahara-text-secondary);">
            🔒 <strong>Secure Demo Vault:</strong> Documents are stored locally in your session. Sensitive Aadhaar/PAN cards are never exposed on public servers.
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-weight:600; font-size:0.85rem;">Available Personal Documents (${docs.length})</div>
            <button class="route-btn primary" id="add-mock-doc-btn" style="margin-top:0; padding:4px 10px; font-size:11px;">+ Add Sample</button>
          </div>

          <div class="doc-matching-list">
            ${docs.map(d => `
              <div class="doc-item">
                <div class="doc-info">
                  <span class="doc-name">${d.name}</span>
                  <span class="doc-reason">${d.category} • Updated ${d.lastUpdated}</span>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="doc-status-badge available">✅ Saved</span>
                  <button class="modal-close-btn" style="width:24px; height:24px; font-size:11px;" data-remove-id="${d.id}">✕</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      const addBtn = container.querySelector('#add-mock-doc-btn');
      if (addBtn) {
        addBtn.addEventListener('click', () => {
          const sampleOptions = [
            { name: 'Recent Passport Size Photograph', category: 'Biometrics & Photo' },
            { name: '10th Standard / Matriculation Certificate', category: 'Education & Age' },
            { name: 'Birth Certificate', category: 'Vital Records' }
          ];
          const choice = sampleOptions[Math.floor(Math.random() * sampleOptions.length)];
          this.docMatcher.addDocument(choice);
          renderVault();
        });
      }

      container.querySelectorAll('[data-remove-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-remove-id');
          this.docMatcher.removeDocument(id);
          renderVault();
        });
      });
    };

    renderVault();
    this.openModal(modal);
  }

  /* =========================================================================
     11. LIFE EVENTS SELECTOR
     ========================================================================= */
  showLifeEventsModal() {
    const modal = document.getElementById('life-events-modal');
    const container = document.getElementById('life-events-content-area');
    if (!modal || !container) return;

    container.innerHTML = `
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(210px, 1fr)); gap:10px;">
        ${LIFE_EVENTS_DATA.map(ev => `
          <div class="route-card" data-life-event-id="${ev.id}" style="cursor:pointer; padding:12px;">
            <div style="font-size:1.4rem; margin-bottom:4px;">${ev.icon}</div>
            <div style="font-weight:600; font-size:0.9rem; color:var(--sahara-text-primary);">${ev.title}</div>
            <div style="font-size:11px; color:var(--sahara-text-muted); margin-top:2px;">${ev.subtitle}</div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('[data-life-event-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-life-event-id');
        const ev = LIFE_EVENTS_DATA.find(l => l.id === id);
        if (ev) {
          this.closeModal(modal);
          this.handleLifeEventSelected(ev);
        }
      });
    });

    this.openModal(modal);
  }

  /* =========================================================================
     12. SERVICES EXPLORER (16 CATEGORIES)
     ========================================================================= */
  showServicesExplorerModal() {
    const modal = document.getElementById('services-explorer-modal');
    const container = document.getElementById('services-explorer-content-area');
    if (!modal || !container) return;

    container.innerHTML = `
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(180px, 1fr)); gap:10px;">
        ${SERVICE_CATEGORIES.map(cat => `
          <div class="route-card" data-cat-id="${cat.id}" style="cursor:pointer; padding:12px;">
            <div style="font-size:1.4rem; margin-bottom:4px;">${cat.icon}</div>
            <div style="font-weight:600; font-size:0.85rem; color:var(--sahara-text-primary);">${cat.name}</div>
            <div style="font-size:10px; color:var(--sahara-text-muted);">${cat.count} Services</div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('[data-cat-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        const catId = e.currentTarget.getAttribute('data-cat-id');
        const match = SERVICES_DATA.filter(s => s.category === catId);
        if (match.length > 0) {
          this.closeModal(modal);
          this.handleServiceSelected(match[0]);
        }
      });
    });

    this.openModal(modal);
  }

  /* =========================================================================
     13. AMBIGUOUS / FALLBACK DIALOG
     ========================================================================= */
  showAmbiguityDialog(options) {
    const modal = document.getElementById('ambiguity-modal');
    const container = document.getElementById('ambiguity-content-area');
    if (!modal || !container) return;

    container.innerHTML = `
      <p style="font-size:0.85rem; color:var(--sahara-text-secondary); margin-bottom:12px;">
        Did you mean one of these services?
      </p>
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${options.map(opt => `
          <div class="route-card" data-select-id="${opt.id}" style="cursor:pointer; padding:10px;">
            <div style="font-weight:600; font-size:0.9rem; color:var(--sahara-accent);">${opt.name}</div>
            <div style="font-size:11px; color:var(--sahara-text-muted);">${opt.snippet}</div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('[data-select-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-select-id');
        const service = SERVICES_DATA.find(s => s.id === id);
        if (service) {
          this.closeModal(modal);
          this.handleServiceSelected(service);
        }
      });
    });

    this.openModal(modal);
  }

  showDidYouMeanGeneral(query) {
    const modal = document.getElementById('ambiguity-modal');
    const container = document.getElementById('ambiguity-content-area');
    if (!modal || !container) return;

    container.innerHTML = `
      <p style="font-size:0.85rem; color:var(--sahara-text-secondary); margin-bottom:12px;">
        We couldn’t find an exact match for <em>"${query}"</em>. Try one of our standard citizen workflows:
      </p>
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${SERVICES_DATA.slice(0, 4).map(s => `
          <div class="route-card" data-select-id="${s.id}" style="cursor:pointer; padding:10px;">
            <div style="font-weight:600; font-size:0.9rem; color:var(--sahara-accent);">${s.name}</div>
            <div style="font-size:11px; color:var(--sahara-text-muted);">${s.description}</div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('[data-select-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-select-id');
        const service = SERVICES_DATA.find(s => s.id === id);
        if (service) {
          this.closeModal(modal);
          this.handleServiceSelected(service);
        }
      });
    });

    this.openModal(modal);
  }

  /* =========================================================================
     14. MODAL MANAGEMENT
     ========================================================================= */
  initModals() {
    document.querySelectorAll('.sahara-modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal(modal);
      });

      const closeBtn = modal.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.closeModal(modal));
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.sahara-modal-backdrop.open').forEach(m => this.closeModal(m));
      }
    });
  }

  openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    if (!document.querySelector('.sahara-modal-backdrop.open')) {
      document.body.style.overflow = '';
    }
  }

  /* =========================================================================
     15. SPEAKER (TEXT-TO-SPEECH) ACROSS ALL PAGES & MODALS
     ========================================================================= */
  initSpeakers() {
    // 1. Search Bar Speaker
    const mainSpeakerBtn = document.getElementById('main-speaker-btn');
    if (mainSpeakerBtn) {
      mainSpeakerBtn.addEventListener('click', () => {
        const searchInput = document.getElementById('main-search-input')?.value.trim();
        const tickerText = document.getElementById('ticker-recommendation-text')?.textContent || '';
        const currentLang = i18n.getCurrentLanguage();
        let text = '';
        if (currentLang === 'mr') {
          text = searchInput 
            ? `सहारा शोध: ${searchInput}. नागरिक मार्गदर्शन प्रणाली तयार आहे.` 
            : `सहारा मार्गदर्शन: ${tickerText}. तुमचा प्रश्न विचारा किंवा बोला.`;
        } else if (currentLang === 'hi') {
          text = searchInput 
            ? `सहारा खोज: ${searchInput}। नागरिक मार्गदर्शन प्रणाली तैयार है।` 
            : `सहारा मार्गदर्शन: ${tickerText}। अपना प्रश्न पूछें या बोलें।`;
        } else {
          text = searchInput 
            ? `Searching Sahara for: ${searchInput}. Citizen guidance engine is ready.` 
            : `Sahara guidance prompt: ${tickerText}. Type or speak your question to begin.`;
        }
        this.toggleSpeaker(mainSpeakerBtn, text);
      });
    }

    // 2. Modal Speakers Helper
    const registerModalSpeaker = (btnId, getTextFn) => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = getTextFn();
        this.toggleSpeaker(btn, text);
      });
    };

    registerModalSpeaker('kit-modal-speaker-btn', () => {
      if (!this.activeService) return 'No service details selected.';
      const s = this.activeService;
      const currentLang = i18n.getCurrentLanguage();
      const localizedName = i18n.localize(s, 'name');
      const docs = (s.documents || []).map(d => d['name_' + currentLang] || d.name).join(', ');
      const criteria = (s.eligibility && s.eligibility['criteria_' + currentLang]) || (s.eligibility ? s.eligibility.criteria : '');
      const timeline = s.processingTimeline || '7-15 days';
      const authority = s.officialSource || 'Government of India';

      if (currentLang === 'mr') {
        return `${localizedName} साठीचा अर्ज तपशील. जारीकर्ता अधिकृत संस्था: ${authority}. आवश्यक कागदपत्रे आहेत: ${docs}. प्रक्रिया कालावधी: ${timeline}. पात्रता निकष: ${criteria}.`;
      } else if (currentLang === 'hi') {
        return `${localizedName} के लिए आवेदन किट। जारीकर्ता: ${authority}। आवश्यक दस्तावेज़ हैं: ${docs}। समय सीमा: ${timeline}। पात्रता मानदंड: ${criteria}।`;
      }
      return `Application Kit for ${localizedName}. Issued by ${authority}. Required documents are: ${docs}. Eligibility criteria: ${criteria || 'Standard citizen criteria apply'}. Processing timeline is ${timeline}.`;
    });

    registerModalSpeaker('vault-modal-speaker-btn', () => {
      return i18n.t('vaultSpeaker');
    });

    registerModalSpeaker('life-events-modal-speaker-btn', () => {
      return i18n.t('lifeEventsSpeaker');
    });

    registerModalSpeaker('services-modal-speaker-btn', () => {
      return i18n.t('servicesSpeaker');
    });

    registerModalSpeaker('tracker-modal-speaker-btn', () => {
      return i18n.t('trackerSpeaker');
    });

    registerModalSpeaker('smart-q-speaker-btn', () => {
      const title = document.getElementById('smart-q-title')?.textContent || i18n.t('smartQuestionLabel');
      const options = Array.from(document.querySelectorAll('#smart-q-options button')).map(b => b.textContent.trim()).join(', ');
      const currentLang = i18n.getCurrentLanguage();
      if (currentLang === 'mr') {
        return `${title}. तुमचे पर्याय आहेत: ${options}`;
      } else if (currentLang === 'hi') {
        return `${title}। आपके विकल्प हैं: ${options}`;
      }
      return `${title}. Your choices are: ${options}`;
    });

    registerModalSpeaker('ambiguity-speaker-btn', () => {
      const options = Array.from(document.querySelectorAll('#ambiguity-content-area .route-card')).map(b => b.querySelector('div')?.textContent || '').join(', ');
      return `${i18n.t('didYouMeanSpeaker')} ${options}`;
    });
  }

  toggleSpeaker(btn, text) {
    if (this.speech.isSpeaking) {
      this.speech.stopSpeaking();
      this.resetSpeakerButtons();
    } else {
      this.resetSpeakerButtons();
      btn.classList.add('speaking');
      const textSpan = btn.querySelector('span');
      if (textSpan) textSpan.textContent = 'Stop';
      this.speech.speak(text);

      // Handle speech end
      const originalOnSpeakingEnd = this.speech.callbacks.onSpeakingEnd;
      this.speech.callbacks.onSpeakingEnd = () => {
        if (originalOnSpeakingEnd) originalOnSpeakingEnd();
        this.resetSpeakerButtons();
      };
    }
  }

  resetSpeakerButtons() {
    document.querySelectorAll('.modal-speaker-btn, .sahara-speaker-button').forEach(btn => {
      btn.classList.remove('speaking');
      const textSpan = btn.querySelector('span');
      if (textSpan) textSpan.textContent = 'Listen';
    });
  }

  /* =========================================================================
     16. PURE POINTS CHECKLIST PRINTING & OFFICIAL APPLICATION FORMS
     ========================================================================= */
  printChecklistPoints(item) {
    const s = item || this.activeService;
    if (!s) return;

    const target = document.getElementById('print-checklist-target');
    if (!target) return;

    const currentLang = i18n.getCurrentLanguage();
    const localizedName = i18n.localize(s, 'name');
    const checklistItems = (s.verification && s.verification['checklistItems_' + currentLang]) 
      || (s.verification && s.verification.checklistItems) 
      || ['Signed official application form', 'Valid proof of identity', 'Valid proof of address'];

    target.innerHTML = `
      <div class="print-points-title">SAHARA CITIZEN DOCUMENT CHECKLIST</div>
      <div class="print-meta-row">
        <strong>Service:</strong> ${localizedName}<br>
        <strong>Authority:</strong> ${s.officialSource || 'Government of India'} &bull; 
        <strong>Timeline:</strong> ${s.processingTimeline || '15-30 days'} &bull; 
        <strong>Official Fee:</strong> ${s.fees || 'As prescribed by government'}
      </div>

      <div class="print-section-heading">1. Required Documents to Carry (Originals + Photocopies)</div>
      <ul class="print-points-list">
        ${(s.documents || []).map(d => {
          const dName = d['name_' + currentLang] || d.name;
          const dReason = d['reason_' + currentLang] || d.reason;
          return `
            <li class="print-point-item">
              <span class="print-point-checkbox"></span>
              <div>
                <strong>${dName}</strong> ${d.mandatory ? '(Mandatory)' : '(Optional)'}<br>
                <span style="font-size:10pt; color:#444;">Purpose: ${dReason}</span>
              </div>
            </li>
          `;
        }).join('')}
      </ul>

      <div class="print-section-heading">2. Official Verification Checklist Points</div>
      <ul class="print-points-list">
        ${checklistItems.map(point => `
          <li class="print-point-item">
            <span class="print-point-checkbox"></span>
            <div>${point}</div>
          </li>
        `).join('')}
      </ul>

      ${s.tutorial && s.tutorial.length > 0 ? `
        <div class="print-section-heading">3. Step-by-Step Submission Instructions</div>
        <ul class="print-points-list">
          ${s.tutorial.map(t => {
            const tTitle = t['title_' + currentLang] || t.title;
            const tDesc = t['desc_' + currentLang] || t.desc;
            return `
              <li class="print-point-item">
                <span style="font-weight:bold; min-width:20px;">${t.step}.</span>
                <div>
                  <strong>${tTitle}</strong>: ${tDesc}
                </div>
              </li>
            `;
          }).join('')}
        </ul>
      ` : ''}

      <div class="print-footer-notice">
        <strong>Official Portal:</strong> ${s.officialPortal || 'services.india.gov.in'} &bull; 
        <strong>Helpline:</strong> ${s.helpline || '1950 / National Consumer Helpline 1915'}<br>
        Generated by SAHARA Citizen Guidance Engine on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}. Check off each box before visiting the office or submitting your application.
      </div>
    `;

    window.print();
  }

  printOfficialForm(itemId, formNumber) {
    const s = SERVICES_DATA.find(item => item.id === itemId) || this.activeService;
    if (!s) return;

    const target = document.getElementById('print-checklist-target');
    if (!target) return;

    const currentLang = i18n.getCurrentLanguage();
    const localizedName = i18n.localize(s, 'name');

    target.innerHTML = `
      <div style="border: 2px solid #000; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 16px;">
          <h2 style="margin: 0; text-transform: uppercase; font-size: 16pt;">${s.officialSource || 'GOVERNMENT OF INDIA'}</h2>
          <h3 style="margin: 4px 0; font-size: 14pt;">OFFICIAL APPLICATION PRINT - ${formNumber || 'FORM'}</h3>
          <p style="margin: 0; font-size: 10pt; color: #555;">Application under Statutory Public Service Rules &bull; Source Portal: ${s.officialPortal || 'services.india.gov.in'}</p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div style="font-size: 11pt; line-height: 1.6;">
            <strong>Service Name:</strong> ${localizedName}<br>
            <strong>State / Jurisdiction:</strong> ${s.stateApplicability || 'All India'}<br>
            <strong>Processing Statutory Timeline:</strong> ${s.processingTimeline || '15-30 days'}<br>
            <strong>Prescribed Government Fee:</strong> ${s.fees || 'Free / As per rule'}
          </div>
          <div style="width: 100px; height: 120px; border: 1.5px dashed #000; display: flex; align-items: center; justify-content: center; text-align: center; font-size: 9pt; padding: 4px;">
            Affix Recent Passport Photo Here
          </div>
        </div>

        <div style="font-size: 12pt; font-weight: bold; border-bottom: 1px solid #000; margin-bottom: 8px;">1. APPLICANT DETAILS (FILL IN CAPITAL LETTERS)</div>
        <div style="line-height: 2; font-size: 11pt; margin-bottom: 16px;">
          Full Name: ____________________________________________________________________<br>
          Father's / Mother's / Spouse Name: ____________________________________________<br>
          Date of Birth: ____ / ____ / ________ &nbsp;&nbsp;&nbsp;&nbsp; Gender: [ ] M &nbsp; [ ] F &nbsp; [ ] Other<br>
          Mobile Number: _______________________ &nbsp;&nbsp;&nbsp;&nbsp; Email: __________________________<br>
          Residential Address: __________________________________________________________<br>
          Pin Code: _______________ &nbsp;&nbsp;&nbsp;&nbsp; District / State: _____________________________
        </div>

        <div style="font-size: 12pt; font-weight: bold; border-bottom: 1px solid #000; margin-bottom: 8px;">2. ENCLOSED MANDATORY DOCUMENTS</div>
        <ul style="font-size: 10.5pt; line-height: 1.6; margin-bottom: 16px; padding-left: 20px;">
          ${(s.documents || []).map(d => `<li>[ &nbsp; ] Self-Attested Photocopy of <strong>${d['name_' + currentLang] || d.name}</strong></li>`).join('')}
        </ul>

        <div style="font-size: 12pt; font-weight: bold; border-bottom: 1px solid #000; margin-bottom: 8px;">3. CITIZEN DECLARATION</div>
        <p style="font-size: 9.5pt; line-height: 1.5; margin-bottom: 24px;">
          I hereby declare that all particulars given in this application are true, correct, and complete to the best of my knowledge and belief. In case any information is found false or misleading, my application is liable to be rejected and action may be taken as per applicable laws.
        </p>

        <div style="display: flex; justify-content: space-between; margin-top: 30px; font-size: 11pt;">
          <div>
            Date: ____ / ____ / ________<br>
            Place: ____________________
          </div>
          <div style="text-align: right;">
            ____________________________________________<br>
            Signature / Thumb Impression of Applicant
          </div>
        </div>

        <div style="border-top: 2px dashed #000; margin-top: 30px; padding-top: 10px; font-size: 9pt; text-align: center; color: #555;">
          Official Form Printout generated for citizen guidance via SAHARA. Sourced from official portal: <strong>${s.officialPortal}</strong>
        </div>
      </div>
    `;

    window.print();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new SaharaApp();
  app.init();
  window.__sahara = app;
});
