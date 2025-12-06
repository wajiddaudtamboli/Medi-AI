# HealthBridge AI - Vercel Environment Variables

## Required Environment Variables for Vercel Deployment

Add these environment variables in your Vercel project dashboard:

### Database Configuration
```
DATABASE_URL=postgresql://your_neon_connection_string
```

### JWT Configuration
```
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-for-security
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
```

### Server Configuration
```
PORT=5002
```

### Google AI Configuration (REQUIRED)
```
GOOGLE_AI_API_KEY=AIzaSyDOAtf0gqqMJpu5nVaSEbutTOpK_GZN7mo
```

### Twilio Configuration (Optional - for SMS notifications)
```
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
```

### Email Configuration (Optional - for email notifications)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Frontend Environment Variables
```
VITE_API_URL=/api/v1
VITE_SOCKET_URL=
VITE_GOOGLE_AI_API_KEY=AIzaSyDOAtf0gqqMJpu5nVaSEbutTOpK_GZN7mo
```

## How to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with its value
4. Select the environments where the variable should be available:
   - Production
   - Preview
   - Development
5. Click "Save"

## Important Notes

- Environment variables starting with `VITE_` are used by the frontend
- Variables without prefix are used by the backend
- For security, never commit `.env` files to your repository
- The Gemini API key is already provided above
- For production, get a real Neon PostgreSQL database URL from https://neon.tech
