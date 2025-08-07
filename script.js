// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const typingText = document.getElementById('typing-text');
const contactForm = document.getElementById('contact-form');
const particlesCanvas = document.getElementById('particles-canvas');

// Typing Animation
const phrases = [
    'Expertos en bases de datos.',
    'Optimización de procesos.',
    'Desarrollo web moderno.',
    'Soporte técnico 24/7.',
    'Venta de equipos tecnológicos.',
    'Compra y venta de hardware.',
    'Cursos tecnológicos personalizados.',
    'Cursos tecnológicos personalizados.'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    const displayText = isDeleting 
        ? currentPhrase.substring(0, charIndex - 1)
        : currentPhrase.substring(0, charIndex + 1);
    
    typingText.textContent = displayText;
    
    let typeSpeed = isDeleting ? 100 : 150;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    
    charIndex += isDeleting ? -1 : 1;
    setTimeout(typeEffect, typeSpeed);
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    // Close mobile menu if open
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Particles Animation
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
        canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
    
    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particle.x -= dx * 0.001;
                particle.y -= dy * 0.001;
            }
        });
        
        // Draw connections
        this.ctx.strokeStyle = 'rgba(74, 155, 142, 0.3)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(95, 179, 163, ${particle.opacity})`;
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowColor = 'rgba(74, 155, 142, 0.5)';
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * 0.5, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(74, 155, 142, ${particle.opacity * 1.5})`;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Animated Counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Intersection Observer for Animations
function initAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Animate counters when they come into view
                const counters = entry.target.querySelectorAll('[data-target]');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    // Observe stats section separately
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Form Handling
function handleFormSubmit(e) {
    // Don't prevent default - let Formspree handle the submission
    const submitButton = contactForm.querySelector('.form-submit');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span>Enviando...</span>';
    submitButton.disabled = true;
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#10B981' : '#4A9B8E',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '10px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Tech Circles Animation
function animateTechCircles() {
    const circles = document.querySelectorAll('.tech-circle');
    let activeIndex = 0;
    
    // Add initial glow effect
    circles.forEach((circle, index) => {
        circle.style.animationDelay = `${index * 0.5}s`;
    });
    
    setInterval(() => {
        circles.forEach(circle => circle.classList.remove('active'));
        circles[activeIndex].classList.add('active');
        activeIndex = (activeIndex + 1) % circles.length;
        
        // Add ripple effect
        const activeCircle = circles[activeIndex];
        activeCircle.style.boxShadow = `
            0 12px 35px rgba(74, 155, 142, 0.3),
            0 0 30px rgba(74, 155, 142, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 0 0 0 rgba(74, 155, 142, 0.4)
        `;
        
        setTimeout(() => {
            activeCircle.style.boxShadow = '';
        }, 300);
    }, 2000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start typing animation
    setTimeout(typeEffect, 1000);
    
    // Initialize particles
    if (particlesCanvas) {
        new ParticleSystem(particlesCanvas);
    }
    
    // Initialize AOS
    initAOS();
    
    // Initialize tech circles animation
    animateTechCircles();
    
    // Event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
    });
    
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Smooth scroll for buttons
    document.querySelectorAll('[onclick*="scrollToSection"]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const match = button.getAttribute('onclick').match(/scrollToSection\('([^']+)'\)/);
            if (match) {
                scrollToSection(match[1]);
            }
        });
    });
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Add staggered animations to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in-up');
    });
    
    // Add hover sound effect simulation (visual feedback)
    document.querySelectorAll('.service-card, .contact-icon, .tech-circle').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform + ' scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.02)', '');
        });
    });
});

// Add CSS for loading animation
const loadingStyles = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #4A9B8E;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10001;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);