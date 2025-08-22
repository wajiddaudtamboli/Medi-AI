# 🚀 Vercel Deployment Guide for CureConnect AI

## Prerequisites

1. **GitHub Account**: Your code is now at `https://github.com/wajiddaudtamboli/CureConnectAI.git`
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Environment Variables**: Gather all required API keys and database credentials

## 📋 Required Environment Variables

### For Vercel Dashboard:

```bash
DATABASE_URL=postgresql://your_neon_connection_string
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
GOOGLE_AI_API_KEY=AIzaSyDOAtf0gqqMJpu5nVaSEbutTOpK_GZN7mo
TWILIO_ACCOUNT_SID=your-twilio-account-sid (optional)
TWILIO_AUTH_TOKEN=your-twilio-auth-token (optional)
```

## 🔧 Step-by-Step Deployment

### 1. Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. **Import Git Repository**: `https://github.com/wajiddaudtamboli/CureConnectAI`
4. Select your repository and click **"Import"**

### 2. Configure Build Settings

Vercel should auto-detect the configuration from `vercel.json`, but verify:

- **Framework Preset**: Other
- **Root Directory**: `./` (leave as default)
- **Build Command**: Auto-detected from package.json
- **Output Directory**: Auto-detected

### 3. Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Environment |
|----------|--------|-------------|
| `DATABASE_URL` | Your Neon PostgreSQL connection string | Production, Preview, Development |
| `JWT_SECRET` | Strong secret key (32+ characters) | Production, Preview, Development |
| `GOOGLE_AI_API_KEY` | Your Google AI API key | Production, Preview, Development |
| `TWILIO_ACCOUNT_SID` | Your Twilio SID (optional) | Production, Preview, Development |
| `TWILIO_AUTH_TOKEN` | Your Twilio token (optional) | Production, Preview, Development |

### 4. Deploy

1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Your app will be available at `https://your-project-name.vercel.app`

## 🛠️ Post-Deployment Setup

### 1. Database Setup

Your Neon PostgreSQL database should be configured with:

```sql
-- Users table with authentication
-- Medical history tracking
-- Emergency notifications
-- Analysis results
```

The database will be automatically set up using Prisma migrations.

### 2. API Testing

Test these endpoints after deployment:

- `GET /api/v1/test` - Backend health check
- `POST /api/v1/chat` - AI chat functionality
- `POST /api/v1/register` - User registration
- `POST /api/v1/login` - User authentication

### 3. Frontend Features

Verify these features work:

- ✅ User registration/login
- ✅ Health Advisory (AI-powered)
- ✅ Emergency Assessment (AI-powered)
- ✅ Video calling integration
- ✅ Medical history tracking

## 🎯 Vercel Configuration Explained

### `vercel.json` Configuration

```json
{
  "version": 2,
  "builds": [
    {
      "src": "web/Frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    },
    {
      "src": "web/Backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/web/Backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/web/Frontend/dist/$1"
    }
  ]
}
```

This configuration:
- Builds React frontend as static files
- Deploys backend as serverless functions
- Routes API calls to `/api/*` to backend
- Serves frontend for all other routes

## 🔍 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check environment variables are set
   - Verify all dependencies are in package.json
   - Check build logs in Vercel dashboard

2. **API Not Working**
   - Ensure environment variables are set in Vercel
   - Check function logs in Vercel dashboard
   - Verify CORS configuration

3. **Database Connection Issues**
   - Verify DATABASE_URL is correct
   - Check Neon database is accessible
   - Ensure SSL mode is required in connection string

4. **AI Features Not Working**
   - Verify GOOGLE_AI_API_KEY is set correctly
   - Check API quotas in Google Cloud Console
   - Monitor function execution time (Vercel has limits)

### Monitoring

- **Vercel Dashboard**: Monitor deployments and function logs
- **Analytics**: View performance metrics
- **Functions**: Check serverless function execution

## 🚀 Performance Optimization

1. **Static Assets**: All assets are served via Vercel's CDN
2. **API Caching**: Implement caching for frequent API calls
3. **Database**: Use connection pooling for PostgreSQL
4. **Images**: Optimize images for web delivery

## 🔒 Security

- Environment variables are encrypted in Vercel
- HTTPS enforced automatically
- CORS configured for security
- JWT tokens for authentication
- Database connections use SSL

## 📞 Support

If you encounter issues:

1. Check Vercel documentation
2. Review function logs in Vercel dashboard
3. Test API endpoints individually
4. Verify environment variables

## 🎉 Success!

Your CureConnect AI platform should now be live at your Vercel URL with:

- ✅ Complete healthcare management system
- ✅ AI-powered medical assistance
- ✅ Real-time video consultations
- ✅ Multi-platform support
- ✅ Production-ready deployment

**Your app is now ready for users!** 🏥🤖
