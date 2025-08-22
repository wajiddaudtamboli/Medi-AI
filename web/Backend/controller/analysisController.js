const prisma = require('../config/database');
const geminiService = require('../utils/geminiService');

// Create a new analysis
const createAnalysis = async (req, res) => {
  try {
    const { type, imageBase64, prompt, userId } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        success: false,
        message: 'Image data is required',
      });
    }

    // Analyze image with Gemini AI
    const aiResult = await geminiService.analyzeImage(imageBase64, prompt, type);

    if (!aiResult.success) {
      return res.status(500).json({
        success: false,
        message: 'AI analysis failed',
        error: aiResult.error,
      });
    }

    // Save analysis result to database
    const analysisResult = await prisma.analysisResult.create({
      data: {
        type: type || 'general',
        imageUrl: `data:image/jpeg;base64,${imageBase64}`, // In production, store in cloud storage
        analysis: aiResult.analysis,
        confidence: aiResult.confidence,
        recommendations: aiResult.recommendations.join('\n'),
        userId: userId || null,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Analysis completed successfully',
      data: {
        id: analysisResult.id,
        type: analysisResult.type,
        analysis: analysisResult.analysis,
        confidence: analysisResult.confidence,
        recommendations: analysisResult.recommendations.split('\n'),
        createdAt: analysisResult.createdAt,
      },
    });
  } catch (error) {
    console.error('Analysis creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// Get analysis history for a user
const getAnalysisHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const analyses = await prisma.analysisResult.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        type: true,
        analysis: true,
        confidence: true,
        recommendations: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      success: true,
      data: analyses,
    });
  } catch (error) {
    console.error('Get analysis history error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// Get specific analysis
const getAnalysis = async (req, res) => {
  try {
    const { id } = req.params;

    const analysis = await prisma.analysisResult.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found',
      });
    }

    res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// Generate health tips
const generateHealthTips = async (req, res) => {
  try {
    const { category } = req.query;

    const result = await geminiService.generateHealthTips(category);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to generate health tips',
        error: result.error,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        category: category || 'general',
        tips: result.response,
        generatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Generate health tips error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// Emergency assessment
const assessEmergency = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({
        success: false,
        message: 'Symptoms description is required',
      });
    }

    const result = await geminiService.assessEmergencyLevel(symptoms);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to assess emergency level',
        error: result.error,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        symptoms,
        assessment: result.response,
        assessedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Emergency assessment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  createAnalysis,
  getAnalysisHistory,
  getAnalysis,
  generateHealthTips,
  assessEmergency,
};
