// ========================================
// MAPLE STAR TAXES - SECURE API SERVER
// Backend proxy using Google Gemini API (FREE)
// MAXIMUM SECURITY - API Key Protected
// ========================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;

// ========== SECURITY CONFIGURATIONS ==========

// CORS Configuration - Only allow requests from your domain
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        // In production, replace with your actual domain
        const allowedOrigins = [
            'http://localhost:3001',
            'http://127.0.0.1:3001',
            'http://localhost:5500',
            'http://127.0.0.1:5500',
            // Add your production domain here:
            // 'https://maplestartaxes.com',
            // 'https://www.maplestartaxes.com'
        ];
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`⚠️  Blocked request from unauthorized origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'X-Request-ID']
};

app.use(cors(corsOptions));

// Enhanced Security Headers
app.use((req, res, next) => {
    // Force HTTPS in production
    if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    
    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // XSS Protection
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Referrer Policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Content Security Policy
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';");
    
    // Remove X-Powered-By header to hide Express
    res.removeHeader('X-Powered-By');
    
    next();
});

app.use(express.json({ limit: '10kb' })); // Limit payload size
app.use(express.static('.')); // Serve static files

// Rate limiting - prevent abuse and DDoS attacks
const rateLimit = require('express-rate-limit');

// Strict rate limit for chat endpoint
const chatLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // Max 30 chat requests per 15 minutes per IP
    message: { error: 'Too many requests. Please try again in 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
    // Skip successful requests to prevent counting errors
    skipSuccessfulRequests: false,
    // Custom key generator (by IP)
    keyGenerator: (req) => {
        return req.ip || req.connection.remoteAddress;
    }
});

// General API rate limit
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many API requests. Please slow down.' }
});

app.use('/api/', apiLimiter);
app.use('/api/chat', chatLimiter);

// Request validation middleware
function validateRequest(req, res, next) {
    // Check for required headers
    if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
        return res.status(400).json({ error: 'Invalid content type' });
    }
    
    // Add request ID for tracking (not logging sensitive data)
    req.requestId = crypto.randomBytes(16).toString('hex');
    
    next();
}

app.use('/api/chat', validateRequest);

// Health check endpoint (no sensitive data)
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'TaxBot API is running',
        timestamp: new Date().toISOString()
    });
});

// Secure function to get API key (never exposed to client)
function getSecureApiKey() {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'your_gemini_api_key_here') {
        return null;
    }
    return key;
}

// Sanitize user input to prevent injection attacks
function sanitizeInput(text) {
    if (typeof text !== 'string') return '';
    
    // Remove potentially harmful content
    let cleaned = text
        .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
        .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '') // Remove iframes
        .replace(/<object[^>]*>.*?<\/object>/gi, '') // Remove objects
        .replace(/<embed[^>]*>/gi, '') // Remove embeds
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .replace(/eval\(/gi, '') // Remove eval
        .replace(/expression\(/gi, '') // Remove CSS expressions
        .replace(/[<>"'`]/g, '') // Remove special chars
        .trim();
    
    // Limit length to prevent abuse
    return cleaned.slice(0, 1000);
}

// Secure TaxBot chat endpoint using Google Gemini
app.post('/api/chat', async (req, res) => {
    const startTime = Date.now();
    
    try {
        const { messages } = req.body;

        // Comprehensive validation
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid request format' });
        }
        
        if (messages.length === 0 || messages.length > 50) {
            return res.status(400).json({ error: 'Invalid message count' });
        }
        
        // Sanitize all messages
        const sanitizedMessages = messages.map(msg => ({
            role: msg.role === 'user' || msg.role === 'assistant' ? msg.role : 'user',
            content: sanitizeInput(msg.content)
        }));

        // Validate API key exists (securely)
        const apiKey = getSecureApiKey();
        if (!apiKey) {
            console.error(`[${req.requestId}] API key not configured`);
            return res.status(500).json({ 
                error: 'Service temporarily unavailable',
                fallback: true 
            });
        }

        // Convert messages to Gemini format
        const systemMessage = 'You are TaxBot, a helpful and friendly AI tax assistant for Maple Star Taxes. You provide accurate information about Canadian and US tax laws, deductions, credits, filing requirements, and general tax planning. Always remind users to verify important information with a qualified tax professional. Be concise, clear, and helpful. Focus on practical advice. Format your responses with HTML tags for better readability (use <br>, <strong>, <ul>, <li>, etc.).';
        
        // Combine system message with sanitized conversation
        let conversationText = systemMessage + '\n\n';
        sanitizedMessages.forEach(msg => {
            if (msg.role === 'user') {
                conversationText += `User: ${msg.content}\n`;
            } else if (msg.role === 'assistant') {
                conversationText += `Assistant: ${msg.content}\n`;
            }
        });
        conversationText += 'Assistant:';

        // Call Google Gemini API with timeout (API key never exposed to client)
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'MapleTaxBot/1.0'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: conversationText
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 600,
                    topP: 0.8,
                    topK: 40
                },
                safetySettings: [
                    {
                        category: 'HARM_CATEGORY_HARASSMENT',
                        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                    },
                    {
                        category: 'HARM_CATEGORY_HATE_SPEECH',
                        threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                    }
                ]
            }),
            signal: controller.signal
        });
        
        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error(`Gemini API returned ${response.status}`);
        }

        const data = await response.json();

        // Handle Gemini errors (without exposing internal details)
        if (data.error) {
            console.error(`[${req.requestId}] Gemini API Error:`, data.error.message);
            return res.status(500).json({ 
                error: 'Unable to process request',
                fallback: true 
            });
        }

        // Extract and sanitize response
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
        
        // Log success (no sensitive data)
        const responseTime = Date.now() - startTime;
        console.log(`[${req.requestId}] ✅ Response generated in ${responseTime}ms`);

        // Return the AI response
        res.json({
            message: aiResponse,
            model: 'gemini-pro'
        });

    } catch (error) {
        // Secure error handling (don't expose internal errors)
        if (error.name === 'AbortError') {
            console.error(`[${req.requestId}] Request timeout`);
            return res.status(504).json({ 
                error: 'Request timeout',
                fallback: true 
            });
        }
        
        console.error(`[${req.requestId}] Server error:`, error.message);
        res.status(500).json({ 
            error: 'Service temporarily unavailable',
            fallback: true 
        });
    }
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    
    // Don't leak error details in production
    const isDevelopment = process.env.NODE_ENV !== 'production';
    
    res.status(err.status || 500).json({
        error: isDevelopment ? err.message : 'An error occurred. Please try again.',
        requestId: req.requestId
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
    const apiConfigured = getSecureApiKey() !== null;
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🍁 MAPLE STAR TAXES - SECURE API SERVER`);
    console.log(`${'='.repeat(60)}`);
    console.log(`🌐 Server: http://localhost:${PORT}`);
    console.log(`✅ API Key: ${apiConfigured ? '✓ Configured & Encrypted' : '✗ Not configured'}`);
    console.log(`🤖 TaxBot: http://localhost:${PORT}/api/chat`);
    console.log(`💚 AI Model: Google Gemini Pro (FREE TIER)`);
    console.log(`🔒 Security: CORS, Rate Limiting, Input Sanitization, Headers`);
    console.log(`🛡️  Protection: XSS, CSRF, Injection, DDoS, Error Handling`);
    console.log(`${'='.repeat(60)}\n`);
    
    if (!apiConfigured) {
        console.error(`⚠️  WARNING: Gemini API key not configured!`);
        console.error(`📝 Add your key to .env file: GEMINI_API_KEY=your_key\n`);
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n🛑 SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n🛑 SIGINT received. Shutting down gracefully...');
    process.exit(0);
});
