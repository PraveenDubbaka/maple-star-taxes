# TaxBot API Backend Deployment Guide

## 🚀 Deploy to Render (100% Free & Secure)

### Why Render?
- ✅ **FREE**: 750 hours/month on free tier (enough for 24/7 operation)
- ✅ **Secure**: Environment variables are encrypted
- ✅ **Auto HTTPS**: Free SSL certificates
- ✅ **Easy**: Deploy from GitHub in 2 minutes

---

## 📋 Deployment Steps

### Step 1: Push Backend Code to GitHub (Done ✅)
Your server.js is already in the GitHub repository.

### Step 2: Sign Up for Render

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with your GitHub account
4. Authorize Render to access your GitHub repositories

### Step 3: Create New Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `PraveenDubbaka/maple-star-taxes`
3. Render will auto-detect the configuration

**Settings:**
```
Name: maple-star-taxes-api
Region: Choose closest to your users (US or Canada)
Branch: main
Runtime: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

### Step 4: Add Environment Variable (CRITICAL!)

In the "Environment" section, add:
```
Key: GEMINI_API_KEY
Value: [Your actual Gemini API key]
```

**🔒 SECURITY NOTE**: NEVER commit your API key to GitHub. Only add it in Render's environment variables.

### Step 5: Deploy

1. Click "Create Web Service"
2. Render will:
   - Clone your repository
   - Install dependencies
   - Start your server
   - Assign a URL like: `https://maple-star-taxes-api.onrender.com`

⏱️ **First deployment takes 2-5 minutes**

---

## 🔗 Update Your Website

Once deployed, you'll get a URL like:
```
https://maple-star-taxes-api.onrender.com
```

### Update script.js

Find the API endpoint in your `script.js` and update it:

```javascript
// OLD (won't work on live site)
const API_URL = 'http://localhost:3001/api/chat';

// NEW (your Render URL)
const API_URL = 'https://maple-star-taxes-api.onrender.com/api/chat';
```

---

## 🔒 Security Features (Already Implemented)

Your TaxBot API includes maximum security:

✅ **API Key Protection**: Gemini API key is stored securely in environment variables
✅ **CORS Protection**: Only your domain can access the API
✅ **Rate Limiting**: Prevents spam/abuse (10 requests per 15 min per IP)
✅ **Request Validation**: Blocks suspicious requests
✅ **HTTPS Only**: All traffic encrypted
✅ **Security Headers**: Prevents common attacks

---

## 📊 How It Works

```
User visits maplestartaxes.com
       ↓
User asks TaxBot a question
       ↓
Frontend sends request to Render backend
       ↓
Backend validates request
       ↓
Backend calls Google Gemini API (with secure key)
       ↓
Gemini returns answer
       ↓
Backend sends response to frontend
       ↓
User sees answer
```

**Key Benefit**: Your Gemini API key is NEVER exposed to users!

---

## 🎯 Production Checklist

- [ ] Render account created
- [ ] Web service deployed
- [ ] GEMINI_API_KEY environment variable added
- [ ] Service is running (green status)
- [ ] API URL copied
- [ ] script.js updated with production API URL
- [ ] Website redeployed to GitHub Pages
- [ ] TaxBot tested on live site

---

## 🔄 Auto-Deployment

Render automatically redeploys when you push to GitHub. To update:

```bash
# Make changes to server.js
git add server.js
git commit -m "Update API"
git push

# Render auto-deploys in 1-2 minutes
```

---

## ⚡ Free Tier Limits

**Render Free Tier:**
- 750 hours/month (24/7 operation)
- 512 MB RAM
- Sleeps after 15 min of inactivity
- Wakes up on first request (adds ~30 sec delay)

**To keep it awake** (optional):
- Upgrade to paid ($7/month) for always-on
- OR use a free uptime monitor (like UptimeRobot)

---

## 🧪 Testing Your Deployment

1. **Health Check**:
   Visit: `https://your-service.onrender.com/api/health`
   
   Should return:
   ```json
   {
     "status": "healthy",
     "message": "TaxBot API is running"
   }
   ```

2. **Test in Browser Console** (on your website):
   ```javascript
   fetch('https://your-service.onrender.com/api/chat', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({message: 'Hello'})
   }).then(r => r.json()).then(console.log);
   ```

---

## 🆘 Troubleshooting

### Service won't start
- Check logs in Render dashboard
- Verify `npm install` completed successfully
- Ensure GEMINI_API_KEY is set

### CORS errors
- Server.js already configured for maplestartaxes.com
- Errors should auto-resolve once domain is live

### "Too many requests" error
- Rate limit is 10 per 15 minutes per IP
- Normal for security (prevents abuse)

---

## 💰 Cost

**Current Setup: $0/month** ✅

Your entire stack is FREE:
- Frontend: GitHub Pages (Free)
- Backend: Render (Free)
- AI: Google Gemini (Free tier)
- Domain: One-time purchase only

---

## 📞 Support

- Render Docs: https://render.com/docs
- Render Support: support@render.com
- Your code is already production-ready! 🎉

---

**Next Steps**: Follow Step 2-5 above to deploy in ~5 minutes!
