const express = require("express");
const {
    registerUser,
    loginUser,
    logout,
    getUserProfile,
    updateProfile,
    getAllUsers,
    getDoctors,
    addMedicalHistory,
    getMedicalHistory,
    forgotPassword,
    resetPassword,
} = require("../controller/userControllerPrisma");

const { createEmergencyNotification, getEmergencyNotifications } = require('../controller/emergencyControllerPrisma');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authPrisma");

const router = express.Router();

// Authentication routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

// Password reset routes
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

// User profile routes
router.route("/profile").get(isAuthenticatedUser, getUserProfile);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);

// Medical history routes
router.route("/medical-history").get(isAuthenticatedUser, getMedicalHistory);
router.route("/medical-history/add").post(isAuthenticatedUser, addMedicalHistory);

// Doctor routes
router.route("/doctors").get(getDoctors);

// Admin routes
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

// Emergency routes
router.route("/emergency/notify")
    .post(isAuthenticatedUser, createEmergencyNotification);

router.route("/emergency/notifications")
    .get(isAuthenticatedUser, authorizeRoles("doctor"), getEmergencyNotifications);

module.exports = router;
