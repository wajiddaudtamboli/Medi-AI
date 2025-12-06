# 🚀 Quick Deployment Guide

Choose your preferred deployment platform:

## 🌐 Vercel (Recommended for Serverless)

**Best for:** Automatic deployments, global CDN, zero configuration

### Quick Deploy:
1. Push code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Add environment variables
4. Deploy automatically

**Full Guide:** [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)

---

## 🖥️ Hostinger/VPS (Recommended for Full Control)

**Best for:** Traditional hosting, custom configuration, PM2 process management

### Quick Deploy:
```bash
# SSH into server
ssh root@your-server-ip

# Clone repository
git clone https://github.com/wajiddaudtamboli/Medi-AI.git
cd Medi-AI

# Install dependencies
cd web/Backend && npm install
cd ../Frontend && npm install && npm run build

# Start with PM2
cd ../..
pm2 start ecosystem.config.js
```

**Full Guide:** [HOSTINGER_DEPLOYMENT.md](./HOSTINGER_DEPLOYMENT.md)

---

## 📋 Environment Variables (Both Platforms)

Create `.env` file in `web/Backend/`:

```env
# Server
NODE_ENV=production
PORT=5002

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# Google AI (Gemini)
GOOGLE_AI_API_KEY=your_gemini_api_key

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

# Frontend URL
FRONTEND_URL=https://yourdomain.com
```

---

## ✅ Verification After Deployment

### Test Backend:
```bash
curl https://yourdomain.com/api/v1/test
# Should return: {"success": true, "message": "API is working!"}
```

### Test Frontend:
Visit `https://yourdomain.com` in browser

---

## 🔧 Configuration Files

| File | Purpose | Platform |
|------|---------|----------|
| `vercel.json` | Vercel serverless config | Vercel |
| `ecosystem.config.js` | PM2 process config | Hostinger/VPS |
| `nginx.conf` | Nginx web server config | Hostinger/VPS |
| `.htaccess` | Apache web server config | Hostinger/VPS |

---

## 📚 Detailed Guides

- **[Vercel Deployment](./VERCEL_DEPLOYMENT_GUIDE.md)** - Complete Vercel setup guide
- **[Hostinger Deployment](./HOSTINGER_DEPLOYMENT.md)** - Complete VPS setup guide
- **[API Documentation](./API_DOCUMENTATION.md)** - API endpoints reference
- **[Environment Setup](./VERCEL_ENV_SETUP.md)** - Environment variables guide

---

## 🆘 Common Issues

### Build Fails
- Check all dependencies are installed
- Verify Node.js version (18+ required)
- Review build logs for specific errors

### Database Connection Error
- Verify DATABASE_URL is correct
- Ensure database is online (Neon PostgreSQL)
- Check SSL mode in connection string

### API Key Invalid
- Get new key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Update GOOGLE_AI_API_KEY in environment variables
- Redeploy after updating variables

---

## 💡 Platform Comparison

| Feature | Vercel | Hostinger/VPS |
|---------|--------|---------------|
| **Setup Time** | 5 minutes | 30 minutes |
| **Cost** | Free tier available | Starts at $4/month |
| **Auto Deploy** | ✅ Yes | ❌ Manual |
| **Scalability** | ✅ Automatic | ⚠️ Manual |
| **Control** | ⚠️ Limited | ✅ Full control |
| **SSL** | ✅ Automatic | ⚠️ Manual (Let's Encrypt) |
| **CDN** | ✅ Global | ❌ No |
| **Best For** | Serverless, auto-scaling | Traditional apps, full control |

---

## 🎯 Recommended Choice

- **For MVP/Testing:** Use Vercel (faster, easier)
- **For Production:** Use Hostinger/VPS (more control, cheaper long-term)
- **For Best of Both:** Deploy backend on VPS, frontend on Vercel

---

## 📞 Support

- **GitHub Issues:** [Report Bug](https://github.com/wajiddaudtamboli/Medi-AI/issues)
- **Deployment Help:** Check detailed guides above
- **Vercel Support:** [Vercel Docs](https://vercel.com/docs)

---

**Choose your platform and follow the detailed guide! 🚀**
