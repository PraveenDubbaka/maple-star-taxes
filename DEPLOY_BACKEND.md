# 🚀 Quick Deployment Guide

## Deploy TaxBot Backend (2 Minutes)

### Step 1: Sign up for Render.com
1. Go to https://render.com
2. Sign up with GitHub account
3. Authorize Render

### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Select repository: `PraveenDubbaka/maple-star-taxes`
3. Render auto-detects settings from `render.yaml`

### Step 3: Add API Key
In Environment section, add:
- **Key**: `GEMINI_API_KEY`
- **Value**: Your Google Gemini API key

### Step 4: Deploy
Click "Create Web Service" - Done! ✅

### Step 5: Update Frontend
Once deployed, copy your Render URL (e.g., `https://maple-star-taxes-api.onrender.com`)

Edit `script.js` line 11:
```javascript
production: 'https://YOUR-SERVICE-NAME.onrender.com',
```

Then deploy:
```bash
npm run deploy
```

---

## ✅ What's Already Configured

✅ `render.yaml` - Auto-deployment config
✅ `server.js` - Secure API with CORS
✅ `script.js` - Auto-detects production/dev
✅ `.gitignore` - Protects API keys
✅ Security headers & rate limiting

---

## 🔒 100% Secure Features

1. **API Key Never Exposed**: Stored in Render environment variables
2. **CORS Protection**: Only your domain can access API
3. **Rate Limiting**: 10 requests per 15 minutes per IP
4. **HTTPS Only**: All traffic encrypted
5. **Request Validation**: Blocks malicious requests

---

## 💰 Cost: $0/month

- Backend: Render Free Tier (750hrs/month)
- Frontend: GitHub Pages (Free)
- AI: Google Gemini (Free tier)

---

**Full docs**: See [BACKEND_DEPLOYMENT.md](BACKEND_DEPLOYMENT.md)
