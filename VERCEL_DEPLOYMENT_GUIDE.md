# 🚀 Vercel Deployment Guide

Complete guide to deploy Medi-AI on Vercel (Serverless Platform).

## 📋 Prerequisites

- GitHub account with your code repository
- Vercel account (free tier available)
- Valid Gemini API key
- Neon PostgreSQL database (or any serverless PostgreSQL)

## 🔧 Quick Deploy (Recommended)

### Option 1: Deploy via Vercel Dashboard

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select your repository: `wajiddaudtamboli/Medi-AI`
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** Leave empty (Vercel auto-detects)
   - **Output Directory:** Leave empty

4. **Add Environment Variables:**
   Click "Environment Variables" and add:

   ```env
   NODE_ENV=production
   PORT=5002
   
   # Database
   DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
   
   # Google AI
   GOOGLE_AI_API_KEY=your_gemini_api_key_here
   
   # JWT
   JWT_SECRET=your_secure_jwt_secret_here
   JWT_EXPIRE=7d
   COOKIE_EXPIRE=7
   
   # Frontend URL (will be your Vercel domain)
   FRONTEND_URL=https://your-project.vercel.app
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd f:/HealthBridge-AI
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: medi-ai
# - Directory: ./
# - Override settings? No

# Add environment variables
vercel env add GOOGLE_AI_API_KEY
vercel env add DATABASE_URL
vercel env add JWT_SECRET

# Deploy to production
vercel --prod
```

## 📝 Environment Variables Setup

Go to your Vercel project → Settings → Environment Variables

### Required Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@...` |
| `GOOGLE_AI_API_KEY` | Gemini API key | `AIza...` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `JWT_EXPIRE` | JWT expiry time | `7d` |
| `COOKIE_EXPIRE` | Cookie expiry days | `7` |
| `FRONTEND_URL` | Your Vercel domain | `https://medi-ai.vercel.app` |

### Optional Variables:

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | Email server host |
| `SMTP_PORT` | Email server port |
| `SMTP_USER` | Email username |
| `SMTP_PASS` | Email password |
| `TWILIO_ACCOUNT_SID` | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `TWILIO_PHONE_NUMBER` | Twilio phone number |

## 🔄 Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Production:** Push to `main` branch
- **Preview:** Push to any other branch or create PR

```bash
# Make changes
git add .
git commit -m "feat: Add new feature"
git push origin main

# Vercel will automatically deploy
```

## 🌐 Custom Domain Setup

### 1. Add Domain in Vercel

1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your domain: `yourdomain.com`
4. Click "Add"

### 2. Configure DNS

Add these DNS records at your domain registrar:

**For Root Domain (yourdomain.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Update Environment Variables

Update `FRONTEND_URL` in Vercel:
```env
FRONTEND_URL=https://yourdomain.com
```

## 🔍 Verify Deployment

### 1. Check Build Logs

In Vercel Dashboard:
- Go to your project
- Click on latest deployment
- View "Building" and "Deployment" logs

### 2. Test API Endpoints

```bash
# Test backend health
curl https://your-project.vercel.app/api/v1/test

# Should return: {"success": true, "message": "API is working!"}
```

### 3. Test Frontend

Visit your Vercel URL:
```
https://your-project.vercel.app
```

## 🐛 Troubleshooting

### Build Fails

**Error:** `Cannot find module '@google/genai'`
**Solution:** Ensure dependencies are installed:
```bash
cd web/Backend
npm install
cd ../Frontend
npm install
git add .
git commit -m "fix: Update dependencies"
git push
```

### API Returns 404

**Error:** API endpoints not working
**Solution:** 
1. Check `vercel.json` routes configuration
2. Verify `web/Backend/api/index.js` exists
3. Check serverless function logs in Vercel Dashboard

### Database Connection Fails

**Error:** `Can't reach database server`
**Solution:**
1. Verify `DATABASE_URL` in Environment Variables
2. Check database is accessible (Neon should be online)
3. Ensure connection string includes `?sslmode=require`

### Environment Variables Not Working

**Error:** `GOOGLE_AI_API_KEY is missing`
**Solution:**
1. Go to Project Settings → Environment Variables
2. Verify all required variables are added
3. **Redeploy** after adding variables (Vercel needs redeploy)
4. Click "Redeploy" on latest deployment

### Serverless Function Timeout

**Error:** `Task timed out after 60.00 seconds`
**Solution:**
- Already configured in `vercel.json` with `maxDuration: 60`
- For hobby plan, max is 60 seconds
- Upgrade to Pro for longer timeouts (300s)

## 📊 Monitor Performance

### 1. View Analytics

In Vercel Dashboard:
- Go to Analytics tab
- Monitor page views, unique visitors
- Track Web Vitals scores

### 2. View Function Logs

In Vercel Dashboard:
- Go to Functions tab
- Click on a function
- View invocations and errors

### 3. Check Speed Insights

- Go to Speed Insights tab
- Monitor Core Web Vitals
- Check performance scores

## 🔄 Update Deployment

### Push Updates

```bash
# Pull latest changes
git pull origin main

# Make your changes
# ... edit files ...

# Commit and push
git add .
git commit -m "feat: Your changes"
git push origin main

# Vercel auto-deploys (check dashboard)
```

### Manual Redeploy

In Vercel Dashboard:
1. Go to Deployments
2. Click on latest deployment
3. Click "..." menu → "Redeploy"

### Rollback

In Vercel Dashboard:
1. Go to Deployments
2. Find previous working deployment
3. Click "..." menu → "Promote to Production"

## 🎯 Performance Optimization

### Already Configured:

✅ Automatic HTTPS/SSL
✅ Global CDN distribution
✅ Serverless functions
✅ Automatic compression (Gzip/Brotli)
✅ Image optimization
✅ Zero-config caching

### Additional Tips:

1. **Use Vercel Analytics:** Free in dashboard
2. **Enable Speed Insights:** Monitor performance
3. **Optimize images:** Use Next.js Image component if migrating
4. **Split code:** Frontend already using code splitting (Vite)

## 💰 Pricing

**Hobby Plan (Free):**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Serverless function execution
- ⚠️ 60s max function duration

**Pro Plan ($20/month):**
- ✅ 1 TB bandwidth/month
- ✅ 300s max function duration
- ✅ Custom deployment protection
- ✅ Password protection
- ✅ Priority support

## 🔐 Security

### Already Configured:

✅ Automatic HTTPS
✅ DDoS protection
✅ Firewall protection
✅ Environment variable encryption

### Best Practices:

1. **Never commit .env files** (already in .gitignore)
2. **Use strong JWT secrets**
3. **Rotate API keys regularly**
4. **Enable Vercel Authentication** (Pro plan)
5. **Use Preview Deployments** for testing

## ✅ Post-Deployment Checklist

- [ ] All environment variables added
- [ ] Database connection working
- [ ] API endpoints responding
- [ ] Frontend loads correctly
- [ ] Authentication working (sign-in/sign-up)
- [ ] Gemini AI features working
- [ ] Socket.IO connections stable
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic)
- [ ] Monitoring/analytics enabled

## 📞 Support

**Vercel Issues:**
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [Vercel Discord](https://vercel.com/discord)

**Application Issues:**
- Check function logs in Vercel Dashboard
- Review build logs for errors
- Test API endpoints with curl/Postman
- Check browser console for frontend errors

## 🎉 Success!

Your Medi-AI app should now be live at:
```
https://your-project.vercel.app
```

or your custom domain:
```
https://yourdomain.com
```

---

**Deployment completed! Your app is now globally distributed on Vercel's edge network! 🚀**
