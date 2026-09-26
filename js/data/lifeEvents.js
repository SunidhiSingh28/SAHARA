/**
 * SAHARA Life Events / Situations Dataset
 * Human situations mapped to relevant citizen services and welfare schemes.
 */

export const LIFE_EVENTS_DATA = [
  {
    id: 'baby-born',
    title: 'My baby was born',
    subtitle: 'Birth registration, child Aadhaar, vaccinations & maternity benefits',
    icon: '👶',
    suggestedServices: ['birth-certificate', 'aadhaar-card'],
    suggestedSchemes: ['scheme-pmmvy', 'scheme-ayushman-bharat'],
    smartQuestions: [
      {
        id: 'delivery_place',
        question: 'Was your baby delivered in a hospital or at home?',
        options: [
          { label: 'Hospital / Nursing Home', value: 'hospital' },
          { label: 'At Home', value: 'home' }
        ]
      },
      {
        id: 'maternity_scheme_interest',
        question: 'Is this the mother’s first or second child delivery (for PMMVY cash benefit)?',
        options: [
          { label: 'First Child (Eligible for ₹5,000)', value: 'first_child' },
          { label: 'Second Child (Girl Child ₹6,000)', value: 'second_girl' },
          { label: 'Not applying for maternity cash assistance', value: 'none' }
        ]
      }
    ]
  },
  {
    id: 'turned-18',
    title: 'I turned 18',
    subtitle: 'Voter ID, PAN card, Driving Licence & adult identity essentials',
    icon: '🎉',
    suggestedServices: ['voter-id', 'pan-card', 'driving-licence'],
    suggestedSchemes: [],
    smartQuestions: [
      {
        id: 'turned_18_priority',
        question: 'Which adult identity document do you need first?',
        options: [
          { label: 'Voter ID (Election Card)', value: 'voter' },
          { label: 'PAN Card (For Banking & Tax)', value: 'pan' },
          { label: 'Driving Licence (Two-wheeler / Car)', value: 'dl' }
        ]
      }
    ]
  },
  {
    id: 'retired',
    title: 'I retired',
    subtitle: 'Senior pensions, healthcare cards & retirement benefits discovery',
    icon: '👴',
    suggestedServices: [],
    suggestedSchemes: ['scheme-senior-pension', 'scheme-ayushman-bharat'],
    smartQuestions: [
      {
        id: 'pension_type',
        question: 'Did you retire from government service, private sector, or unorganized work?',
        options: [
          { label: 'Government / PSU (Central/State Pension)', value: 'govt' },
          { label: 'Private Sector (EPFO / EPS Pension)', value: 'private' },
          { label: 'Unorganized / Self-Employed (Senior Citizen Pension)', value: 'unorganized' }
        ]
      }
    ]
  },
  {
    id: 'moved-city',
    title: 'I moved to a new city / state',
    subtitle: 'Address update, domicile certificate, voter migration & ration card transfer',
    icon: '🚚',
    suggestedServices: ['domicile-certificate', 'voter-id'],
    suggestedSchemes: [],
    smartQuestions: [
      {
        id: 'move_type',
        question: 'Did you move within the same state or to a different state (e.g. Maharashtra)?',
        options: [
          { label: 'To a different State (Need Domicile / Address Update)', value: 'inter_state' },
          { label: 'Within same state / city (Simple address update)', value: 'intra_state' }
        ]
      }
    ]
  },
  {
    id: 'start-business',
    title: 'I want to start a business',
    subtitle: 'MSME Udyam registration, PAN, GST & enterprise startup guidance',
    icon: '💼',
    suggestedServices: ['msme-udyam', 'pan-card'],
    suggestedSchemes: [],
    smartQuestions: [
      {
        id: 'business_type',
        question: 'What kind of business are you starting?',
        options: [
          { label: 'Proprietorship / Small Shop / Service (Udyam)', value: 'micro' },
          { label: 'Private Limited Company / LLP (MCA)', value: 'company' }
        ]
      }
    ]
  },
  {
    id: 'farmer',
    title: 'I am a farmer',
    subtitle: 'PM-KISAN income assistance, crop insurance & agriculture subsidies',
    icon: '🌾',
    suggestedServices: [],
    suggestedSchemes: ['scheme-pm-kisan'],
    smartQuestions: [
      {
        id: 'farmer_land_status',
        question: 'Do you have cultivable agricultural land registered in your own name?',
        options: [
          { label: 'Yes, land record is in my name (PM-KISAN eligible)', value: 'yes' },
          { label: 'Tenant farmer / Shared land', value: 'tenant' }
        ]
      }
    ]
  },
  {
    id: 'travel-abroad',
    title: 'I want to travel abroad',
    subtitle: 'Passport application, police verification & international travel readiness',
    icon: '✈️',
    suggestedServices: ['passport-service'],
    suggestedSchemes: [],
    smartQuestions: [
      {
        id: 'travel_urgency',
        question: 'How urgently do you need your passport?',
        options: [
          { label: 'Normal application (15-30 days)', value: 'normal' },
          { label: 'Tatkaal urgent processing (3-7 days)', value: 'tatkaal' }
        ]
      }
    ]
  },
  {
    id: 'bought-vehicle',
    title: 'I bought a vehicle',
    subtitle: 'Learner’s license, permanent DL, RC transfer & RTO clearances',
    icon: '🛵',
    suggestedServices: ['driving-licence'],
    suggestedSchemes: [],
    smartQuestions: [
      {
        id: 'vehicle_dl_check',
        question: 'Do you currently hold an active Driving Licence?',
        options: [
          { label: 'No, I need a new Learner’s Licence', value: 'no' },
          { label: 'Yes, need vehicle class addition', value: 'yes' }
        ]
      }
    ]
  },
  {
    id: 'lost-doc',
    title: 'I lost an important document',
    subtitle: 'Duplicate Voter ID, reprint PAN, lost passport FIR & Aadhaar recovery',
    icon: '🔍',
    suggestedServices: ['aadhaar-card', 'pan-card', 'voter-id', 'driving-licence'],
    suggestedSchemes: [],
    smartQuestions: [
      {
        id: 'lost_doc_name',
        question: 'Which document did you lose?',
        options: [
          { label: 'Aadhaar Card (Reprint / UID recovery)', value: 'aadhaar' },
          { label: 'PAN Card (Reprint)', value: 'pan' },
          { label: 'Voter ID (EPIC replacement)', value: 'voter' },
          { label: 'Driving Licence (Duplicate DL)', value: 'dl' },
          { label: 'Passport (Requires Police Lost Report)', value: 'passport' }
        ]
      }
    ]
  },
  {
    id: 'student',
    title: 'I am a student',
    subtitle: 'Scholarships, domicile certificate for quota & education loans',
    icon: '🎓',
    suggestedServices: ['domicile-certificate'],
    suggestedSchemes: [],
    smartQuestions: [
      {
        id: 'student_need',
        question: 'What do you require for your studies or college admissions?',
        options: [
          { label: 'State Domicile Certificate (Quota admissions)', value: 'domicile' },
          { label: 'Income Certificate (Fee concession / scholarship)', value: 'income' }
        ]
      }
    ]
  }
];
