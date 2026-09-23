/**
 * SAHARA Citizen Services Master Dataset
 * Structured records following official Indian government citizen services criteria.
 */

export const SERVICES_DATA = [
  {
    id: 'voter-id',
    name: 'Voter ID (Electors Photo Identity Card - EPIC)',
    type: 'service',
    category: 'cat-identity',
    description: 'Official voter identity card issued by the Election Commission of India (ECI) for all eligible citizens aged 18 and above.',
    keywords: ['voter', 'election', 'vote', 'epic', 'matdan', 'election card', 'voter card', 'form 6', 'voting'],
    aliases: ['Election Card', 'Matdata Card', 'Form 6 Online', 'EPIC'],
    exampleQueries: [
      'I want to make a voter ID',
      'I turned 18 and want to vote',
      'Mujhe voter card banana hai',
      'I need something so I can vote',
      'How to apply for election card'
    ],
    lifeEvents: ['turned-18', 'moved-city', 'lost-doc'],
    stateApplicability: 'All States & Union Territories (Election Commission of India)',
    eligibility: {
      criteria: 'Must be an Indian Citizen, aged 18 or above on the qualifying date, and ordinarily resident at the registered address.',
      verificationNote: 'Eligibility is automatically validated against age proof and local BLO (Booth Level Officer) physical verification.'
    },
    questions: [
      {
        id: 'voter_existing_card',
        question: 'Do you already have a Voter ID card?',
        options: [
          { label: 'No, this is my first time', value: 'new' },
          { label: 'Yes, need update or correction', value: 'correction' },
          { label: 'Yes, but I lost it', value: 'replacement' }
        ]
      },
      {
        id: 'voter_age_confirm',
        question: 'Have you completed 18 years of age or turning 18 this year?',
        condition: (ctx) => !ctx.ageKnown,
        options: [
          { label: 'YES (18 or above)', value: 'yes' },
          { label: 'NO (Under 18)', value: 'no' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-photo',
        name: 'Recent Passport Size Photograph',
        reason: 'Required for printing on the EPIC Voter Card (White background, 200kb)',
        mandatory: true,
        originalRequired: false,
        printable: true
      },
      {
        id: 'doc-age',
        name: 'Age Proof (Birth Certificate / 10th Marksheet / Aadhaar)',
        reason: 'To officially prove date of birth and age eligibility (18+)',
        mandatory: true,
        originalRequired: false,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-address',
        name: 'Address Proof (Electricity Bill / Water Bill / Aadhaar)',
        reason: 'To assign correct Assembly Constituency & Polling Station',
        mandatory: true,
        originalRequired: false,
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
      { step: 1, title: 'Open Official ECI Portal', desc: 'Visit voters.eci.gov.in and click "New registration for general electors (Form 6)".' },
      { step: 2, title: 'Mobile OTP Authentication', desc: 'Sign up using your mobile number and authenticate with SMS OTP.' },
      { step: 3, title: 'Fill Form 6 & Upload Documents', desc: 'Enter basic identity, address details, and upload photo, age proof, and address proof.' },
      { step: 4, title: 'Reference Number Generation', desc: 'Upon submission, a reference ID (e.g. F6XXXXXXXXX) is generated for status tracking.' },
      { step: 5, title: 'BLO Verification Visit', desc: 'Your local Booth Level Officer (BLO) will conduct physical address verification.' },
      { step: 6, title: 'Card Delivery & e-EPIC Download', desc: 'Download digital e-EPIC immediately upon approval; physical speed-post delivery follows.' }
    ],
    verification: {
      signatureRequired: true,
      physicalVisitRequired: true,
      physicalVisitDesc: 'Physical verification by Booth Level Officer (BLO) visiting your residence or appointment at local ERO office.',
      officialVerificationRequired: true,
      checklistItems: [
        'Signed Form 6 or online acknowledgment printout',
        'Self-attested photocopy of Age Proof',
        'Self-attested photocopy of Address Proof',
        '1 Extra passport-size color photograph'
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
    id: 'birth-certificate',
    name: 'Birth Certificate Registration & Issuance',
    type: 'certificate',
    category: 'cat-certificates',
    description: 'Statutory birth registration document under the Registration of Births and Deaths Act. Foundational identity for school, passport, and Aadhaar.',
    keywords: ['baby', 'birth', 'child', 'infant', 'born', 'newborn', 'janam praman patra', 'delivery hospital'],
    aliases: ['Janam Praman Patra', 'CRS Birth Certificate'],
    exampleQueries: [
      'My baby was born. What do I need to do?',
      'How to get birth certificate for my newborn child',
      'Bacha hua hai birth certificate kaise banaye'
    ],
    lifeEvents: ['baby-born'],
    stateApplicability: 'State Municipal Corporations / Gram Panchayats / CRS Portal (crsorgi.gov.in)',
    eligibility: {
      criteria: 'Birth occurred in India. Must be reported within 21 days for standard zero-penalty registration.',
      verificationNote: 'Requires institutional discharge slip or hospital delivery certificate.'
    },
    questions: [
      {
        id: 'birth_location',
        question: 'Where was the child delivered?',
        options: [
          { label: 'Hospital or Nursing Home', value: 'hospital' },
          { label: 'At Home', value: 'home' }
        ]
      },
      {
        id: 'birth_timing',
        question: 'Has it been more than 21 days since the birth?',
        options: [
          { label: 'Within 21 days (Standard)', value: 'within21' },
          { label: '21 to 30 days (Late fee applies)', value: 'late' },
          { label: 'More than 1 year (Magistrate order required)', value: 'delayed_magistrate' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-hospital-slip',
        name: 'Hospital Discharge Summary / Delivery Intimation Slip',
        reason: 'Official proof of date, time, sex, and place of delivery issued by medical officer',
        mandatory: true
      },
      {
        id: 'doc-parents-id',
        name: 'Aadhaar / ID Card of Both Parents',
        reason: 'To record parental identities in the national civil registry',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-marriage-cert',
        name: 'Marriage Certificate / Joint Declaration',
        reason: 'For regularizing parental names in municipal records',
        mandatory: false
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
      { step: 1, title: 'Obtain Hospital Intimation Slip', desc: 'Hospital issues Form 1 intimation directly or hands over discharge certificate.' },
      { step: 2, title: 'Submit to Municipal / Panchayat Ward', desc: 'Submit at the local Municipal Corporation ward (e.g. BMC/MCGM) or CRS portal.' },
      { step: 3, title: 'Registrar Verification', desc: 'Municipal health officer cross-verifies institutional records.' },
      { step: 4, title: 'Download Digitally Signed Certificate', desc: 'Download digital QR-coded birth certificate from crsorgi.gov.in or State portal.' }
    ],
    verification: {
      signatureRequired: true,
      physicalVisitRequired: false,
      physicalVisitDesc: 'Institutional births are automated online. Home births require ward health inspector physical visit.',
      officialVerificationRequired: true,
      checklistItems: [
        'Hospital discharge slip in original',
        'Photocopies of parents’ Aadhaar cards',
        'Form 1 filled and signed by parents'
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
    id: 'passport-service',
    name: 'Ordinary Fresh Passport (Passport Seva)',
    type: 'service',
    category: 'cat-travel',
    description: 'Official Indian Travel Document issued by Ministry of External Affairs for international travel and global citizenship proof.',
    keywords: ['passport', 'travel abroad', 'foreign', 'visa', 'passport seva', 'tatkaal', 'psk'],
    aliases: ['Indian Passport', 'Passport Seva Kendra Application'],
    exampleQueries: [
      'I want to make a passport',
      'I want to travel abroad. What do I need?',
      'How to apply for passport in India'
    ],
    lifeEvents: ['travel-abroad', 'turned-18'],
    stateApplicability: 'All States (Ministry of External Affairs, Govt of India)',
    eligibility: {
      criteria: 'Citizen of India by birth, descent, or registration without disqualifying criminal proceedings.',
      verificationNote: 'Strict police verification required for normal fresh applications.'
    },
    questions: [
      {
        id: 'passport_type',
        question: 'Are you applying for a fresh passport or re-issuing an expired one?',
        options: [
          { label: 'Fresh Passport (First time)', value: 'fresh' },
          { label: 'Re-issue (Renewal / Pages exhausted)', value: 'reissue' }
        ]
      },
      {
        id: 'passport_scheme',
        question: 'Which processing speed do you require?',
        options: [
          { label: 'Normal (Standard 15-30 days)', value: 'normal' },
          { label: 'Tatkaal (Urgent 1-3 days)', value: 'tatkaal' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card (with updated address and photo)',
        reason: 'Accepted as primary proof of identity, address, and date of birth',
        mandatory: true,
        originalRequired: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-pan',
        name: 'PAN Card',
        reason: 'Secondary financial identity document',
        mandatory: false,
        matchKey: 'PAN Card'
      },
      {
        id: 'doc-education',
        name: '10th Standard / Matriculation Certificate',
        reason: 'Required to qualify for ECNR (Emigration Check Not Required) category',
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
      { step: 1, title: 'Register on Passport Seva Portal', desc: 'Create account at passportindia.gov.in and select nearest RPO.' },
      { step: 2, title: 'Fill Application Online', desc: 'Complete identity, family, address, and emergency contact details.' },
      { step: 3, title: 'Pay Fee & Book PSK Slot', desc: 'Pay ₹1,500 online and select appointment date at Passport Seva Kendra.' },
      { step: 4, title: 'Visit PSK for Biometrics', desc: 'Visit PSK on scheduled date with all original documents for fingerprint/photo.' },
      { step: 5, title: 'Local Police Verification', desc: 'Local police station will conduct physical domicile check.' },
      { step: 6, title: 'Speed Post Delivery', desc: 'Track via India Post tracking number; received within 7-20 days.' }
    ],
    verification: {
      signatureRequired: true,
      physicalVisitRequired: true,
      physicalVisitDesc: 'Mandatory physical visit to Passport Seva Kendra (PSK) for biometric capture, plus Police Station physical verification.',
      officialVerificationRequired: true,
      checklistItems: [
        'Printed Application Receipt with Appointment Time',
        'Original Aadhaar Card and 2 self-attested photocopies',
        'Original 10th Certificate (for Non-ECR) and 2 photocopies',
        'Original PAN Card'
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
    type: 'service',
    category: 'cat-finance',
    description: '10-digit alphanumeric identifier issued by the Income Tax Department. Essential for banking, tax returns, and financial transactions.',
    keywords: ['pan', 'pan card', 'income tax', 'tin nsdl', 'utiitsl', 'instant pan', 'e-pan'],
    aliases: ['e-PAN', 'Form 49A Application'],
    exampleQueries: [
      'I want to apply for a PAN card',
      'How to make PAN card online',
      'Instant pan card with aadhaar'
    ],
    lifeEvents: ['turned-18', 'new-job', 'start-business'],
    stateApplicability: 'All States (Income Tax Department / Protean / UTIITSL)',
    eligibility: {
      criteria: 'Any individual residing in India with valid proof of identity and address.',
      verificationNote: 'Paperless Instant e-PAN is free if Aadhaar is linked with active mobile number.'
    },
    questions: [
      {
        id: 'pan_has_aadhaar',
        question: 'Do you have an Aadhaar card linked to your current mobile phone?',
        options: [
          { label: 'YES (Instant Paperless e-PAN)', value: 'yes' },
          { label: 'NO (Physical document submission)', value: 'no' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card with Mobile Linkage',
        reason: 'Used for e-KYC instant biometric/OTP authentication',
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
      { step: 1, title: 'Visit Income Tax e-Filing Portal', desc: 'Open incometax.gov.in and click "Instant e-PAN".' },
      { step: 2, title: 'Enter Aadhaar Number', desc: 'Submit 12-digit Aadhaar and validate OTP received on registered mobile.' },
      { step: 3, title: 'Confirm Details', desc: 'Accept data fetched automatically from UIDAI.' },
      { step: 4, title: 'Instant e-PAN Download', desc: 'Download digitally signed 100% valid e-PAN PDF within 10 minutes.' }
    ],
    verification: {
      signatureRequired: false,
      physicalVisitRequired: false,
      physicalVisitDesc: 'Completely paperless online via Aadhaar e-KYC. No physical visit needed.',
      officialVerificationRequired: true,
      checklistItems: [
        'Active mobile phone to receive Aadhaar OTP',
        'Valid 12-digit Aadhaar number'
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
    type: 'service',
    category: 'cat-travel',
    description: 'Official authorization to drive motor vehicles in India, managed through Ministry of Road Transport and Highways (MoRTH).',
    keywords: ['driving licence', 'dl', 'learner licence', 'll', 'bike', 'car', 'rto', 'sarathi', 'driving license'],
    aliases: ['Driving License', 'Sarathi DL', 'Learners Licence'],
    exampleQueries: [
      'I want to make a driving license',
      'I turned 18 and want to ride a bike',
      'Learner license online apply'
    ],
    lifeEvents: ['turned-18', 'bought-vehicle'],
    stateApplicability: 'State Transport Departments / Sarathi Parivahan',
    eligibility: {
      criteria: 'Aged 16+ for gearless 50cc two-wheelers; Aged 18+ for light motor vehicles (car/motorcycle with gear).',
      verificationNote: 'Contactless online LL test available in most states with Aadhaar authentication.'
    },
    questions: [
      {
        id: 'dl_stage',
        question: 'Do you already hold a valid Learner’s Licence (LL)?',
        options: [
          { label: 'No, I need a new Learner’s Licence', value: 'need_ll' },
          { label: 'Yes, I want to take the permanent DL driving test', value: 'have_ll' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        reason: 'Proof of age and address for contactless online test',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-medical',
        name: 'Form 1 Self-Declaration of Physical Fitness',
        reason: 'Medical fitness verification',
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
      { step: 1, title: 'Visit Sarathi Parivahan', desc: 'Open sarathi.parivahan.gov.in and select your State.' },
      { step: 2, title: 'Select Apply for Learner Licence', desc: 'Choose Aadhaar-authenticated paperless application.' },
      { step: 3, title: 'Complete Online Road Safety Video', desc: 'Watch mandatory road safety tutorial.' },
      { step: 4, title: 'Take Online LL Test', desc: 'Attempt 15 questions from your home computer/phone camera.' },
      { step: 5, title: 'Download LL Immediately', desc: 'Download official digital Learner Licence valid for 6 months.' }
    ],
    verification: {
      signatureRequired: true,
      physicalVisitRequired: false,
      physicalVisitDesc: 'Learner Licence is paperless online from home. Permanent DL requires one physical driving test at RTO track.',
      officialVerificationRequired: true,
      checklistItems: [
        'Learner Licence slot booking receipt',
        'Original Aadhaar card',
        'Valid helmet and vehicle for driving skill test (for permanent DL)'
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
    id: 'domicile-certificate',
    name: 'Residence / Domicile Certificate',
    type: 'certificate',
    category: 'cat-certificates',
    description: 'Official state proof verifying continuous residence in a particular State (e.g. Maharashtra, UP, Karnataka) for quota admissions and state jobs.',
    keywords: ['domicile', 'residence certificate', 'adivasi', 'niwas praman patra', 'resident', 'local quota'],
    aliases: ['Niwas Praman Patra', 'State Residence Certificate'],
    exampleQueries: [
      'I moved to Maharashtra. What documents do I need to update?',
      'How to get domicile certificate in Maharashtra',
      'Need domicile for college admission'
    ],
    lifeEvents: ['moved-city', 'student'],
    stateApplicability: 'State Specific (e.g. Aaple Sarkar in Maharashtra, e-District in other states)',
    eligibility: {
      criteria: 'Continuous residence in the state for minimum specified period (e.g. 15 years in Maharashtra) or state-born.',
      verificationNote: 'Local revenue authority (Talathi / Tehsildar) conducts inquiry.'
    },
    questions: [
      {
        id: 'domicile_residence_years',
        question: 'Have you been residing in this state for at least 15 continuous years?',
        options: [
          { label: 'YES (15+ Years continuous stay)', value: 'yes' },
          { label: 'NO (Less than 15 years)', value: 'no' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-address-continuous',
        name: 'Proof of 15 Years Residence (School Leaving / Rent Agreements / Electricity Bills)',
        reason: 'Statutory evidentiary requirement for state domicile quota',
        mandatory: true
      },
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        reason: 'Identity and present address proof',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-photo',
        name: 'Applicant Photograph',
        reason: 'Printed on digital certificate',
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
      { step: 1, title: 'Open State e-District Portal', desc: 'Visit Aaple Sarkar (Maharashtra) or respective state e-District.' },
      { step: 2, title: 'Select Revenue Department', desc: 'Choose "Age, Nationality and Domicile Certificate".' },
      { step: 3, title: 'Upload Proof of Residence & Self-Declaration', desc: 'Attach school leaving certificate and utility records.' },
      { step: 4, title: 'Tehsildar Scrutiny & Issuance', desc: 'Tehsildar issues barcoded digital certificate within 15-21 days.' }
    ],
    verification: {
      signatureRequired: true,
      physicalVisitRequired: false,
      physicalVisitDesc: 'Typically 100% online through Aaple Sarkar / e-District. Physical verification only if Talathi flags document discrepancy.',
      officialVerificationRequired: true,
      checklistItems: [
        'Self-declaration of residence',
        'School leaving certificate showing place of birth/residence',
        'Electricity bills / rent agreements covering continuous years'
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
    id: 'msme-udyam',
    name: 'MSME Udyam Registration (Start a Business)',
    type: 'service',
    category: 'cat-business',
    description: 'Zero-cost paperless government registration for Micro, Small and Medium Enterprises to access collateral-free loans, subsidies, and government tenders.',
    keywords: ['business', 'start a business', 'msme', 'udyam', 'enterprise', 'company registration', 'startup', 'shop'],
    aliases: ['Udyam Registration', 'MSME Certificate', 'Udyog Aadhaar'],
    exampleQueries: [
      'I want to start a business',
      'What registrations do I need to start a shop or business?',
      'MSME registration online'
    ],
    lifeEvents: ['start-business'],
    stateApplicability: 'All States (Ministry of MSME, Govt of India)',
    eligibility: {
      criteria: 'Any enterprise meeting Micro (Investment < ₹1 Cr, Turnover < ₹5 Cr), Small, or Medium criteria.',
      verificationNote: 'Paperless, based on self-declaration linked with Aadhaar and PAN.'
    },
    questions: [
      {
        id: 'udyam_gst',
        question: 'Do you already have a GSTIN for your proposed enterprise?',
        options: [
          { label: 'Yes, I have GSTIN', value: 'yes_gst' },
          { label: 'No GSTIN (Exempted / Turnover below ₹40L)', value: 'no_gst' }
        ]
      }
    ],
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Proprietor / Partner Aadhaar Card',
        reason: 'Primary authentication for Udyam e-portal',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-pan',
        name: 'PAN Card of Business / Proprietor',
        reason: 'Financial tracking and tax linking',
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
      { step: 1, title: 'Visit Udyam Official Portal', desc: 'Go to udyamregistration.gov.in (Beware of fraudulent fake portals).' },
      { step: 2, title: 'Validate Aadhaar & PAN', desc: 'Enter 12-digit Aadhaar and verify OTP.' },
      { step: 3, title: 'Enter Business Details', desc: 'Fill business address, NIC 5-digit code, and employee count.' },
      { step: 4, title: 'Instant Udyam Certificate', desc: 'Download official lifetime valid Udyam Registration Certificate with QR Code.' }
    ],
    verification: {
      signatureRequired: false,
      physicalVisitRequired: false,
      physicalVisitDesc: 'Completely paperless and digital. No office visit required.',
      officialVerificationRequired: true,
      checklistItems: [
        'Aadhaar number with registered mobile',
        'PAN card number',
        'Bank account details and IFSC code'
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
