const { GoogleGenAI } = require("@google/genai");

// Initialize Google Gemini AI with API key
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_AI_API_KEY,
});

/**
 * Centralized Gemini AI Service for MediAI
 * Uses the NEW @google/genai SDK (not deprecated @google/generative-ai)
 */

/**
 * Generate AI response for any prompt
 * @param {string} prompt - Input prompt for AI
 * @returns {Promise<string>} - AI generated text response
 */
async function generateAIResponse(prompt) {
  try {
    if (!process.env.GOOGLE_AI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error('Gemini AI Error:', error);
    throw error;
  }
}

/**
 * Generate medical advice based on user query
 * @param {string} prompt - User's medical query or symptoms
 * @returns {Promise<Object>} - Success status and AI response
 */
async function generateMedicalAdvice(prompt) {
  try {
    const medicalPrompt = `You are a helpful medical AI assistant for MediAI healthcare platform.
Please provide helpful, accurate, and safe medical information.
Always remind users to consult with healthcare professionals for serious concerns.

User query: ${prompt}

Provide a professional, empathetic medical response with:
- Clear explanation
- Possible causes (if symptoms described)
- General advice
- When to seek immediate medical attention
- Disclaimer about consulting a doctor`;

    const responseText = await generateAIResponse(medicalPrompt);

    return {
      success: true,
      response: responseText,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Medical Advice Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate medical advice',
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Generate emergency assessment and triage
 * @param {string} prompt - Emergency symptoms/situation description
 * @returns {Promise<Object>} - Urgency level, assessment, and action steps
 */
async function generateEmergencyAssessment(prompt) {
  try {
    const emergencyPrompt = `You are an emergency medical triage AI for MediAI healthcare platform.
Assess the following emergency situation and provide immediate guidance.

Emergency situation: ${prompt}

Provide a structured assessment with:

URGENCY LEVEL: (Critical/High/Medium/Low)

ASSESSMENT:
- Primary concern
- Potential serious conditions to rule out

IMMEDIATE ACTIONS:
1. First aid steps (if applicable)
2. What to do right now
3. When to call 911 or visit ER

RED FLAGS:
- List any danger signs that require immediate emergency care

IMPORTANT: If this is life-threatening, strongly advise calling emergency services immediately.`;

    const responseText = await generateAIResponse(emergencyPrompt);

    // Extract urgency level from response
    const urgencyMatch = responseText.match(/URGENCY LEVEL:\s*(Critical|High|Medium|Low)/i);
    const urgencyLevel = urgencyMatch ? urgencyMatch[1] : 'High';

    return {
      success: true,
      urgency: urgencyLevel,
      assessment: responseText,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Emergency Assessment Error:', error);
    return {
      success: false,
      urgency: 'High',
      error: error.message || 'Failed to generate emergency assessment',
      assessment: 'Unable to assess emergency. Please call emergency services (911) if you believe this is a medical emergency.',
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Generate comprehensive treatment suggestions
 * @param {string} symptoms - Patient symptoms description
 * @returns {Promise<Object>} - Structured treatment recommendations
 */
async function generateTreatmentSuggestions(symptoms) {
  try {
    const treatmentPrompt = `You are a comprehensive medical AI for MediAI healthcare platform.
The patient describes these symptoms: ${symptoms}

Provide treatment recommendations using THREE approaches:

## 1. CONVENTIONAL MEDICINE (Allopathic):
- Medicine names with generic and brand names
- Dosage and frequency
- Duration of treatment
- Possible side effects
- Precautions and contraindications

## 2. AYURVEDIC TREATMENT:
- Ayurvedic herbs and formulations
- Dosage and method of consumption
- Dietary recommendations (Pathya-Apathya)
- Lifestyle modifications (Dinacharya)
- Panchakarma therapy if applicable

## 3. HOMEOPATHIC TREATMENT:
- Homeopathic remedy names
- Potency (6C, 30C, 200C, etc.)
- Dosage and frequency
- Constitutional remedies if applicable
- Adjunct therapies

## DIET RECOMMENDATIONS:
- Foods to include
- Foods to avoid
- Hydration guidelines
- Meal timing and portions

## RED FLAG SYMPTOMS (When to seek immediate medical attention):
- List specific danger signs
- Emergency situations related to these symptoms

## MEDICAL DISCLAIMER:
This is AI-generated information for educational purposes only. Always consult a certified healthcare professional before starting any treatment. Do not self-medicate.

Format the response clearly with proper sections and bullet points.`;

    const responseText = await generateAIResponse(treatmentPrompt);

    // Parse sections from the response
    const parseSection = (sectionName) => {
      const regex = new RegExp(`##\\s*\\d*\\.?\\s*${sectionName}[:\\s]*([\\s\\S]*?)(?=##|$)`, 'i');
      const match = responseText.match(regex);
      return match ? match[1].trim() : '';
    };

    return {
      success: true,
      conventional: parseSection('CONVENTIONAL MEDICINE|1\\. CONVENTIONAL'),
      ayurvedic: parseSection('AYURVEDIC TREATMENT|2\\. AYURVEDIC'),
      homeopathic: parseSection('HOMEOPATHIC TREATMENT|3\\. HOMEOPATHIC'),
      diet: parseSection('DIET RECOMMENDATIONS'),
      redFlags: parseSection('RED FLAG SYMPTOMS'),
      fullResponse: responseText,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Treatment Suggestions Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate treatment suggestions',
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = {
  generateAIResponse,
  generateMedicalAdvice,
  generateEmergencyAssessment,
  generateTreatmentSuggestions
};
