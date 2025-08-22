# 🔌 CureConnect AI - Complete API Documentation

## 📋 **Table of Contents**
1. [Backend REST APIs](#backend-rest-apis)
2. [AI & Machine Learning APIs](#ai--machine-learning-apis)
3. [Real-time Communication APIs](#real-time-communication-apis)
4. [Third-Party Service APIs](#third-party-service-apis)
5. [Mobile App APIs](#mobile-app-apis)
6. [Environment Variables](#environment-variables)

---

## 🌐 **Backend REST APIs**

### **Base URL**: `http://localhost:5002/api/v1` (Development) | `https://your-domain.com/api/v1` (Production)

### 🔐 **Authentication Endpoints**

#### **1. User Registration**
```http
POST /api/v1/register
Content-Type: application/json

{
  "name": "John Doe",
  "contact": "john@example.com", // or phone number
  "password": "securepassword123",
  "role": "patient" // or "doctor"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "contact": "john@example.com",
    "role": "patient",
    "avatar": {
      "public_id": "avatar_id",
      "url": "avatar_url"
    }
  },
  "token": "jwt_token_here"
}
```

#### **2. User Login**
```http
POST /api/v1/login
Content-Type: application/json

{
  "contact": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "contact": "john@example.com",
    "role": "patient"
  },
  "token": "jwt_token_here"
}
```

#### **3. Get User Profile**
```http
GET /api/v1/me
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "contact": "john@example.com",
    "role": "patient",
    "medicalHistory": [...],
    "createdAt": "2025-08-22T10:30:00Z"
  }
}
```

#### **4. User Logout**
```http
GET /api/v1/logout
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "message": "Logged Out"
}
```

### 🏥 **Medical Services Endpoints**

#### **5. Get All Doctors**
```http
GET /api/v1/doctors
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "doctors": [
    {
      "_id": "doctor_id",
      "name": "Dr. Smith",
      "contact": "doctor@example.com",
      "speciality": "Cardiology",
      "availability": "Available",
      "avatar": {
        "url": "doctor_avatar_url"
      },
      "createdAt": "2025-08-22T10:30:00Z"
    }
  ]
}
```

#### **6. Add Medical History**
```http
POST /api/v1/medical-history
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "analysis": "ECG shows normal sinus rhythm...",
  "url": "https://cloudinary.com/image_url",
  "type": "image" // or "video"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Medical history added successfully",
  "medicalHistory": [...]
}
```

#### **7. Get Medical History**
```http
GET /api/v1/medical-history/{userId}
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "medicalHistory": [
    {
      "_id": "history_id",
      "analysis": "ECG analysis results...",
      "image": {
        "url": "https://cloudinary.com/image_url",
        "type": "image"
      },
      "createdAt": "2025-08-22T10:30:00Z"
    }
  ]
}
```

### 🚨 **Emergency Services Endpoints**

#### **8. Create Emergency Notification**
```http
POST /api/v1/emergency/notify
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "message": "Emergency medical assistance required",
  "urgencyLevel": 5,
  "symptoms": ["chest pain", "difficulty breathing"]
}
```

**Response:**
```json
{
  "success": true,
  "roomId": "emergency",
  "message": "Emergency notification sent to all available doctors with video call access"
}
```

#### **9. Get Emergency Notifications (Doctors Only)**
```http
GET /api/v1/emergency/notifications
Authorization: Bearer jwt_token_here
X-User-Role: doctor
```

**Response:**
```json
{
  "success": true,
  "notifications": [
    {
      "_id": "notification_id",
      "patient": {
        "name": "John Doe",
        "contact": "john@example.com"
      },
      "status": "pending",
      "roomId": "emergency",
      "createdAt": "2025-08-22T10:30:00Z"
    }
  ]
}
```

---

## 🤖 **AI & Machine Learning APIs**

### **10. AI Chat Consultation**
```http
POST /api/v1/chat
Content-Type: application/json

{
  "message": "I have been experiencing headaches for the past week"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Based on your symptoms, headaches can have various causes including stress, dehydration, or tension. I recommend staying hydrated, getting adequate rest, and if symptoms persist or worsen, please consult with a healthcare professional for proper evaluation."
}
```

### **Google Gemini AI Integration**

#### **Image Analysis API**
```javascript
// Internal service call
const geminiService = require('./utils/geminiService');

const result = await geminiService.analyzeImage(
  imageBase64,
  "Analyze this medical image for any abnormalities",
  "ecg" // analysisType: ecg, xray, skin, cancer, etc.
);
```

#### **Text Analysis API**
```javascript
const result = await geminiService.analyzeText(
  "Provide health advice for patient with diabetes"
);
```

---

## 🔄 **Real-time Communication APIs**

### **Socket.IO Events**

#### **Video Call Events**
```javascript
// Client to Server
socket.emit("join-room", roomId);
socket.emit("offer", { roomId, offer });
socket.emit("answer", { roomId, answer });
socket.emit("ice-candidate", { roomId, candidate });

// Server to Client
socket.on("ready");
socket.on("offer", offer);
socket.on("answer", answer);
socket.on("ice-candidate", candidate);
socket.on("room-full");
```

#### **Emergency Events**
```javascript
// Client to Server
socket.emit("emergencyRequest", {
  name: "John Doe",
  urgency: 5
});

socket.emit("doctorConnect", doctorId);

// Server to Client
socket.on("emergencyNotification", {
  patientName: "John Doe",
  roomId: "emergency"
});
```

#### **Chat Events**
```javascript
// Client to Server (Chat namespace: /chat)
socket.emit("join-room", roomId);
socket.emit("user-message", { roomId, text });

// Server to Client
socket.on("message", { text, sender });
socket.on("room-full");
```

---

## 🌐 **Third-Party Service APIs**

### **11. Twilio SMS API**

#### **Send SMS**
```javascript
// Internal service usage
const sendSMS = require('./utils/sendSMS');

await sendSMS({
  phone: "+1234567890",
  message: "Welcome to CureConnect!"
});
```

#### **Configuration**
```javascript
const twilio = require('twilio');
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
```

### **12. Email Service API**

#### **Send Email**
```javascript
const sendEmail = require('./utils/sendEmail');

await sendEmail({
  email: "user@example.com",
  subject: "Emergency Medical Consultation",
  message: "Emergency consultation required..."
});
```

#### **SMTP Configuration**
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
```

### **13. Cloudinary API**

#### **Image Upload (Mobile)**
```javascript
const uploadToCloudinary = async (imageUri) => {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'medical_image.jpg'
  });
  formData.append('upload_preset', 'your_upload_preset');
  
  const response = await fetch(
    'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
    {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
  );
  
  return response.json();
};
```

### **14. Firebase APIs**

#### **Authentication**
```javascript
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Login
await signInWithEmailAndPassword(auth, email, password);

// Register
await createUserWithEmailAndPassword(auth, email, password);
```

#### **Firestore Database**
```javascript
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Add document
await addDoc(collection(db, 'medical_records'), {
  userId: 'user_id',
  analysis: 'Medical analysis...',
  timestamp: new Date()
});

// Get documents
const querySnapshot = await getDocs(collection(db, 'medical_records'));
```

---

## 📱 **Mobile App APIs**

### **15. Expo APIs**

#### **Image Picker**
```javascript
import * as ImagePicker from 'expo-image-picker';

const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
});
```

#### **Camera**
```javascript
const result = await ImagePicker.launchCameraAsync({
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
});
```

#### **File System**
```javascript
import * as FileSystem from 'expo-file-system';

const fileInfo = await FileSystem.getInfoAsync(uri);
const fileData = await FileSystem.readAsStringAsync(uri, {
  encoding: FileSystem.EncodingType.Base64,
});
```

#### **Print & Share**
```javascript
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

// Generate PDF
const { uri } = await Print.printToFileAsync({
  html: htmlContent,
  base64: false,
});

// Share file
await Sharing.shareAsync(uri);
```

---

## 🔑 **Environment Variables**

### **Backend Environment Variables**
```bash
# Database
DATABASE_URL=postgresql://username:password@host:5432/database
MONGODB_URI=mongodb://localhost:27017/cureconnect

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Server Configuration
PORT=5002
NODE_ENV=production

# Google AI
GOOGLE_AI_API_KEY=your-google-ai-api-key

# Twilio SMS
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token

# Email SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-domain.com
```

### **Frontend Environment Variables**
```bash
# API Configuration
VITE_API_URL=/api/v1
VITE_SOCKET_URL=ws://localhost:5002

# Google AI (if needed on frontend)
VITE_GOOGLE_AI_API_KEY=your-google-ai-api-key

# External Services
VITE_EMERGENCY_VIDEO_URL=https://video-call-service.com
```

### **Mobile App Environment Variables**
```bash
# Google AI
EXPO_PUBLIC_GOOGLE_AI_API_KEY=your-google-ai-api-key

# Firebase
EXPO_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id

# Cloudinary
EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

---

## 📊 **API Rate Limits & Quotas**

### **Google Gemini AI**
- **Rate Limit**: 60 requests per minute
- **Daily Quota**: Varies by plan
- **Image Analysis**: Max 20MB per image

### **Twilio SMS**
- **Rate Limit**: 1 message per second per phone number
- **Cost**: Pay per message

### **Firebase**
- **Firestore**: 50,000 reads/writes per day (free tier)
- **Authentication**: Unlimited (free tier)

### **Cloudinary**
- **Free Tier**: 25 credits/month
- **Upload Limit**: 10MB per image
- **Storage**: 25GB (free tier)

---

## 🔍 **Error Handling**

### **Standard Error Response Format**
```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Additional error details"
  }
}
```

### **Common HTTP Status Codes**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔒 **Security & Authentication**

### **JWT Token Format**
```javascript
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "id": "user_id",
  "role": "patient",
  "iat": 1693123456,
  "exp": 1693209856
}
```

### **Protected Routes**
```javascript
// Middleware usage
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/medical-history').post(isAuthenticatedUser, addMedicalHistory);
router.route('/emergency/notifications').get(
  isAuthenticatedUser, 
  authorizeRoles("doctor"), 
  getEmergencyNotifications
);
```

---

## 📚 **API Testing Examples**

### **Using cURL**
```bash
# Login
curl -X POST http://localhost:5002/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"contact":"user@example.com","password":"password123"}'

# Get user profile
curl -X GET http://localhost:5002/api/v1/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# AI Chat
curl -X POST http://localhost:5002/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"I have a headache"}'
```

### **Using JavaScript Fetch**
```javascript
// Login
const loginResponse = await fetch('/api/v1/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contact: 'user@example.com',
    password: 'password123'
  })
});

// Get profile with token
const profileResponse = await fetch('/api/v1/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

This comprehensive API documentation covers all the APIs used in the CureConnect AI healthcare platform! 🏥🤖
