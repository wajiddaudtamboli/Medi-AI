const ErrorHander = require('../utils/errorHander');
const catchAsyncError = require('./catchAsyncError');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHander("Please login to access this feature", 401));
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decodedData.id },
            select: {
                id: true,
                name: true,
                contact: true,
                role: true,
                speciality: true,
                availability: true,
                avatarPublicId: true,
                avatarUrl: true,
            },
        });

        if (!user) {
            return next(new ErrorHander("User not found", 401));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new ErrorHander("Invalid token", 401));
    }
});

exports.authorizeRoles = (...roles) => {
    return catchAsyncError(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHander(`Role: ${req.user.role} is not allowed to access this resource`, 403)
            );
        }
        next();
    });
};
