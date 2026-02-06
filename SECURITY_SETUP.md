# 🔐 SECURE TAXBOT SETUP GUIDE

## ✅ Your API Key is Now Protected!

Your OpenAI API key is stored securely in the `.env` file and will **NEVER** be exposed to website visitors.

---

## 🚀 Quick Start (2 Steps)

### Step 1: Install Dependencies
```bash
cd "/Users/praveendubbaka/Documents/Maple Star Taxes"
npm install
```

### Step 2: Start the Secure Server
```bash
npm start
```

Your website will be available at: **http://localhost:3001**

---

## 🛡️ Security Features

✅ **API Key Hidden** - Stored in `.env` file (not in browser-visible code)  
✅ **Backend Proxy** - Server handles all OpenAI API calls  
✅ **Rate Limiting** - Prevents abuse (50 requests per 15 minutes per IP)  
✅ **Git Protection** - `.env` file is in `.gitignore` (won't be committed)  
✅ **Fallback System** - Works even if server is offline (rule-based responses)

---

## 🔧 How It Works

**Before (INSECURE):**
```
Browser → OpenAI API (key visible in JavaScript ❌)
```

**After (SECURE):**
```
Browser → Your Server → OpenAI API (key hidden ✅)
```

---

## 📁 New Files Created

- **`.env`** - Contains your API key (NEVER share this!)
- **`.gitignore`** - Protects `.env` from being committed to Git
- **`server.js`** - Secure backend server
- **`package.json`** - Node.js dependencies

---

## 🌐 Deployment Options

### Option 1: Deploy to Vercel (Recommended)
1. Push code to GitHub (`.env` is automatically excluded)
2. Connect to Vercel: https://vercel.com
3. Add environment variable: `OPENAI_API_KEY=your-key`
4. Deploy!

### Option 2: Deploy to Heroku
```bash
heroku create maple-star-taxes
heroku config:set OPENAI_API_KEY=your-key
git push heroku main
```

### Option 3: Deploy to Netlify + Netlify Functions
- Use Netlify Functions for serverless API endpoints
- Add API key in Netlify environment variables

---

## 🧪 Testing

**Test Backend API:**
```bash
curl http://localhost:3001/api/health
```

**Test TaxBot:**
Open browser: http://localhost:3001

---

## ⚠️ IMPORTANT SECURITY NOTES

1. **NEVER** commit the `.env` file to Git
2. **NEVER** share your API key publicly
3. **ALWAYS** use the backend server for API calls
4. **Monitor** your OpenAI usage at: https://platform.openai.com/usage

---

## 🆘 Troubleshooting

**Server won't start?**
```bash
npm install
npm start
```

**Port already in use?**
Change PORT in `.env` file:
```
PORT=3002
```

**TaxBot not responding?**
- Check if server is running: `http://localhost:3001/api/health`
- Check browser console for errors (F12)
- Server will auto-fallback to rule-based responses

---

## 📊 Monitoring API Usage

Check your OpenAI usage to prevent unexpected charges:
https://platform.openai.com/usage

**Set spending limits:**
https://platform.openai.com/account/billing/limits

---

## 🎯 Next Steps

1. Run `npm install` to install dependencies
2. Run `npm start` to launch the secure server
3. Open http://localhost:3001 in your browser
4. Test the TaxBot!

Your API key is now 100% secure! 🔒
