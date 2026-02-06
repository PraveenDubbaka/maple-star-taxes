# Google Gemini API Setup (100% FREE)

## Why Gemini?
- ✅ **Completely FREE** - No credit card required for free tier
- ✅ **Generous limits** - 60 requests per minute
- ✅ **High quality** - Google's latest AI model
- ✅ **No billing** - Free tier doesn't expire

## Step-by-Step Setup

### 1. Get Your FREE Gemini API Key

1. Go to **Google AI Studio**: https://makersuite.google.com/app/apikey
   
2. Click **"Get API Key"** or **"Create API Key"**

3. Sign in with your Google account (any Gmail account works)

4. Click **"Create API key in new project"** or select an existing project

5. Copy the API key (starts with `AIza...`)

### 2. Add the API Key to Your Project

1. Open the `.env` file in your project folder

2. Replace `your_gemini_api_key_here` with your actual API key:
   ```
   GEMINI_API_KEY=AIzaSyC...your_actual_key_here
   ```

3. Save the file

### 3. Restart the Server

Stop the current server (Ctrl+C) and restart:
```bash
npm start
```

You should see:
```
🍁 Maple Star Taxes API Server running on http://localhost:3001
✅ Gemini API Key configured: Yes
🤖 TaxBot endpoint: http://localhost:3001/api/chat
💚 Using Google Gemini API (FREE TIER)
```

## Free Tier Limits

- **60 requests per minute**
- **1,500 requests per day**
- **1 million requests per month**

These limits are MORE than enough for your website!

## Troubleshooting

### "API key not configured" error
- Make sure you replaced `your_gemini_api_key_here` with your actual key
- Make sure there are no spaces or quotes around the key
- Restart the server after updating `.env`

### "Failed to get AI response" error
- Check your API key is correct
- Make sure you're connected to the internet
- Verify at https://makersuite.google.com/app/apikey that your key is active

### Rate limit exceeded
- Free tier allows 60 requests/minute
- Wait a minute and try again
- Consider caching responses for common questions

## Links

- **Get API Key**: https://makersuite.google.com/app/apikey
- **Gemini Documentation**: https://ai.google.dev/docs
- **API Pricing** (Free tier info): https://ai.google.dev/pricing

---

🎉 **That's it!** Your TaxBot will now use Google's FREE Gemini API instead of paid OpenAI.
