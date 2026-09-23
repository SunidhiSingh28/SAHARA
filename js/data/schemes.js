/**
 * SAHARA Government Schemes & Benefits Dataset
 * Automatically recommended based on citizen situation, occupation, age, or life event.
 * Never isolated into a disconnected "Schemes" button on the homepage.
 */

export const SCHEMES_DATA = [
  {
    id: 'scheme-pmmvy',
    name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    type: 'scheme',
    category: 'cat-women-child',
    description: 'Direct cash incentive scheme of ₹5,000 to ₹6,000 for pregnant women and lactating mothers to compensate for wage loss and promote child health.',
    keywords: ['baby', 'pregnant', 'mother', 'born', 'maternity', 'delivery benefit', 'infant', 'child'],
    aliases: ['PMMVY Maternity Benefit', 'Pradhan Mantri Matritva Vandana Yojana'],
    lifeEvents: ['baby-born'],
    benefits: '₹5,000 in two instalments for first child; ₹6,000 for second child if girl child via DBT directly to mother’s bank account.',
    eligibility: {
      criteria: 'Pregnant and lactating mothers who deliver in registered health facilities and register the pregnancy/birth.',
      verificationNote: 'Subject to MCP (Mother and Child Protection) card and institutional verification.'
    },
    documents: [
      {
        id: 'doc-mcp-card',
        name: 'MCP (Mother and Child Protection) Card',
        reason: 'Proof of ante-natal check-up (ANC) and child vaccinations',
        mandatory: true
      },
      {
        id: 'doc-mother-aadhaar',
        name: 'Mother’s Aadhaar Card (DBT-linked bank account)',
        reason: 'Mandatory for direct benefit transfer',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-birth-cert',
        name: 'Child’s Birth Certificate',
        reason: 'Proof of live delivery',
        mandatory: true
      }
    ],
    forms: [
      {
        formNumber: 'PMMVY Form 1A',
        title: 'Application for First Instalment Registration',
        officialUrl: 'https://pmmvy.wcd.gov.in',
        printablePdf: 'assets/forms/pmmvy_form1a.pdf'
      }
    ],
    tutorial: [
      { step: 1, title: 'Visit Anganwadi / Health Sub-Centre', desc: 'Register at your local Anganwadi Centre or PMMVY portal (pmmvy.wcd.gov.in).' },
      { step: 2, title: 'Submit Form 1A with MCP Card', desc: 'Provide copy of MCP card showing at least one ANC checkup.' },
      { step: 3, title: 'Direct Benefit Transfer (DBT)', desc: 'Funds transferred directly into mother’s Aadhaar-seeded bank account.' }
    ],
    verification: {
      signatureRequired: true,
      physicalVisitRequired: true,
      physicalVisitDesc: 'Verified through local Anganwadi Worker (AWW) or ASHA worker in your locality.',
      officialVerificationRequired: true,
      checklistItems: [
        'Mother’s Aadhaar Card',
        'Husband’s Aadhaar Card',
        'Mother’s bank passbook (Aadhaar linked)',
        'MCP Card copy'
      ]
    },
    officialPortal: 'https://pmmvy.wcd.gov.in',
    officialSource: 'Ministry of Women and Child Development, Govt of India',
    helpline: '1098 / 011-23382393',
    lastVerified: '2026-03-01'
  },
  {
    id: 'scheme-pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    type: 'scheme',
    category: 'cat-agriculture',
    description: 'Central sector scheme providing income support of ₹6,000 per year in 3 equal instalments of ₹2,000 to all landholding farmer families across India.',
    keywords: ['farmer', 'kisan', 'agriculture', 'farming', 'cropland', 'kisan samman nidhi', 'pm kisan'],
    aliases: ['PM Kisan Samman Nidhi', 'Kisan Yojana'],
    lifeEvents: ['farmer'],
    benefits: '₹6,000 per year paid directly into bank accounts via Aadhaar DBT in three instalments of ₹2,000 each.',
    eligibility: {
      criteria: 'Small and marginal landholder farmer families with cultivable landholding in their name (excluding institutional landholders and income tax payees).',
      verificationNote: 'Requires state land record (7/12 extract / Khatauni) verification and Aadhaar e-KYC.'
    },
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card with e-KYC',
        reason: 'Mandatory Aadhaar verification for DBT credit',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-land-record',
        name: 'Land Record Document (Khatauni / 7/12 Extract)',
        reason: 'Proof of cultivable landholding ownership',
        mandatory: true
      },
      {
        id: 'doc-bank-passbook',
        name: 'Bank Account Passbook / Statement',
        reason: 'To verify IFSC and account details',
        mandatory: true
      }
    ],
    forms: [
      {
        formNumber: 'PM-KISAN Farmer Registration',
        title: 'New Farmer Registration Online Form',
        officialUrl: 'https://pmkisan.gov.in',
        printablePdf: 'assets/forms/pmkisan_registration.pdf'
      }
    ],
    tutorial: [
      { step: 1, title: 'Open PM-KISAN Portal', desc: 'Visit pmkisan.gov.in and click "New Farmer Registration".' },
      { step: 2, title: 'Enter Aadhaar & State Selection', desc: 'Choose Rural or Urban farmer registration.' },
      { step: 3, title: 'Input Land Survey / Khasra Numbers', desc: 'Provide landholding details matching state revenue portal.' },
      { step: 4, title: 'Complete Biometric/OTP e-KYC', desc: 'Complete mandatory e-KYC on the portal or at nearest CSC.' }
    ],
    verification: {
      signatureRequired: false,
      physicalVisitRequired: false,
      physicalVisitDesc: 'Self-registration online. State nodal revenue officer conducts digital verification against land database.',
      officialVerificationRequired: true,
      checklistItems: [
        'Active Aadhaar number',
        'Valid landownership record in applicant’s name',
        'Aadhaar-linked active bank account'
      ]
    },
    officialPortal: 'https://pmkisan.gov.in',
    officialSource: 'Department of Agriculture and Farmers Welfare, Govt of India',
    helpline: '155261 / 1800 115 526 (PM-Kisan Toll-Free)',
    lastVerified: '2026-03-01'
  },
  {
    id: 'scheme-senior-pension',
    name: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
    type: 'benefit',
    category: 'cat-seniors',
    description: 'Monthly social security financial pension provided to senior citizens living in low-income or BPL households.',
    keywords: ['retired', 'pension', 'senior citizen', 'old age', 'elderly', 'retirement benefits', 'vridha pension'],
    aliases: ['Old Age Pension', 'Vridhavastha Pension', 'NSAP Senior Pension'],
    lifeEvents: ['retired'],
    benefits: 'Monthly cash pension (₹1,000 to ₹2,500/month depending on state top-up) credited directly to bank account.',
    eligibility: {
      criteria: 'Citizen aged 60 years or above belonging to a household living Below Poverty Line (BPL) or below state income ceiling.',
      verificationNote: 'Verified against local municipal/panchayat BPL register and age proof.'
    },
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card (Age Proof)',
        reason: 'Proof of age (60+) and identity',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-income',
        name: 'Income Certificate / BPL Ration Card',
        reason: 'Proof of low-income or BPL status',
        mandatory: true
      },
      {
        id: 'doc-bank',
        name: 'Bank / Post Office Savings Account Passbook',
        reason: 'Direct DBT pension credit',
        mandatory: true
      }
    ],
    forms: [
      {
        formNumber: 'NSAP Pension Form',
        title: 'Application for Old Age Pension Scheme',
        officialUrl: 'https://nsap.nic.in',
        printablePdf: 'assets/forms/nsap_senior_pension.pdf'
      }
    ],
    tutorial: [
      { step: 1, title: 'Verify Age & Income Eligibility', desc: 'Confirm you are 60+ and have an income certificate or BPL card.' },
      { step: 2, title: 'Apply at Taluka / Municipal Office or e-District', desc: 'Submit application via state social welfare portal or local Tehsildar office.' },
      { step: 3, title: 'Local Social Welfare Officer Scrutiny', desc: 'Field officer reviews eligibility.' },
      { step: 4, title: 'Sanction Order & Monthly Credit', desc: 'Sanction letter issued; monthly pension credited to bank account.' }
    ],
    verification: {
      signatureRequired: true,
      physicalVisitRequired: true,
      physicalVisitDesc: 'Verification through Taluka Social Welfare Officer or Panchayat Gram Sevak.',
      officialVerificationRequired: true,
      checklistItems: [
        'Aadhaar card photocopy',
        'Income certificate / BPL card',
        'Bank passbook photocopy showing IFSC',
        '2 Passport-size photographs'
      ]
    },
    officialPortal: 'https://nsap.nic.in',
    officialSource: 'Ministry of Rural Development & State Social Justice Departments',
    helpline: '1800 180 1551',
    lastVerified: '2026-03-01'
  },
  {
    id: 'scheme-ayushman-bharat',
    name: 'Ayushman Bharat PM-JAY (Health Insurance Benefit)',
    type: 'benefit',
    category: 'cat-health',
    description: 'World’s largest government-funded healthcare scheme offering ₹5,00,000 per family per year for secondary and tertiary care hospitalization across India.',
    keywords: ['health', 'hospital', 'medical', 'insurance', 'treatment', 'ayushman', 'pm-jay', 'free healthcare'],
    aliases: ['PM-JAY', 'Ayushman Card', 'Golden Card'],
    lifeEvents: ['retired', 'family', 'baby-born'],
    benefits: '₹5 Lakh cashless and paperless treatment per eligible family per year in empanelled public and private hospitals.',
    eligibility: {
      criteria: 'Families identified in SECC 2011 database or state-specific low-income / ration card databases, plus all citizens aged 70+ irrespective of income.',
      verificationNote: 'Instant eligibility check via mobile number, ration card, or Aadhaar on beneficiaries portal.'
    },
    documents: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        reason: 'Mandatory e-KYC verification',
        mandatory: true,
        matchKey: 'Aadhaar Card'
      },
      {
        id: 'doc-ration',
        name: 'Ration Card / NFSA Card',
        reason: 'Family composition and SECC link',
        mandatory: true
      }
    ],
    forms: [
      {
        formNumber: 'Online Ayushman e-KYC',
        title: 'PM-JAY Beneficiary Registration',
        officialUrl: 'https://beneficiary.nha.gov.in',
        printablePdf: 'assets/forms/ayushman_ekyc.pdf'
      }
    ],
    tutorial: [
      { step: 1, title: 'Visit beneficiary.nha.gov.in', desc: 'Login with your mobile number.' },
      { step: 2, title: 'Search Beneficiary Database', desc: 'Search by Aadhaar number, Ration card, or Family ID.' },
      { step: 3, title: 'Perform Aadhaar OTP e-KYC', desc: 'Authenticate using Aadhaar biometric or OTP.' },
      { step: 4, title: 'Download Ayushman Card', desc: 'Download official digital Ayushman Golden Card instantly.' }
    ],
    verification: {
      signatureRequired: false,
      physicalVisitRequired: false,
      physicalVisitDesc: 'Completely online or at any empanelled hospital Ayushman Mitra helpdesk.',
      officialVerificationRequired: true,
      checklistItems: [
        'Aadhaar card',
        'Ration card'
      ]
    },
    officialPortal: 'https://beneficiary.nha.gov.in',
    officialSource: 'National Health Authority (NHA), Ministry of Health and Family Welfare',
    helpline: '14555 (Ayushman Bharat 24x7 Toll-Free)',
    lastVerified: '2026-03-01'
  }
];
