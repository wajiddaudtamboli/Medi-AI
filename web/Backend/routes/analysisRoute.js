const express = require("express");
const {
    createAnalysis,
    getAnalysisHistory,
    getAnalysis,
    generateHealthTips,
    assessEmergency,
} = require("../controller/analysisController");

const { isAuthenticatedUser } = require("../middleware/authPrisma");

const router = express.Router();

// Analysis routes
router.route("/create").post(createAnalysis);
router.route("/history/:userId").get(isAuthenticatedUser, getAnalysisHistory);
router.route("/:id").get(getAnalysis);

// AI-powered features
router.route("/health-tips").get(generateHealthTips);
router.route("/emergency-assessment").post(assessEmergency);

module.exports = router;
