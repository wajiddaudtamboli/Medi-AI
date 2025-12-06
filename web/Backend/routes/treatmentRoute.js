const express = require('express');
const { getTreatmentSuggestions, healthCheck } = require('../controller/treatmentController');

const router = express.Router();

// Treatment suggestions endpoint
router.post('/suggestions', getTreatmentSuggestions);

// Health check endpoint
router.get('/health', healthCheck);

module.exports = router;
