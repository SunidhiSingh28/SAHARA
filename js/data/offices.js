/**
 * SAHARA Sample Verified Offline Office Records
 * Real government office locations with contact, working hours, and physical requirements.
 */

export const OFFICES_DATA = {
  'aadhaar-card': {
    officeName: 'Aadhaar Seva Kendra (UIDAI) / Head Post Office Enrolment Center',
    department: 'Unique Identification Authority of India (UIDAI), Ministry of Electronics & IT',
    address: 'Central Post Office Building, General Post Office (GPO), Fort, Mumbai 400001 (or local nearest ASK)',
    timings: 'Monday to Saturday: 9:30 AM - 5:30 PM (Sunday Closed)',
    helpline: '1947 (Toll-Free 24x7 UIDAI)',
    appointmentRequired: false,
    documentsToCarry: [
      'Original Proof of Identity (PoI) (Passport / PAN / Voter ID / Ration Card)',
      'Original Proof of Address (PoA) (Electricity Bill / Water Bill / Passbook / Rent Agreement)',
      'Original Date of Birth proof (Birth certificate or 10th marksheet)',
      'Online appointment confirmation slip (if booked on myaadhaar.uidai.gov.in)'
    ],
    officialWebsite: 'https://myaadhaar.uidai.gov.in',
    mapsQuery: 'Aadhaar Seva Kendra'
  },
  'voter-id': {
    officeName: 'District Election Office / Electoral Registration Office (ERO)',
    department: 'Election Commission of India / State Election Branch',
    address: 'Old Custom House, Shahid Bhagat Singh Road, Fort, Mumbai, Maharashtra 400001',
    timings: 'Monday to Friday: 10:00 AM - 5:30 PM (Closed on 2nd & 4th Saturdays)',
    helpline: '1950 (Toll-Free Voter Helpline)',
    appointmentRequired: false,
    documentsToCarry: [
      'Printed Form 6 acknowledgment receipt',
      'Original Age Proof (Birth Certificate / 10th Certificate)',
      'Original Address Proof (Electricity bill / Rent agreement)',
      '2 Recent passport-size photographs'
    ],
    officialWebsite: 'https://voters.eci.gov.in',
    mapsQuery: 'Electoral Registration Office Mumbai'
  },
  'passport-service': {
    officeName: 'Passport Seva Kendra (PSK Andheri)',
    department: 'Regional Passport Office, Ministry of External Affairs',
    address: 'The Great Oasis, D-13, MIDC, Andheri East, Mumbai, Maharashtra 400093',
    timings: 'Monday to Friday: 9:00 AM - 4:30 PM (Strict Appointment Slot Only)',
    helpline: '1800 258 1800 (National Passport Call Centre)',
    appointmentRequired: true,
    documentsToCarry: [
      'Appointment confirmation printout / SMS',
      'Original Aadhaar Card and 2 self-attested copies',
      'Original 10th Standard Marksheet / Passing Certificate',
      'Existing passport in original (if re-issue)'
    ],
    officialWebsite: 'https://www.passportindia.gov.in',
    mapsQuery: 'Passport Seva Kendra Andheri Mumbai'
  },
  'driving-licence': {
    officeName: 'Regional Transport Office (RTO Mumbai West - MH-02)',
    department: 'Motor Vehicles Department, Government of Maharashtra',
    address: 'D/111, Regional Transport Office, Behind Versova Police Station, Andheri West, Mumbai 400053',
    timings: 'Monday to Friday: 10:00 AM - 5:00 PM (Driving tests 10:30 AM - 3:00 PM)',
    helpline: '022 2636 6957 / 0120 492 5505',
    appointmentRequired: true,
    documentsToCarry: [
      'Learner’s Licence printout',
      'Slot booking appointment slip',
      'Original Aadhaar Card',
      'Vehicle with valid Insurance, PUC and RC for driving test'
    ],
    officialWebsite: 'https://sarathi.parivahan.gov.in',
    mapsQuery: 'RTO Andheri Mumbai'
  },
  'birth-certificate': {
    officeName: 'Municipal Health Department / Ward Office (CFC)',
    department: 'Public Health Department, Brihanmumbai Municipal Corporation (BMC)',
    address: 'Citizen Facilitation Centre (CFC), G/North Ward Office, Harishchandra Yelve Marg, Dadar West, Mumbai 400028',
    timings: 'Monday to Saturday: 9:00 AM - 4:30 PM',
    helpline: '1916 (BMC Citizen Helpline)',
    appointmentRequired: false,
    documentsToCarry: [
      'Hospital Discharge intimation slip in original',
      'Photocopies of parents’ Aadhaar cards',
      'Signed Form 1 Application'
    ],
    officialWebsite: 'https://crsorgi.gov.in',
    mapsQuery: 'BMC Ward Office Citizen Facilitation Centre Dadar'
  },
  'domicile-certificate': {
    officeName: 'Tehsildar Office / Setu Suvidha Kendra',
    department: 'Revenue & District Collectorate, Govt of Maharashtra',
    address: 'Sub-Divisional Magistrate & Tehsildar Office, Old Treasury Building, Mumbai Suburban District 400051',
    timings: 'Monday to Friday: 10:30 AM - 5:00 PM',
    helpline: '1800 120 8040 (Aaple Sarkar Toll-Free)',
    appointmentRequired: false,
    documentsToCarry: [
      'MahaOnline application printout',
      'School Leaving Certificate / Birth Certificate showing 15 years in state',
      '15 years continuous residence proof (utility bills / rent agreements)',
      'Self-Declaration affidavit'
    ],
    officialWebsite: 'https://aaplesarkar.mahaonline.gov.in',
    mapsQuery: 'Tehsildar Office Bandra Mumbai Suburban'
  },
  'pan-card': {
    officeName: 'Protean TIN-FC / UTIITSL PAN Service Center',
    department: 'Income Tax Department / Facilitation Center',
    address: 'Income Tax Office Building / Nearest Authorized NSDL TIN-FC Center',
    timings: 'Monday to Friday: 9:30 AM - 5:30 PM',
    helpline: '1800 180 1961 (Income Tax Toll-Free)',
    appointmentRequired: false,
    documentsToCarry: [
      'Original Aadhaar Card',
      '2 Passport size photographs',
      'Filled Form 49A'
    ],
    officialWebsite: 'https://www.incometax.gov.in',
    mapsQuery: 'NSDL TIN Facilitation Center Mumbai'
  },
  'ration-card': {
    officeName: 'District Food and Civil Supplies Office / Rationing Office',
    department: 'Food, Civil Supplies and Consumer Protection Department',
    address: 'Zonal Rationing Office / Tehsil Food Supply Section',
    timings: 'Monday to Friday: 10:00 AM - 4:30 PM',
    helpline: '1967 / 1800 22 4950 (NFSA Toll-Free)',
    appointmentRequired: false,
    documentsToCarry: [
      'Aadhaar cards of all family members',
      'Address proof (Electricity bill / LPG connection slip)',
      'Income certificate of head of household',
      'Surrender / Deletion certificate (if migrating)'
    ],
    officialWebsite: 'https://mahafood.gov.in',
    mapsQuery: 'Rationing Office Mumbai'
  },
  'income-certificate': {
    officeName: 'Tehsildar Office / Setu Suvidha Kendra / MahaOnline Center',
    department: 'Revenue & District Administration',
    address: 'Taluka Tehsildar Office / Citizen Service Center (CSC)',
    timings: 'Monday to Friday: 10:00 AM - 5:00 PM',
    helpline: '1800 120 8040 (Aaple Sarkar Helpline)',
    appointmentRequired: false,
    documentsToCarry: [
      'Salary slip / Form 16 / Income declaration affidavit',
      'Aadhaar Card and Ration Card',
      'Bank statement (last 6 months)'
    ],
    officialWebsite: 'https://aaplesarkar.mahaonline.gov.in',
    mapsQuery: 'Tehsildar Office Citizen Facilitation Center'
  },
  'caste-certificate': {
    officeName: 'Sub-Divisional Officer (SDO) / Tehsildar Office',
    department: 'Social Justice & Revenue Department',
    address: 'Sub-Divisional Magistrate (SDM) / Revenue Division Office',
    timings: 'Monday to Friday: 10:00 AM - 5:00 PM',
    helpline: '1800 120 8040 (State Citizen Call Centre)',
    appointmentRequired: false,
    documentsToCarry: [
      'Primary school leaving certificate showing caste/sub-caste',
      'Father / Grandfather school leaving certificate / genealogical records',
      'Aadhaar card and residential proof',
      'Affidavit of caste lineage'
    ],
    officialWebsite: 'https://aaplesarkar.mahaonline.gov.in',
    mapsQuery: 'Sub Divisional Officer Revenue Office'
  },
  'msme-udyam': {
    officeName: 'District Industries Centre (DIC) / MSME Development Institute',
    department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    address: 'District Industries Centre (DIC) / MSME-DI, Saki Naka, Kurla Andheri Road, Mumbai 400072',
    timings: 'Monday to Friday: 9:30 AM - 5:30 PM',
    helpline: '011 2306 1500 (MSME Helpdesk)',
    appointmentRequired: false,
    documentsToCarry: [
      'Aadhaar card of enterprise owner',
      'PAN card of business or proprietor',
      'Bank passbook / cancelled cheque showing account number & IFSC'
    ],
    officialWebsite: 'https://udyamregistration.gov.in',
    mapsQuery: 'District Industries Centre Mumbai'
  }
};
