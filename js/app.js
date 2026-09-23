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
        - Faded rotating chakra appears behind search bar
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
      i18n.setLanguage(code);
      updateLabel();
      this.updateStaticTranslations();

      langDropdown.querySelectorAll('.lang-option').forEach(el => el.classList.remove('active'));
      opt.classList.add('active');
      langDropdown.classList.remove('show');
    });
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
          this.processCitizenInput(text);
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

  processCitizenInput(text) {
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
      this.showApplicationKit(scheme, 'What Sahara understood: You are looking for relevant welfare schemes.');
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
      const understanding = `What Sahara understood: You are looking to apply for ${service.name}.`;
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
    const understanding = `What Sahara understood: Life event selected — “${lifeEvent.title}”. Showing comprehensive services and welfare schemes.`;
    this.showApplicationKit(item, understanding, scheme);
  }

  showSmartQuestion(questionObj, onAnswered) {
    const modal = document.getElementById('smart-question-modal');
    const titleEl = document.getElementById('smart-q-title');
    const optionsEl = document.getElementById('smart-q-options');

    if (!modal || !titleEl || !optionsEl) return;

    titleEl.textContent = questionObj.question;
    optionsEl.innerHTML = questionObj.options.map(opt => `
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

    this.speech.speak(questionObj.question);
  }

  /* =========================================================================
     8. APPLICATION KIT VIEW
     ========================================================================= */
  showApplicationKit(item, understandingText, secondaryScheme = null) {
    const modal = document.getElementById('application-kit-modal');
    const bodyEl = document.getElementById('kit-modal-body');
    const titleEl = document.getElementById('kit-modal-title');

    if (!modal || !bodyEl || !titleEl) return;

    titleEl.textContent = item.name;
    const docMatch = this.docMatcher.matchRequirements(item.documents || []);
    const office = OFFICES_DATA[item.id] || null;

    bodyEl.innerHTML = `
      <div class="kit-header-summary">
        <div class="kit-summary-label">What Sahara Understood</div>
        <div class="kit-summary-text">${understandingText}</div>
        <div style="font-size:11px; color:var(--sahara-text-secondary); margin-top:6px;">
          Applicability: <strong>${item.stateApplicability || 'All India'}</strong> • Processing: <strong>${item.processingTimeline || '15-30 days'}</strong>
        </div>
      </div>

      <div class="kit-section">
        <h3 class="kit-section-title">🔍 Eligibility</h3>
        <p style="font-size:0.875rem; color:var(--sahara-text-secondary);">
          You may be eligible based on the information provided:
        </p>
        <div style="background:var(--sahara-surface-elevated); border:1px solid rgba(0,0,0,0.08); padding:12px; border-radius:6px; margin-top:6px; font-size:0.85rem;">
          ${item.eligibility ? item.eligibility.criteria : 'Standard citizen criteria apply.'}
          <div style="font-size:11px; color:#b45309; margin-top:4px;">
            ⚠️ ${item.eligibility ? item.eligibility.verificationNote : 'Subject to official scrutiny.'}
          </div>
        </div>
      </div>

      <div class="kit-section">
        <h3 class="kit-section-title">📁 Documents You May Need (${docMatch.available.length}/${docMatch.total} Available)</h3>
        <div class="doc-matching-list">
          ${docMatch.available.map(d => `
            <div class="doc-item">
              <div class="doc-info">
                <span class="doc-name">${d.name}</span>
                <span class="doc-reason">${d.reason}</span>
              </div>
              <span class="doc-status-badge available">✅ Available</span>
            </div>
          `).join('')}

          ${docMatch.missing.map(d => `
            <div class="doc-item">
              <div class="doc-info">
                <span class="doc-name">${d.name}</span>
                <span class="doc-reason">${d.reason}</span>
              </div>
              <span class="doc-status-badge missing">❌ Missing</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="verification-box">
        <div style="font-weight:600; font-size:0.85rem; color:#b45309;">
          ⚖️ Verification & Official Approval Requirements
        </div>
        <div class="verification-tag-list">
          ${item.verification && item.verification.signatureRequired ? `<span class="verification-tag">✍️ Signature Required</span>` : ''}
          ${item.verification && item.verification.physicalVisitRequired ? `<span class="verification-tag">📍 Physical Visit Required</span>` : `<span class="verification-tag" style="background:rgba(34,197,94,0.15); color:#15803d;">💻 100% Online Available</span>`}
          <span class="verification-tag">🏛️ Official Verification</span>
        </div>
        <p style="font-size:11px; color:var(--sahara-text-secondary); margin-top:6px;">
          ${item.verification ? item.verification.physicalVisitDesc : 'Verification specified by the authority.'}
        </p>
      </div>

      ${item.forms && item.forms.length > 0 ? `
        <div class="kit-section">
          <h3 class="kit-section-title">📄 Official Forms & Printouts</h3>
          <p style="font-size:12px; color:var(--sahara-text-secondary); margin-bottom:8px;">
            Official printable application forms sourced directly from official government portals:
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
                      Official issuing authority: <strong>${item.officialSource || 'Govt of India'}</strong>
                    </div>
                  </div>
                  <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                    <a href="${f.officialUrl || item.officialPortal}" target="_blank" rel="noopener noreferrer" class="route-btn primary" style="padding:6px 14px; font-size:11px; text-decoration:none; margin-top:0; display:inline-flex; align-items:center; gap:5px;">
                      <span>📥 Download Official Form from Official Website</span> <span>↗</span>
                    </a>
                    <button class="route-btn secondary" style="padding:6px 12px; font-size:11px; margin-top:0;" onclick="window.saharaApp.printOfficialForm('${item.id}', '${f.formNumber}')">
                      🖨️ Official Printout
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
          <h3 class="kit-section-title">✍️ Filled-Form Demonstration</h3>
          <div class="demo-form-container">
            <div class="demo-banner">${item.filledDemo.disclaimer}</div>
            <div style="font-weight:600; font-size:13px; margin-bottom:8px; color:#18181b;">${item.filledDemo.title}</div>
            <div class="demo-field-grid">
              ${item.filledDemo.fields.map(fld => `
                <div class="demo-field">
                  <div class="demo-field-label">${fld.label}</div>
                  <div class="demo-field-value">${fld.value}</div>
                  <div class="demo-field-tip">💡 What goes here: ${fld.tip}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}

      ${item.tutorial && item.tutorial.length > 0 ? `
        <div class="kit-section">
          <h3 class="kit-section-title">📖 Step-by-Step Instructions</h3>
          <div style="display:flex; flex-direction:column; gap:8px;">
            ${item.tutorial.map(t => `
              <div style="display:flex; gap:10px; background:var(--sahara-surface-elevated); padding:8px 12px; border-radius:6px;">
                <div style="font-weight:700; color:var(--sahara-accent); font-size:0.85rem;">${t.step}.</div>
                <div>
                  <div style="font-weight:600; font-size:0.85rem; color:var(--sahara-text-primary);">${t.title}</div>
                  <div style="font-size:0.75rem; color:var(--sahara-text-secondary); margin-top:2px;">${t.desc}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${secondaryScheme ? `
        <div class="kit-section" style="border:1px solid rgba(139,92,246,0.25); background:rgba(139,92,246,0.06); border-radius:6px; padding:12px;">
          <h3 class="kit-section-title" style="color:#7c3aed;">🎁 Relevant Welfare Scheme: ${secondaryScheme.name}</h3>
          <p style="font-size:0.85rem; color:var(--sahara-text-primary);"><strong>Benefit:</strong> ${secondaryScheme.benefits}</p>
        </div>
      ` : ''}

      <div class="kit-section">
        <h3 class="kit-section-title">🚀 Where to Apply</h3>
        <div class="action-route-grid">
          ${item.onlineAvailable ? `
            <div class="route-card">
              <div>
                <div style="font-weight:600; color:#0284c7; font-size:0.85rem;">APPLY ONLINE</div>
                <div style="font-size:11px; color:var(--sahara-text-muted); margin-top:4px;">Official Portal: ${item.officialSource}</div>
              </div>
              <a href="${item.officialPortal}" target="_blank" rel="noopener noreferrer" class="route-btn primary">Open Official Portal ↗</a>
            </div>
          ` : ''}

          ${office ? `
            <div class="route-card">
              <div>
                <div style="font-weight:600; color:#d97706; font-size:0.85rem;">VISIT OFFICE</div>
                <div style="font-size:11px; color:var(--sahara-text-primary); margin-top:4px;">${office.officeName}</div>
                <div style="font-size:10px; color:var(--sahara-text-muted);">${office.address}</div>
              </div>
              <a href="https://maps.google.com/?q=${encodeURIComponent(office.mapsQuery)}" target="_blank" rel="noopener noreferrer" class="route-btn secondary">Directions ↗</a>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="kit-section">
        <h3 class="kit-section-title">☑️ Are You Ready? (Checklist)</h3>
        <div class="printable-checklist">
          ${item.verification && item.verification.checklistItems ? item.verification.checklistItems.map(itemText => `
            <label class="checklist-item">
              <input type="checkbox" class="checklist-checkbox" checked />
              <span>${itemText}</span>
            </label>
          `).join('') : `
            <label class="checklist-item">
              <input type="checkbox" class="checklist-checkbox" checked />
              <span>Application Form completed and signed</span>
            </label>
          `}
        </div>
        <button class="route-btn secondary" style="width:100%; margin-top:8px; display:inline-flex; align-items:center; justify-content:center; gap:8px;" onclick="window.saharaApp.printChecklistPoints(window.saharaApp.activeService)">
          <span>🖨️</span> <span>Download / Print Checklist (Points Only)</span>
        </button>
      </div>

      <div style="padding-top:10px; border-top:1px solid rgba(0,0,0,0.08); font-size:11px; color:var(--sahara-text-muted); display:flex; justify-content:space-between;">
        <span>Source: ${item.officialSource || 'Govt of India'}</span>
        <span>Verified: ${item.lastVerified || '2026-03-01'}</span>
      </div>
    `;

    this.openModal(modal);
    this.speech.speak(`Here is your application kit for ${item.name}.`);
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
        const text = searchInput 
          ? `Searching Sahara for: ${searchInput}. Citizen guidance engine is ready.` 
          : `Sahara guidance prompt: ${tickerText}. Type or speak your question to begin.`;
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
      const docs = (s.documents || []).map(d => d.name).join(', ');
      return `Application Kit for ${s.name}. Issued by ${s.officialSource || 'Government of India'}. Required documents are: ${docs}. Eligibility: ${s.eligibility ? s.eligibility.criteria : 'Standard criteria apply'}. Processing timeline is ${s.processingTimeline || '15 to 30 days'}.`;
    });

    registerModalSpeaker('vault-modal-speaker-btn', () => {
      return 'My Documents Vault. Sahara securely tracks your uploaded government proofs such as Aadhaar, PAN, and Voter ID, and highlights citizen services you can apply for immediately.';
    });

    registerModalSpeaker('life-events-modal-speaker-btn', () => {
      return 'What are you trying to do? Browse citizen life situations such as baby born, turned 18, retired, starting a business, or lost documents to get customized step-by-step guidance.';
    });

    registerModalSpeaker('services-modal-speaker-btn', () => {
      return 'Services you might be looking for. Browse official government certificates, welfare schemes, pensions, driving licences, and business registrations.';
    });

    registerModalSpeaker('tracker-modal-speaker-btn', () => {
      return 'Application Status and Delay Tracker. Track any application reference number across central and state portals, check guaranteed delivery days under Citizen Charters, and file statutory delay complaints.';
    });

    registerModalSpeaker('smart-q-speaker-btn', () => {
      const title = document.getElementById('smart-q-title')?.textContent || 'Sahara guidance question.';
      const options = Array.from(document.querySelectorAll('#smart-q-options button')).map(b => b.textContent).join(', or ');
      return `${title}. Your choices are: ${options}`;
    });

    registerModalSpeaker('ambiguity-speaker-btn', () => {
      const options = Array.from(document.querySelectorAll('#ambiguity-content-area .route-card')).map(b => b.querySelector('div')?.textContent || '').join(', or ');
      return `Did you mean one of these services? ${options}`;
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

    const checklistItems = (s.verification && s.verification.checklistItems) 
      ? s.verification.checklistItems 
      : ['Signed official application form', 'Valid proof of identity', 'Valid proof of address'];

    target.innerHTML = `
      <div class="print-points-title">SAHARA CITIZEN DOCUMENT CHECKLIST</div>
      <div class="print-meta-row">
        <strong>Service:</strong> ${s.name}<br>
        <strong>Authority:</strong> ${s.officialSource || 'Government of India'} &bull; 
        <strong>Timeline:</strong> ${s.processingTimeline || '15-30 days'} &bull; 
        <strong>Official Fee:</strong> ${s.fees || 'As prescribed by government'}
      </div>

      <div class="print-section-heading">1. Required Documents to Carry (Originals + Photocopies)</div>
      <ul class="print-points-list">
        ${(s.documents || []).map(d => `
          <li class="print-point-item">
            <span class="print-point-checkbox"></span>
            <div>
              <strong>${d.name}</strong> ${d.mandatory ? '(Mandatory)' : '(Optional)'}<br>
              <span style="font-size:10pt; color:#444;">Purpose: ${d.reason}</span>
            </div>
          </li>
        `).join('')}
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
          ${s.tutorial.map(t => `
            <li class="print-point-item">
              <span style="font-weight:bold; min-width:20px;">${t.step}.</span>
              <div>
                <strong>${t.title}</strong>: ${t.desc}
              </div>
            </li>
          `).join('')}
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

    target.innerHTML = `
      <div style="border: 2px solid #000; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 16px;">
          <h2 style="margin: 0; text-transform: uppercase; font-size: 16pt;">${s.officialSource || 'GOVERNMENT OF INDIA'}</h2>
          <h3 style="margin: 4px 0; font-size: 14pt;">OFFICIAL APPLICATION PRINT - ${formNumber || 'FORM'}</h3>
          <p style="margin: 0; font-size: 10pt; color: #555;">Application under Statutory Public Service Rules &bull; Source Portal: ${s.officialPortal || 'services.india.gov.in'}</p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div style="font-size: 11pt; line-height: 1.6;">
            <strong>Service Name:</strong> ${s.name}<br>
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
          ${(s.documents || []).map(d => `<li>[ &nbsp; ] Self-Attested Photocopy of <strong>${d.name}</strong></li>`).join('')}
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
