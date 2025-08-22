# CureConnect AI - Comprehensive Healthcare Platform 🏥🤖

> **Live Demo**: [CureConnect AI on Vercel](https://cure-connect-ai.vercel.app/) > **Repository**: [GitHub - CureConnectAI](https://github.com/wajiddaudtamboli/CureConnectAI)

## 🚀 Quick Links

- **🌐 Web App**: React + Vite frontend with AI integration
- **📱 Mobile App**: React Native + Expo cross-platform
- **⚡ Backend**: Node.js + Express with Google Gemini AI
- **📊 Database**: Neon PostgreSQL with Prisma ORM
- **🚀 Deployment**: Ready for Vercel deployment

---

## 🎯 Project Overview

CureConnect AI revolutionizes healthcare by combining traditional medical approaches with cutting-edge AI technology. Our platform provides comprehensive medical assistance through multiple modalities:

### 🚨 **Emergency System**

- **AI Emergency Assessment**: Intelligent triage with 5-level urgency classification
- **Real-time Video Consultations**: WebRTC-powered emergency calls
- **Instant Medical Alerts**: Immediate notification system for healthcare providers

### 🏥 **Health Advisory System**

- **Multi-Modal Medical Guidance**:
  - **Conventional Medicine**: Evidence-based treatments with specific medications
  - **Ayurvedic Approach**: Traditional remedies with herbs and formulations
  - **Homeopathic Solutions**: Natural treatments with remedy recommendations
- **AI-Powered Analysis**: Google Gemini 1.5-flash for intelligent symptom evaluation
- **Preventive Care**: Lifestyle and wellness recommendations

### 👤 **User Management**

- **Secure Authentication**: JWT-based login/signup for patients and doctors
- **Medical History Tracking**: Complete patient record management
- **Role-Based Access**: Customized interfaces for different user types

---

## 🏗️ Technical Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   React + Vite  │◄──►│ Node.js + AI    │◄──►│ Neon PostgreSQL │
│   Port: 5173    │    │   Port: 5002    │    │   Cloud Hosted  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │
         │                        │
         ▼                        ▼
┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │   AI Services   │
│ React Native    │    │ Google Gemini   │
│   Port: 8081    │    │  1.5-flash API  │
└─────────────────┘    └─────────────────┘
```

### **Frontend Stack**

- **Framework**: React 19 with Vite for fast development
- **Styling**: Tailwind CSS for responsive design
- **State**: Redux Toolkit for predictable state management
- **Icons**: Lucide React for consistent iconography
- **HTTP**: Axios for API communication

### **Backend Stack**

- **Runtime**: Node.js with Express framework
- **Database**: Prisma ORM with Neon PostgreSQL
- **AI**: Google Gemini 1.5-flash integration
- **Auth**: JWT with bcryptjs for secure authentication
- **Real-time**: Socket.IO for live communications

### **Mobile Stack**

- **Framework**: React Native with Expo for cross-platform development
- **Navigation**: Expo Router for seamless navigation
- **UI**: Native components with custom styling

---

## 🚀 Deployment Guide

### **Vercel Deployment (Recommended)**

1. **Repository Setup** ✅

   ```bash
   git clone https://github.com/wajiddaudtamboli/CureConnectAI.git
   ```

2. **Vercel Configuration** ✅

   - `vercel.json` configured for static frontend + serverless backend
   - Environment variables template provided
   - Automatic build and deployment pipeline

3. **Environment Variables Required**:

   ```bash
   DATABASE_URL=postgresql://your_neon_connection_string
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
   GOOGLE_AI_API_KEY=your-google-ai-api-key
   TWILIO_ACCOUNT_SID=your-twilio-account-sid (optional)
   TWILIO_AUTH_TOKEN=your-twilio-auth-token (optional)
   ```

4. **One-Click Deploy**:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/wajiddaudtamboli/CureConnectAI)

**📖 Detailed deployment guide**: See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

---

## 🛠️ Local Development Setup

### **Prerequisites**

- Node.js 18+
- npm or yarn
- Git

### **Backend Setup**

```bash
cd web/Backend
npm install
cp .env.example .env  # Configure your environment variables
npx prisma generate
npx prisma db push
npm start  # Runs on http://localhost:5002
```

### **Frontend Setup**

```bash
cd web/Frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

### **Mobile App Setup**

```bash
cd app
npm install
npx expo start  # Runs on http://localhost:8081
```

---

## 🔌 API Documentation

### **Authentication Endpoints**

```bash
POST /api/v1/register     # User registration
POST /api/v1/login        # User authentication
GET  /api/v1/profile      # Get user profile
GET  /api/v1/logout       # User logout
```

### **AI Services**

```bash
POST /api/v1/chat                    # AI chat consultation
POST /api/v1/emergency/notify        # Emergency notification
GET  /api/v1/emergency/notifications # Get emergency alerts (doctors)
```

### **Medical Services**

```bash
GET  /api/v1/doctors              # Available doctors
POST /api/v1/medical-history/add  # Add medical record
GET  /api/v1/medical-history      # Patient medical history
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google AI** for Gemini API integration
- **Neon** for PostgreSQL database hosting
- **Vercel** for seamless deployment platform
- **React & Node.js** communities for excellent frameworks

---

<div align="center">

**🏥 CureConnect AI - Revolutionizing Healthcare Through AI 🤖**

[![Vercel Deploy](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/wajiddaudtamboli/CureConnectAI)
[![GitHub Stars](https://img.shields.io/github/stars/wajiddaudtamboli/CureConnectAI)](https://github.com/wajiddaudtamboli/CureConnectAI)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>
