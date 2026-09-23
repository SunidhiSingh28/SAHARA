/**
 * SAHARA Smart Question Engine
 * Selects exactly ONE clear, high-leverage question at a time.
 * Skips all questions where the answer is already known from natural user input.
 */

export class SmartQuestionEngine {
  constructor() {
    this.sessionContext = {
      answers: {},
      extractedContext: {}
    };
  }

  reset() {
    this.sessionContext = {
      answers: {},
      extractedContext: {}
    };
  }

  setExtractedContext(ctx) {
    this.sessionContext.extractedContext = { ...this.sessionContext.extractedContext, ...ctx };
  }

  recordAnswer(questionId, value) {
    this.sessionContext.answers[questionId] = value;
  }

  /**
   * Determine the single next question to ask for a candidate service or life event
   * @param {Object} service - Service or Scheme or LifeEvent object
   * @returns {Object|null} The single most relevant question, or null if all essential info is known
   */
  getNextQuestion(item) {
    if (!item || !item.questions || !item.questions.length) {
      return null;
    }

    const { extractedContext, answers } = this.sessionContext;

    for (const q of item.questions) {
      // If already answered in this session, skip
      if (answers[q.id] !== undefined) {
        continue;
      }

      // Check rule-based bypass based on extracted context
      if (q.id === 'voter_existing_card') {
        if (extractedContext.intentType === 'replacement' || extractedContext.documentLost) {
          answers[q.id] = 'replacement';
          continue;
        }
        if (extractedContext.intentType === 'correction') {
          answers[q.id] = 'correction';
          continue;
        }
      }

      if (q.id === 'voter_age_confirm') {
        if (extractedContext.ageKnown && extractedContext.isAbove18 !== null) {
          answers[q.id] = extractedContext.isAbove18 ? 'yes' : 'no';
          continue;
        }
      }

      if (q.id === 'passport_type') {
        if (extractedContext.intentType === 'correction' || extractedContext.intentType === 'renewal') {
          answers[q.id] = 'reissue';
          continue;
        }
      }

      // Custom conditional check on the question definition
      if (typeof q.condition === 'function') {
        if (!q.condition(extractedContext)) {
          continue;
        }
      }

      // Return this single high-leverage question
      return {
        id: q.id,
        question: q.question,
        options: q.options
      };
    }

    return null;
  }
}
