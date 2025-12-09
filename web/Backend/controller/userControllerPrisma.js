const prisma = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");
const ErrorHander = require("../utils/errorHander");
const sendEmail = require("../utils/sendEmail");
const sendSMS = require("../utils/sendSMS");
const catchAsyncError = require("../middleware/catchAsyncError");

// JWT Token generation
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });
};

// Send JWT Token in response
const sendToken = (user, statusCode, res) => {
    const token = generateToken(user.id);

    const options = {
        expires: new Date(
            Date.now() + (process.env.JWT_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user: {
            id: user.id,
            name: user.name,
            contact: user.contact,
            role: user.role,
            speciality: user.speciality,
            availability: user.availability,
            avatar: {
                public_id: user.avatarPublicId,
                url: user.avatarUrl,
            },
        },
        token,
    });
};

// Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, contact, password, role } = req.body;

    // Validate input
    if (!name || !contact || !password) {
        return next(new ErrorHander("Please provide all required fields", 400));
    }

    // Validate contact (email or phone)
    const isEmail = validator.isEmail(contact);
    const isPhone = /^\d{10}$/.test(contact);

    if (!isEmail && !isPhone) {
        return next(new ErrorHander("Please enter a valid email or 10-digit phone number", 400));
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { contact: contact }
    });

    if (existingUser) {
        return next(new ErrorHander("User already exists with this contact", 400));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
        data: {
            name,
            contact,
            password: hashedPassword,
            role: role || "user",
            avatarPublicId: "default_avatar",
            avatarUrl: "https://default-avatar-url.com",
        },
    });

    // Send welcome message
    if (isEmail) {
        const message = `Welcome to MediAI ${name}`;
        try {
            await sendEmail({
                email: contact,
                subject: `Welcome to MediAI`,
                message,
            });
        } catch (error) {
            console.error("Email sending failed:", error);
        }
    } else {
        const message = `Welcome to MediAI ${name}`;
        try {
            await sendSMS({
                phone: `+91${contact}`,
                message,
            });
        } catch (error) {
            console.error("SMS sending failed:", error);
        }
    }

    sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { contact, password } = req.body;

    if (!contact || !password) {
        return next(new ErrorHander("Please Enter Contact & Password", 400));
    }

    const user = await prisma.user.findUnique({
        where: { contact: contact }
    });

    if (!user) {
        return next(new ErrorHander("Invalid contact or password", 401));
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid contact or password", 401));
    }

    sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Get User Profile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: {
            medicalHistory: {
                orderBy: { createdAt: 'desc' },
                take: 10, // Get latest 10 medical history records
            },
            analysisResults: {
                orderBy: { createdAt: 'desc' },
                take: 5, // Get latest 5 analysis results
            },
        },
    });

    if (!user) {
        return next(new ErrorHander("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user: {
            id: user.id,
            name: user.name,
            contact: user.contact,
            role: user.role,
            speciality: user.speciality,
            availability: user.availability,
            avatar: {
                public_id: user.avatarPublicId,
                url: user.avatarUrl,
            },
            medicalHistory: user.medicalHistory,
            analysisResults: user.analysisResults,
            createdAt: user.createdAt,
        },
    });
});

// Update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const { name, speciality, availability } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (speciality) updateData.speciality = speciality;
    if (availability) updateData.availability = availability;

    const user = await prisma.user.update({
        where: { id: req.user.id },
        data: updateData,
    });

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: {
            id: user.id,
            name: user.name,
            contact: user.contact,
            role: user.role,
            speciality: user.speciality,
            availability: user.availability,
            avatar: {
                public_id: user.avatarPublicId,
                url: user.avatarUrl,
            },
        },
    });
});

// Get All Users (Admin)
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            contact: true,
            role: true,
            speciality: true,
            availability: true,
            createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
        success: true,
        users,
    });
});

// Get Doctors
exports.getDoctors = catchAsyncError(async (req, res, next) => {
    const doctors = await prisma.user.findMany({
        where: { role: "doctor" },
        select: {
            id: true,
            name: true,
            speciality: true,
            availability: true,
            avatarUrl: true,
        },
    });

    res.status(200).json({
        success: true,
        doctors,
    });
});

// Add Medical History
exports.addMedicalHistory = catchAsyncError(async (req, res, next) => {
    const { analysis, imageUrl } = req.body;

    if (!analysis || !imageUrl) {
        return next(new ErrorHander("Analysis and image URL are required", 400));
    }

    const medicalRecord = await prisma.medicalHistory.create({
        data: {
            analysis,
            imageUrl,
            userId: req.user.id,
        },
    });

    res.status(201).json({
        success: true,
        message: "Medical history added successfully",
        data: medicalRecord,
    });
});

// Get Medical History
exports.getMedicalHistory = catchAsyncError(async (req, res, next) => {
    const medicalHistory = await prisma.medicalHistory.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
        success: true,
        data: medicalHistory,
    });
});

// Password Reset Request
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const { contact } = req.body;

    const user = await prisma.user.findUnique({
        where: { contact: contact }
    });

    if (!user) {
        return next(new ErrorHander("User not found", 404));
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Update user with reset token
    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetPasswordToken,
            resetPasswordExpire,
        },
    });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        if (validator.isEmail(contact)) {
            await sendEmail({
                email: contact,
                subject: `MediAI Password Recovery`,
                message,
            });
        } else {
            await sendSMS({
                phone: `+91${contact}`,
                message: `Your MediAI password reset token: ${resetToken}`,
            });
        }

        res.status(200).json({
            success: true,
            message: `Password reset link sent to ${contact} successfully`,
        });
    } catch (error) {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: null,
                resetPasswordExpire: null,
            },
        });

        return next(new ErrorHander(error.message, 500));
    }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await prisma.user.findFirst({
        where: {
            resetPasswordToken,
            resetPasswordExpire: {
                gt: new Date(),
            },
        },
    });

    if (!user) {
        return next(
            new ErrorHander(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander("Password does not match", 400));
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpire: null,
        },
    });

    res.status(200).json({
        success: true,
        message: "Password reset successfully",
    });
});
