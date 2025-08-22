const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async analyzeImage(imageBase64, prompt, analysisType = 'general') {
    try {
      const imagePrompt = this.getAnalysisPrompt(analysisType, prompt);

      const imagePart = {
        inlineData: {
          data: imageBase64,
          mimeType: 'image/jpeg',
        },
      };

      const result = await this.model.generateContent([imagePrompt, imagePart]);
      const response = await result.response;

      return {
        success: true,
        analysis: response.text(),
        confidence: this.calculateConfidence(response.text()),
        recommendations: this.extractRecommendations(response.text()),
      };
    } catch (error) {
      console.error('Gemini AI Analysis Error:', error);
      return {
        success: false,
        error: error.message,
        analysis: null,
      };
    }
  }

  async analyzeText(prompt, context = '') {
    try {
      const fullPrompt = context ? `Context: ${context}\n\nPrompt: ${prompt}` : prompt;
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;

      return {
        success: true,
        response: response.text(),
      };
    } catch (error) {
      console.error('Gemini AI Text Analysis Error:', error);
      return {
        success: false,
        error: error.message,
        response: null,
      };
    }
  }

  getAnalysisPrompt(analysisType, userPrompt = '') {
    const basePrompts = {
      ecg: `You are a medical AI assistant specializing in ECG analysis. Analyze this electrocardiogram image and provide:
      1. Heart rhythm analysis
      2. Rate calculation (if visible)
      3. Any abnormalities detected
      4. Potential diagnoses
      5. Urgency level (low/medium/high)
      6. Recommendations for further action

      Please provide a detailed but easy-to-understand analysis. ${userPrompt}`,

      xray: `You are a medical AI assistant specializing in X-ray interpretation. Analyze this X-ray image and provide:
      1. Anatomical structures visible
      2. Any fractures, dislocations, or abnormalities
      3. Bone density assessment
      4. Soft tissue observations
      5. Recommendations for treatment or further imaging

      Please provide a clear and comprehensive analysis. ${userPrompt}`,

      cancer: `You are a medical AI assistant specializing in oncological imaging. Analyze this medical image for:
      1. Any suspicious lesions or masses
      2. Size and location of abnormalities
      3. Characteristics suggesting malignancy
      4. Risk assessment
      5. Recommendations for biopsy or further testing

      IMPORTANT: This is for educational purposes only. Always recommend consulting with an oncologist. ${userPrompt}`,

      alzheimer: `You are a medical AI assistant specializing in neurological assessment. Analyze this brain imaging for:
      1. Structural changes associated with dementia
      2. Hippocampal atrophy
      3. Ventricular enlargement
      4. White matter changes
      5. Cognitive assessment recommendations

      Please provide analysis while emphasizing the need for professional neurological evaluation. ${userPrompt}`,

      skin: `You are a medical AI assistant specializing in dermatological analysis. Analyze this skin image for:
      1. Lesion characteristics (size, color, border, asymmetry)
      2. Potential skin conditions
      3. Signs of melanoma or other skin cancers
      4. Inflammatory conditions
      5. Recommendations for dermatological consultation

      Follow the ABCDE criteria for mole analysis. ${userPrompt}`,

      retinopathy: `You are a medical AI assistant specializing in ophthalmological imaging. Analyze this retinal image for:
      1. Signs of diabetic retinopathy
      2. Blood vessel abnormalities
      3. Hemorrhages or exudates
      4. Optic disc assessment
      5. Severity grading and recommendations

      Provide detailed analysis with staging if applicable. ${userPrompt}`,

      general: `You are a medical AI assistant. Analyze this medical image and provide:
      1. Overall assessment of visible structures
      2. Any abnormalities or concerns
      3. Potential conditions or diagnoses
      4. Recommendations for further evaluation
      5. Urgency level

      Please provide a comprehensive but understandable analysis. ${userPrompt}`,
    };

    return basePrompts[analysisType] || basePrompts.general;
  }

  calculateConfidence(analysisText) {
    // Simple confidence calculation based on keywords
    const highConfidenceKeywords = ['clearly shows', 'definitely', 'obvious', 'unmistakable'];
    const lowConfidenceKeywords = ['possibly', 'might', 'could be', 'uncertain', 'unclear'];

    const text = analysisText.toLowerCase();

    let confidence = 0.7; // Base confidence

    highConfidenceKeywords.forEach(keyword => {
      if (text.includes(keyword)) confidence += 0.1;
    });

    lowConfidenceKeywords.forEach(keyword => {
      if (text.includes(keyword)) confidence -= 0.1;
    });

    return Math.max(0.1, Math.min(0.99, confidence));
  }

  extractRecommendations(analysisText) {
    const lines = analysisText.split('\n');
    const recommendations = [];

    lines.forEach(line => {
      if (line.toLowerCase().includes('recommend') ||
          line.toLowerCase().includes('suggest') ||
          line.toLowerCase().includes('should')) {
        recommendations.push(line.trim());
      }
    });

    return recommendations.length > 0 ? recommendations : ['Consult with a healthcare professional for proper diagnosis and treatment.'];
  }

  // Health tips generation
  async generateHealthTips(category = 'general') {
    const prompt = `Generate 5 practical and scientifically-backed health tips for ${category} health.
    Each tip should be:
    1. Actionable and specific
    2. Evidence-based
    3. Safe for general population
    4. Easy to understand

    Format as a numbered list with brief explanations.`;

    return await this.analyzeText(prompt);
  }

  // Emergency assessment
  async assessEmergencyLevel(symptoms) {
    const prompt = `Based on these symptoms: "${symptoms}", assess the emergency level and provide:
    1. Urgency level (Low/Medium/High/Critical)
    2. Immediate actions to take
    3. Whether emergency services should be called
    4. Symptoms to monitor

    This is for educational purposes only and not a substitute for professional medical advice.`;

    return await this.analyzeText(prompt);
  }
}

module.exports = new GeminiService();
