/**
 * SAHARA Multi-Language (i18n) Engine
 * Extended support for 13 broad Indian languages.
 * Language applies globally to interface text, speech synthesis, and guidance.
 */

import { SAHARA_CONFIG } from './config.js';

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', voiceLang: 'en-IN' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', voiceLang: 'hi-IN' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', voiceLang: 'mr-IN' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', voiceLang: 'bn-IN' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', voiceLang: 'ta-IN' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', voiceLang: 'te-IN' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', voiceLang: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', voiceLang: 'ml-IN' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', voiceLang: 'gu-IN' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', voiceLang: 'pa-IN' },
  { code: 'ur', name: 'Urdu', native: 'اردو', voiceLang: 'ur-IN' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', voiceLang: 'or-IN' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', voiceLang: 'as-IN' },
];

const TRANSLATIONS = {
  en: {
    heroTitle: 'What do you want?',
    inputPlaceholder: 'What do you want?',
    listening: 'Listening to you...',
    speaking: 'Sahara is speaking...',
    stopVoice: 'Stop',
    replayVoice: 'Listen again',
    voiceFallback: 'Voice recognition unavailable. You can type naturally instead.',
    opt1Title: 'Document Upload',
    opt1Subtitle: 'Upload and manage your personal documents',
    opt2Title: 'What are you trying to do?',
    opt2Subtitle: 'Tell us what’s happening and find relevant government services',
    opt3Title: 'Services you might be looking for',
    opt3Subtitle: 'Explore services that may be relevant to you',
    tickerPrefix: 'Try:',
    trackApplication: 'Track Application',
    vaultTitle: 'My Documents Vault',
    uploadMockBtn: 'Add Sample Document',
    smartQuestionLabel: 'Question for you',
    yes: 'YES',
    no: 'NO',
    back: 'Back',
    close: 'Close',
    applyOnline: 'Apply Online',
    visitOffice: 'Visit Office',
    verificationRequired: 'Verification Required',
    documentsNeeded: 'Documents You May Need',
    available: 'Available in Vault',
    missing: 'Missing — Needs Preparation',
    demoBanner: 'DEMO ONLY — This example uses fictional information and must not be submitted as an actual application.',
    tutorialTitle: 'How to Do This',
    finalChecklist: 'Verification & Final Checklist',
    downloadChecklist: 'Download Complete Checklist',
    officialSource: 'Official Source',
    lastVerified: 'Last Verified',
    beyondTimelineWarning: 'This application may be beyond the published processing timeline.',
    officialGrievanceRoutes: 'Official Escalation & Grievance Routes'
  },
  hi: {
    heroTitle: 'आप क्या करना चाहते हैं?',
    inputPlaceholder: 'आप क्या करना चाहते हैं?',
    listening: 'सहारा सुन रहा है...',
    speaking: 'सहारा बोल रहा है...',
    stopVoice: 'रोकें',
    replayVoice: 'पुनः सुनें',
    voiceFallback: 'वॉइस इनपुट उपलब्ध नहीं है। आप सीधे टाइप कर सकते हैं।',
    opt1Title: 'दस्तावेज़ अपलोड',
    opt1Subtitle: 'अपने व्यक्तिगत दस्तावेज़ सुरक्षित रखें और प्रबंधित करें',
    opt2Title: 'आप क्या करने का प्रयास कर रहे हैं?',
    opt2Subtitle: 'अपनी स्थिति बताएं और प्रासंगिक सरकारी सेवाएं खोजें',
    opt3Title: 'सेवाएं जिनकी आपको आवश्यकता हो सकती है',
    opt3Subtitle: 'आपके लिए उपयोगी सेवाओं का अन्वेषण करें',
    tickerPrefix: 'सुझाव:',
    trackApplication: 'आवेदन ट्रैक करें',
    vaultTitle: 'मेरे दस्तावेज़ (वॉल्ट)',
    uploadMockBtn: 'नमूना दस्तावेज़ जोड़ें',
    smartQuestionLabel: 'सहारा का स्पष्टीकरण प्रश्न',
    yes: 'हाँ',
    no: 'नहीं',
    back: 'पीछे',
    close: 'बंद करें',
    applyOnline: 'ऑनलाइन आवेदन करें',
    visitOffice: 'कार्यालय जाएं',
    verificationRequired: 'सत्यापन आवश्यक',
    documentsNeeded: 'आवश्यक दस्तावेज़',
    available: 'वॉल्ट में उपलब्ध',
    missing: 'अनुपलब्ध — तैयार करें',
    demoBanner: 'केवल डेमो — यह उदाहरण काल्पनिक जानकारी पर आधारित है। इसे वास्तविक आवेदन के रूप में प्रस्तुत न करें।',
    tutorialTitle: 'यह प्रक्रिया कैसे पूरी करें',
    finalChecklist: 'सत्यापन और अंतिम चेकलिस्ट',
    downloadChecklist: 'पूरी चेकलिस्ट डाउनलोड करें',
    officialSource: 'आधिकारिक स्रोत',
    lastVerified: 'अंतिम सत्यापन',
    beyondTimelineWarning: 'यह आवेदन आधिकारिक प्रकाशित समय सीमा से अधिक समय से लंबित है।',
    officialGrievanceRoutes: 'आधिकारिक शिकायत एवं निवारण माध्यम'
  },
  mr: {
    heroTitle: 'तुम्हाला काय करायचे आहे?',
    inputPlaceholder: 'तुम्हाला काय करायचे आहे?',
    listening: 'सहारा ऐकत आहे...',
    speaking: 'सहारा बोलत आहे...',
    stopVoice: 'थांबवा',
    replayVoice: 'पुन्हा ऐका',
    voiceFallback: 'आवाज ओळख उपलब्ध नाही. तुम्ही सहज टाईप करू शकता.',
    opt1Title: 'कागदपत्रे अपलोड',
    opt1Subtitle: 'तुमची वैयक्तिक कागदपत्रे व्यवस्थापित करा',
    opt2Title: 'तुम्ही काय करू इच्छिता?',
    opt2Subtitle: 'तुमची परिस्थिती सांगा आणि संबंधित सरकारी सेवा शोधा',
    opt3Title: 'तुम्हाला हव्या असणाऱ्या सेवा',
    opt3Subtitle: 'तुमच्यासाठी उपयुक्त सेवा पहा',
    tickerPrefix: 'उदा.:',
    trackApplication: 'अर्ज ट्रॅक करा',
    vaultTitle: 'माझी कागदपत्रे',
    uploadMockBtn: 'नमुना कागदपत्र जोडा',
    smartQuestionLabel: 'सहाराचा प्रश्न',
    yes: 'होय',
    no: 'नाही',
    back: 'मागे',
    close: 'बंद करा',
    applyOnline: 'ऑनलाईन अर्ज करा',
    visitOffice: 'कार्यालयात भेट द्या',
    verificationRequired: 'पडताळणी आवश्यक',
    documentsNeeded: 'आवश्यक कागदपत्रे',
    available: 'उपलब्ध',
    missing: 'अपूर्ण — आवश्यक',
    demoBanner: 'केवळ प्रात्यक्षिकासाठी — हे उदाहरण काल्पनिक आहे. प्रत्यक्ष अर्जासाठी वापरू नये.',
    tutorialTitle: 'अर्ज कसा करावा',
    finalChecklist: 'अंतिम चेकलिस्ट',
    downloadChecklist: 'चेकलिस्ट डाउनलोड करा',
    officialSource: 'अधिकृत स्रोत',
    lastVerified: 'शेवटची पडताळणी',
    beyondTimelineWarning: 'हा अर्ज अधिकृत दिलेल्या कालावधीपेक्षा जास्त प्रलंबित असू शकतो.',
    officialGrievanceRoutes: 'अधिकृत तक्रार निवारण मार्ग'
  },
  bn: {
    heroTitle: 'আপনি কী করতে চান?',
    inputPlaceholder: 'আপনি কী করতে চান?',
    listening: 'সাহারা শুনছে...',
    speaking: 'সাহারা বলছে...',
    stopVoice: 'থামুন',
    replayVoice: 'আবার শুনুন',
    voiceFallback: 'ভয়েস উপলব্ধ নেই। আপনি টাইপ করতে পারেন।',
    opt1Title: 'নথি আপলোড',
    opt1Subtitle: 'আপনার ব্যক্তিগত নথি পরিচালনা করুন',
    opt2Title: 'আপনি কী করার চেষ্টা করছেন?',
    opt2Subtitle: 'আপনার পরিস্থিতি বলুন এবং পরিষেবা সন্ধান করুন',
    opt3Title: 'যেসব পরিষেবা আপনার প্রয়োজন হতে পারে',
    opt3Subtitle: 'প্রাসঙ্গিক সরকারি পরিষেবা দেখুন',
    tickerPrefix: 'চেষ্টা করুন:',
    trackApplication: 'ট্র্যাক করুন',
    vaultTitle: 'আমার নথি',
    uploadMockBtn: 'নমুনা নথি যোগ করুন',
    smartQuestionLabel: 'সাহারার প্রশ্ন',
    yes: 'হ্যাঁ',
    no: 'না',
    back: 'পেছনে',
    close: 'বন্ধ করুন',
    applyOnline: 'অনলাইনে আবেদন করুন',
    visitOffice: 'অফিসে যান',
    verificationRequired: 'যাচাইকরণ প্রয়োজন',
    documentsNeeded: 'প্রয়োজনীয় নথি',
    available: 'উপলব্ধ',
    missing: 'অনুপস্থিত',
    demoBanner: 'ডেমো মাত্র — কাল্পনিক তথ্য।',
    tutorialTitle: 'কীভাবে করবেন',
    finalChecklist: 'চূড়ান্ত চেকলিস্ট',
    downloadChecklist: 'চেকলিস্ট ডাউনলোড করুন',
    officialSource: 'অফিসিয়াল উৎস',
    lastVerified: 'সর্বশেষ যাচাইকৃত',
    beyondTimelineWarning: 'আবেদনটি অফিসিয়াল সময়সীমা অতিক্রম করেছে।',
    officialGrievanceRoutes: 'অভিযোগ প্রতিকার পথ'
  },
  ta: {
    heroTitle: 'உங்களுக்கு என்ன வேண்டும்?',
    inputPlaceholder: 'உங்களுக்கு என்ன வேண்டும்?',
    listening: 'சஹாரா கேட்கிறது...',
    speaking: 'சஹாரா பேசுகிறது...',
    stopVoice: 'நிறுத்து',
    replayVoice: 'மீண்டும் கேள்',
    voiceFallback: 'குரல் உள்ளீடு கிடைக்கவில்லை. தட்டச்சு செய்யவும்.',
    opt1Title: 'ஆவண பதிவேற்றம்',
    opt1Subtitle: 'உங்கள் ஆவணங்களை நிர்வகிக்கவும்',
    opt2Title: 'நீங்கள் என்ன செய்ய முயற்சிக்கிறீர்கள்?',
    opt2Subtitle: 'உங்கள் சூழலை விவரிக்கவும்',
    opt3Title: 'தேவையான சேவைகள்',
    opt3Subtitle: 'பயனுள்ள அரசு சேவைகளை ஆராயுங்கள்',
    tickerPrefix: 'முயற்சிக்க:',
    trackApplication: 'விண்ணப்பத்தை கண்காணிக்கவும்',
    vaultTitle: 'எனது ஆவணங்கள்',
    uploadMockBtn: 'மாதிரி ஆவணத்தைச் சேர்க்கவும்',
    smartQuestionLabel: 'சஹாரா கேள்வி',
    yes: 'ஆம்',
    no: 'இல்லை',
    back: 'பின்செல்',
    close: 'மூடு',
    applyOnline: 'ஆன்லைனில் விண்ணப்பிக்கவும்',
    visitOffice: 'அலுவலகத்திற்குச் செல்லவும்',
    verificationRequired: 'சரிபார்ப்பு தேவை',
    documentsNeeded: 'தேவையான ஆவணங்கள்',
    available: 'கிடைக்கிறது',
    missing: 'இல்லை',
    demoBanner: 'மாதிரி மட்டுமே — கற்பனைத் தகவல்.',
    tutorialTitle: 'எப்படி செய்வது',
    finalChecklist: 'சரிபார்ப்பு பட்டியல்',
    downloadChecklist: 'பட்டியலை பதிவிறக்கவும்',
    officialSource: 'அதிகாரப்பூர்வ ஆதாரம்',
    lastVerified: 'கடைசியாக சரிபார்க்கப்பட்டது',
    beyondTimelineWarning: 'காலக்கெடுவைத் தாண்டியது.',
    officialGrievanceRoutes: 'குறைதீர்ப்பு வழிகள்'
  }
};

let currentLangCode = localStorage.getItem(SAHARA_CONFIG.storageKeys.language) || 'en';

export const i18n = {
  getCurrentLanguage() {
    return currentLangCode;
  },

  getCurrentLanguageObj() {
    return LANGUAGES.find(l => l.code === currentLangCode) || LANGUAGES[0];
  },

  setLanguage(code) {
    if (LANGUAGES.some(l => l.code === code)) {
      currentLangCode = code;
      localStorage.setItem(SAHARA_CONFIG.storageKeys.language, code);
      document.documentElement.lang = code;
      return true;
    }
    return false;
  },

  t(key) {
    const dict = TRANSLATIONS[currentLangCode] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  },

  getAllLanguages() {
    return LANGUAGES;
  }
};
