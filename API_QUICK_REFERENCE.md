# 🔌 CureConnect AI - Quick API Reference

## 🚀 **Base URLs**

- **Development**: `http://localhost:5002/api/v1`
- **Production**: `https://your-domain.vercel.app/api/v1`

## 📋 **Quick Reference Table**

| Method | Endpoint                    | Description                    | Auth Required |
| ------ | --------------------------- | ------------------------------ | ------------- |
| `POST` | `/register`                 | User registration              | ❌            |
| `POST` | `/login`                    | User authentication            | ❌            |
| `GET`  | `/logout`                   | User logout                    | ✅            |
| `GET`  | `/me`                       | Get user profile               | ✅            |
| `GET`  | `/doctors`                  | Get all doctors                | ❌            |
| `POST` | `/medical-history`          | Add medical record             | ✅            |
| `GET`  | `/medical-history/{userId}` | Get medical history            | ✅            |
| `POST` | `/emergency/notify`         | Emergency notification         | ✅            |
| `GET`  | `/emergency/notifications`  | Get emergency alerts (doctors) | ✅            |
| `POST` | `/chat`                     | AI consultation                | ❌            |

## 🔑 **Authentication**

```http
Authorization: Bearer {jwt_token}
```

## 📱 **Socket.IO Events**

### Video Call Events

- `join-room` - Join video call room
- `offer` - WebRTC offer
- `answer` - WebRTC answer
- `ice-candidate` - ICE candidate exchange
- `ready` - Both users ready
- `room-full` - Room capacity reached

### Emergency Events

- `emergencyRequest` - Request emergency help
- `emergencyNotification` - Notify doctors
- `doctorConnect` - Doctor connection

### Chat Events (Namespace: `/chat`)

- `join-room` - Join chat room
- `user-message` - Send message
- `message` - Receive message

## 🤖 **AI Services**

### Google Gemini AI

- **Model**: `gemini-1.5-flash`
- **Features**: Image analysis, text generation, medical consultation
- **Rate Limit**: 60 requests/minute

### Analysis Types

- `general` - General medical analysis
- `ecg` - ECG/Heart rhythm analysis
- `xray` - X-ray image analysis
- `skin` - Skin condition analysis
- `cancer` - Cancer detection
- `retinopathy` - Eye/retina analysis
- `alzheimer` - Alzheimer's assessment

## 🔧 **Third-Party APIs**

### Twilio SMS

```javascript
await sendSMS({
  phone: '+1234567890',
  message: 'Emergency alert!',
});
```

### Email Service

```javascript
await sendEmail({
  email: 'doctor@hospital.com',
  subject: 'Emergency Consultation',
  message: 'Patient needs immediate attention',
});
```

### Cloudinary Image Upload

```javascript
const result = await uploadToCloudinary(imageUri);
// Returns: { secure_url: "https://cloudinary.com/..." }
```

### Firebase (Mobile)

- **Auth**: User authentication
- **Firestore**: Real-time database
- **Storage**: File storage

## 📊 **Request/Response Examples**

### User Registration

```http
POST /api/v1/register
{
  "name": "John Doe",
  "contact": "john@example.com",
  "password": "securepass123",
  "role": "patient"
}
```

### AI Chat

```http
POST /api/v1/chat
{
  "message": "I have chest pain"
}
```

### Emergency Alert

```http
POST /api/v1/emergency/notify
Authorization: Bearer {token}
{
  "urgencyLevel": 5,
  "symptoms": ["chest pain", "shortness of breath"]
}
```

## 🔒 **Environment Variables**

### Backend

```bash
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
GOOGLE_AI_API_KEY=your-ai-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
```

### Frontend

```bash
VITE_API_URL=/api/v1
VITE_GOOGLE_AI_API_KEY=your-ai-key
```

### Mobile (Expo)

```bash
EXPO_PUBLIC_GOOGLE_AI_API_KEY=your-ai-key
EXPO_PUBLIC_FIREBASE_API_KEY=your-firebase-key
```

## ⚡ **Quick Testing**

### cURL Examples

```bash
# Login
curl -X POST localhost:5002/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"contact":"test@example.com","password":"password"}'

# AI Chat
curl -X POST localhost:5002/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What should I do for a headache?"}'

# Get Doctors
curl -X GET localhost:5002/api/v1/doctors
```

## 🚨 **Error Codes**

- `400` - Bad Request (missing/invalid data)
- `401` - Unauthorized (login required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## 📞 **Support**

- **Repository**: https://github.com/wajiddaudtamboli/CureConnectAI
- **Issues**: Create GitHub issue for bugs/features
