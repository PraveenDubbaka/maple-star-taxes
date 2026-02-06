// ========================================
// MAPLE STAR TAXES - INTERACTIVE FEATURES
// Animations, Interactions, and Dynamic Content
// ========================================

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeTypewriter();
    initializeFloatingIcons();
    initializeHeroAnimations();
    initializeCounterAnimation();
    initializeParticles();
    initializeScrollAnimations();
    initializeTestimonialSlider();
    initializeContactForm();
    initializeMobileMenu();
    initializeQuickActions();
    initializeScrollProgress();
    initializeLoadingStates();
    enhanceAccessibility();
    initializeLazyLoading();
});

// ========== TYPEWRITER EFFECT ==========
function initializeTypewriter() {
    const services = [
        { 
            text: "Personal Tax Returns",
            color: "#FF0000",
            animation: "personal",
            icon: "fa-user",
            iconStyle: "fas"
        },
        { 
            text: "Business Tax Filing",
            color: "#3C3B6E",
            animation: "business",
            icon: "fa-briefcase",
            iconStyle: "fas"
        },
        { 
            text: "Corporate Accounting",
            color: "#FF0000",
            animation: "corporate",
            icon: "fa-building",
            iconStyle: "fas"
        },
        { 
            text: "Cross-Border Tax Services",
            color: "#3C3B6E",
            animation: "crossborder",
            icon: "fa-globe-americas",
            iconStyle: "fas"
        },
        { 
            text: "Estate Tax Returns",
            color: "#FF0000",
            animation: "estate",
            icon: "fa-home",
            iconStyle: "fas"
        },
        { 
            text: "Tax Planning & Optimization",
            color: "#3C3B6E",
            animation: "planning",
            icon: "fa-chart-line",
            iconStyle: "fas"
        },
        { 
            text: "Audit Support & Representation",
            color: "#FF0000",
            animation: "audit",
            icon: "fa-shield-alt",
            iconStyle: "fas"
        },
        { 
            text: "Payroll Management",
            color: "#3C3B6E",
            animation: "payroll",
            icon: "fa-dollar-sign",
            iconStyle: "fas"
        }
    ];
    
    let currentServiceIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriterText');
    const hologramCircles = document.querySelectorAll('.hologram-circle');
    
    function type() {
        const currentService = services[currentServiceIndex];
        
        if (isDeleting) {
            charIndex--;
            typewriterElement.textContent = currentService.text.substring(0, charIndex);
        } else {
            charIndex++;
            typewriterElement.textContent = currentService.text.substring(0, charIndex);
        }
        
        // Change color and animation based on service
        typewriterElement.style.color = currentService.color;
        
        // Update hologram animations
        hologramCircles.forEach((circle, index) => {
            circle.setAttribute('data-service', currentService.animation);
        });
        
        // Create service-specific floating icon when service changes
        if (!isDeleting && charIndex === currentService.text.length) {
            createServiceIcon(currentService);
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentService.text.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentServiceIndex = (currentServiceIndex + 1) % services.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// ========== FLOATING BACKGROUND ICONS ==========
function createServiceIcon(service) {
    const container = document.getElementById('floatingIcons');
    if (!container) return;
    
    const icon = document.createElement('i');
    icon.className = `${service.iconStyle} ${service.icon} floating-icon service-icon`;
    icon.style.color = service.color;
    
    // Random starting positions
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 50;
    
    icon.style.left = startX + 'px';
    icon.style.top = startY + 'px';
    icon.style.fontSize = '3rem';
    icon.style.opacity = '0';
    
    container.appendChild(icon);
    
    // Trigger animation
    setTimeout(() => {
        icon.style.animation = 'floatService 8s ease-out forwards';
    }, 100);
    
    // Remove after animation
    setTimeout(() => {
        if (icon.parentNode) {
            icon.parentNode.removeChild(icon);
        }
    }, 8000);
}

function createFloatingIcon() {
    const container = document.getElementById('floatingIcons');
    if (!container) return;
    
    const isMapleLeaf = Math.random() > 0.5;
    const icon = document.createElement('i');
    icon.className = isMapleLeaf ? 
        'fab fa-canadian-maple-leaf floating-icon maple-leaf' : 
        'far fa-star floating-icon usa-star';
    
    // Random starting positions
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 50;
    
    icon.style.left = startX + 'px';
    icon.style.top = startY + 'px';
    
    // Vary animation delay and duration
    icon.style.animationDelay = (Math.random() * 3) + 's';
    icon.style.animationDuration = (isMapleLeaf ? 15 : 12) + (Math.random() * 5) + 's';
    
    container.appendChild(icon);
    
    // Remove after animation completes
    setTimeout(() => {
        if (icon.parentNode) {
            icon.remove();
        }
    }, 20000);
}

// Initialize floating icons
function initializeFloatingIcons() {
    // Create icons at intervals
    setInterval(createFloatingIcon, 2000);
    
    // Create initial batch
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingIcon, i * 500);
    }
}

// ========== NAVBAR ==========
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ========== MOBILE MENU ==========
function initializeMobileMenu() {
    const mobileMenuIcon = document.getElementById('mobileMenuIcon');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = mobileMenuIcon.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = mobileMenuIcon.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// ========== HERO ANIMATIONS ==========
function initializeHeroAnimations() {
    // Hologram animation is handled by CSS
    // Add any additional hero interactions here
}

// ========== COUNTER ANIMATION ==========
function initializeCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, duration / steps);
}

// ========== PARTICLE FIELD ==========
function initializeParticles() {
    const particleField = document.getElementById('particles');
    if (!particleField) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(102, 126, 234, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleField.appendChild(particle);
    }
}

// ========== SCROLL ANIMATIONS ==========
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.service-card, .benefit-item, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========== COUNTRY SELECTION ==========
function selectCountry(country) {
    // Store selected country in session
    sessionStorage.setItem('selectedCountry', country);
    
    // Show notification
    showNotification(`Services for ${country.toUpperCase()} selected!`, 'success');
    
    // Smooth scroll to services
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
    
    // Highlight selected country
    const cards = document.querySelectorAll('.country-card');
    cards.forEach(card => {
        if (card.getAttribute('data-country') === country) {
            card.style.borderColor = 'rgba(102, 126, 234, 0.8)';
            card.style.transform = 'translateY(-10px)';
        }
    });
}

// ========== TESTIMONIAL SLIDER ==========
let currentSlide = 0;

function initializeTestimonialSlider() {
    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;
    
    const cards = slider.querySelectorAll('.testimonial-card');
    
    // Auto-slide every 5 seconds
    setInterval(function() {
        slideTestimonials(1);
    }, 5000);
}

function slideTestimonials(direction) {
    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;
    
    const cards = slider.querySelectorAll('.testimonial-card');
    
    if (window.innerWidth > 968) return; // Only slide on mobile
    
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = cards.length - 1;
    } else if (currentSlide >= cards.length) {
        currentSlide = 0;
    }
    
    cards.forEach((card, index) => {
        if (index === currentSlide) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ========== CONTACT FORM ==========
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Simulate form submission
        showNotification('Thank you! We will contact you soon.', 'success');
        form.reset();
        
        // In production, you would send this to a backend API
        console.log('Form submitted:', formData);
    });
}

// ========== BOOKING SYSTEM ==========
function openBooking(serviceType = '') {
    // Redirect to booking page with service parameter
    const bookingURL = 'https://meetme.so/MERCURYTAX';
    window.open(bookingURL, '_blank');
    
    showNotification('Opening booking system...', 'info');
}

// ========== AI CHAT ASSISTANT ==========
function openAIChat() {
    const slider = document.getElementById('taxbotSlider');
    slider.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeTaxBot() {
    const slider = document.getElementById('taxbotSlider');
    slider.classList.remove('open');
    document.body.style.overflow = '';
}

function createAIChatModal() {
    // Check if modal already exists
    if (document.getElementById('aiChatModal')) {
        document.getElementById('aiChatModal').style.display = 'flex';
        return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'aiChatModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 3rem;
            max-width: 600px;
            width: 90%;
            position: relative;
        ">
            <button onclick="closeAIChat()" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: transparent;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: 0.3s;
            " onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">
                <i class="fas fa-times"></i>
            </button>
            
            <div style="text-align: center; margin-bottom: 2rem;">
                <i class="fas fa-robot" style="font-size: 4rem; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1rem;"></i>
                <h2 style="font-family: 'Orbitron', monospace; margin-bottom: 0.5rem;">AI Tax Assistant</h2>
                <p style="color: #94a3b8;">Coming Soon! Advanced AI-powered tax guidance.</p>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.05); border-radius: 15px; padding: 2rem; margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">Features:</h3>
                <ul style="list-style: none; padding: 0; color: #94a3b8; line-height: 2;">
                    <li><i class="fas fa-check" style="color: #43e97b; margin-right: 0.5rem;"></i> Instant tax question answers</li>
                    <li><i class="fas fa-check" style="color: #43e97b; margin-right: 0.5rem;"></i> Deduction recommendations</li>
                    <li><i class="fas fa-check" style="color: #43e97b; margin-right: 0.5rem;"></i> Filing deadline reminders</li>
                    <li><i class="fas fa-check" style="color: #43e97b; margin-right: 0.5rem;"></i> Cross-border tax guidance</li>
                </ul>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="openBooking()" style="
                    padding: 1rem 2rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    border-radius: 50px;
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.3s;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    <i class="fas fa-calendar-check"></i> Book Consultation
                </button>
                <button onclick="window.location.href='tel:4167503600'" style="
                    padding: 1rem 2rem;
                    background: transparent;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 50px;
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.3s;
                " onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">
                    <i class="fas fa-phone"></i> Call Us
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAIChat();
        }
    });
}

function closeAIChat() {
    const modal = document.getElementById('aiChatModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ========== QUICK ACTIONS ==========
function initializeQuickActions() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const colors = {
        success: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        error: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        info: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        warning: 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)'
    };
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${colors[type]};
        color: white;
        padding: 1.25rem 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    notification.innerHTML = `
        <i class="fas ${icons[type]}" style="font-size: 1.5rem;"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(function() {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ========== PERFORMANCE OPTIMIZATION ==========
// Lazy load images when they come into viewport
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initializeLazyLoading();

// ========== SMOOTH SCROLL FOR ALL ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== PRELOADER ==========
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 300);
    }
});

// ========== ANALYTICS TRACKING (Placeholder) ==========
function trackEvent(category, action, label) {
    // In production, integrate with Google Analytics or similar
    console.log('Event tracked:', { category, action, label });
}

// Track important interactions
document.querySelectorAll('.cta-button, .btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('Button', 'Click', this.textContent.trim());
    });
});

// ========== ACCESSIBILITY ==========
// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes modals
    if (e.key === 'Escape') {
        closeAIChat();
    }
});

// ========== TAXBOT CHAT FUNCTIONALITY ==========
let conversationHistory = [];
let isProcessing = false;

// Send message function
async function sendMessage(event) {
    event.preventDefault();
    
    if (isProcessing) return;
    
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Clear input
    input.value = '';
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Add to conversation history
    conversationHistory.push({ role: 'user', content: message });
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process the message
    isProcessing = true;
    await processMessage(message);
    isProcessing = false;
}

// Add message to chat
function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <div class="bot-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">${formatMessage(text)}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">${escapeHtml(text)}</div>
            <div class="user-avatar"><i class="fas fa-user"></i></div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="bot-avatar"><i class="fas fa-robot"></i></div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Process message with AI
async function processMessage(userMessage) {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Get AI response
        const response = await getAIResponse(userMessage);
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add bot response
        addMessage(response, 'bot');
        
        // Add to conversation history
        conversationHistory.push({ role: 'assistant', content: response });
        
    } catch (error) {
        removeTypingIndicator();
        addMessage('I apologize, but I encountered an error processing your question. Please try again or contact our support team for assistance.', 'bot');
        console.error('TaxBot error:', error);
    }
}

// Get AI response (using secure backend API or fallback to rule-based)
async function getAIResponse(question) {
    try {
        // Show loading state
        const sendBtn = document.getElementById('sendBtn');
        const originalBtnContent = sendBtn.innerHTML;
        sendBtn.innerHTML = '<div class="spinner"></div>';
        sendBtn.disabled = true;
        
        // Call secure backend API (API key is hidden on server)
        const response = await fetch('http://localhost:3001/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: conversationHistory
            }),
            timeout: 30000 // 30 second timeout
        });
        
        // Restore button state
        sendBtn.innerHTML = originalBtnContent;
        sendBtn.disabled = false;
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // If backend returns error or fallback flag, use rule-based
        if (data.error || data.fallback) {
            console.log('Using rule-based fallback');
            return getRuleBasedResponse(question);
        }
        
        return data.message;
        
    } catch (error) {
        // If backend is not running, use rule-based responses
        console.log('Backend not available, using rule-based responses');
        return getRuleBasedResponse(question);
    }
}

// Rule-based responses (fallback)
function getRuleBasedResponse(question) {
    const q = question.toLowerCase();
    
    // General tax questions with intelligent matching
    if (q.includes('how') || q.includes('what') || q.includes('when') || q.includes('where') || 
        q.includes('can i') || q.includes('should i') || q.includes('do i need') || 
        q.includes('tell me') || q.includes('explain')) {
        
        // Try to provide a relevant answer based on keywords
        if (q.includes('tax') || q.includes('irs') || q.includes('cra') || q.includes('file') || 
            q.includes('return') || q.includes('refund') || q.includes('owe')) {
            return `<strong>Tax Information</strong><br><br>
                    I can help answer general questions about Canadian and US taxes. Here's what you should know:<br><br>
                    <strong>For your specific question about "${question}":</strong><br><br>
                    Tax matters can be complex and vary based on your individual situation. Both Canada (CRA) and the USA (IRS) have specific rules that may apply.<br><br>
                    <strong>General guidance:</strong><br>
                    • Keep detailed records and receipts<br>
                    • File your returns on time to avoid penalties<br>
                    • Consider both federal and state/provincial requirements<br>
                    • Tax laws change frequently - stay informed<br><br>
                    For a detailed answer specific to your situation, I recommend:<br>
                    1. <a href="#contact">Consulting with our tax experts</a> - they can provide personalized advice<br>
                    2. Visiting official websites: <a href="https://www.canada.ca/en/revenue-agency.html" target="_blank">CRA</a> or <a href="https://www.irs.gov" target="_blank">IRS</a><br>
                    3. Reviewing your previous tax returns for similar situations<br><br>
                    <em>Try asking about specific topics like "deductions", "deadlines", or "RRSP" for more targeted information!</em>`;
        }
    }
    
    // Tax deductions
    if (q.includes('deduct') || q.includes('expense')) {
        if (q.includes('home office')) {
            return `<strong>Home Office Expenses</strong><br><br>
                    In Canada, you can deduct home office expenses if you work from home more than 50% of the time. Eligible expenses include:<br>
                    • Rent or mortgage interest (proportional to office space)<br>
                    • Utilities and maintenance<br>
                    • Internet and phone expenses<br>
                    • Office supplies<br><br>
                    In the USA, the home office deduction is available for self-employed individuals. The space must be used regularly and exclusively for business.<br><br>
                    <em>Note: Always keep detailed records and receipts. Consult with a tax professional for your specific situation.</em>`;
        }
        if (q.includes('vehicle') || q.includes('car')) {
            return `<strong>Vehicle Expense Deductions</strong><br><br>
                    Both Canada and the USA allow vehicle expense deductions for business use:<br><br>
                    <strong>Deductible expenses:</strong><br>
                    • Fuel and oil<br>
                    • Insurance<br>
                    • Maintenance and repairs<br>
                    • Lease payments or depreciation<br>
                    • Parking fees (business-related)<br><br>
                    You must keep a detailed mileage log showing business vs personal use. Only the business portion is deductible.<br><br>
                    <strong>Canada:</strong> CRA requires a vehicle log book<br>
                    <strong>USA:</strong> IRS offers standard mileage rate option ($0.67/mile for 2026)<br><br>
                    <em>Tip: Mobile apps can help track mileage automatically.</em>`;
        }
        if (q.includes('sole proprietor') || q.includes('self-employed')) {
            return `<strong>Sole Proprietor Tax Deductions</strong><br><br>
                    As a sole proprietor, you can deduct ordinary and necessary business expenses:<br><br>
                    <strong>Common deductions:</strong><br>
                    • Office supplies and equipment<br>
                    • Business insurance<br>
                    • Professional fees (legal, accounting)<br>
                    • Marketing and advertising<br>
                    • Business travel and meals (50%)<br>
                    • Software and subscriptions<br>
                    • Employee wages and benefits<br>
                    • Home office expenses<br>
                    • Vehicle expenses (business use)<br><br>
                    <strong>Canada:</strong> File Form T2125 with your T1 return<br>
                    <strong>USA:</strong> Use Schedule C with Form 1040<br><br>
                    <em>Keep all receipts and maintain accurate records throughout the year!</em>`;
        }
    }
    
    // Deadlines
    if (q.includes('deadline') || q.includes('when') && q.includes('file')) {
        return `<strong>Tax Filing Deadlines 2026</strong><br><br>
                <strong>🍁 CANADA:</strong><br>
                • Personal tax returns: <strong>April 30, 2026</strong><br>
                • Self-employed individuals: <strong>June 15, 2026</strong><br>
                • Payment deadline (all): <strong>April 30, 2026</strong><br>
                • Corporate tax returns: 6 months after fiscal year-end<br><br>
                <strong>🦅 USA:</strong><br>
                • Personal tax returns: <strong>April 15, 2026</strong><br>
                • Partnership returns: <strong>March 15, 2026</strong><br>
                • Corporate returns: <strong>April 15, 2026</strong> (calendar year)<br>
                • Extensions available (doesn't extend payment deadline)<br><br>
                <em>Late filing penalties apply, so mark your calendar! Need help? <a href="#contact">Contact us</a> for assistance.</em>`;
    }
    
    // Investment income
    if (q.includes('investment') || q.includes('capital gain') || q.includes('stock') || q.includes('loss')) {
        return `<strong>Reporting Investment Income & Losses</strong><br><br>
                <strong>Capital Gains:</strong><br>
                • Canada: 50% of capital gains are taxable (66.67% over $250,000)<br>
                • USA: Short-term gains taxed as ordinary income; long-term at preferential rates (0%, 15%, or 20%)<br><br>
                <strong>Capital Losses:</strong><br>
                Both countries allow you to offset capital gains with losses:<br>
                • Losses offset gains in the same tax year<br>
                • Net losses can be carried forward indefinitely (Canada) or 3 years (USA)<br>
                • Canada: Can carry back losses 3 years<br>
                • USA: Can deduct up to $3,000 net loss against ordinary income<br><br>
                <strong>Required forms:</strong><br>
                • Canada: Schedule 3 (T1)<br>
                • USA: Form 8949 and Schedule D<br><br>
                <em>Keep detailed records of purchase dates, costs, and sale prices!</em>`;
    }
    
    // Dental care plan
    if (q.includes('dental') || q.includes('cdcp')) {
        return `<strong>Canadian Dental Care Plan (CDCP)</strong><br><br>
                The CDCP is a new federal program providing dental coverage for eligible Canadians:<br><br>
                <strong>Eligibility (2026):</strong><br>
                • Family income under $90,000<br>
                • No access to private dental insurance<br>
                • Canadian resident with valid health card<br><br>
                <strong>Coverage:</strong><br>
                • Preventive care (cleanings, exams)<br>
                • Restorative care (fillings, crowns)<br>
                • Endodontic services (root canals)<br>
                • Prosthodontic services (dentures)<br>
                • Oral surgery<br><br>
                <strong>Tax implications:</strong><br>
                • Benefits received are NOT taxable income<br>
                • Cannot claim dental expenses already covered by CDCP<br>
                • Can still claim eligible out-of-pocket dental expenses as medical expenses<br><br>
                <em>For enrollment info, visit Canada.ca/dental or call 1-833-537-4342</em>`;
    }
    
    // RRSP
    if (q.includes('rrsp') || q.includes('retirement savings')) {
        return `<strong>RRSP (Registered Retirement Savings Plan)</strong><br><br>
                RRSPs are tax-advantaged retirement savings accounts available to Canadians:<br><br>
                <strong>Key Benefits:</strong><br>
                • Contributions are tax-deductible<br>
                • Investments grow tax-free<br>
                • Reduces current year taxable income<br><br>
                <strong>2026 Contribution Limits:</strong><br>
                • 18% of previous year's earned income<br>
                • Maximum: $31,560 (2026 limit)<br>
                • Plus any unused contribution room<br><br>
                <strong>Important Deadlines:</strong><br>
                • Contribution deadline: March 1, 2027 (for 2026 tax year)<br>
                • Report on Line 20800 of your tax return<br><br>
                <strong>Withdrawals:</strong><br>
                • Taxed as income in the year withdrawn<br>
                • Exceptions: Home Buyers' Plan (HBP) and Lifelong Learning Plan (LLP)<br><br>
                <em>USA equivalent: 401(k) and IRA accounts</em>`;
    }
    
    // Cross-border
    if (q.includes('cross-border') || q.includes('both countries') || (q.includes('canada') && q.includes('usa'))) {
        return `<strong>Cross-Border Tax Issues</strong><br><br>
                Living or working in both Canada and the USA creates unique tax obligations:<br><br>
                <strong>Key Considerations:</strong><br>
                • May need to file in both countries<br>
                • Tax treaties prevent double taxation<br>
                • Foreign tax credits available<br>
                • Different residency rules apply<br><br>
                <strong>Common scenarios:</strong><br>
                • Canadian working in USA (or vice versa)<br>
                • Dual citizens<br>
                • Business operations in both countries<br>
                • Rental property in other country<br>
                • Investment income from foreign sources<br><br>
                <strong>Required forms:</strong><br>
                • Canada: T1135 (foreign property over $100K)<br>
                • USA: FBAR, FATCA reporting<br><br>
                <strong>This is complex!</strong> Cross-border taxation requires expert guidance. 
                <a href="#contact">Contact Maple Star Taxes</a> for personalized assistance.<br><br>
                <em>Our team specializes in Canada-USA tax matters!</em>`;
    }
    
    // Default response - enhanced to acknowledge any question
    return `<strong>Thanks for asking: "${question}"</strong><br><br>
            I understand you're asking about this topic. While I have information on common tax questions, I want to give you the most accurate answer possible.<br><br>
            <strong>What I can help with right now:</strong><br>
            • <strong>Tax deductions</strong> - home office, vehicle, business expenses<br>
            • <strong>Filing deadlines</strong> - Canada & USA tax calendar<br>
            • <strong>Investment income</strong> - capital gains, losses, reporting<br>
            • <strong>Canadian benefits</strong> - CDCP, RRSP, tax credits<br>
            • <strong>Cross-border issues</strong> - working in both countries<br>
            • <strong>Self-employed taxes</strong> - sole proprietor deductions<br><br>
            <strong>For your specific question, I recommend:</strong><br>
            1. Try rephrasing using keywords like "deduction", "deadline", "RRSP", or "cross-border"<br>
            2. Click one of the quick question badges above for common topics<br>
            3. <a href="#contact">Schedule a free consultation</a> with our expert team for personalized advice<br><br>
            Our specialists at Maple Star Taxes handle complex tax situations daily for both Canadian and US clients. 
            We can provide detailed, accurate answers specific to your situation!<br><br>
            <em>💡 Tip: The more specific your question, the better I can help. Try asking about a particular deduction, form, or tax situation.</em>`;
}

// Format message with HTML
function formatMessage(text) {
    // Already contains HTML from responses
    return text;
}

// Escape HTML for user input
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Sample question click handler
function askSampleQuestion(button) {
    const questionText = button.textContent.trim();
    const input = document.getElementById('chatInput');
    input.value = questionText;
    
    // Auto-submit
    const form = document.getElementById('chatForm');
    form.dispatchEvent(new Event('submit'));
}

// Reset conversation
function resetConversation() {
    if (confirm('Are you sure you want to reset the conversation? All chat history will be cleared.')) {
        conversationHistory = [];
        const chatMessages = document.getElementById('chatMessages');
        
        // Keep only the welcome message
        chatMessages.innerHTML = `
            <div class="welcome-message">
                <div class="bot-avatar"><i class="fas fa-robot"></i></div>
                <div class="message-content">
                    <p><strong>Welcome to TaxBot!</strong></p>
                    <p>Ask me about tax deductions, credits, filing deadlines, business expenses, and more.</p>
                    <p class="disclaimer-inline"><i class="fas fa-info-circle"></i> <span id="questionsAnswered">76,000+</span> questions answered. Always verify with a professional.</p>
                </div>
            </div>
        `;
        
        showNotification('Conversation reset successfully');
    }
}

// ========== CONSOLE WELCOME MESSAGE ==========
console.log('%c🍁 Welcome to Maple Star Taxes! 🍁', 'color: #c41e3a; font-size: 20px; font-weight: bold;');
console.log('%cExpert Tax & Accounting Services across Canada & USA', 'color: #94a3b8; font-size: 14px;');
console.log('%cWebsite built with modern web technologies', 'color: #64748b; font-size: 12px;');

// ========== CLIENT PORTAL FUNCTIONS ==========
function openClientPortal() {
    const modal = document.getElementById('clientPortalModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeClientPortal() {
    const modal = document.getElementById('clientPortalModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on outside click
document.addEventListener('click', function(event) {
    const modal = document.getElementById('clientPortalModal');
    if (event.target === modal) {
        closeClientPortal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeClientPortal();
    }
});

// ========== BOOKING & CHECK-IN FUNCTIONS ==========
function openBooking(serviceType = '') {
    // Open booking appointment link
    window.open('https://meetme.so/MERCURYTAX', '_blank');
}

function openCheckIn() {
    // Open online check-in system
    window.open('https://apps.netcheckin.com/static/mercurytaxes/index.html', '_blank');
}

// ========== NEW CLIENT FORM ==========
function openNewClientForm() {
    // Create modal for new client intake form
    const modalHTML = `
        <div class="new-client-modal" id="newClientModal">
            <div class="new-client-content">
                <div class="modal-header">
                    <h2><i class="fas fa-user-plus"></i> New Client Registration</h2>
                    <button class="close-modal" onclick="closeNewClientForm()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <form id="newClientForm" onsubmit="submitNewClientForm(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label><i class="fas fa-user"></i> First Name *</label>
                            <input type="text" name="firstName" required>
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-user"></i> Last Name *</label>
                            <input type="text" name="lastName" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label><i class="fas fa-envelope"></i> Email Address *</label>
                            <input type="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-phone"></i> Phone Number *</label>
                            <input type="tel" name="phone" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label><i class="fas fa-briefcase"></i> Service Needed *</label>
                        <select name="serviceType" required>
                            <option value="">Select a service...</option>
                            <option value="personal-tax">Personal Tax Filing</option>
                            <option value="corporate-tax">Corporate Tax Filing</option>
                            <option value="bookkeeping">Bookkeeping Services</option>
                            <option value="payroll">Payroll Services</option>
                            <option value="tax-planning">Tax Planning</option>
                            <option value="hst-filing">HST/GST Filing</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label><i class="fas fa-map-marker-alt"></i> Location</label>
                        <select name="location" required>
                            <option value="">Select location...</option>
                            <option value="canada">Canada</option>
                            <option value="usa">USA</option>
                            <option value="both">Both Canada & USA</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label><i class="fas fa-comment"></i> Additional Information</label>
                        <textarea name="message" rows="4" placeholder="Tell us about your tax situation..."></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="closeNewClientForm()">Cancel</button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-paper-plane"></i> Submit Registration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Check if modal already exists
    if (!document.getElementById('newClientModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // Show modal
    setTimeout(() => {
        document.getElementById('newClientModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 10);
}

function closeNewClientForm() {
    const modal = document.getElementById('newClientModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove modal after animation
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function submitNewClientForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Enhanced validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (!phoneRegex.test(data.phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="spinner"></div> Submitting...';
    submitBtn.disabled = true;
    
    // Add visual feedback
    form.style.opacity = '0.6';
    form.style.pointerEvents = 'none';
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Thank you! We will contact you within 24 hours.', 'success');
        closeNewClientForm();
        
        // In production, you would send this to your backend:
        // fetch('/api/new-client', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => {
        //     showNotification('Thank you! We will contact you within 24 hours.', 'success');
        //     closeNewClientForm();
        // })
        // .catch(error => {
        //     showNotification('An error occurred. Please try again.', 'error');
        //     submitBtn.innerHTML = originalText;
        //     submitBtn.disabled = false;
        //     form.style.opacity = '1';
        //     form.style.pointerEvents = 'auto';
        // });
        
        console.log('New client registration:', data);
    }, 1500);
}

// ========== NEWSLETTER SUBSCRIPTION ==========
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate newsletter subscription (replace with actual API call)
    showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
    emailInput.value = '';
    
    // In production, you would send this to your email service:
    // fetch('/api/newsletter', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email: email })
    // });
}

// ========== SCROLL PROGRESS INDICATOR ==========
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #FF0000 0%, #3C3B6E 100%);
        z-index: 10001;
        transition: width 0.1s ease-out;
        box-shadow: 0 2px 10px rgba(255, 0, 0, 0.3);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ========== LOADING STATES ==========
function initializeLoadingStates() {
    // Add loading class to images
    document.querySelectorAll('img').forEach(img => {
        if (!img.complete) {
            img.classList.add('loading');
            img.addEventListener('load', () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
            });
        }
    });
}

// ========== ACCESSIBILITY ENHANCEMENTS ==========
function enhanceAccessibility() {
    // Add aria labels to interactive elements without text
    document.querySelectorAll('button:not([aria-label]), a:not([aria-label])').forEach(el => {
        if (!el.textContent.trim() && !el.getAttribute('aria-label')) {
            const icon = el.querySelector('i');
            if (icon) {
                const classes = icon.className;
                if (classes.includes('fa-times')) el.setAttribute('aria-label', 'Close');
                else if (classes.includes('fa-bars')) el.setAttribute('aria-label', 'Menu');
                else if (classes.includes('fa-robot')) el.setAttribute('aria-label', 'TaxBot Assistant');
                else if (classes.includes('fa-arrow-up')) el.setAttribute('aria-label', 'Back to top');
            }
        }
    });
    
    // Keyboard navigation for mobile menu
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    if (mobileMenuIcon) {
        mobileMenuIcon.setAttribute('role', 'button');
        mobileMenuIcon.setAttribute('tabindex', '0');
        mobileMenuIcon.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                mobileMenuIcon.click();
            }
        });
    }
}

// ========== LAZY LOADING ==========
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('lazy-loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ========== ENHANCED NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification-toast notification-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        color: #333;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        z-index: 10002;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out, fadeOut 0.3s ease-out 4.7s;
        border-left: 4px solid ${colors[type]};
    `;
    
    notification.querySelector('i:first-child').style.color = colors[type];
    notification.querySelector('i:first-child').style.fontSize = '20px';
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: #999;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// ========== LINK HANDLERS ==========
// Add event listener for client portal link in nav
document.addEventListener('DOMContentLoaded', function() {
    const clientPortalLinks = document.querySelectorAll('a[href="#client-portal"]');
    clientPortalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openClientPortal();
        });
    });
});
