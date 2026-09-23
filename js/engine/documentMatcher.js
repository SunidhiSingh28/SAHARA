/**
 * SAHARA Document Matching Engine
 * Safely compares required documents for any service against the citizen's local mock vault.
 * Respects user privacy — never transmits or exposes documents publicly.
 */

import { SAHARA_CONFIG } from '../config.js';

export class DocumentMatcher {
  constructor() {
    this.storageKey = SAHARA_CONFIG.storageKeys.userDocuments;
    this.initVault();
  }

  initVault() {
    const existing = localStorage.getItem(this.storageKey);
    if (!existing) {
      localStorage.setItem(this.storageKey, JSON.stringify(SAHARA_CONFIG.defaultDocuments));
    }
  }

  getVaultDocuments() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : SAHARA_CONFIG.defaultDocuments;
    } catch (e) {
      return SAHARA_CONFIG.defaultDocuments;
    }
  }

  addDocument(doc) {
    const list = this.getVaultDocuments();
    const newDoc = {
      id: 'doc-' + Date.now(),
      name: doc.name || 'Sample Document',
      category: doc.category || 'General',
      verifiedStatus: true,
      lastUpdated: new Date().toISOString().split('T')[0],
      note: 'Added for Prototype Demonstration'
    };
    list.push(newDoc);
    localStorage.setItem(this.storageKey, JSON.stringify(list));
    return newDoc;
  }

  removeDocument(id) {
    let list = this.getVaultDocuments();
    list = list.filter(d => d.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  /**
   * Matches service requirements against user's vault
   * @param {Array} requiredDocs - List of document objects from the service
   * @returns {Object} Matching analysis with availableDocs, missingDocs, and readinessScore
   */
  matchRequirements(requiredDocs = []) {
    const vault = this.getVaultDocuments();
    const vaultNames = vault.map(d => d.name.toLowerCase());

    const available = [];
    const missing = [];

    for (const req of requiredDocs) {
      // Check matchKey or name
      const reqName = (req.matchKey || req.name).toLowerCase();
      const isMatched = vaultNames.some(vn => vn.includes(reqName) || reqName.includes(vn));

      if (isMatched) {
        available.push({
          ...req,
          status: 'available',
          vaultMatch: vault.find(d => (req.matchKey || req.name).toLowerCase().includes(d.name.toLowerCase()) || d.name.toLowerCase().includes((req.matchKey || req.name).toLowerCase()))
        });
      } else {
        missing.push({
          ...req,
          status: 'missing'
        });
      }
    }

    const total = requiredDocs.length;
    const readinessScore = total > 0 ? Math.round((available.length / total) * 100) : 100;

    return {
      available,
      missing,
      total,
      readinessScore
    };
  }
}
