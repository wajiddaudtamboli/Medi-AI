const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

// Validate Gemini API Key on startup
if (!process.env.GOOGLE_AI_API_KEY) {
    console.error('❌ FATAL ERROR: GOOGLE_AI_API_KEY is missing in .env file');
    console.error('⚠️  Please add your Gemini API key to continue');
    console.error('🔗 Get API key from: https://makersuite.google.com/app/apikey');
    process.exit(1);
}

console.log('✅ Gemini API Key validated');

// Import database connection
const prisma = require('./config/database');

console.log('Initializing server with Neon PostgreSQL database...');

const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"],
        credentials: true
    }
});

// WebSocket rooms storage
const rooms = {};

// Store socket instances for doctors
const doctorSockets = new Map();

// Socket.IO connection handling
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", (roomId) => {
        if (!rooms[roomId]) rooms[roomId] = [];
        if (rooms[roomId].length >= 2) {
            console.log(`Room ${roomId} is full.`);
            socket.emit("room-full");
            return;
        }

        rooms[roomId].push(socket.id);
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);

        if (rooms[roomId].length === 2) {
            console.log(`Both users are in room ${roomId}, signaling ready...`);
            io.to(roomId).emit("ready");
        }
    });

    socket.on("offer", ({ roomId, offer }) => {
        console.log(`Offer received from ${socket.id} for room ${roomId}`);
        socket.to(roomId).emit("offer", offer);
    });

    socket.on("answer", ({ roomId, answer }) => {
        console.log(`Answer received from ${socket.id} for room ${roomId}`);
        socket.to(roomId).emit("answer", answer);
    });

    socket.on("ice-candidate", ({ roomId, candidate }) => {
        console.log(`ICE Candidate received from ${socket.id} for room ${roomId}`);
        socket.to(roomId).emit("ice-candidate", candidate);
    });

    // Handle doctor connection
    socket.on("doctorConnect", (doctorId) => {
        doctorSockets.set(doctorId, socket);
    });

    // Handle emergency notifications
    socket.on("emergencyRequest", async (patientData) => {
        // Notify all connected doctors
        doctorSockets.forEach((doctorSocket) => {
            doctorSocket.emit("emergencyNotification", {
                patientName: patientData.name,
                roomId: "emergency"
            });
        });
    });

    socket.on("disconnect", () => {
        // Remove doctor socket on disconnect
        doctorSockets.forEach((value, key) => {
            if (value === socket) {
                doctorSockets.delete(key);
            }
        });
        console.log("User disconnected:", socket.id);
        for (const roomId in rooms) {
            rooms[roomId] = rooms[roomId].filter(id => id !== socket.id);
            if (rooms[roomId].length === 0) delete rooms[roomId];
        }
    });
});

// Chat rooms storage
const chatRooms = new Map();

io.of('/chat').on("connection", (socket) => {
    console.log("Chat user connected:", socket.id);

    socket.on("join-room", (roomId) => {
        if (!chatRooms.has(roomId)) {
            chatRooms.set(roomId, new Set([socket.id]));
        } else if (chatRooms.get(roomId).size < 2) {
            chatRooms.get(roomId).add(socket.id);
        } else {
            socket.emit("room-full");
            return;
        }

        socket.join(roomId);
        console.log(`Chat user ${socket.id} joined room ${roomId}`);
    });

    socket.on("user-message", ({ roomId, text }) => {
        io.of('/chat').to(roomId).emit("message", {
            text,
            sender: socket.id
        });
    });

    socket.on("disconnect", () => {
        console.log("Chat user disconnected:", socket.id);
        chatRooms.forEach((users, roomId) => {
            users.delete(socket.id);
            if (users.size === 0) {
                chatRooms.delete(roomId);
            }
        });
    });
});

// Middleware
// Add trust proxy to handle Cloudflare
app.set('trust proxy', true);

app.use(cors({
    origin: true, // Allow all origins for development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-forwarded-proto', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['set-cookie'],
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle preflight requests explicitly
app.options('*', cors());

// Database connection is handled in config/database.js
// No need to call $connect here as it's async and handled separately

// Routes
const user = require('./routes/userRoutePrisma');
const analysis = require('./routes/analysisRoute');
const treatment = require('./routes/treatmentRoute');

console.log('Loading routes...');
app.use("/api/v1", user);
app.use("/api/v1/analysis", analysis);
app.use("/api/v1/treatment", treatment);
console.log('Routes loaded successfully');

// Chatbot endpoint using Gemini AI
app.post('/api/v1/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        // Use centralized Gemini service
        const geminiService = require('./services/gemini.service');

        // Generate medical advice using centralized service
        const result = await geminiService.generateMedicalAdvice(message);

        if (result.success) {
            res.json({
                success: true,
                message: result.response,
                timestamp: result.timestamp
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Sorry, I encountered an error. Please try again.',
                error: result.error
            });
        }
    } catch (error) {
        console.error('Chatbot error:', error);
        res.status(500).json({
            success: false,
            message: 'Sorry, I am currently unavailable. Please try again later.'
        });
    }
});

// Test endpoint
app.get('/api/v1/test', (req, res) => {
    res.json({
        success: true,
        message: 'Backend is working!',
        timestamp: new Date().toISOString(),
        cors: 'enabled'
    });
});

// 404 handler
app.use("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        ok: false,
        message: "No such route found in server...💣💣💣",
    });
});

// Make io and prisma accessible to routes
app.set('io', io);
app.set('prisma', prisma);

// Start server
const PORT = process.env.PORT || 5002;
const HOST = '0.0.0.0';

// Global error handlers
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    console.error(error.stack);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled Rejection:', error);
    console.error(error.stack);
});

server.on('error', (error) => {
    console.error('❌ Server error:', error);
    // Don't exit - keep server running
    // process.exit(1);
});

// Only start server if not in serverless environment
if (require.main === module) {
    server.listen(PORT, HOST, () => {
        console.log(`✅ Server running on http://${HOST}:${PORT}`);
        console.log(`📡 Server is ready to accept connections`);
        console.log(`🔍 Test with: curl http://localhost:${PORT}/api/v1/test`);
    });
}

// Export for Vercel serverless
module.exports = app;
