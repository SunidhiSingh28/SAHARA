/**
 * SAHARA Speech Engine
 * Natural voice recognition (STT) and voice feedback (TTS) using Web Speech API with graceful fallback.
 */

import { i18n } from './i18n.js';

export class SaharaSpeech {
  constructor(callbacks = {}) {
    this.callbacks = callbacks; // onListeningStart, onListeningEnd, onTranscript, onSpeakingStart, onSpeakingEnd, onError
    this.recognition = null;
    this.synthesis = window.speechSynthesis || null;
    this.isListening = false;
    this.isSpeaking = false;
    this.lastSpokenText = '';

    this.initRecognition();
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('SAHARA: Speech Recognition API not available in this browser.');
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        if (this.callbacks.onListeningStart) this.callbacks.onListeningStart();
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const currentText = finalTranscript || interimTranscript;
        if (this.callbacks.onTranscript) {
          this.callbacks.onTranscript(currentText, Boolean(finalTranscript));
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('SAHARA Speech Recognition Error:', event.error);
        this.isListening = false;
        if (this.callbacks.onError) this.callbacks.onError(event.error);
        if (this.callbacks.onListeningEnd) this.callbacks.onListeningEnd();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.callbacks.onListeningEnd) this.callbacks.onListeningEnd();
      };
    } catch (e) {
      console.warn('SpeechRecognition initialization failed:', e);
    }
  }

  isSpeechRecognitionSupported() {
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  startListening() {
    if (!this.recognition) {
      if (this.callbacks.onError) this.callbacks.onError('not_supported');
      return false;
    }

    if (this.isSpeaking) {
      this.stopSpeaking();
    }

    try {
      const currentLang = i18n.getCurrentLanguageObj();
      this.recognition.lang = currentLang.voiceLang || 'en-IN';
      this.recognition.start();
      return true;
    } catch (err) {
      console.warn('Error starting speech recognition:', err);
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
  }

  speak(text) {
    if (!this.synthesis || !text) return;

    this.stopSpeaking();
    this.lastSpokenText = text;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      const currentLang = i18n.getCurrentLanguageObj();
      utterance.lang = currentLang.voiceLang || 'en-IN';
      utterance.rate = 0.95; // Clear and accessible pace

      // Try selecting an Indian voice if present
      const voices = this.synthesis.getVoices();
      const matchVoice = voices.find(v => v.lang.includes('IN') || v.lang.startsWith(currentLang.code));
      if (matchVoice) {
        utterance.voice = matchVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (this.callbacks.onSpeakingStart) this.callbacks.onSpeakingStart(text);
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (this.callbacks.onSpeakingEnd) this.callbacks.onSpeakingEnd();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        if (this.callbacks.onSpeakingEnd) this.callbacks.onSpeakingEnd();
      };

      this.synthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis error:', err);
    }
  }

  replay() {
    if (this.lastSpokenText) {
      this.speak(this.lastSpokenText);
    }
  }

  stopSpeaking() {
    if (this.synthesis && (this.synthesis.speaking || this.synthesis.pending)) {
      this.synthesis.cancel();
      this.isSpeaking = false;
      if (this.callbacks.onSpeakingEnd) this.callbacks.onSpeakingEnd();
    }
  }
}
