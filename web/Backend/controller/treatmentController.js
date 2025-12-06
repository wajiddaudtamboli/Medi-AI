const geminiService = require('../services/gemini.service');

/**
 * Get AI-powered treatment suggestions for symptoms
 * Provides three approaches: Conventional, Ayurvedic, and Homeopathic
 */
exports.getTreatmentSuggestions = async (req, res) => {
    try {
        const { symptoms } = req.body;

        // Validate input
        if (!symptoms || symptoms.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide symptoms for treatment suggestions'
            });
        }

        // Validate symptoms length
        if (symptoms.length > 1000) {
            return res.status(400).json({
                success: false,
                message: 'Symptoms description is too long. Please limit to 1000 characters.'
            });
        }

        // Generate treatment suggestions using centralized Gemini service
        const result = await geminiService.generateTreatmentSuggestions(symptoms);

        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: result.error || 'Failed to generate treatment suggestions'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Treatment suggestions generated successfully',
            data: {
                conventional: result.conventional,
                ayurvedic: result.ayurvedic,
                homeopathic: result.homeopathic,
                diet: result.diet,
                redFlags: result.redFlags,
                fullResponse: result.fullResponse,
                symptoms: symptoms,
                disclaimer: 'These suggestions are AI-generated and for educational purposes only. Always consult a certified medical professional before taking any treatment. This is not a substitute for professional medical advice, diagnosis, or treatment.'
            },
            timestamp: result.timestamp
        });

    } catch (error) {
        console.error('Treatment Controller Error:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while generating treatment suggestions',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * Health check endpoint for treatment service
 */
exports.healthCheck = async (req, res) => {
    try {
        const isConfigured = !!process.env.GOOGLE_AI_API_KEY;
        
        return res.status(200).json({
            success: true,
            message: 'Treatment suggestion service is operational',
            configured: isConfigured,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Health check failed',
            timestamp: new Date().toISOString()
        });
    }
};
