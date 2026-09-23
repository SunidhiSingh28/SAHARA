/**
 * SAHARA Global Configuration & Asset Integration Hooks
 * 
 * Instructions for User / Asset Integrator:
 * 1. Place your Sahara logo into `assets/logo.svg` or `assets/logo.png`.
 * 2. If you have an intro animation (Lottie JSON, MP4, WebM, or GIF),
 *    place it into `assets/intro-animation.json` or `assets/intro-anim.webm`
 *    and configure INTRO_ANIMATION_SOURCE below.
 */

export const SAHARA_CONFIG = {
  appName: 'SAHARA',
  version: '1.0.0-prototype',

  // Visual Asset Placeholder Hooks
  assets: {
    logoPath: null, // Set to 'assets/logo.svg' once uploaded
    introAnimationPath: null, // Set to 'assets/intro.mp4' or lottie once uploaded
    introDurationMs: 2400, // Duration before automatic smooth transition into main app
  },

  // Storage Keys
  storageKeys: {
    language: 'sahara_selected_language',
    userContext: 'sahara_user_context',
    userDocuments: 'sahara_mock_documents',
    savedCases: 'sahara_saved_cases',
  },

  // Default Mock Documents in User's Vault for Hackathon Testing
  defaultDocuments: [
    {
      id: 'doc-aadhaar',
      name: 'Aadhaar Card',
      category: 'Identity & Address',
      verifiedStatus: true,
      lastUpdated: '2026-01-15',
      note: 'Mock Demo Document — Verified via UIDAI Sandbox'
    },
    {
      id: 'doc-address',
      name: 'Address Proof (Electricity Bill)',
      category: 'Address Proof',
      verifiedStatus: true,
      lastUpdated: '2026-02-10',
      note: 'Mock Demo Document'
    },
    {
      id: 'doc-pan',
      name: 'PAN Card',
      category: 'Financial Identity',
      verifiedStatus: true,
      lastUpdated: '2025-11-20',
      note: 'Mock Demo Document'
    }
  ],

  // Demo Tracked Case for Flow 3 (Staff Delay & Official Grievance Demonstration)
  demoTrackedCase: {
    referenceNumber: 'DEMO-MH-2026-98124',
    serviceId: 'domicile-certificate',
    serviceName: 'Domicile / Residence Certificate',
    department: 'Revenue & District Administration (MahaOnline / Aaple Sarkar)',
    applicantName: 'Citizen Demo',
    submissionDate: '2026-08-12',
    officialProcessingTimelineDays: 21, // 21 days standard timeline under Right to Public Services Act
    daysElapsed: 42, // Well beyond the official timeline!
    currentStatus: 'under_verification',
    currentStageText: 'Under Verification with Talathi / Circle Officer',
    history: [
      { step: 'Application Submitted Online', date: '2026-08-12 10:15 AM', completed: true },
      { step: 'Document Scrutiny Completed', date: '2026-08-14 03:30 PM', completed: true },
      { step: 'Field / Local Verification Assigned', date: '2026-08-18 11:00 AM', completed: true },
      { step: 'Under Verification with Local Officer', date: 'Pending since 2026-08-22', active: true, completed: false },
      { step: 'Sub-Divisional Magistrate / Tehsildar Approval', date: 'Pending', completed: false },
      { step: 'Digital Certificate Issuance', date: 'Pending', completed: false }
    ],
    officialHelpline: '1800 120 8040 (Aaple Sarkar Toll-Free)',
    grievancePortals: [
      {
        name: 'Aaple Sarkar Grievance Redressal Portal (State)',
        url: 'https://grievances.maharashtra.gov.in',
        description: 'Lodge formal escalation under Maharashtra Right to Public Services Act (RTS)'
      },
      {
        name: 'CPGRAMS (Centralized Public Grievance Redress And Monitoring System)',
        url: 'https://pgportal.gov.in',
        description: 'National portal for grievances against delayed public administration'
      },
      {
        name: 'District Collector Grievance Day (Lokshahi Din)',
        url: 'https://maharashtra.gov.in',
        description: 'First Monday of every month direct citizen hearing'
      }
    ]
  }
};
