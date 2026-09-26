/**
 * SAHARA Citizen Services Master Dataset
 * Structured records following official Indian government citizen services criteria.
 * Complete isolation between services: Each service possesses its own distinct structured
 * records, forms, instructions, checklists, and multilingual translations (English, Hindi, Marathi).
 */

export const SERVICES_DATA = [
  {
    id: 'aadhaar-card',
    name: 'Aadhaar Card (UIDAI Unique Identification Authority of India)',
    name_hi: 'आधार कार्ड (UIDAI विशिष्ट पहचान प्राधिकरण)',
    name_mr: 'आधार कार्ड (UIDAI भारतीय विशिष्ट ओळख प्राधिकरण)',
    type: 'service',
    category: 'cat-identity',
    description: '12-digit unique citizen identification number issued by UIDAI, serving as statutory proof of identity and address across India.',
    description_hi: 'यूआईडीएआई (UIDAI) द्वारा जारी 12-अंकों का विशिष्ट पहचान क्रमांक, जो पूरे भारत में पहचान एवं पते का वैधानिक प्रमाण है।',
    description_mr: 'UIDAI द्वारे जारी केलेला १२ अंकी अद्वितीय ओळख क्रमांक, जो संपूर्ण भारतात ओळख आणि पत्त्याचा वैधानिक पुरावा आहे.',
    keywords: [
      'aadhaar', 'aadhar', 'adhar', 'uidai', 'uid', 'eaadhaar', 'e-aadhaar', 'adhar card', 
      'aadhar card', 'aadhaar card', 'my aadhaar', 'myaadhaar', 'biometric', 'update aadhaar',
      'aadhaar enrollment', 'aadhaar enrolment', 'aadhaar card download', 'duplicate aadhaar',
      'lost aadhaar', 'aadhaar mobile link', 'aadhaar address update', 'आधार', 'आधार कार्ड'
    ],
    aliases: ['Aadhaar Card', 'UIDAI', 'Aadhar Card', 'e-Aadhaar', 'UID', 'Adhar Card', 'आधार कार्ड', 'आधार'],
    exampleQueries: [
      'I want to apply for Aadhaar card',
      'Aadhar card update',
      'Aadhaar lost duplicate download',
      'Aadhar enrollment',
      'Update phone number in Aadhaar',
      'aadhar',
      'aadhaar',
      'adhar',
      'aadhar card',
      'aadhaar card',
      'mujhe aadhar banana hai',
      'आधार कार्ड'
    ],
    lifeEvents: ['baby-born', 'turned-18', 'moved-city', 'lost-doc'],
    stateApplicability: 'All States & Union Territories (UIDAI - Govt of India)',
    eligibility: {
      criteria: 'Any individual residing in India for 182 days or more in the preceding 12 months, of any age (including newborns).',
      criteria_hi: 'भारत में पिछले 12 महीनों में 182 दिन या उससे अधिक समय से रहने वाला कोई भी व्यक्ति, किसी भी उम्र का (नवजात शिशु सहित)।',
      criteria_mr: 'गेल्या १२ महिन्यांत १८२ दिवस किंवा त्याहून अधिक काळ भारतात वास्तव्यास असलेली कोणतीही व्यक्ती, कोणत्याही वयाची (नवजात बालकांसह).',
      verificationNote: 'Requires biometric capture (fingerprints, iris scan, facial photograph) at an authorized Aadhaar Seva Kendra / Enrolment Center.',
      verificationNote_hi: 'अधिकृत आधार सेवा केंद्र पर बायोमेट्रिक (उंगलियों के निशान, आईरिस स्कैन, फोटो) अनिवार्य है।',
      verificationNote_mr: 'अधिकृत आधार सेवा केंद्रावर बायोमेट्रिक (बोटांचे ठसे, डोळ्यांचे स्कॅन, छायाचित्र) पडताळणी आवश्यक आहे.'
    },
    questions: [
      {
        id: 'aadhaar_status',
        question: 'Do you already possess an Aadhaar number?',
        question_hi: 'क्या आपके पास पहले से आधार नंबर है?',
        question_mr: 'तुमच्याकडे आधीपासून आधार क्रमांक आहे का?',
        options: [
          { label: 'No, this is a fresh enrolment', label_hi: 'नहीं, यह नया नामांकन है', label_mr: 'नाही, ही नवीन नोंदणी आहे', value: 'new' },
          { label: 'Yes, need mobile / address / biometric update', label_hi: 'हाँ, मोबाइल / पता / बायोमेट्रिक अपडेट करना है', label_mr: 'होय, मोबाईल / पत्ता / बायोमेट्रिक अपडेट करायचे आहे', value: 'correction' },
          { label: 'Yes, but lost card / need reprint & download', label_hi: 'हाँ, लेकिन कार्ड खो गया है / पुनर्मुद्रण चाहिए', label_mr: 'होय, पण कार्ड गहाळ झाले आहे / पुनर्प्रत हवी आहे', value: 'replacement' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-poi',
        name: 'Proof of Identity (PoI) (Passport / PAN / Voter ID / Ration Card / School ID)',
        name_hi: 'पहचान का प्रमाण (पासपोर्ट / पैन / वोटर कार्ड / राशन कार्ड)',
        name_mr: 'ओळखीचा पुरावा (पासपोर्ट / पॅन / मतदान ओळखपत्र / रेशन कार्ड)',
        reason: 'Mandatory statutory verification of legal name and photograph',
        reason_hi: 'कानूनी नाम और तस्वीर का वैधानिक सत्यापन',
        reason_mr: 'कायदेशीर नाव आणि छायाचित्राची वैधानिक पडताळणी',
        mandatory: true,
        originalRequired: true,
        matchKey: 'PAN Card'
      },
      {
        id: 'doc-poa',
        name: 'Proof of Address (PoA) (Electricity Bill / Water Bill / Bank Passbook / Rent Agreement)',
        name_hi: 'पते का प्रमाण (बिजली बिल / पानी बिल / बैंक पासबुक / किराया समझौता)',
        name_mr: 'पत्त्याचा पुरावा (वीज बिल / पाणी बिल / बँक पासबुक / भाडे करार)',
        reason: 'Statutory verification of resident address for Aadhaar postal delivery',
        reason_hi: 'आधार डाक वितरण हेतु निवासी पते का सत्यापन',
        reason_mr: 'आधार पोस्टाद्वारे पोहोचण्यासाठी निवासी पत्त्याची पडताळणी',
        mandatory: true,
        originalRequired: true,
        matchKey: 'Address Proof (Electricity Bill)'
      },
      {
        id: 'doc-dob',
        name: 'Date of Birth (DoB) Proof (Birth Certificate / 10th Marksheet / Passport)',
        name_hi: 'जन्म तिथि का प्रमाण (जन्म प्रमाण पत्र / 10वीं की अंकतालिका / पासपोर्ट)',
        name_mr: 'जन्मतारखेचा पुरावा (जन्म दाखला / १० वी गुणपत्रिका / पासपोर्ट)',
        reason: 'Mandatory verification to establish verified date of birth',
        reason_hi: 'सत्यापित जन्म तिथि स्थापित करने हेतु आवश्यक',
        reason_mr: 'पडताळणीकृत जन्मतारीख निश्चित करण्यासाठी आवश्यक',
        mandatory: true,
        originalRequired: true,
        matchKey: 'Birth Certificate'
      }
    ],
    forms: [
      {
        formNumber: 'Aadhaar Enrolment / Update Form',
        title: 'UIDAI Aadhaar Enrolment & Correction Application Form',
        officialUrl: 'https://myaadhaar.uidai.gov.in',
        printablePdf: 'assets/forms/aadhaar_enrolment_form.pdf'
      }
    ],
    filledDemo: {
      title: 'Aadhaar Enrolment / Update Demo Application',
      disclaimer: 'DEMO ONLY — This example uses fictional information and must not be submitted as an actual application.',
      fields: [
        { label: 'Enrolment Type', value: 'Fresh Enrolment / Update', tip: 'Select Enrolment or Update' },
        { label: 'Resident Status', value: 'Resident Indian', tip: 'Must be residing in India >= 182 days' },
        { label: 'Full Legal Name', value: 'Sunidhi Sharma', tip: 'Matches Proof of Identity exactly' },
        { label: 'Gender & DOB', value: 'Female • 15/08/2004 (Verified)', tip: 'Requires supporting DoB proof' },
        { label: 'Address', value: 'Flat 302, Green Meadows, MG Road, Pune, Maharashtra - 411001', tip: 'Current residential address' },
        { label: 'Mobile Number', value: '+91 98765 XXXXX', tip: 'Mandatory for OTP and mAadhaar access' }
      ]
    },
    tutorial: [
      {
        step: 1,
        title: 'Locate Aadhaar Seva Kendra',
        title_hi: 'आधार सेवा केंद्र खोजें',
        title_mr: 'आधार सेवा केंद्र शोधा',
        desc: 'Visit myaadhaar.uidai.gov.in and book an appointment at your nearest Aadhaar Seva Kendra or post office.',
        desc_hi: 'myaadhaar.uidai.gov.in पर जाएं और अपने नजदीकी आधार सेवा केंद्र या डाकघर में समय बुक करें।',
        desc_mr: 'myaadhaar.uidai.gov.in वर जा आणि जवळच्या आधार सेवा केंद्रात किंवा टपाल कार्यालयात वेळ निश्चित करा.'
      },
      {
        step: 2,
        title: 'Prepare Original Documents',
        title_hi: 'मूल दस्तावेज़ तैयार रखें',
        title_mr: 'मूळ कागदपत्रे तयार ठेवा',
        desc: 'Gather original Proof of Identity (PoI), Proof of Address (PoA), and Date of Birth proof.',
        desc_hi: 'पहचान का प्रमाण (PoI), पते का प्रमाण (PoA) और जन्म तिथि प्रमाण के मूल दस्तावेज़ साथ लें।',
        desc_mr: 'ओळखीचा पुरावा, पत्त्याचा पुरावा आणि जन्मतारखेचा पुरावा यांची मूळ कागदपत्रे सोबत घ्या.'
      },
      {
        step: 3,
        title: 'Visit Center & Biometric Capture',
        title_hi: 'केंद्र पर जाएं और बायोमेट्रिक दें',
        title_mr: 'केंद्रास भेट द्या आणि बायोमेट्रिक द्या',
        desc: 'Attend your appointment for live photograph, 10-fingerprint scan, and iris capture.',
        desc_hi: 'लाइव फोटो, 10 उंगलियों के फिंगरप्रिंट और आईरिस स्कैन के लिए केंद्र में उपस्थित हों।',
        desc_mr: 'थेट छायाचित्र, १० बोटांचे ठसे आणि डोळ्यांच्या बुबुळांच्या स्कॅनसाठी वेळेवर उपस्थित राहा.'
      },
      {
        step: 4,
        title: 'Collect Enrolment Slip (EID)',
        title_hi: 'नामांकन पर्ची (EID) प्राप्त करें',
        title_mr: 'नोंदणी पावती (EID) मिळवा',
        desc: 'Receive the 28-digit Enrolment ID acknowledgement slip for real-time status tracking.',
        desc_hi: 'ऑनलाइन स्थिति ट्रैक करने के लिए 28 अंकों की नामांकन आईडी (EID) पावती पर्ची लें।',
        desc_mr: 'स्थिती ट्रॅक करण्यासाठी २८ अंकी नोंदणी पावती (EID) सुरक्षित ठेवा.'
      },
      {
        step: 5,
        title: 'Download e-Aadhaar & Speed Post',
        title_hi: 'ई-आधार डाउनलोड एवं डाक प्राप्ति',
        title_mr: 'ई-आधार डाउनलोड आणि टपाल वितरण',
        desc: 'Upon verification within 7-15 days, download your password-protected e-Aadhaar online; physical PVC card is dispatched by India Post.',
        desc_hi: 'सत्यापन के बाद ई-आधार ऑनलाइन डाउनलोड करें; भौतिक पीवीसी कार्ड भारतीय डाक द्वारा भेजा जाएगा।',
        desc_mr: '७-१५ दिवसांत पडताळणी पूर्ण झाल्यावर ई-आधार ऑनलाईन डाउनलोड करा; पीवीसी कार्ड टपालाने पाठवले जाते.'
      }
    ],
    officialSource: 'UIDAI (Unique Identification Authority of India)',
    processingTimeline: '7 - 15 working days',
    physicalVisitRequired: true,
    physicalVisitDesc: 'One-time physical biometric capture required at nearest Aadhaar Seva Kendra / authorized Post Office or Bank branch.',
    physicalVisitDesc_hi: 'नजदीकी आधार सेवा केंद्र / अधिकृत डाकघर या बैंक शाखा में एक बार बायोमेट्रिक सत्यापन आवश्यक है।',
    physicalVisitDesc_mr: 'जवळच्या आधार सेवा केंद्रात किंवा अधिकृत टपाल कार्यालयात एकदा प्रत्यक्ष उपस्थित राहून बायोमेट्रिक देणे आवश्यक आहे.',
    verification: {
      signatureRequired: true,
      physicalVisitRequired: true,
      physicalVisitDesc: 'One-time physical biometric capture required at nearest Aadhaar Seva Kendra / authorized Post Office or Bank branch.',
      physicalVisitDesc_hi: 'नजदीकी आधार सेवा केंद्र / अधिकृत डाकघर या बैंक शाखा में एक बार बायोमेट्रिक सत्यापन आवश्यक है।',
      physicalVisitDesc_mr: 'जवळच्या आधार सेवा केंद्रात किंवा अधिकृत टपाल कार्यालयात एकदा प्रत्यक्ष उपस्थित राहून बायोमेट्रिक देणे आवश्यक आहे.',
      officialVerificationRequired: true,
      checklistItems: [
        'Original Proof of Identity (PoI)',
        'Original Proof of Address (PoA)',
        'Original Date of Birth proof',
        'Appointment confirmation slip (if booked online)'
      ],
      checklistItems_hi: [
        'पहचान का मूल प्रमाण (PoI)',
        'पते का मूल प्रमाण (PoA)',
        'जन्म तिथि का मूल प्रमाण',
        'ऑनलाइन अपॉइंटमेंट पुष्टिकरण पर्ची'
      ],
      checklistItems_mr: [
        'ओळखीचा मूळ पुरावा (PoI)',
        'पत्त्याचा मूळ पुरावा (PoA)',
        'जन्मतारखेचा मूळ पुरावा',
        'ऑनलाईन वेळ निश्चिती पावती'
      ]
    },
    helpline: '1947 (UIDAI Toll-Free 24x7) • help@uidai.gov.in',
    lastVerified: '2026-03-01',
    officialPortal: 'https://myaadhaar.uidai.gov.in',
    fees: 'Free for fresh enrolment; ₹50 for demographic update, ₹100 for biometric update'
  },
  {
    id: 'voter-id',
    name: 'Voter ID (Electors Photo Identity Card - EPIC)',
    name_hi: 'मतदाता पहचान पत्र (वोटर आईडी - EPIC)',
    name_mr: 'मतदान ओळखपत्र (इपिक - EPIC)',
    type: 'service',
    category: 'cat-identity',
    description: 'Official voter identity card issued by the Election Commission of India (ECI) for all eligible citizens aged 18 and above.',
    description_hi: 'भारत निर्वाचन आयोग (ECI) द्वारा 18 वर्ष या उससे अधिक आयु के सभी पात्र नागरिकों के लिए जारी आधिकारिक पहचान पत्र।',
    description_mr: '१८ वर्षे किंवा त्याहून अधिक वयाच्या सर्व पात्र नागरिकांसाठी भारतीय निवडणूक आयोगाद्वारे (ECI) जारी केलेले अधिकृत मतदार ओळखपत्र.',
    keywords: ['voter', 'election', 'vote', 'epic', 'matdan', 'election card', 'voter card', 'form 6', 'voting', 'मतदाता', 'मतदान', 'वोटर'],
    aliases: ['Election Card', 'Matdata Card', 'Form 6 Online', 'EPIC', 'वोटर आईडी', 'मतदान कार्ड'],
    exampleQueries: [
      'I want to make a voter ID',
      'I turned 18 and want to vote',
      'Mujhe voter card banana hai',
      'I need something so I can vote',
      'How to apply for election card',
      'voter id',
      'voter card',
      'election card'
    ],
    lifeEvents: ['turned-18', 'moved-city', 'lost-doc'],
    stateApplicability: 'All States & Union Territories (Election Commission of India)',
    eligibility: {
      criteria: 'Must be an Indian Citizen, aged 18 or above on the qualifying date, and ordinarily resident at the registered address.',
      criteria_hi: 'भारतीय नागरिक होना आवश्यक है, 18 वर्ष या अधिक आयु, और संबंधित पते का सामान्य निवासी होना चाहिए।',
      criteria_mr: 'भारतीय नागरिक असणे आवश्यक, वय १८ किंवा त्याहून अधिक, आणि नोंदणीकृत पत्त्यावर रहिवासी असणे आवश्यक.',
      verificationNote: 'Eligibility is automatically validated against age proof and local BLO (Booth Level Officer) physical verification.',
      verificationNote_hi: 'आयु प्रमाण और स्थानीय बीएलओ (बूथ लेवल ऑफिसर) द्वारा भौतिक सत्यापन किया जाता है।',
      verificationNote_mr: 'वयाचा पुरावा आणि स्थानिक बीएलओ (BLO) अधिकाऱ्यामार्फत प्रत्यक्ष पडताळणी केली जाते.'
    },
    questions: [
      {
        id: 'voter_existing_card',
        question: 'Do you already have a Voter ID card?',
        question_hi: 'क्या आपके पास पहले से वोटर आईडी कार्ड है?',
        question_mr: 'तुमच्याकडे आधीपासून मतदान ओळखपत्र आहे का?',
        options: [
          { label: 'No, this is my first time (Form 6)', label_hi: 'नहीं, पहली बार बनवा रहा हूँ (फॉर्म 6)', label_mr: 'नाही, पहिल्यांदाच बनवत आहे (फॉर्म ६)', value: 'new' },
          { label: 'Yes, need update or correction (Form 8)', label_hi: 'हाँ, सुधार या अपडेट चाहिए (फॉर्म 8)', label_mr: 'होय, दुरुस्ती किंवा अपडेट हवे आहे (फॉर्म ८)', value: 'correction' },
          { label: 'Yes, but I lost it / need replacement', label_hi: 'हाँ, लेकिन खो गया है (पुनर्प्रत)', label_mr: 'होय, पण गहाळ झाले आहे (पुनर्प्रत)', value: 'replacement' }
        ]
      },
      {
        id: 'voter_age_confirm',
        question: 'Have you completed 18 years of age or turning 18 this year?',
        question_hi: 'क्या आपने 18 वर्ष की आयु पूरी कर ली है या इस वर्ष 18 के हो रहे हैं?',
        question_mr: 'तुम्ही १८ वर्षे पूर्ण केली आहेत का किंवा या वर्षी १८ वर्षांचे होत आहात का?',
        options: [
          { label: 'YES (18 or above)', label_hi: 'हाँ (18 या उससे अधिक)', label_mr: 'होय (१८ किंवा त्याहून अधिक)', value: 'yes' },
          { label: 'NO (Under 18)', label_hi: 'नहीं (18 से कम)', label_mr: 'नाही (१८ पेक्षा कमी)', value: 'no' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-photo',
        name: 'Recent Passport Size Photograph',
        name_hi: 'नवीनतम पासपोर्ट साइज फोटो',
        name_mr: 'अलिकडचे पासपोर्ट आकाराचे छायाचित्र',
        reason: 'Required for printing on the EPIC Voter Card (White background)',
        reason_hi: 'मतदाता पहचान पत्र पर मुद्रण हेतु आवश्यक',
        reason_mr: 'मतदान ओळखपत्रावर छपाईसाठी आवश्यक',
        mandatory: true
      },
      {
        id: 'doc-age',
        name: 'Age Proof (Birth Certificate / 10th Marksheet / Aadhaar)',
        name_hi: 'आयु का प्रमाण (जन्म प्रमाण पत्र / 10वीं मार्कशीट / आधार)',
        name_mr: 'वयाचा पुरावा (जन्म दाखला / १० वी गुणपत्रिका / आधार)',
        reason: 'To officially prove date of birth and age eligibility (18+)',
        reason_hi: '18+ आयु पात्रता सिद्ध करने हेतु',
        reason_mr: '१८+ वय पात्रता सिद्ध करण्यासाठी',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-address',
        name: 'Address Proof (Electricity Bill / Water Bill / Aadhaar)',
        name_hi: 'पते का प्रमाण (बिजली बिल / आधार कार्ड / राशन कार्ड)',
        name_mr: 'पत्त्याचा पुरावा (वीज बिल / आधार कार्ड / रेशन कार्ड)',
        reason: 'To assign correct Assembly Constituency & Polling Station',
        reason_hi: 'सही विधानसभा क्षेत्र और मतदान केंद्र आवंटित करने हेतु',
        reason_mr: 'योग्य मतदारसंघ आणि मतदान केंद्र निश्चित करण्यासाठी',
        mandatory: true,
        matchKey: 'Address Proof (Electricity Bill)'
      }
    ],
    forms: [
      {
        formNumber: 'Form 6',
        title: 'Application for Inclusion of Name in Electoral Roll (First-Time Voters)',
        officialUrl: 'https://voters.eci.gov.in',
        printablePdf: 'assets/forms/eci_form_6_blank.pdf'
      }
    ],
    filledDemo: {
      title: 'Form 6 Demo Application',
      disclaimer: 'DEMO ONLY — This example uses fictional information and must not be submitted as an actual application.',
      fields: [
        { label: 'Constituency', value: '184 - Worli, Mumbai', tip: 'Choose your local Vidhan Sabha assembly area' },
        { label: 'Applicant Name', value: 'Rahul S. Sharma (Fictional)', tip: 'Spell exactly as appearing on your 10th certificate or Aadhaar' },
        { label: 'Relative Name', value: 'Suresh K. Sharma (Father)', tip: 'Father/Mother/Spouse name for roll linkage' },
        { label: 'Date of Birth', value: '15/04/2005', tip: 'Qualifying date must satisfy 18+ requirement' },
        { label: 'Current Residence', value: 'Flat 402, Sunset Heights, Dr. E Moses Rd, Mumbai - 400018', tip: 'Must be current ordinary residence where BLO can visit' }
      ]
    },
    tutorial: [
      {
        step: 1,
        title: 'Open Official ECI Portal',
        title_hi: 'आधिकारिक ईसीआई पोर्टल खोलें',
        title_mr: 'अधिकृत ECI पोर्टल उघडा',
        desc: 'Visit voters.eci.gov.in and click "New registration for general electors (Form 6)".',
        desc_hi: 'voters.eci.gov.in पर जाएं और "सामान्य मतदाताओं के लिए नया पंजीकरण (फॉर्म 6)" चुनें।',
        desc_mr: 'voters.eci.gov.in वर जा आणि "नवीन मतदार नोंदणी (फॉर्म ६)" पर्यायावर क्लिक करा.'
      },
      {
        step: 2,
        title: 'Mobile OTP Authentication',
        title_hi: 'मोबाइल ओटीपी सत्यापन',
        title_mr: 'मोबाईल OTP पडताळणी',
        desc: 'Sign up using your mobile number and authenticate with SMS OTP.',
        desc_hi: 'अपने मोबाइल नंबर से साइन अप करें और एसएमएस ओटीपी से सत्यापित करें।',
        desc_mr: 'आपल्या मोबाईल क्रमांकाने नोंदणी करा आणि एसएमएस ओटीपी द्वारे प्रमाणित करा.'
      },
      {
        step: 3,
        title: 'Fill Form 6 & Upload Documents',
        title_hi: 'फॉर्म 6 भरें एवं दस्तावेज़ अपलोड करें',
        title_mr: 'फॉर्म ६ भरा आणि कागदपत्रे अपलोड करा',
        desc: 'Enter basic identity, address details, and upload photo, age proof, and address proof.',
        desc_hi: 'अपनी पहचान और पते का विवरण भरें तथा फोटो, आयु और पते का प्रमाण अपलोड करें।',
        desc_mr: 'वैयक्तिक माहिती भरा आणि फोटो, वयाचा पुरावा व पत्त्याचा पुरावा अपलोड करा.'
      },
      {
        step: 4,
        title: 'Reference Number Generation',
        title_hi: 'संदर्भ संख्या (Reference ID) प्राप्त करें',
        title_mr: 'संदर्भ क्रमांक (Reference ID) मिळवा',
        desc: 'Upon submission, a reference ID (e.g. F6XXXXXXXXX) is generated for status tracking.',
        desc_hi: 'आवेदन जमा करने पर स्थिति जांचने हेतु संदर्भ संख्या प्राप्त होगी।',
        desc_mr: 'अर्ज सादर केल्यावर स्थिती ट्रॅक करण्यासाठी संदर्भ क्रमांक प्राप्त होतो.'
      },
      {
        step: 5,
        title: 'BLO Verification Visit',
        title_hi: 'बीएलओ भौतिक सत्यापन',
        title_mr: 'बीएलओ प्रत्यक्ष पडताळणी',
        desc: 'Your local Booth Level Officer (BLO) will conduct physical address verification.',
        desc_hi: 'स्थानीय बीएलओ अधिकारी आपके निवास पर आकर पते का सत्यापन करेंगे।',
        desc_mr: 'स्थानिक बीएलओ (BLO) अधिकारी आपल्या पत्त्याची प्रत्यक्ष पडताळणी करतील.'
      },
      {
        step: 6,
        title: 'Card Delivery & e-EPIC Download',
        title_hi: 'ई-एपिक डाउनलोड एवं कार्ड वितरण',
        title_mr: 'ई-इपिक डाउनलोड आणि कार्ड वितरण',
        desc: 'Download digital e-EPIC immediately upon approval; physical speed-post delivery follows.',
        desc_hi: 'स्वीकृति मिलते ही डिजिटल e-EPIC डाउनलोड करें; भौतिक कार्ड डाक से आएगा।',
        desc_mr: 'मंजुरी मिळाल्यावर तात्काळ डिजिटल e-EPIC डाउनलोड करा; मूळ कार्ड टपालाने येईल.'
      }
    ],
    verification: {
      signatureRequired: true,
      physicalVisitRequired: true,
      physicalVisitDesc: 'Physical verification by Booth Level Officer (BLO) visiting your residence or appointment at local ERO office.',
      physicalVisitDesc_hi: 'स्थानीय बीएलओ द्वारा घर पर आकर या ईआरओ कार्यालय में प्रत्यक्ष सत्यापन।',
      physicalVisitDesc_mr: 'स्थानिक बीएलओ अधिकारी यांच्याकडून प्रत्यक्ष भेट देऊन किंवा ईआरओ कार्यालयात पडताळणी.',
      officialVerificationRequired: true,
      checklistItems: [
        'Signed Form 6 or online acknowledgment printout',
        'Self-attested photocopy of Age Proof',
        'Self-attested photocopy of Address Proof',
        '1 Extra passport-size color photograph'
      ],
      checklistItems_hi: [
        'हस्ताक्षरित फॉर्म 6 या ऑनलाइन पावती प्रिंटआउट',
        'आयु प्रमाण की स्व-सत्यापित प्रति',
        'पते के प्रमाण की स्व-सत्यापित प्रति',
        '1 अतिरिक्त पासपोर्ट साइज रंगीन फोटो'
      ],
      checklistItems_mr: [
        'स्वाक्षरी केलेला फॉर्म ६ किंवा ऑनलाईन पावतीची प्रत',
        'वयाच्या पुराव्याची स्वाक्षांकित प्रत',
        'पत्त्याच्या पुराव्याची स्वाक्षांकित प्रत',
        '१ अतिरिक्त पासपोर्ट आकाराचे रंगीत छायाचित्र'
      ]
    },
    fees: 'Free of Cost (No official government fee for Form 6)',
    processingTimeline: '15 to 30 days',
    onlineAvailable: true,
    officialPortal: 'https://voters.eci.gov.in',
    officialSource: 'Election Commission of India (ECI)',
    helpline: '1950 (Voter Helpline Toll-Free across India)',
    lastVerified: '2026-03-01'
  },
  {
    id: 'passport-service',
    name: 'Ordinary Fresh Passport (Passport Seva)',
    name_hi: 'साधारण पासपोर्ट (पासपोर्ट सेवा केंद्र)',
    name_mr: 'पारपत्र सेवा (पासपोर्ट सेवा केंद्र)',
    type: 'service',
    category: 'cat-travel',
    description: 'Official Indian Travel Document issued by Ministry of External Affairs for international travel and global citizenship proof.',
    description_hi: 'विदेश मंत्रालय द्वारा अंतरराष्ट्रीय यात्रा और वैश्विक नागरिकता प्रमाण हेतु जारी आधिकारिक भारतीय यात्रा दस्तावेज़।',
    description_mr: 'परराष्ट्र व्यवहार मंत्रालयाद्वारे आंतरराष्ट्रीय प्रवास आणि भारतीय नागरिकत्वाच्या पुराव्यासाठी जारी केलेले अधिकृत पारपत्र.',
    keywords: ['passport', 'travel abroad', 'foreign', 'visa', 'passport seva', 'tatkaal', 'psk', 'पासपोर्ट', 'पारपत्र'],
    aliases: ['Indian Passport', 'Passport Seva Kendra Application', 'पासपोर्ट सेवा', 'पारपत्र'],
    exampleQueries: [
      'I want to make a passport',
      'I want to travel abroad. What do I need?',
      'How to apply for passport in India',
      'passport',
      'passport seva'
    ],
    lifeEvents: ['travel-abroad', 'turned-18'],
    stateApplicability: 'All States (Ministry of External Affairs, Govt of India)',
    eligibility: {
      criteria: 'Citizen of India by birth, descent, or registration without disqualifying criminal proceedings.',
      criteria_hi: 'जन्म या पंजीकरण द्वारा भारत का नागरिक, जिस पर कोई आपराधिक मुकदमा न हो।',
      criteria_mr: 'भारताचा नागरिक आणि ज्याच्याविरुद्ध कोणताही फौजदारी खटला प्रलंबित नाही.',
      verificationNote: 'Strict police verification required for normal fresh applications.',
      verificationNote_hi: 'सामान्य नए पासपोर्ट आवेदनों के लिए पुलिस सत्यापन अनिवार्य है।',
      verificationNote_mr: 'नवीन पारपत्र अर्जासाठी स्थानिक पोलीस पडताळणी बंधनकारक आहे.'
    },
    questions: [
      {
        id: 'passport_type',
        question: 'Are you applying for a fresh passport or re-issuing an expired one?',
        question_hi: 'क्या आप नए पासपोर्ट के लिए आवेदन कर रहे हैं या नवीनीकरण कर रहे हैं?',
        question_mr: 'तुम्ही नवीन पारपत्रासाठी अर्ज करत आहात की नूतनीकरण करत आहात?',
        options: [
          { label: 'Fresh Passport (First time)', label_hi: 'नया पासपोर्ट (पहली बार)', label_mr: 'नवीन पारपत्र (पहिल्यांदाच)', value: 'fresh' },
          { label: 'Re-issue (Renewal / Pages exhausted)', label_hi: 'पुनर्निर्गम (नवीनीकरण / पृष्ठ समाप्त)', label_mr: 'पुनर्निर्गम (नूतनीकरण / पाने संपली)', value: 'reissue' }
        ]
      },
      {
        id: 'passport_scheme',
        question: 'Which processing speed do you require?',
        question_hi: 'आपको सामान्य प्रक्रिया चाहिए या तत्काल?',
        question_mr: 'तुम्हाला सामान्य प्रक्रिया हवी आहे की तत्काळ?',
        options: [
          { label: 'Normal (Standard 15-30 days)', label_hi: 'सामान्य (15-30 दिन)', label_mr: 'सामान्य (१५-३० दिवस)', value: 'normal' },
          { label: 'Tatkaal (Urgent 1-3 days)', label_hi: 'तत्काल (अति आवश्यक 1-3 दिन)', label_mr: 'तत्काळ (तातडीचे १-३ दिवस)', value: 'tatkaal' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card (with updated address and photo)',
        name_hi: 'आधार कार्ड (अद्यतन पते और फोटो सहित)',
        name_mr: 'आधार कार्ड (अद्ययावत पत्ता व छायाचित्रासह)',
        reason: 'Accepted as primary proof of identity, address, and date of birth',
        reason_hi: 'पहचान, पते और जन्म तिथि के प्राथमिक प्रमाण के रूप में मान्य',
        reason_mr: 'ओळख, पत्ता आणि जन्मतारखेचा प्राथमिक पुरावा म्हणून ग्राह्य',
        mandatory: true,
        originalRequired: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-pan',
        name: 'PAN Card',
        name_hi: 'पैन कार्ड',
        name_mr: 'पॅन कार्ड',
        reason: 'Secondary financial identity document',
        reason_hi: 'द्वितीयक पहचान प्रमाण दस्तावेज़',
        reason_mr: 'दुय्यम ओळख पुरावा',
        mandatory: false,
        matchKey: 'PAN Card'
      },
      {
        id: 'doc-education',
        name: '10th Standard / Matriculation Certificate',
        name_hi: '10वीं कक्षा का प्रमाण पत्र',
        name_mr: '१० वी उत्तीर्ण प्रमाणपत्र (सनद)',
        reason: 'Required to qualify for ECNR (Emigration Check Not Required) category',
        reason_hi: 'नॉन-ईसीआर (ECNR) श्रेणी हेतु आवश्यक',
        reason_mr: 'नॉन-ईसीआर (ECNR) श्रेणीसाठी आवश्यक',
        mandatory: true,
        originalRequired: true
      }
    ],
    forms: [
      {
        formNumber: 'Online Form - Fresh Passport',
        title: 'Application for Indian Passport (Form 1)',
        officialUrl: 'https://www.passportindia.gov.in',
        printablePdf: 'assets/forms/passport_application_sample.pdf'
      }
    ],
    filledDemo: {
      title: 'Passport Online Application Demo',
      disclaimer: 'DEMO ONLY — This example uses fictional information and must not be submitted as an actual application.',
      fields: [
        { label: 'Application Type', value: 'Normal / 36 Pages / Fresh', tip: '36 pages standard for general citizens' },
        { label: 'Given Name', value: 'Amit', tip: 'Include First and Middle name' },
        { label: 'Surname', value: 'Verma', tip: 'As per educational certificates' },
        { label: 'Non-ECR Eligible', value: 'Yes (10th Passed)', tip: 'Upload 10th marksheet for Non-ECR status' },
        { label: 'Preferred PSK', value: 'PSK Andheri, Mumbai', tip: 'Choose nearest Passport Seva Kendra' }
      ]
    },
    tutorial: [
      {
        step: 1,
        title: 'Register on Passport Seva Portal',
        title_hi: 'पासपोर्ट सेवा पोर्टल पर पंजीकरण करें',
        title_mr: 'पासपोर्ट सेवा पोर्टलवर नोंदणी करा',
        desc: 'Create account at passportindia.gov.in and select nearest RPO.',
        desc_hi: 'passportindia.gov.in पर खाता बनाएं और नजदीकी आरपीओ चुनें।',
        desc_mr: 'passportindia.gov.in वर खाते तयार करा आणि जवळचे पारपत्र कार्यालय निवडा.'
      },
      {
        step: 2,
        title: 'Fill Application Online',
        title_hi: 'ऑनलाइन आवेदन पत्र भरें',
        title_mr: 'ऑनलाईन अर्ज भरा',
        desc: 'Complete identity, family, address, and emergency contact details.',
        desc_hi: 'पहचान, परिवार, पता और आपातकालीन संपर्क विवरण दर्ज करें।',
        desc_mr: 'वैयक्तिक माहिती, कुटुंब, पत्ता आणि संपर्क तपशील भरा.'
      },
      {
        step: 3,
        title: 'Pay Fee & Book PSK Slot',
        title_hi: 'शुल्क भुगतान और समय बुक करें',
        title_mr: 'शुल्क भरा आणि PSK भेट निश्चित करा',
        desc: 'Pay ₹1,500 online and select appointment date at Passport Seva Kendra.',
        desc_hi: 'ऑनलाइन ₹1,500 का भुगतान करें और पासपोर्ट सेवा केंद्र में तारीख चुनें।',
        desc_mr: 'ऑनलाईन ₹१,५०० शुल्क भरा आणि पासपोर्ट सेवा केंद्रात भेटीची तारीख निवडा.'
      },
      {
        step: 4,
        title: 'Visit PSK for Biometrics',
        title_hi: 'पीएसके जाएं और बायोमेट्रिक दें',
        title_mr: 'PSK केंद्रात प्रत्यक्ष हजर राहा',
        desc: 'Visit PSK on scheduled date with all original documents for fingerprint/photo.',
        desc_hi: 'निर्धारित तिथि पर मूल दस्तावेज़ों सहित फोटो और बायोमेट्रिक के लिए केंद्र जाएं।',
        desc_mr: 'मूळ कागदपत्रांसह छायाचित्र व बायोमेट्रिक नोंदीसाठी उपस्थित राहा.'
      },
      {
        step: 5,
        title: 'Local Police Verification',
        title_hi: 'स्थानीय पुलिस सत्यापन',
        title_mr: 'स्थानिक पोलीस पडताळणी',
        desc: 'Local police station will conduct physical domicile check.',
        desc_hi: 'नजदीकी पुलिस थाना आपके पते का भौतिक सत्यापन करेगा।',
        desc_mr: 'स्थानिक पोलीस ठाण्यामार्फत पत्ता व चारित्र्य पडताळणी केली जाईल.'
      },
      {
        step: 6,
        title: 'Speed Post Delivery',
        title_hi: 'डाक द्वारा पासपोर्ट प्राप्ति',
        title_mr: 'स्पीड पोस्टाने पारपत्र वितरण',
        desc: 'Track via India Post tracking number; received within 7-20 days.',
        desc_hi: 'भारतीय डाक के माध्यम से पासपोर्ट आपके घर प्राप्त होगा।',
        desc_mr: 'भारतीय टपाल विभागामार्फत पारपत्र घरपोच वितरित केले जाते.'
      }
    ],
    verification: {
      signatureRequired: true,
      physicalVisitRequired: true,
      physicalVisitDesc: 'Mandatory physical visit to Passport Seva Kendra (PSK) for biometric capture, plus Police Station physical verification.',
      physicalVisitDesc_hi: 'पासपोर्ट सेवा केंद्र (PSK) में बायोमेट्रिक और स्थानीय पुलिस थाने में भौतिक सत्यापन अनिवार्य है।',
      physicalVisitDesc_mr: 'पासपोर्ट सेवा केंद्रात (PSK) बायोमेट्रिक आणि पोलीस ठाण्यात प्रत्यक्ष उपस्थित राहून पडताळणी आवश्यक आहे.',
      officialVerificationRequired: true,
      checklistItems: [
        'Printed Application Receipt with Appointment Time',
        'Original Aadhaar Card and 2 self-attested photocopies',
        'Original 10th Certificate (for Non-ECR) and 2 photocopies',
        'Original PAN Card'
      ],
      checklistItems_hi: [
        'समय स्लॉट सहित मुद्रित आवेदन पावती',
        'मूल आधार कार्ड और 2 स्व-सत्यापित प्रतियां',
        'मूल 10वीं प्रमाण पत्र और 2 प्रतियां',
        'मूल पैन कार्ड'
      ],
      checklistItems_mr: [
        'वेळ दर्शवणारी छापील अर्ज पावती',
        'मूळ आधार कार्ड आणि २ स्वाक्षांकित छायाप्रती',
        'मूळ १० वी गुणपत्रिका/प्रमाणपत्र आणि २ प्रती',
        'मूळ पॅन कार्ड'
      ]
    },
    fees: '₹1,500 for Normal 36 pages / ₹3,500 for Tatkaal',
    processingTimeline: '15 to 30 days (Normal) / 3 to 7 days (Tatkaal)',
    onlineAvailable: true,
    officialPortal: 'https://www.passportindia.gov.in',
    officialSource: 'Consular, Passport & Visa (CPV) Division, Ministry of External Affairs',
    helpline: '1800 258 1800 (National Passport Call Centre)',
    lastVerified: '2026-03-01'
  },
  {
    id: 'pan-card',
    name: 'Permanent Account Number (PAN Card)',
    name_hi: 'पैन कार्ड (स्थायी खाता संख्या - आयकर विभाग)',
    name_mr: 'पॅन कार्ड (कायमस्वरूपी खाते क्रमांक - आयकर विभाग)',
    type: 'service',
    category: 'cat-finance',
    description: '10-digit alphanumeric identifier issued by the Income Tax Department. Essential for banking, tax returns, and financial transactions.',
    description_hi: 'आयकर विभाग द्वारा जारी 10-अंकों का पहचान क्रमांक, जो बैंकिंग, आयकर रिटर्न और वित्तीय कार्यों हेतु अनिवार्य है।',
    description_mr: 'आयकर विभागाद्वारे जारी केलेला १० अंकी क्रमांक, जो बँकिंग, आयकर विवरणपत्र आणि सर्व आर्थिक व्यवहारांसाठी अनिवार्य आहे.',
    keywords: ['pan', 'pan card', 'income tax', 'tin nsdl', 'utiitsl', 'instant pan', 'e-pan', 'पैन', 'पॅन', 'पैन कार्ड', 'पॅन कार्ड'],
    aliases: ['e-PAN', 'Form 49A Application', 'PAN Card', 'पैन कार्ड', 'पॅन कार्ड'],
    exampleQueries: [
      'I want to apply for a PAN card',
      'How to make PAN card online',
      'Instant pan card with aadhaar',
      'pan',
      'pan card'
    ],
    lifeEvents: ['turned-18', 'new-job', 'start-business'],
    stateApplicability: 'All States (Income Tax Department / Protean / UTIITSL)',
    eligibility: {
      criteria: 'Any individual residing in India with valid proof of identity and address.',
      criteria_hi: 'वैध पहचान और पते का प्रमाण रखने वाला भारत का कोई भी निवासी।',
      criteria_mr: 'वैध ओळख व पत्त्याचा पुरावा असलेला भारतातील कोणताही रहिवासी.',
      verificationNote: 'Paperless Instant e-PAN is free if Aadhaar is linked with active mobile number.',
      verificationNote_hi: 'आधार से लिंक मोबाइल नंबर होने पर पेपरलेस इंस्टेंट ई-पैन निःशुल्क उपलब्ध है।',
      verificationNote_mr: 'आधारशी मोबाईल क्रमांक जोडलेला असल्यास तात्काळ डिजिटल ई-पॅन मोफत मिळते.'
    },
    questions: [
      {
        id: 'pan_has_aadhaar',
        question: 'Do you have an Aadhaar card linked to your current mobile phone?',
        question_hi: 'क्या आपके पास चालू मोबाइल से जुड़ा आधार कार्ड है?',
        question_mr: 'तुमच्याकडे सध्याच्या मोबाईलशी जोडलेले आधार कार्ड आहे का?',
        options: [
          { label: 'YES (Instant Paperless e-PAN)', label_hi: 'हाँ (तात्कालिक डिजिटल ई-पैन)', label_mr: 'होय (तात्काळ डिजिटल ई-पॅन)', value: 'yes' },
          { label: 'NO (Physical document submission)', label_hi: 'नहीं (भौतिक दस्तावेज़ जमा करना)', label_mr: 'नाही (कागदपत्रे सादर करावी लागतील)', value: 'no' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card with Mobile Linkage',
        name_hi: 'मोबाइल से लिंक आधार कार्ड',
        name_mr: 'मोबाईलशी लिंक असलेले आधार कार्ड',
        reason: 'Used for e-KYC instant biometric/OTP authentication',
        reason_hi: 'ई-केवाईसी तात्कालिक ओटीपी प्रमाणीकरण हेतु',
        reason_mr: 'तात्काळ ई-केवायसी ओटीपी पडताळणीसाठी',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      }
    ],
    forms: [
      {
        formNumber: 'Form 49A',
        title: 'Application for Allotment of Permanent Account Number',
        officialUrl: 'https://onlineservices.protean-tin.com',
        printablePdf: 'assets/forms/pan_form_49a.pdf'
      }
    ],
    filledDemo: {
      title: 'Form 49A PAN Demo Application',
      disclaimer: 'DEMO ONLY — This example uses fictional information and must not be submitted as an actual application.',
      fields: [
        { label: 'Full Name', value: 'Sunil Ramesh Gupta', tip: 'Matches Aadhaar exactly' },
        { label: 'Father’s Name', value: 'Ramesh Mohan Gupta', tip: 'Printed on physical PAN card' },
        { label: 'Date of Birth', value: '10/08/1998', tip: 'As per Aadhaar' },
        { label: 'Aadhaar Number', value: 'XXXX-XXXX-4589', tip: 'Used for OTP verification' }
      ]
    },
    tutorial: [
      {
        step: 1,
        title: 'Visit Income Tax e-Filing Portal',
        title_hi: 'आयकर ई-फाइलिंग पोर्टल खोलें',
        title_mr: 'आयकर ई-फायलिंग पोर्टल उघडा',
        desc: 'Open incometax.gov.in and click "Instant e-PAN".',
        desc_hi: 'incometax.gov.in पर जाएं और "Instant e-PAN" पर क्लिक करें।',
        desc_mr: 'incometax.gov.in वर जा आणि "Instant e-PAN" वर क्लिक करा.'
      },
      {
        step: 2,
        title: 'Enter Aadhaar Number',
        title_hi: 'आधार नंबर दर्ज करें',
        title_mr: 'आधार क्रमांक प्रविष्ट करा',
        desc: 'Submit 12-digit Aadhaar and validate OTP received on registered mobile.',
        desc_hi: '12 अंकों का आधार दर्ज करें और प्राप्त ओटीपी सत्यापित करें।',
        desc_mr: '१२ अंकी आधार क्रमांक टाका आणि ओटीपी पडताळणी करा.'
      },
      {
        step: 3,
        title: 'Confirm Details',
        title_hi: 'विवरण की पुष्टि करें',
        title_mr: 'माहिती तपासा',
        desc: 'Accept data fetched automatically from UIDAI.',
        desc_hi: 'यूआईडीएआई से प्राप्त डेटा की जांच कर स्वीकार करें।',
        desc_mr: 'UIDAI कडून मिळालेली माहिती तपासून स्वीकारा.'
      },
      {
        step: 4,
        title: 'Instant e-PAN Download',
        title_hi: 'तुरंत ई-पैन डाउनलोड करें',
        title_mr: 'तात्काळ ई-पॅन डाउनलोड करा',
        desc: 'Download digitally signed 100% valid e-PAN PDF within 10 minutes.',
        desc_hi: '10 मिनट में डिजिटल रूप से हस्ताक्षरित मान्य ई-पैन पीडीएफ प्राप्त करें।',
        desc_mr: '१० मिनिटांत डिजिटल स्वाक्षरी असलेले वैध ई-पॅन डाउनलोड करा.'
      }
    ],
    verification: {
      signatureRequired: false,
      physicalVisitRequired: false,
      physicalVisitDesc: 'Completely paperless online via Aadhaar e-KYC. No physical visit needed.',
      physicalVisitDesc_hi: 'आधार ई-केवाईसी द्वारा 100% पेपरलेस। किसी कार्यालय जाने की आवश्यकता नहीं है।',
      physicalVisitDesc_mr: 'आधार ई-केवायसी द्वारे १००% पेपरलेस. कार्यालयात जाण्याची आवश्यकता नाही.',
      officialVerificationRequired: true,
      checklistItems: [
        'Active mobile phone to receive Aadhaar OTP',
        'Valid 12-digit Aadhaar number'
      ],
      checklistItems_hi: [
        'आधार ओटीपी प्राप्त करने हेतु सक्रिय मोबाइल नंबर',
        'वैध 12-अंकीय आधार नंबर'
      ],
      checklistItems_mr: [
        'आधार ओटीपी मिळवण्यासाठी चालू मोबाईल क्रमांक',
        'वैध १२ अंकी आधार क्रमांक'
      ]
    },
    fees: 'Free for Instant e-PAN; ₹50 for physical plastic card delivery',
    processingTimeline: '10 minutes for e-PAN / 10 days for physical card',
    onlineAvailable: true,
    officialPortal: 'https://www.incometax.gov.in',
    officialSource: 'Income Tax Department, Ministry of Finance',
    helpline: '1800 180 1961 (Income Tax Toll-Free)',
    lastVerified: '2026-03-01'
  },
  {
    id: 'driving-licence',
    name: 'Learner’s & Driving Licence (Sarathi Parivahan)',
    name_hi: 'ड्राइविंग लाइसेंस (सारथी परिवहन)',
    name_mr: 'वाहन चालक परवाना (सारथी परिवहन)',
    type: 'service',
    category: 'cat-travel',
    description: 'Official authorization to drive motor vehicles in India, managed through Ministry of Road Transport and Highways (MoRTH).',
    description_hi: 'सड़क परिवहन एवं राजमार्ग मंत्रालय (MoRTH) द्वारा भारत में मोटर वाहन चलाने हेतु अधिकृत लाइसेंस।',
    description_mr: 'रस्ते वाहतूक आणि महामार्ग मंत्रालयाद्वारे (MoRTH) भारतात मोटार वाहन चालवण्यासाठी अधिकृत परवाना.',
    keywords: [
      'license', 'licence', 'driving licence', 'driving license', 'dl', 'learner licence', 
      'learner license', 'll', 'bike', 'car', 'rto', 'sarathi', 'parivahan', 'driver license',
      'driver licence', 'driving', 'vehicle license', 'permanent dl', 'renew license', 
      'लाइसेंस', 'ड्राइविंग लाइसेंस', 'गाड़ी का लाइसेंस', 'ड्रायव्हिंग लायसन्स'
    ],
    aliases: [
      'Driving License', 'Driving Licence', 'License', 'Licence', 'Sarathi DL', 
      'Learners Licence', 'Learner License', 'Driver License', 'DL', 'लाइसेंस', 'ड्रायव्हिंग लायसन्स'
    ],
    exampleQueries: [
      'license',
      'licence',
      'driving license',
      'driving licence',
      'I want to make a driving license',
      'I turned 18 and want to ride a bike',
      'Learner license online apply',
      'driving',
      'dl apply online'
    ],
    lifeEvents: ['turned-18', 'bought-vehicle'],
    stateApplicability: 'State Transport Departments / Sarathi Parivahan',
    eligibility: {
      criteria: 'Aged 16+ for gearless 50cc two-wheelers; Aged 18+ for light motor vehicles (car/motorcycle with gear).',
      criteria_hi: 'बिना गियर दोपहिया के लिए 16+ वर्ष; कार और गियर मोटरसाइकिल के लिए 18+ वर्ष।',
      criteria_mr: 'गियर नसलेल्या दुचाकीसाठी वय १६+; कार व गियरच्या मोटारसायकलसाठी वय १८+.',
      verificationNote: 'Contactless online LL test available in most states with Aadhaar authentication.',
      verificationNote_hi: 'आधार प्रमाणीकरण के साथ घर बैठे ऑनलाइन लर्निंग टेस्ट की सुविधा उपलब्ध है।',
      verificationNote_mr: 'आधार प्रमाणीकरणासह घरबसल्या ऑनलाईन लर्निंग चाचणी देता येते.'
    },
    questions: [
      {
        id: 'dl_stage',
        question: 'Do you already hold a valid Learner’s Licence (LL)?',
        question_hi: 'क्या आपके पास पहले से वैध लर्नर लाइसेंस (LL) है?',
        question_mr: 'तुमच्याकडे आधीपासून वैध शिकाऊ परवाना (लर्निंग लायसन्स) आहे का?',
        options: [
          { label: 'No, I need a new Learner’s Licence', label_hi: 'नहीं, नया लर्नर लाइसेंस चाहिए', label_mr: 'नाही, मला नवीन शिकाऊ परवाना हवा आहे', value: 'need_ll' },
          { label: 'Yes, I want to take the permanent DL driving test', label_hi: 'हाँ, पक्के ड्राइविंग लाइसेंस की परीक्षा देनी है', label_mr: 'होय, मला पक्क्या परवान्यासाठी ड्रायव्हिंग टेस्ट द्यायची आहे', value: 'have_ll' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        name_hi: 'आधार कार्ड',
        name_mr: 'आधार कार्ड',
        reason: 'Proof of age and address for contactless online test',
        reason_hi: 'ऑनलाइन टेस्ट और पते/आयु के सत्यापन हेतु',
        reason_mr: 'वय व पत्त्याच्या पडताळणीसाठी',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-medical',
        name: 'Form 1 Self-Declaration of Physical Fitness',
        name_hi: 'फॉर्म 1 शारीरिक योग्यता स्व-घोषणा',
        name_mr: 'फॉर्म १ शारीरिक पात्रता स्वयंघोषणा',
        reason: 'Medical fitness verification',
        reason_hi: 'शारीरिक स्वास्थ्य सत्यापन',
        reason_mr: 'वैद्यकीय स्वास्थ्य पडताळणी',
        mandatory: true
      }
    ],
    forms: [
      {
        formNumber: 'Form 2 (Sarathi)',
        title: 'Application for Grant of Learner’s Licence',
        officialUrl: 'https://sarathi.parivahan.gov.in',
        printablePdf: 'assets/forms/sarathi_form2_ll.pdf'
      }
    ],
    filledDemo: {
      title: 'Sarathi Parivahan Learner’s Licence Demo',
      disclaimer: 'DEMO ONLY — This example uses fictional information and must not be submitted as an actual application.',
      fields: [
        { label: 'State', value: 'Maharashtra', tip: 'State of current residence' },
        { label: 'RTO Office', value: 'MH-02 (Mumbai West - Andheri)', tip: 'Local jurisdiction RTO' },
        { label: 'Class of Vehicle', value: 'MCWG (Motor Cycle With Gear) & LMV (Light Motor Vehicle)', tip: 'Standard combination for bike and car' }
      ]
    },
    tutorial: [
      {
        step: 1,
        title: 'Visit Sarathi Parivahan',
        title_hi: 'सारथी परिवहन पोर्टल खोलें',
        title_mr: 'सारथी परिवहन पोर्टल उघडा',
        desc: 'Open sarathi.parivahan.gov.in and select your State.',
        desc_hi: 'sarathi.parivahan.gov.in पर जाएं और अपना राज्य चुनें।',
        desc_mr: 'sarathi.parivahan.gov.in वर जा आणि आपले राज्य निवडा.'
      },
      {
        step: 2,
        title: 'Select Apply for Learner Licence',
        title_hi: 'लर्नर लाइसेंस आवेदन चुनें',
        title_mr: 'लर्निंग लायसन्स अर्ज निवडा',
        desc: 'Choose Aadhaar-authenticated paperless application.',
        desc_hi: 'आधार प्रमाणीकृत पेपरलेस आवेदन विकल्प चुनें।',
        desc_mr: 'आधार प्रमाणीकृत पेपरलेस अर्ज पर्याय निवडा.'
      },
      {
        step: 3,
        title: 'Complete Online Road Safety Video',
        title_hi: 'सड़क सुरक्षा वीडियो देखें',
        title_mr: 'रस्ता सुरक्षा व्हिडिओ पहा',
        desc: 'Watch mandatory road safety tutorial.',
        desc_hi: 'अनिवार्य सड़क सुरक्षा ट्यूटोरियल पूरा करें।',
        desc_mr: 'अनिवार्य रस्ता सुरक्षा ट्युटोरिअल पूर्ण करा.'
      },
      {
        step: 4,
        title: 'Take Online LL Test',
        title_hi: 'ऑनलाइन टेस्ट दें',
        title_mr: 'ऑनलाईन चाचणी द्या',
        desc: 'Attempt 15 questions from your home computer/phone camera.',
        desc_hi: 'घर बैठे कैमरे के सामने 15 प्रश्नों की ऑनलाइन परीक्षा दें।',
        desc_mr: 'घरी बसून कॅमेऱ्यासमोर १५ प्रश्नांची ऑनलाईन परीक्षा द्या.'
      },
      {
        step: 5,
        title: 'Download LL Immediately',
        title_hi: 'तुरंत लाइसेंस डाउनलोड करें',
        title_mr: 'तात्काळ लायसन्स डाउनलोड करा',
        desc: 'Download official digital Learner Licence valid for 6 months.',
        desc_hi: '6 महीने के लिए वैध डिजिटल लर्नर लाइसेंस डाउनलोड करें।',
        desc_mr: '६ महिन्यांसाठी वैध असणारे डिजिटल लर्निंग लायसन्स डाउनलोड करा.'
      }
    ],
    verification: {
      signatureRequired: true,
      physicalVisitRequired: false,
      physicalVisitDesc: 'Learner Licence is paperless online from home. Permanent DL requires one physical driving test at RTO track.',
      physicalVisitDesc_hi: 'लर्नर लाइसेंस घर बैठे ऑनलाइन प्राप्त होता है। पक्के लाइसेंस के लिए आरटीओ में एक बार ड्राइविंग टेस्ट देना होता है।',
      physicalVisitDesc_mr: 'लर्निंग लायसन्स घरबसल्या मिळते. पक्क्या परवान्यासाठी आरटीओ ट्रॅकवर प्रत्यक्ष ड्रायव्हिंग टेस्ट द्यावी लागते.',
      officialVerificationRequired: true,
      checklistItems: [
        'Learner Licence slot booking receipt',
        'Original Aadhaar card',
        'Valid helmet and vehicle for driving skill test (for permanent DL)'
      ],
      checklistItems_hi: [
        'लर्नर लाइसेंस स्लॉट बुकिंग रसीद',
        'मूल आधार कार्ड',
        'ड्राइविंग टेस्ट हेतु वैध वाहन और हेलमेट'
      ],
      checklistItems_mr: [
        'शिकाऊ परवाना स्लॉट बुकिंग पावती',
        'मूळ आधार कार्ड',
        'ड्रायव्हिंग टेस्टसाठी वैध वाहन व हेल्मेट'
      ]
    },
    fees: '₹150 (LL fee) + ₹50 (Test fee)',
    processingTimeline: 'Instant online for Learner Licence',
    onlineAvailable: true,
    officialPortal: 'https://sarathi.parivahan.gov.in',
    officialSource: 'Ministry of Road Transport and Highways (MoRTH)',
    helpline: '0120 492 5505 (Parivahan Helpdesk)',
    lastVerified: '2026-03-01'
  },
  {
    id: 'birth-certificate',
    name: 'Birth Certificate Registration & Issuance',
    name_hi: 'जन्म प्रमाण पत्र (CRS पोर्टल / नगर निगम)',
    name_mr: 'जन्म दाखला (नागरी नोंदणी प्रणाली / मनपा)',
    type: 'certificate',
    category: 'cat-certificates',
    description: 'Statutory birth registration document under the Registration of Births and Deaths Act. Foundational identity for school, passport, and Aadhaar.',
    description_hi: 'जन्म एवं मृत्यु पंजीकरण अधिनियम के तहत वैधानिक जन्म प्रमाण पत्र। विद्यालय प्रवेश, पासपोर्ट और आधार के लिए अनिवार्य।',
    description_mr: 'जन्म आणि मृत्यू नोंदणी कायद्यांतर्गत वैधानिक जन्म नोंदणी दाखला. शाळा प्रवेश, पारपत्र आणि आधारसाठी पायाभूत पुरावा.',
    keywords: ['baby', 'birth', 'child', 'infant', 'born', 'newborn', 'janam praman patra', 'delivery hospital', 'जन्म', 'जन्म दाखला', 'जन्म प्रमाण पत्र'],
    aliases: ['Janam Praman Patra', 'CRS Birth Certificate', 'जन्म प्रमाण पत्र', 'जन्म दाखला'],
    exampleQueries: [
      'My baby was born. What do I need to do?',
      'How to get birth certificate for my newborn child',
      'Bacha hua hai birth certificate kaise banaye',
      'birth certificate',
      'janam praman patra'
    ],
    lifeEvents: ['baby-born'],
    stateApplicability: 'State Municipal Corporations / Gram Panchayats / CRS Portal (crsorgi.gov.in)',
    eligibility: {
      criteria: 'Birth occurred in India. Must be reported within 21 days for standard zero-penalty registration.',
      criteria_hi: 'जन्म भारत में हुआ हो। निःशुल्क पंजीकरण हेतु 21 दिनों के भीतर सूचना देना आवश्यक है।',
      criteria_mr: 'जन्म भारतात झालेला असावा. विनाशुल्क नोंदणीसाठी २१ दिवसांच्या आत नोंद करणे आवश्यक.',
      verificationNote: 'Requires institutional discharge slip or hospital delivery certificate.',
      verificationNote_hi: 'अस्पताल डिस्चार्ज स्लिप या जन्म सूचना पत्र आवश्यक है।',
      verificationNote_mr: 'रुग्णालयाचा डिस्चार्ज दाखला किंवा जन्म अहवाल आवश्यक.'
    },
    questions: [
      {
        id: 'birth_location',
        question: 'Where was the child delivered?',
        question_hi: 'बच्चे का जन्म कहाँ हुआ?',
        question_mr: 'बाळाचा जन्म कुठे झाला?',
        options: [
          { label: 'Hospital or Nursing Home', label_hi: 'अस्पताल या नर्सिंग होम', label_mr: 'रुग्णालय किंवा नर्सिंग होम', value: 'hospital' },
          { label: 'At Home', label_hi: 'घर पर', label_mr: 'घरी', value: 'home' }
        ]
      },
      {
        id: 'birth_timing',
        question: 'Has it been more than 21 days since the birth?',
        question_hi: 'क्या जन्म को 21 दिन से अधिक हो चुके हैं?',
        question_mr: 'जन्माला २१ दिवसांपेक्षा जास्त कालावधी झाला आहे का?',
        options: [
          { label: 'Within 21 days (Standard Free)', label_hi: '21 दिनों के भीतर (निःशुल्क)', label_mr: '२१ दिवसांच्या आत (मोफत)', value: 'within21' },
          { label: '21 to 30 days (Late fee applies)', label_hi: '21 से 30 दिन (विलंब शुल्क)', label_mr: '२१ ते ३० दिवस (विलंब शुल्क)', value: 'late' },
          { label: 'More than 1 year (Magistrate order required)', label_hi: '1 वर्ष से अधिक (दंडाधिकारी आदेश)', label_mr: '१ वर्षापेक्षा जास्त (दंडाधिकारी आदेश)', value: 'delayed_magistrate' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-hospital-slip',
        name: 'Hospital Discharge Summary / Delivery Intimation Slip',
        name_hi: 'अस्पताल डिस्चार्ज स्लिप / जन्म सूचना प्रपत्र',
        name_mr: 'रुग्णालय डिस्चार्ज कार्ड / जन्म सूचना पत्र',
        reason: 'Official proof of date, time, sex, and place of delivery issued by medical officer',
        reason_hi: 'जन्म तिथि, समय और स्थान का आधिकारिक चिकित्सकीय प्रमाण',
        reason_mr: 'वैद्यकीय अधिकाऱ्याने दिलेला जन्म वेळ, तारीख आणि ठिकाणाचा अधिकृत पुरावा',
        mandatory: true
      },
      {
        id: 'doc-parents-id',
        name: 'Aadhaar / ID Card of Both Parents',
        name_hi: 'माता-पिता दोनों का आधार कार्ड',
        name_mr: 'आई आणि वडील दोघांचे आधार कार्ड',
        reason: 'To record parental identities in the national civil registry',
        reason_hi: 'नागरिक रजिस्टर में माता-पिता की पहचान दर्ज करने हेतु',
        reason_mr: 'नागरी नोंदवहीत पालकांची ओळख नोंदवण्यासाठी',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      }
    ],
    forms: [
      {
        formNumber: 'CRS Form 1',
        title: 'Birth Report Form (Civil Registration System)',
        officialUrl: 'https://crsorgi.gov.in',
        printablePdf: 'assets/forms/crs_birth_form1.pdf'
      }
    ],
    filledDemo: {
      title: 'Birth Registration CRS Form 1 Demo',
      disclaimer: 'DEMO ONLY — This example uses fictional information and must not be submitted as an actual application.',
      fields: [
        { label: 'Date of Birth', value: '18/02/2026 (04:30 AM)', tip: 'Must match hospital discharge card exactly' },
        { label: 'Sex of Child', value: 'Female', tip: 'Recorded at delivery' },
        { label: 'Name of Child (Optional at birth)', value: 'Ananya Sharma', tip: 'Can be left blank and added within 1 year without fee' },
        { label: 'Mother’s Name', value: 'Pooja Sharma', tip: 'As per Aadhaar card' },
        { label: 'Father’s Name', value: 'Rahul Sharma', tip: 'As per Aadhaar card' },
        { label: 'Place of Birth', value: 'Lilavati Hospital & Research Centre, Mumbai', tip: 'Institution name' }
      ]
    },
    tutorial: [
      {
        step: 1,
        title: 'Obtain Hospital Intimation Slip',
        title_hi: 'अस्पताल जन्म पर्ची प्राप्त करें',
        title_mr: 'रुग्णालयाकडून जन्म पावती मिळवा',
        desc: 'Hospital issues Form 1 intimation directly or hands over discharge certificate.',
        desc_hi: 'अस्पताल जन्म की सूचना सीधे पोर्टल को भेजता है या डिस्चार्ज कार्ड प्रदान करता है।',
        desc_mr: 'रुग्णालय थेट पोर्टलवर माहिती नोंदवते किंवा जन्म दाखला/डिस्चार्ज कार्ड देते.'
      },
      {
        step: 2,
        title: 'Submit to Municipal / Panchayat Ward',
        title_hi: 'नगर निगम या पंचायत वार्ड में जमा करें',
        title_mr: 'मनपा किंवा ग्रामपंचायत कार्यालयात सादर करा',
        desc: 'Submit at the local Municipal Corporation ward (e.g. BMC/MCGM) or CRS portal.',
        desc_hi: 'स्थानीय नगर निगम कार्यालय (जैसे बीएमसी) या crsorgi.gov.in पोर्टल पर आवेदन करें।',
        desc_mr: 'स्थानिक महानगरपालिका प्रभाग किंवा crsorgi.gov.in पोर्टलवर अर्ज करा.'
      },
      {
        step: 3,
        title: 'Registrar Verification',
        title_hi: 'रजिस्ट्रार द्वारा सत्यापन',
        title_mr: 'नोंदणी अधिकाऱ्याकडून पडताळणी',
        desc: 'Municipal health officer cross-verifies institutional records.',
        desc_hi: 'स्वास्थ्य अधिकारी अस्पताल रिकॉर्ड से विवरण का मिलान करते हैं।',
        desc_mr: 'आरोग्य अधिकारी रुग्णालयाच्या नोंदींशी माहिती पडताळून पाहतात.'
      },
      {
        step: 4,
        title: 'Download Digitally Signed Certificate',
        title_hi: 'डिजिटल हस्ताक्षरित प्रमाण पत्र डाउनलोड करें',
        title_mr: 'डिजिटल स्वाक्षरी केलेला दाखला डाउनलोड करा',
        desc: 'Download digital QR-coded birth certificate from crsorgi.gov.in or State portal.',
        desc_hi: 'क्यूआर कोड युक्त आधिकारिक जन्म प्रमाण पत्र डाउनलोड करें।',
        desc_mr: 'क्यूआर कोड असलेला अधिकृत जन्म दाखला ऑनलाईन डाउनलोड करा.'
      }
    ],
    verification: {
      signatureRequired: true,
      physicalVisitRequired: false,
      physicalVisitDesc: 'Institutional births are automated online. Home births require ward health inspector physical visit.',
      physicalVisitDesc_hi: 'अस्पताल में हुए जन्म की प्रक्रिया ऑनलाइन है। घर पर हुए जन्म के लिए स्वास्थ्य निरीक्षक की जांच आवश्यक है।',
      physicalVisitDesc_mr: 'रुग्णालयातील जन्मासाठी प्रक्रिया पूर्णपणे ऑनलाईन आहे. घरगुती जन्मासाठी आरोग्य निरीक्षकाची भेट आवश्यक आहे.',
      officialVerificationRequired: true,
      checklistItems: [
        'Hospital discharge slip in original',
        'Photocopies of parents’ Aadhaar cards',
        'Form 1 filled and signed by parents'
      ],
      checklistItems_hi: [
        'मूल अस्पताल डिस्चार्ज स्लिप',
        'माता-पिता के आधार कार्ड की छायाप्रतियां',
        'माता-पिता द्वारा हस्ताक्षरित फॉर्म 1'
      ],
      checklistItems_mr: [
        'रुग्णालयाची मूळ डिस्चार्ज पावती',
        'पालकांच्या आधार कार्डांची छायाप्रत',
        'पालकांनी स्वाक्षरी केलेला फॉर्म १'
      ]
    },
    fees: 'Free within 21 days; nominal delayed fee thereafter',
    processingTimeline: '7 to 14 days',
    onlineAvailable: true,
    officialPortal: 'https://crsorgi.gov.in',
    officialSource: 'Civil Registration System, Registrar General of India',
    helpline: '1800 180 1551 (Civil Registration Support)',
    lastVerified: '2026-03-01'
  },
  {
    id: 'ration-card',
    name: 'National Food Security Ration Card (NFSA / PDS)',
    name_hi: 'राशन कार्ड (राष्ट्रीय खाद्य सुरक्षा अधिनियम - NFSA)',
    name_mr: 'रेशन कार्ड (राष्ट्रीय अन्न सुरक्षा कायदा - NFSA)',
    type: 'service',
    category: 'cat-certificates',
    description: 'Statutory family entitlement document issued by Food and Civil Supplies Department for subsidized food grains and citizen state welfare benefits.',
    description_hi: 'खाद्य एवं नागरिक आपूर्ति विभाग द्वारा रियायती खाद्यान्न और जनकल्याणकारी लाभों के लिए जारी पारिवारिक राशन कार्ड।',
    description_mr: 'अन्न व नागरी पुरवठा विभागाद्वारे सवलतीच्या दरात अन्नधान्य आणि शासकीय योजनांच्या लाभासाठी दिलेले रेशन कार्ड.',
    keywords: ['ration', 'ration card', 'nfsa', 'rashan', 'pds', 'food grain', 'epds', 'राशन', 'राशन कार्ड', 'रेशन', 'रेशन कार्ड'],
    aliases: ['Ration Card', 'NFSA Card', 'राशन कार्ड', 'रेशन कार्ड'],
    exampleQueries: [
      'I want to apply for a ration card',
      'New ration card application',
      'rashan card kaise banaye',
      'ration card',
      'ration'
    ],
    lifeEvents: ['baby-born', 'moved-city'],
    stateApplicability: 'State Food & Civil Supplies Departments (e.g. Mahafood / ePDS)',
    eligibility: {
      criteria: 'Families residing in the state, categorized by income into Antyodaya (AAY), Priority Household (PHH), or Non-Subsidized.',
      criteria_hi: 'राज्य में निवास करने वाले परिवार, जिन्हें आय के आधार पर अंत्योदय, प्राथमिकता या गैर-सब्सिडी में वर्गीकृत किया जाता है।',
      criteria_mr: 'राज्यात वास्तव्यास असलेली कुटुंबे, ज्यांची उत्पन्नानुसार अंत्योदय, प्राधान्य किंवा विनाअनुदानित गटात विभागणी केली जाते.',
      verificationNote: 'Requires Aadhaar seeding of all family members and local Food Supply Inspector scrutiny.',
      verificationNote_hi: 'परिवार के सभी सदस्यों का आधार लिंक होना और आपूर्ति निरीक्षक द्वारा जांच अनिवार्य है।',
      verificationNote_mr: 'कुटुंबातील सर्व सदस्यांचे आधार जोडणी आणि पुरवठा निरीक्षकामार्फत तपासणी आवश्यक आहे.'
    },
    questions: [
      {
        id: 'ration_type',
        question: 'What is your annual household income range?',
        question_hi: 'आपकी पारिवारिक वार्षिक आय कितनी है?',
        question_mr: 'तुमच्या कुटुंबाचे वार्षिक उत्पन्न किती आहे?',
        options: [
          { label: 'Below ₹1 Lakh (BPL / Priority Household)', label_hi: '₹1 लाख से कम (बीपीएल / प्राथमिकता परिवार)', label_mr: '₹१ लाखापेक्षा कमी (दारिद्र्यरेषेखालील / प्राधान्य कुटुंब)', value: 'bpl' },
          { label: 'Above ₹1 Lakh (APL / Non-Subsidized)', label_hi: '₹1 लाख से अधिक (एपीएल / गैर-सब्सिडी)', label_mr: '₹१ लाखापेक्षा जास्त (एपीएल / विनाअनुदानित)', value: 'apl' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-family-aadhaar',
        name: 'Aadhaar Cards of All Family Members',
        name_hi: 'परिवार के सभी सदस्यों के आधार कार्ड',
        name_mr: 'कुटुंबातील सर्व सदस्यांची आधार कार्डे',
        reason: 'Mandatory Aadhaar seeding under NFSA rules',
        reason_hi: 'एनएफएसए नियमों के तहत आधार लिंक हेतु अनिवार्य',
        reason_mr: 'अन्न सुरक्षा नियमांनुसार आधार जोडणीसाठी आवश्यक',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-address',
        name: 'Address Proof (Electricity Bill / Rent Agreement)',
        name_hi: 'पते का प्रमाण (बिजली बिल / किराया समझौता)',
        name_mr: 'पत्त्याचा पुरावा (वीज बिल / भाडे करार)',
        reason: 'To assign nearest Fair Price Ration Shop (FPS)',
        reason_hi: 'नजदीकी उचित मूल्य राशन दुकान आवंटित करने हेतु',
        reason_mr: 'जवळचे रास्त भाव धान्य दुकान निश्चित करण्यासाठी',
        mandatory: true,
        matchKey: 'Address Proof (Electricity Bill)'
      },
      {
        id: 'doc-income',
        name: 'Income Certificate from Tehsildar',
        name_hi: 'तहसीलदार द्वारा जारी आय प्रमाण पत्र',
        name_mr: 'तहसीलदारांचा उत्पन्नाचा दाखला',
        reason: 'To determine card category (Yellow, Saffron, White)',
        reason_hi: 'राशन कार्ड श्रेणी निर्धारण हेतु',
        reason_mr: 'रेशन कार्ड प्रवर्ग निश्चित करण्यासाठी',
        mandatory: true
      }
    ],
    forms: [
      {
        formNumber: 'Form 1 (PDS)',
        title: 'Application for New Ration Card (NFSA)',
        officialUrl: 'https://mahafood.gov.in',
        printablePdf: 'assets/forms/ration_card_form.pdf'
      }
    ],
    filledDemo: {
      title: 'New Ration Card Demo Application',
      disclaimer: 'DEMO ONLY — This example uses fictional information and must not be submitted as an actual application.',
      fields: [
        { label: 'Head of Family', value: 'Sunita Devi (Female Head as per NFSA)', tip: 'NFSA mandates eldest adult female as head' },
        { label: 'Total Members', value: '4 Members', tip: 'Family members listed' },
        { label: 'Annual Income', value: '₹75,000', tip: 'Supported by income certificate' }
      ]
    },
    tutorial: [
      {
        step: 1,
        title: 'Open State Food Portal',
        title_hi: 'राज्य खाद्य एवं रसद पोर्टल खोलें',
        title_mr: 'राज्य अन्न व नागरी पुरवठा पोर्टल उघडा',
        desc: 'Visit mahafood.gov.in or your state RCMS portal.',
        desc_hi: 'mahafood.gov.in या अपने राज्य के राशन पोर्टल पर जाएं।',
        desc_mr: 'mahafood.gov.in किंवा आपल्या राज्याच्या रेशन पोर्टलवर जा.'
      },
      {
        step: 2,
        title: 'Fill Family Details',
        title_hi: 'पारिवारिक विवरण दर्ज करें',
        title_mr: 'कुटुंबाची माहिती भरा',
        desc: 'Enter names, ages, and Aadhaar numbers of all family members.',
        desc_hi: 'परिवार के सभी सदस्यों के नाम और आधार नंबर दर्ज करें।',
        desc_mr: 'कुटुंबातील सर्व सदस्यांची नावे आणि आधार क्रमांक नोंदवा.'
      },
      {
        step: 3,
        title: 'Upload Documents',
        title_hi: 'दस्तावेज़ अपलोड करें',
        title_mr: 'कागदपत्रे अपलोड करा',
        desc: 'Attach electricity bill, income certificate, and group photo.',
        desc_hi: 'बिजली बिल, आय प्रमाण पत्र और परिवार का संयुक्त फोटो अपलोड करें।',
        desc_mr: 'वीज बिल, उत्पन्नाचा दाखला आणि कुटुंबाचे एकत्रित छायाचित्र जोडा.'
      },
      {
        step: 4,
        title: 'Inspection & Card Issuance',
        title_hi: 'जांच एवं राशन कार्ड निर्गमन',
        title_mr: 'तपासणी व रेशन कार्ड वाटप',
        desc: 'Supply Inspector verifies details; digital ration card is issued within 30 days.',
        desc_hi: 'आपूर्ति निरीक्षक द्वारा सत्यापन के बाद 30 दिनों में राशन कार्ड जारी किया जाता है।',
        desc_mr: 'पुरवठा निरीक्षकाच्या तपासणीनंतर ३० दिवसांत रेशन कार्ड वितरित केले जाते.'
      }
    ],
    verification: {
      signatureRequired: true,
      physicalVisitRequired: false,
      physicalVisitDesc: 'Applications are online. Field inquiry by Food Supply Inspector only if required.',
      physicalVisitDesc_hi: 'आवेदन ऑनलाइन है। आवश्यकता पड़ने पर आपूर्ति निरीक्षक द्वारा भौतिक जांच।',
      physicalVisitDesc_mr: 'अर्ज ऑनलाईन आहे. आवश्यक असल्यास पुरवठा निरीक्षकांकडून प्रत्यक्ष चौकशी.',
      officialVerificationRequired: true,
      checklistItems: [
        'Aadhaar cards of all members',
        'Electricity bill / residence proof',
        'Tehsildar income certificate',
        'Family passport photo'
      ],
      checklistItems_hi: [
        'सभी सदस्यों के आधार कार्ड',
        'बिजली बिल / निवास प्रमाण',
        'तहसीलदार का आय प्रमाण पत्र',
        'पारिवारिक संयुक्त फोटो'
      ],
      checklistItems_mr: [
        'सर्व सदस्यांची आधार कार्डे',
        'वीज बिल / रहिवासी पुरावा',
        'तहसीलदार उत्पन्नाचा दाखला',
        'कुटुंबाचे एकत्रित छायाचित्र'
      ]
    },
    fees: 'Nominal fee (₹5 to ₹10 for card print)',
    processingTimeline: '15 to 30 days',
    onlineAvailable: true,
    officialPortal: 'https://mahafood.gov.in',
    officialSource: 'Department of Food, Civil Supplies and Consumer Protection',
    helpline: '1967 / 1800 22 4950 (NFSA Helpline)',
    lastVerified: '2026-03-01'
  },
  {
    id: 'domicile-certificate',
    name: 'Residence / Domicile Certificate',
    name_hi: 'निवास / अधिवास प्रमाण पत्र (Domicile Certificate)',
    name_mr: 'रहिवासी / अधिवास दाखला (डोमिसिल प्रमाणपत्र)',
    type: 'certificate',
    category: 'cat-certificates',
    description: 'Official state proof verifying continuous residence in a particular State (e.g. Maharashtra, UP, Karnataka) for quota admissions and state jobs.',
    description_hi: 'राज्य में निरंतर निवास प्रमाणित करने वाला सरकारी प्रमाण पत्र। शैक्षणिक प्रवेश और राज्य सरकारी नौकरियों के लिए आवश्यक।',
    description_mr: 'राज्यातील सलग वास्तव्याची पुष्टी करणारा अधिकृत दाखला. शिक्षण प्रवेशातील आरक्षण आणि शासकीय नोकऱ्यांसाठी अत्यंत आवश्यक.',
    keywords: ['domicile', 'residence certificate', 'adivasi', 'niwas praman patra', 'resident', 'local quota', 'निवास', 'अधिवास', 'रहिवासी दाखला', 'डोमिसिल'],
    aliases: ['Niwas Praman Patra', 'State Residence Certificate', 'Domicile', 'रहिवासी दाखला', 'निवास प्रमाण पत्र'],
    exampleQueries: [
      'I moved to Maharashtra. What documents do I need to update?',
      'How to get domicile certificate in Maharashtra',
      'Need domicile for college admission',
      'domicile certificate',
      'domicile'
    ],
    lifeEvents: ['moved-city', 'student'],
    stateApplicability: 'State Specific (e.g. Aaple Sarkar in Maharashtra, e-District in other states)',
    eligibility: {
      criteria: 'Continuous residence in the state for minimum specified period (e.g. 15 years in Maharashtra) or state-born.',
      criteria_hi: 'राज्य में कम से कम 15 वर्षों का निरंतर निवास या राज्य में जन्म।',
      criteria_mr: 'राज्यात किमान १५ वर्षे सलग वास्तव्य किंवा राज्यात जन्म झालेला असावा.',
      verificationNote: 'Local revenue authority (Talathi / Tehsildar) conducts inquiry.',
      verificationNote_hi: 'तलाठी या तहसीलदार द्वारा पते और निवास की जांच की जाती है।',
      verificationNote_mr: 'तलाठी व तहसीलदार यांच्यामार्फत वास्तव्याची पडताळणी केली जाते.'
    },
    questions: [
      {
        id: 'domicile_residence_years',
        question: 'Have you been residing in this state for at least 15 continuous years?',
        question_hi: 'क्या आप इस राज्य में पिछले 15 वर्षों से लगातार रह रहे हैं?',
        question_mr: 'तुम्ही या राज्यात सलग १५ वर्षे किंवा त्याहून अधिक काळ राहत आहात का?',
        options: [
          { label: 'YES (15+ Years continuous stay)', label_hi: 'हाँ (15+ वर्ष निरंतर निवास)', label_mr: 'होय (१५+ वर्षे सलग वास्तव्य)', value: 'yes' },
          { label: 'NO (Less than 15 years)', label_hi: 'नहीं (15 वर्ष से कम)', label_mr: 'नाही (१५ वर्षांपेक्षा कमी)', value: 'no' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-address-continuous',
        name: 'Proof of 15 Years Residence (School Leaving / Rent Agreements / Electricity Bills)',
        name_hi: '15 वर्ष निवास का प्रमाण (स्कूल टीसी / बिजली बिल / किरायानामा)',
        name_mr: '१५ वर्षे वास्तव्याचा पुरावा (शाळा सोडल्याचा दाखला / वीज बिले / भाडे करार)',
        reason: 'Statutory evidentiary requirement for state domicile quota',
        reason_hi: 'राज्य अधिवास कोटे हेतु वैधानिक आवश्यकता',
        reason_mr: 'राज्य अधिवास आरक्षणासाठी वैधानिक पुरावा',
        mandatory: true
      },
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        name_hi: 'आधार कार्ड',
        name_mr: 'आधार कार्ड',
        reason: 'Identity and present address proof',
        reason_hi: 'पहचान और वर्तमान पते का प्रमाण',
        reason_mr: 'ओळख आणि सध्याच्या पत्त्याचा पुरावा',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-photo',
        name: 'Applicant Photograph',
        name_hi: 'आवेदक का फोटो',
        name_mr: 'अर्जदाराचे छायाचित्र',
        reason: 'Printed on digital certificate',
        reason_hi: 'प्रमाण पत्र पर मुद्रण हेतु',
        reason_mr: 'प्रमाणपत्रावर छपाईसाठी',
        mandatory: true
      }
    ],
    forms: [
      {
        formNumber: 'State Revenue Form - Domicile',
        title: 'Application for Certificate of Age, Nationality and Domicile',
        officialUrl: 'https://aaplesarkar.mahaonline.gov.in',
        printablePdf: 'assets/forms/domicile_application_form.pdf'
      }
    ],
    filledDemo: {
      title: 'Domicile Application Demo (MahaOnline)',
      disclaimer: 'DEMO ONLY — This example uses fictional information and must not be submitted as an actual application.',
      fields: [
        { label: 'District', value: 'Pune', tip: 'Revenue district where you reside' },
        { label: 'Taluka', value: 'Haveli', tip: 'Sub-district jurisdiction' },
        { label: 'Years of Residence', value: '18 Years', tip: 'Must be verified by school LC or utility bills' }
      ]
    },
    tutorial: [
      {
        step: 1,
        title: 'Open State e-District Portal',
        title_hi: 'राज्य ई-डिस्ट्रिक्ट पोर्टल खोलें',
        title_mr: 'राज्य ई-जिल्हा (आपले सरकार) पोर्टल उघडा',
        desc: 'Visit Aaple Sarkar (Maharashtra) or respective state e-District.',
        desc_hi: 'aaplesarkar.mahaonline.gov.in या संबंधित राज्य पोर्टल पर जाएं।',
        desc_mr: 'aaplesarkar.mahaonline.gov.in किंवा संबंधित राज्य पोर्टलवर जा.'
      },
      {
        step: 2,
        title: 'Select Revenue Department',
        title_hi: 'राजस्व विभाग चुनें',
        title_mr: 'महसूल विभाग निवडा',
        desc: 'Choose "Age, Nationality and Domicile Certificate".',
        desc_hi: '"आयु, राष्ट्रीयता एवं अधिवास प्रमाण पत्र" सेवा का चयन करें।',
        desc_mr: '"वय, अधिवास आणि राष्ट्रीयत्व प्रमाणपत्र" ही सेवा निवडा.'
      },
      {
        step: 3,
        title: 'Upload Proof of Residence & Self-Declaration',
        title_hi: 'निवास प्रमाण और स्व-घोषणा पत्र अपलोड करें',
        title_mr: 'वास्तव्याचा पुरावा व स्वयंघोषणापत्र अपलोड करा',
        desc: 'Attach school leaving certificate and utility records.',
        desc_hi: 'स्कूल छोड़ने का प्रमाण पत्र और बिजली बिल संलग्न करें।',
        desc_mr: 'शाळा सोडल्याचा दाखला आणि जुनी वीज बिले जोडा.'
      },
      {
        step: 4,
        title: 'Tehsildar Scrutiny & Issuance',
        title_hi: 'तहसीलदार जांच एवं प्रमाण पत्र जारी',
        title_mr: 'तहसीलदार पडताळणी आणि दाखला वितरण',
        desc: 'Tehsildar issues barcoded digital certificate within 15-21 days.',
        desc_hi: 'तहसीलदार द्वारा सत्यापन के बाद बारकोडेड डिजिटल प्रमाण पत्र 15-21 दिनों में जारी होता है।',
        desc_mr: 'तहसीलदारांच्या मान्यतेनंतर १५-२१ दिवसांत बारकोड असलेला डिजिटल दाखला मिळतो.'
      }
    ],
    verification: {
      signatureRequired: true,
      physicalVisitRequired: false,
      physicalVisitDesc: 'Typically 100% online through Aaple Sarkar / e-District. Physical verification only if Talathi flags document discrepancy.',
      physicalVisitDesc_hi: 'सामान्यतः पूरी प्रक्रिया ऑनलाइन है। विसंगति होने पर ही तलाठी द्वारा भौतिक जांच की जाती है।',
      physicalVisitDesc_mr: 'सामान्यतः प्रक्रिया पूर्णपणे ऑनलाईन आहे. कागदपत्रांमध्ये तफावत आढळल्यासच तलाठी कार्यालयात बोलावले जाते.',
      officialVerificationRequired: true,
      checklistItems: [
        'Self-declaration of residence',
        'School leaving certificate showing place of birth/residence',
        'Electricity bills / rent agreements covering continuous years'
      ],
      checklistItems_hi: [
        'निवास का स्व-घोषणा पत्र',
        'जन्म स्थान/निवास दर्शाने वाला स्कूल छोड़ने का प्रमाण पत्र',
        'निरंतर वर्षों के बिजली बिल या किराया समझौता'
      ],
      checklistItems_mr: [
        'रहिवासी स्वयंघोषणापत्र',
        'जन्मस्थान दर्शवणारा शाळा सोडल्याचा दाखला',
        'सलग १५ वर्षांची वीज बिले किंवा भाडे करार'
      ]
    },
    fees: '₹33 to ₹50 statutory state fee',
    processingTimeline: '15 to 21 working days (RTS Act)',
    onlineAvailable: true,
    officialPortal: 'https://aaplesarkar.mahaonline.gov.in',
    officialSource: 'Revenue and Forest Department, Government of Maharashtra / State e-Districts',
    helpline: '1800 120 8040 (State Citizen Call Centre)',
    lastVerified: '2026-03-01'
  },
  {
    id: 'income-certificate',
    name: 'Income Certificate (Revenue Department)',
    name_hi: 'आय प्रमाण पत्र (राजस्व विभाग)',
    name_mr: 'उत्पन्नाचा दाखला (महसूल विभाग)',
    type: 'certificate',
    category: 'cat-certificates',
    description: 'Official revenue document certifying the total annual income of an individual or family, essential for scholarships, fee concessions, and government welfare schemes.',
    description_hi: 'परिवार की कुल वार्षिक आय प्रमाणित करने वाला आधिकारिक राजस्व दस्तावेज़। छात्रवृत्ति, शुल्क छूट और सरकारी योजनाओं हेतु आवश्यक।',
    description_mr: 'व्यक्तीच्या किंवा कुटुंबाच्या एकूण वार्षिक उत्पन्नाची पुष्टी करणारा अधिकृत महसूल दाखला. शिष्यवृत्ती, फी सवलत आणि शासकीय योजनांसाठी आवश्यक.',
    keywords: ['income', 'income certificate', 'utpanna', 'aay praman patra', 'salary certificate', 'आय', 'आय प्रमाण पत्र', 'उत्पन्नाचा दाखला', 'उत्पन्न'],
    aliases: ['Income Certificate', 'Aay Praman Patra', 'उत्पन्नाचा दाखला', 'आय प्रमाण पत्र'],
    exampleQueries: [
      'I need an income certificate',
      'How to get income certificate online',
      'utpanna dakhla maharashtra',
      'income certificate'
    ],
    lifeEvents: ['student', 'financial-assistance'],
    stateApplicability: 'State Revenue Departments (e.g. Aaple Sarkar / e-District)',
    eligibility: {
      criteria: 'Citizen residing in the revenue jurisdiction with verifiable income sources.',
      criteria_hi: 'सत्यापन योग्य आय स्रोतों के साथ संबंधित अधिकार क्षेत्र में रहने वाला नागरिक।',
      criteria_mr: 'महसूल अधिकारक्षेत्रात राहणारा आणि उत्पन्नाचे वैध पुरावे असलेला नागरिक.',
      verificationNote: 'Issued after Talathi / Circle Officer verification.',
      verificationNote_hi: 'तलाठी और राजस्व अधिकारी की जांच के बाद जारी।',
      verificationNote_mr: 'तलाठी आणि मंडळ अधिकाऱ्यांच्या अहवालानंतर जारी केला जातो.'
    },
    questions: [
      {
        id: 'income_period',
        question: 'Do you require a 1-year or 3-year Income Certificate?',
        question_hi: 'क्या आपको 1 वर्ष का आय प्रमाण पत्र चाहिए या 3 वर्ष का?',
        question_mr: 'तुम्हाला १ वर्षाचा उत्पन्नाचा दाखला हवा आहे की ३ वर्षांचा?',
        options: [
          { label: '1 Year Certificate (General)', label_hi: '1 वर्ष का प्रमाण पत्र', label_mr: '१ वर्षाचा दाखला (सर्वसाधारण)', value: '1yr' },
          { label: '3 Year Certificate (Scholarship / Education)', label_hi: '3 वर्ष का प्रमाण पत्र (छात्रवृत्ति हेतु)', label_mr: '३ वर्षांचा दाखला (शिष्यवृत्ती / शिक्षण)', value: '3yr' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-income-proof',
        name: 'Income Proof (Salary Slip / Form 16 / Income Affidavit)',
        name_hi: 'आय का प्रमाण (वेतन पर्ची / फॉर्म 16 / शपथ पत्र)',
        name_mr: 'उत्पन्नाचा पुरावा (पगार पावती / फॉर्म १६ / प्रतिज्ञापत्र)',
        reason: 'Statutory verification of annual income',
        reason_hi: 'वार्षिक आय का वैधानिक सत्यापन',
        reason_mr: 'वार्षिक उत्पन्नाची कायदेशीर पडताळणी',
        mandatory: true
      },
      {
        id: 'doc-ration',
        name: 'Ration Card',
        name_hi: 'राशन कार्ड',
        name_mr: 'रेशन कार्ड',
        reason: 'Proof of family members and household status',
        reason_hi: 'परिवार के सदस्यों और स्थिति का प्रमाण',
        reason_mr: 'कुटुंबातील सदस्य संख्या व स्थितीचा पुरावा',
        mandatory: true
      },
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        name_hi: 'आधार कार्ड',
        name_mr: 'आधार कार्ड',
        reason: 'Identity and address proof',
        reason_hi: 'पहचान एवं पते का प्रमाण',
        reason_mr: 'ओळख व पत्त्याचा पुरावा',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      }
    ],
    forms: [
      {
        formNumber: 'Income Application Form',
        title: 'Application for Income Certificate (Tehsildar)',
        officialUrl: 'https://aaplesarkar.mahaonline.gov.in',
        printablePdf: 'assets/forms/income_certificate_form.pdf'
      }
    ],
    filledDemo: {
      title: 'Income Certificate Demo Application',
      disclaimer: 'DEMO ONLY — This example uses fictional information and must not be submitted as an actual application.',
      fields: [
        { label: 'Applicant Name', value: 'Prakash M. Patil', tip: 'Family head or student' },
        { label: 'Total Annual Income', value: '₹95,000', tip: 'Sum of all family sources' },
        { label: 'Purpose', value: 'Government Scholarship Application', tip: 'Reason for issuance' }
      ]
    },
    tutorial: [
      {
        step: 1,
        title: 'Visit State Revenue Portal',
        title_hi: 'राज्य राजस्व पोर्टल पर जाएं',
        title_mr: 'राज्य महसूल पोर्टल उघडा',
        desc: 'Log in to Aaple Sarkar or your state e-District portal.',
        desc_hi: 'आपले सरकार या राज्य ई-डिस्ट्रिक्ट पोर्टल पर लॉगिन करें।',
        desc_mr: 'आपले सरकार किंवा राज्य ई-जिल्हा पोर्टलवर लॉगिन करा.'
      },
      {
        step: 2,
        title: 'Select Income Certificate',
        title_hi: 'आय प्रमाण पत्र सेवा चुनें',
        title_mr: 'उत्पन्नाचा दाखला सेवा निवडा',
        desc: 'Select Revenue Department -> Income Certificate.',
        desc_hi: 'राजस्व विभाग के अंतर्गत "आय प्रमाण पत्र" चुनें।',
        desc_mr: 'महसूल विभागांतर्गत "उत्पन्नाचा दाखला" पर्याय निवडा.'
      },
      {
        step: 3,
        title: 'Submit Income Details & Upload Proof',
        title_hi: 'आय विवरण भरें एवं साक्ष्य अपलोड करें',
        title_mr: 'उत्पन्नाचा तपशील भरा व पुरावे अपलोड करा',
        desc: 'Upload salary slip/affidavit, ration card, and self-declaration.',
        desc_hi: 'वेतन पर्ची, शपथ पत्र और राशन कार्ड संलग्न करें।',
        desc_mr: 'पगार पावती, प्रतिज्ञापत्र आणि रेशन कार्ड जोडा.'
      },
      {
        step: 4,
        title: 'Download Certificate',
        title_hi: 'प्रमाण पत्र डाउनलोड करें',
        title_mr: 'दाखला डाउनलोड करा',
        desc: 'Receive digital certificate signed by Tehsildar within 15 days.',
        desc_hi: 'तहसीलदार द्वारा हस्ताक्षरित डिजिटल प्रमाण पत्र 15 दिनों में प्राप्त करें।',
        desc_mr: 'तहसीलदारांची डिजिटल स्वाक्षरी असलेला दाखला १५ दिवसांत डाउनलोड करा.'
      }
    ],
    verification: {
      signatureRequired: true,
      physicalVisitRequired: false,
      physicalVisitDesc: 'Online process. Inquiry conducted through Talathi report.',
      physicalVisitDesc_hi: 'प्रक्रिया ऑनलाइन है। तलाठी जांच रिपोर्ट के आधार पर जारी।',
      physicalVisitDesc_mr: 'प्रक्रिया ऑनलाईन आहे. तलाठी यांच्या अहवालानुसार दाखला दिला जातो.',
      officialVerificationRequired: true,
      checklistItems: [
        'Salary slip or self-declared income affidavit',
        'Ration card copy',
        'Aadhaar card copy'
      ],
      checklistItems_hi: [
        'वेतन पर्ची या आय शपथ पत्र',
        'राशन कार्ड की प्रति',
        'आधार कार्ड की प्रति'
      ],
      checklistItems_mr: [
        'पगार पावती किंवा उत्पन्नाचे प्रतिज्ञापत्र',
        'रेशन कार्डाची प्रत',
        'आधार कार्डाची प्रत'
      ]
    },
    fees: '₹33 statutory processing fee',
    processingTimeline: '15 working days (Guaranteed under RTS Act)',
    onlineAvailable: true,
    officialPortal: 'https://aaplesarkar.mahaonline.gov.in',
    officialSource: 'Revenue and District Administration',
    helpline: '1800 120 8040 (State Citizen Call Centre)',
    lastVerified: '2026-03-01'
  },
  {
    id: 'caste-certificate',
    name: 'Caste Certificate (Social Justice Department)',
    name_hi: 'जाति प्रमाण पत्र (सामाजिक न्याय विभाग)',
    name_mr: 'जात प्रमाणपत्र (सामाजिक न्याय विभाग)',
    type: 'certificate',
    category: 'cat-certificates',
    description: 'Statutory proof of belonging to a specific scheduled caste, scheduled tribe, or other backward class (SC/ST/OBC/SEBC) for constitutional reservation benefits.',
    description_hi: 'संवैधानिक आरक्षण लाभों हेतु अनुसूचित जाति, जनजाति या पिछड़े वर्ग की सदस्यता प्रमाणित करने वाला आधिकारिक दस्तावेज़।',
    description_mr: 'घटनात्मक आरक्षणाच्या लाभांसाठी अनुसूचित जाती, जमाती किंवा इतर मागासवर्गीय प्रवर्गाचे (SC/ST/OBC) अधिकृत जात प्रमाणपत्र.',
    keywords: ['caste', 'caste certificate', 'jaati', 'sc', 'st', 'obc', 'reservation', 'जाति', 'जात', 'जातीचा दाखला', 'जात प्रमाणपत्र'],
    aliases: ['Caste Certificate', 'Jaati Praman Patra', 'जातीचा दाखला', 'जात प्रमाणपत्र'],
    exampleQueries: [
      'I need a caste certificate',
      'Apply for OBC certificate',
      'SC ST caste certificate online',
      'caste certificate'
    ],
    lifeEvents: ['student', 'job-seeker'],
    stateApplicability: 'State Social Welfare & Revenue Departments',
    eligibility: {
      criteria: 'Citizen belonging to notified SC/ST/VJNT/OBC/SBC community with ancestral domicile proof in the state prior to qualifying cutoff year.',
      criteria_hi: 'अधिसूचित जाति/वर्ग से संबंधित नागरिक जिसके पास कट-ऑफ वर्ष से पूर्व का पारिवारिक साक्ष्य हो।',
      criteria_mr: 'अधिसूचित प्रवर्गातील नागरिक ज्यांच्याकडे विहित वर्षापूर्वीचा (उदा. १९६१/१९६७) कौटुंबिक पुरावा आहे.',
      verificationNote: 'Sub-Divisional Officer (SDO) scrutiny and genealogical verification required.',
      verificationNote_hi: 'उप-विभागीय अधिकारी (SDO) द्वारा वंशावली सत्यापन आवश्यक।',
      verificationNote_mr: 'उपविभागीय अधिकारी (प्रांत अधिकारी) यांच्याकडून वंशावळीची पडताळणी केली जाते.'
    },
    questions: [
      {
        id: 'caste_category',
        question: 'Which social category do you belong to?',
        question_hi: 'आप किस सामाजिक श्रेणी से संबंधित हैं?',
        question_mr: 'तुम्ही कोणत्या सामाजिक प्रवर्गाशी संबंधित आहात?',
        options: [
          { label: 'SC / ST (Scheduled Caste / Tribe)', label_hi: 'अनुसूचित जाति / जनजाति (SC / ST)', label_mr: 'अनुसूचित जाती / जमाती (SC / ST)', value: 'sc_st' },
          { label: 'OBC / VJNT / SBC (Other Backward Classes)', label_hi: 'अन्य पिछड़ा वर्ग (OBC / VJNT)', label_mr: 'इतर मागासवर्ग (OBC / VJNT / SBC)', value: 'obc' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-caste-proof-ancestor',
        name: 'Father / Grandfather / Relative School LC showing Caste',
        name_hi: 'पिता/दादाजी के स्कूल छोड़ने का प्रमाण पत्र (जाति उल्लेख सहित)',
        name_mr: 'वडील/आजोबा/नातेवाईक यांचा जात नोंद असलेला शाळा सोडल्याचा दाखला',
        reason: 'Mandatory statutory proof of caste lineage prior to cutoff year',
        reason_hi: 'कट-ऑफ वर्ष से पहले की जाति वंशावली का अनिवार्य साक्ष्य',
        reason_mr: 'विहित वर्षापूर्वीचा जातीच्या वंशावळीचा वैधानिक पुरावा',
        mandatory: true
      },
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        name_hi: 'आधार कार्ड',
        name_mr: 'आधार कार्ड',
        reason: 'Identity and address proof',
        reason_hi: 'पहचान एवं पते का प्रमाण',
        reason_mr: 'ओळख व पत्त्याचा पुरावा',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-affidavit',
        name: 'Affidavit of Caste Lineage (Form 3)',
        name_hi: 'जाति वंशावली शपथ पत्र',
        name_mr: 'जातीचे व वंशावळीचे प्रतिज्ञापत्र',
        reason: 'Statutory citizen declaration of community',
        reason_hi: 'संवैधानिक जाति घोषणा',
        reason_mr: 'कायदेशीर जात स्वयंघोषणा',
        mandatory: true
      }
    ],
    forms: [
      {
        formNumber: 'Caste Application Form',
        title: 'Application for Caste Certificate (SDO)',
        officialUrl: 'https://aaplesarkar.mahaonline.gov.in',
        printablePdf: 'assets/forms/caste_certificate_form.pdf'
      }
    ],
    filledDemo: {
      title: 'Caste Certificate Demo Application',
      disclaimer: 'DEMO ONLY — This example uses fictional information and must not be submitted as an actual application.',
      fields: [
        { label: 'Applicant Name', value: 'Siddharth R. Kamble', tip: 'Applicant legal name' },
        { label: 'Caste & Category', value: 'Mahar (SC)', tip: 'As recorded in ancestor school records' },
        { label: 'Cutoff Year Proof', value: 'Grandfather Primary School Record (1950)', tip: 'Valid historical proof' }
      ]
    },
    tutorial: [
      {
        step: 1,
        title: 'Register on State e-District Portal',
        title_hi: 'राज्य पोर्टल पर पंजीकरण करें',
        title_mr: 'राज्य पोर्टलवर नोंदणी करा',
        desc: 'Log in to Aaple Sarkar or state portal and choose Social Justice.',
        desc_hi: 'आपले सरकार पोर्टल पर सामाजिक न्याय विभाग चुनें।',
        desc_mr: 'आपले सरकार पोर्टलवर सामाजिक न्याय व विशेष सहाय्य विभाग निवडा.'
      },
      {
        step: 2,
        title: 'Fill Lineage Details',
        title_hi: 'वंशावली विवरण भरें',
        title_mr: 'वंशावळीचा तपशील भरा',
        desc: 'Enter father/grandfather lineage details and historical domicile.',
        desc_hi: 'पिता व पूर्वजों के विवरण और ऐतिहासिक निवास की जानकारी दर्ज करें।',
        desc_mr: 'वडील, आजोबा आणि मूळ गाव यांचा तपशील नोंदवा.'
      },
      {
        step: 3,
        title: 'Upload Historical Proofs',
        title_hi: 'ऐतिहासिक दस्तावेज़ अपलोड करें',
        title_mr: 'जुने शैक्षणिक पुरावे जोडा',
        desc: 'Upload pre-cutoff school records and caste affidavit.',
        desc_hi: 'कट-ऑफ वर्ष से पूर्व के स्कूल रिकॉर्ड और शपथ पत्र संलग्न करें।',
        desc_mr: 'जुने शाळा सोडल्याचे दाखले आणि प्रतिज्ञापत्र अपलोड करा.'
      },
      {
        step: 4,
        title: 'Scrutiny & Issuance',
        title_hi: 'जांच एवं प्रमाण पत्र निर्गमन',
        title_mr: 'तपासणी व दाखला वितरण',
        desc: 'SDO reviews file and issues barcoded Caste Certificate within 45 days.',
        desc_hi: 'उप-विभागीय अधिकारी (SDO) द्वारा 45 दिनों में प्रमाण पत्र जारी किया जाता है।',
        desc_mr: 'उपविभागीय अधिकारी (SDO) यांच्या मान्यतेनंतर डिजिटल दाखला जारी होतो.'
      }
    ],
    verification: {
      signatureRequired: true,
      physicalVisitRequired: false,
      physicalVisitDesc: 'Generally online. Hearing at SDO office only if document linkage is ambiguous.',
      physicalVisitDesc_hi: 'प्रक्रिया ऑनलाइन है। दस्तावेज़ों में संदेह होने पर ही व्यक्तिगत सुनवाई।',
      physicalVisitDesc_mr: 'प्रक्रिया ऑनलाईन आहे. पुराव्यांमध्ये संदिग्धता असल्यास सुनावणीसाठी बोलावले जाते.',
      officialVerificationRequired: true,
      checklistItems: [
        'Ancestor school leaving certificate showing caste',
        'Caste lineage affidavit',
        'Aadhaar and residence proof'
      ],
      checklistItems_hi: [
        'जाति दर्शाने वाला पूर्वज का स्कूल प्रमाण पत्र',
        'जाति वंशावली शपथ पत्र',
        'आधार और निवास प्रमाण'
      ],
      checklistItems_mr: [
        'जात नोंद असलेला पूर्वजांचा शाळा सोडल्याचा दाखला',
        'वंशावळीचे प्रतिज्ञापत्र',
        'आधार आणि रहिवासी पुरावा'
      ]
    },
    fees: '₹33 to ₹50 statutory fee',
    processingTimeline: '30 to 45 working days',
    onlineAvailable: true,
    officialPortal: 'https://aaplesarkar.mahaonline.gov.in',
    officialSource: 'Social Justice and Special Assistance Department',
    helpline: '1800 120 8040 (State Citizen Call Centre)',
    lastVerified: '2026-03-01'
  },
  {
    id: 'msme-udyam',
    name: 'MSME Udyam Registration (Start a Business)',
    name_hi: 'एमएसएमई उद्यम पंजीकरण (नया व्यवसाय / दुकान)',
    name_mr: 'एमएसएमई उद्यम नोंदणी (नवीन व्यवसाय / उद्योग)',
    type: 'service',
    category: 'cat-business',
    description: 'Zero-cost paperless government registration for Micro, Small and Medium Enterprises to access collateral-free loans, subsidies, and government tenders.',
    description_hi: 'सूक्ष्म, लघु एवं मध्यम उद्यमों के लिए निःशुल्क पेपरलेस सरकारी पंजीकरण। बिना गारंटी ऋण, सब्सिडी और सरकारी टेंडर हेतु आवश्यक।',
    description_mr: 'सूक्ष्म, लघू व मध्यम उद्योगांसाठी विनाशुल्क डिजिटल नोंदणी. विनातारण कर्ज, शासकीय अनुदाने आणि टेंडरसाठी आवश्यक.',
    keywords: ['business', 'start a business', 'msme', 'udyam', 'enterprise', 'company registration', 'startup', 'shop', 'उद्योग', 'उद्यम', 'व्यवसाय', 'दुकान'],
    aliases: ['Udyam Registration', 'MSME Certificate', 'Udyog Aadhaar', 'उद्यम नोंदणी', 'एमएसएमई'],
    exampleQueries: [
      'I want to start a business',
      'What registrations do I need to start a shop or business?',
      'MSME registration online',
      'udyam registration',
      'start a business'
    ],
    lifeEvents: ['start-business'],
    stateApplicability: 'All States (Ministry of MSME, Govt of India)',
    eligibility: {
      criteria: 'Any enterprise meeting Micro (Investment < ₹1 Cr, Turnover < ₹5 Cr), Small, or Medium criteria.',
      criteria_hi: 'सूक्ष्म (निवेश < ₹1 करोड़, टर्नओवर < ₹5 करोड़), लघु या मध्यम उद्यम के मानदंडों को पूरा करने वाला कोई भी उद्यम।',
      criteria_mr: 'सूक्ष्म (गुंतवणूक < ₹१ कोटी, उलाढाल < ₹५ कोटी), लघू किंवा मध्यम निकष पूर्ण करणारा कोणताही व्यवसाय.',
      verificationNote: 'Paperless, based on self-declaration linked with Aadhaar and PAN.',
      verificationNote_hi: 'आधार और पैन से लिंक स्व-घोषणा पर आधारित पूरी तरह पेपरलेस।',
      verificationNote_mr: 'आधार आणि पॅनशी जोडलेल्या स्वयंघोषणावर आधारित पूर्णपणे पेपरलेस.'
    },
    questions: [
      {
        id: 'udyam_gst',
        question: 'Do you already have a GSTIN for your proposed enterprise?',
        question_hi: 'क्या आपके पास प्रस्तावित व्यवसाय के लिए जीएसटी नंबर (GSTIN) है?',
        question_mr: 'तुमच्या प्रस्तावित व्यवसायासाठी जीएसटी क्रमांक (GSTIN) आहे का?',
        options: [
          { label: 'Yes, I have GSTIN', label_hi: 'हाँ, मेरे पास GSTIN है', label_mr: 'होय, माझ्याकडे जीएसटी क्रमांक आहे', value: 'yes_gst' },
          { label: 'No GSTIN (Exempted / Turnover below ₹40L)', label_hi: 'नहीं (छूट प्राप्त / टर्नओवर ₹40L से कम)', label_mr: 'नाही (सवलत / उलाढाल ₹४० लाखांपेक्षा कमी)', value: 'no_gst' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Proprietor / Partner Aadhaar Card',
        name_hi: 'मालिक / साझेदार का आधार कार्ड',
        name_mr: 'मालक / भागीदार यांचे आधार कार्ड',
        reason: 'Primary authentication for Udyam e-portal',
        reason_hi: 'उद्यम पोर्टल पर प्राथमिक प्रमाणीकरण हेतु',
        reason_mr: 'उद्यम पोर्टलवर प्राथमिक प्रमाणीकरणासाठी',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-pan',
        name: 'PAN Card of Business / Proprietor',
        name_hi: 'व्यवसाय या मालिक का पैन कार्ड',
        name_mr: 'व्यवसाय किंवा मालकाचे पॅन कार्ड',
        reason: 'Financial tracking and tax linking',
        reason_hi: 'वित्तीय रिकॉर्ड और कर जोड़ने हेतु',
        reason_mr: 'आर्थिक नोंदी आणि कर जोडणीसाठी',
        mandatory: true,
        matchKey: 'PAN Card'
      }
    ],
    forms: [
      {
        formNumber: 'Udyam Registration e-Form',
        title: 'New Entrepreneurs Online Registration Form',
        officialUrl: 'https://udyamregistration.gov.in',
        printablePdf: 'assets/forms/udyam_sample_form.pdf'
      }
    ],
    filledDemo: {
      title: 'Udyam Registration Demo Form',
      disclaimer: 'DEMO ONLY — This example uses fictional information and must not be submitted as an actual application.',
      fields: [
        { label: 'Name of Enterprise', value: 'Sahara Tech Solutions', tip: 'Commercial trade name' },
        { label: 'Major Activity', value: 'Services (Software Development)', tip: 'Manufacturing or Services' },
        { label: 'Bank Account Number', value: '918020034123445', tip: 'Business or proprietor active savings/current account' }
      ]
    },
    tutorial: [
      {
        step: 1,
        title: 'Visit Udyam Official Portal',
        title_hi: 'उद्यम आधिकारिक पोर्टल खोलें',
        title_mr: 'उद्यम अधिकृत पोर्टल उघडा',
        desc: 'Go to udyamregistration.gov.in (Beware of fraudulent fake portals).',
        desc_hi: 'udyamregistration.gov.in पर जाएं (फर्जी वेबसाइटों से सावधान रहें)।',
        desc_mr: 'udyamregistration.gov.in वर जा (बनावट संकेतस्थळांपासून सावध राहा).'
      },
      {
        step: 2,
        title: 'Validate Aadhaar & PAN',
        title_hi: 'आधार एवं पैन सत्यापित करें',
        title_mr: 'आधार व पॅन पडताळणी करा',
        desc: 'Enter 12-digit Aadhaar and verify OTP.',
        desc_hi: '12 अंकों का आधार दर्ज करें और ओटीपी सत्यापित करें।',
        desc_mr: '१२ अंकी आधार टाका आणि ओटीपी प्रमाणित करा.'
      },
      {
        step: 3,
        title: 'Enter Business Details',
        title_hi: 'व्यावसायिक विवरण भरें',
        title_mr: 'व्यवसायाचा तपशील भरा',
        desc: 'Fill business address, NIC 5-digit code, and employee count.',
        desc_hi: 'व्यवसाय का पता, एनआईसी कोड और कर्मचारियों की संख्या भरें।',
        desc_mr: 'व्यवसायाचा पत्ता, एनआयसी कोड आणि कर्मचाऱ्यांची संख्या नोंदवा.'
      },
      {
        step: 4,
        title: 'Instant Udyam Certificate',
        title_hi: 'तुरंत उद्यम प्रमाण पत्र डाउनलोड करें',
        title_mr: 'तात्काळ उद्यम प्रमाणपत्र डाउनलोड करा',
        desc: 'Download official lifetime valid Udyam Registration Certificate with QR Code.',
        desc_hi: 'क्यूआर कोड युक्त आजीवन वैध आधिकारिक उद्यम प्रमाण पत्र डाउनलोड करें।',
        desc_mr: 'क्यूआर कोड असलेले आजीवन वैध अधिकृत उद्यम नोंदणी प्रमाणपत्र डाउनलोड करा.'
      }
    ],
    verification: {
      signatureRequired: false,
      physicalVisitRequired: false,
      physicalVisitDesc: 'Completely paperless and digital. No office visit required.',
      physicalVisitDesc_hi: 'पूरी तरह से डिजिटल एवं पेपरलेस। किसी कार्यालय जाने की आवश्यकता नहीं है।',
      physicalVisitDesc_mr: 'पूर्णपणे डिजिटल आणि पेपरलेस. कोणत्याही कार्यालयात जाण्याची गरज नाही.',
      officialVerificationRequired: true,
      checklistItems: [
        'Aadhaar number with registered mobile',
        'PAN card number',
        'Bank account details and IFSC code'
      ],
      checklistItems_hi: [
        'रजिस्टर्ड मोबाइल से जुड़ा आधार नंबर',
        'पैन कार्ड नंबर',
        'बैंक खाता विवरण और IFSC कोड'
      ],
      checklistItems_mr: [
        'मोबाईलशी लिंक असलेला आधार क्रमांक',
        'पॅन कार्ड क्रमांक',
        'बँक खाते क्रमांक आणि IFSC कोड'
      ]
    },
    fees: '100% Free of Cost (Govt charges zero fee for Udyam)',
    processingTimeline: 'Instant to 24 hours',
    onlineAvailable: true,
    officialPortal: 'https://udyamregistration.gov.in',
    officialSource: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    helpline: '011 2306 1500 (MSME Helpdesk)',
    lastVerified: '2026-03-01'
  }
];
