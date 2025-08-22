const prisma = require('../config/database');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHander = require('../utils/errorHander');

// Create emergency notification
exports.createEmergencyNotification = catchAsyncError(async (req, res, next) => {
    // Get patient ID from authenticated user
    const patientId = req.user.id;
    const roomId = "emergency"; // Default emergency room

    // Create emergency notification
    const emergencyNotification = await prisma.emergencyNotification.create({
        data: {
            patientId,
            roomId,
            status: "pending",
        },
        include: {
            patient: {
                select: {
                    id: true,
                    name: true,
                    contact: true,
                },
            },
        },
    });

    // Emit socket event to doctors
    const io = req.app.get('io');
    if (io) {
        io.emit('emergencyNotification', {
            notificationId: emergencyNotification.id,
            patientName: emergencyNotification.patient.name,
            roomId: emergencyNotification.roomId,
            createdAt: emergencyNotification.createdAt,
        });
    }

    res.status(201).json({
        success: true,
        roomId: "emergency",
        message: "Emergency notification sent to all available doctors with video call access"
    });
});

// Get emergency notifications (for doctors)
exports.getEmergencyNotifications = catchAsyncError(async (req, res, next) => {
    const notifications = await prisma.emergencyNotification.findMany({
        where: { status: "pending" },
        include: {
            patient: {
                select: {
                    id: true,
                    name: true,
                    contact: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    res.status(200).json({
        success: true,
        notifications
    });
});

// Update emergency notification status
exports.updateEmergencyStatus = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'accepted', 'completed'].includes(status)) {
        return next(new ErrorHander("Invalid status", 400));
    }

    const notification = await prisma.emergencyNotification.update({
        where: { id },
        data: { status },
        include: {
            patient: {
                select: {
                    id: true,
                    name: true,
                    contact: true,
                },
            },
        },
    });

    res.status(200).json({
        success: true,
        message: "Emergency status updated successfully",
        data: notification,
    });
});

// Get emergency notification by ID
exports.getEmergencyNotification = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const notification = await prisma.emergencyNotification.findUnique({
        where: { id },
        include: {
            patient: {
                select: {
                    id: true,
                    name: true,
                    contact: true,
                },
            },
        },
    });

    if (!notification) {
        return next(new ErrorHander("Emergency notification not found", 404));
    }

    res.status(200).json({
        success: true,
        data: notification,
    });
});
