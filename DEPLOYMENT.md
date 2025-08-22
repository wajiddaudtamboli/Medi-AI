# CureConnect AI - Healthcare Platform

## 🚀 Live Demo

- **Frontend**: [CureConnect AI](https://cure-connect-ai.vercel.app/)
- **Repository**: [GitHub](https://github.com/wajiddaudtamboli/CureConnectAI)

## 📋 Project Overview

CureConnect AI is a comprehensive healthcare platform that combines traditional medical approaches with AI-powered assistance. The platform provides:

- **AI Emergency Assessment**: Intelligent triage system for medical emergencies
- **Health Advisory System**: Multi-modal medical guidance (Conventional, Ayurvedic, Homeopathic)
- **Video Consultation**: Real-time doctor-patient consultations
- **Medical History Tracking**: Complete patient record management
- **Cross-Platform Support**: Web and mobile applications

## 🏗️ Architecture

### Frontend (React + Vite)

- **Location**: `web/Frontend/`
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **AI Integration**: Google Gemini 1.5-flash

### Backend (Node.js + Express)

- **Location**: `web/Backend/`
- **Runtime**: Node.js with Express
- **Database**: Neon PostgreSQL (with Prisma ORM)
- **AI Service**: Google Gemini API
- **Authentication**: JWT with bcryptjs

### Mobile App (React Native + Expo)

- **Location**: `app/`
- **Framework**: React Native with Expo
- **Cross-Platform**: iOS and Android support

## 🚀 Vercel Deployment

### Automatic Deployment

This project is configured for automatic deployment on Vercel:

1. **Frontend**: Served as static files from `web/Frontend/dist/`
2. **Backend**: Serverless functions from `web/Backend/`
3. **Routes**: API calls routed to `/api/*` endpoints

### Environment Variables Required

```bash
DATABASE_URL=your_neon_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
```

### Build Configuration

The project uses `vercel.json` for deployment configuration:

- Static build for React frontend
- Node.js serverless functions for backend
- Automatic API routing

## 🛠️ Local Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup Instructions

1. **Clone Repository**

```bash
git clone https://github.com/wajiddaudtamboli/CureConnectAI.git
cd CureConnectAI
```

2. **Backend Setup**

```bash
cd web/Backend
npm install
cp .env.example .env  # Configure your environment variables
npx prisma generate
npx prisma db push
npm start
```

3. **Frontend Setup**

```bash
cd web/Frontend
npm install
npm run dev
```

4. **Mobile App Setup**

```bash
cd app
npm install
npx expo start
```

## 📱 Features

### 🚨 Emergency System

- **AI Emergency Assessment**: Symptom analysis with urgency levels (1-5 scale)
- **Video Emergency Calls**: Direct connection to healthcare providers
- **Emergency Notifications**: Real-time alerts to medical staff

### 🏥 Health Advisory

- **Multi-Modal Guidance**:
  - Conventional Medicine (with specific medications)
  - Ayurvedic Approach (herbs and formulations)
  - Homeopathic Remedies (remedy names and indications)
- **AI-Powered Analysis**: Comprehensive symptom evaluation
- **Preventive Tips**: Lifestyle and wellness recommendations

### 👤 User Management

- **Authentication**: Secure login/signup for patients and doctors
- **Profile Management**: Complete user profiles with medical history
- **Role-Based Access**: Different interfaces for patients and healthcare providers

### 🤖 AI Integration

- **Google Gemini 1.5-flash**: Advanced AI for medical consultations
- **Natural Language Processing**: Intelligent symptom analysis
- **Multi-Language Support**: Healthcare advice in multiple languages

## 🔒 Security Features

- JWT-based authentication
- Bcrypt password hashing
- CORS protection
- Environment variable protection
- Database connection security

## 📊 Technology Stack

| Component          | Technology                                  |
| ------------------ | ------------------------------------------- |
| **Frontend**       | React 19, Vite, Tailwind CSS, Redux Toolkit |
| **Backend**        | Node.js, Express, Prisma ORM                |
| **Database**       | Neon PostgreSQL                             |
| **AI Service**     | Google Gemini 1.5-flash                     |
| **Mobile**         | React Native, Expo                          |
| **Deployment**     | Vercel (Frontend + Serverless Backend)      |
| **Authentication** | JWT, bcryptjs                               |
| **Communication**  | Socket.IO, WebRTC                           |

## 🌐 API Endpoints

### Authentication

- `POST /api/v1/register` - User registration
- `POST /api/v1/login` - User login
- `GET /api/v1/logout` - User logout
- `GET /api/v1/profile` - Get user profile

### AI Services

- `POST /api/v1/chat` - AI chat consultation
- `POST /api/v1/emergency/notify` - Emergency notification

### Medical Services

- `GET /api/v1/doctors` - Get available doctors
- `POST /api/v1/medical-history/add` - Add medical record
- `GET /api/v1/medical-history` - Get medical history

## 📞 Support

For support, please contact:

- **Email**: [your-email@example.com]
- **GitHub Issues**: [Create an issue](https://github.com/wajiddaudtamboli/CureConnectAI/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google AI for Gemini API
- Neon for PostgreSQL database
- Vercel for hosting platform
- React and Node.js communities

---

**CureConnect AI** - Revolutionizing healthcare through AI-powered medical assistance and comprehensive patient care.
