# 🚀 Hostinger/VPS Deployment Guide

Complete guide to deploy Medi-AI on Hostinger or any VPS server.

## 📋 Prerequisites

- Hostinger VPS or any Linux server (Ubuntu 20.04+ recommended)
- Node.js 18+ installed
- PM2 process manager
- Nginx or Apache web server
- SSL certificate (Let's Encrypt recommended)
- Domain name pointed to your server

## 🔧 Server Setup

### 1. Connect to Your Server

```bash
ssh root@your-server-ip
```

### 2. Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Git
sudo apt install -y git
```

## 📦 Deploy Application

### 1. Clone Repository

```bash
# Create app directory
sudo mkdir -p /var/www/medi-ai
cd /var/www/medi-ai

# Clone your repository
sudo git clone https://github.com/wajiddaudtamboli/Medi-AI.git .

# Set proper permissions
sudo chown -R $USER:$USER /var/www/medi-ai
```

### 2. Install Dependencies

```bash
# Backend dependencies
cd /var/www/medi-ai/web/Backend
npm install --production

# Frontend dependencies
cd /var/www/medi-ai/web/Frontend
npm install
```

### 3. Configure Environment Variables

```bash
# Create .env file for backend
cd /var/www/medi-ai/web/Backend
nano .env
```

Add the following:

```env
# Server Configuration
NODE_ENV=production
PORT=5002
HOST=0.0.0.0

# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@host:5432/database?sslmode=require"

# Google AI (Gemini)
GOOGLE_AI_API_KEY=your_gemini_api_key_here

# JWT Secret
JWT_SECRET=your_secure_jwt_secret_here
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

# Frontend URL
FRONTEND_URL=https://yourdomain.com

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Twilio SMS (Optional)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
```

### 4. Build Frontend

```bash
cd /var/www/medi-ai/web/Frontend
npm run build
```

This creates the production build in `dist/` folder.

### 5. Start Backend with PM2

```bash
# From root project directory
cd /var/www/medi-ai
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Copy and run the command that PM2 outputs
```

### 6. Check PM2 Status

```bash
# View running processes
pm2 list

# View logs
pm2 logs medi-ai-backend

# Monitor resources
pm2 monit

# Restart if needed
pm2 restart medi-ai-backend
```

## 🌐 Nginx Configuration

### 1. Create Nginx Config

```bash
sudo nano /etc/nginx/sites-available/medi-ai
```

Copy the content from `nginx.conf` file in the project root, then:

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/medi-ai /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 2. Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is configured automatically
# Test renewal
sudo certbot renew --dry-run
```

## 🔒 Firewall Configuration

```bash
# Allow SSH
sudo ufw allow OpenSSH

# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

## 🔄 Update & Maintenance

### Deploy Updates

```bash
# Pull latest code
cd /var/www/medi-ai
git pull origin main

# Update backend
cd web/Backend
npm install --production

# Rebuild frontend
cd ../Frontend
npm install
npm run build

# Restart backend
pm2 restart medi-ai-backend
```

### Useful PM2 Commands

```bash
# View logs
pm2 logs medi-ai-backend --lines 100

# Clear logs
pm2 flush

# Stop application
pm2 stop medi-ai-backend

# Delete from PM2
pm2 delete medi-ai-backend

# Reload with zero downtime
pm2 reload medi-ai-backend
```

### Monitor Server

```bash
# View system resources
htop

# Check disk space
df -h

# Check memory
free -h

# View Nginx logs
sudo tail -f /var/log/nginx/medi-ai-access.log
sudo tail -f /var/log/nginx/medi-ai-error.log
```

## 🐛 Troubleshooting

### Backend Not Starting

```bash
# Check PM2 logs
pm2 logs medi-ai-backend

# Check if port 5002 is available
sudo lsof -i :5002

# Restart backend
pm2 restart medi-ai-backend
```

### Frontend Not Loading

```bash
# Check if build exists
ls -la /var/www/medi-ai/web/Frontend/dist

# Check Nginx error logs
sudo tail -f /var/log/nginx/medi-ai-error.log

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Database Connection Issues

```bash
# Test database connection
cd /var/www/medi-ai/web/Backend
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL)"

# Check if DATABASE_URL is correct in .env
nano .env
```

## 🎯 Performance Optimization

### Enable Gzip Compression

Already configured in nginx.conf

### PM2 Cluster Mode

Already configured in ecosystem.config.js for maximum CPU utilization

### Monitor Performance

```bash
# Install monitoring tools
sudo npm install -g pm2-logrotate
pm2 install pm2-logrotate

# View metrics
pm2 monit
```

## 🔐 Security Best Practices

1. **Keep system updated:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Use strong JWT secret** in .env

3. **Enable firewall** (UFW configured above)

4. **Regular backups:**
   ```bash
   # Backup database
   pg_dump $DATABASE_URL > backup.sql
   
   # Backup application
   tar -czf medi-ai-backup.tar.gz /var/www/medi-ai
   ```

5. **Monitor logs regularly:**
   ```bash
   pm2 logs
   sudo tail -f /var/log/nginx/medi-ai-error.log
   ```

## ✅ Verification

After deployment, verify:

1. **Backend API:**
   ```bash
   curl https://yourdomain.com/api/v1/test
   ```

2. **Frontend:** Visit `https://yourdomain.com`

3. **PM2 Status:**
   ```bash
   pm2 status
   ```

4. **SSL Certificate:**
   ```bash
   sudo certbot certificates
   ```

## 📞 Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/medi-ai-error.log`
3. Check application errors in browser console
4. Review environment variables in .env

---

**Your Medi-AI application should now be live on your Hostinger VPS! 🎉**
