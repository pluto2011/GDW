
// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    

    // Page Transition Animation
    document.body.classList.add('page-transition');

    // Create Floating Particles
    createFloatingParticles();

    // Initialize all animations
    initializeAnimations();

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Floating Particles System
function createFloatingParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and animation delay
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize Animations
function initializeAnimations() {
    // Typing animation for hero title
    const heroTitle = document.querySelector('.typing-animation');
    if (heroTitle) {
        // Reset animation on page load
        heroTitle.style.animation = 'none';
        setTimeout(() => {
            heroTitle.style.animation = 'typing 3s steps(40, end), blink-caret 0.75s step-end infinite';
        }, 1500);
    }

    // Stagger animations for skill items
    const staggerElements = document.querySelectorAll('.stagger-fade-in');
    staggerElements.forEach(container => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(container);
    });

    // Enhanced skill items interactions
    setupSkillItemInteractions();
}

// Lightbox Functionality
let currentImageIndex = 0;
let galleryImages = [];

function openLightbox(imageSrc, imageIndex = 0) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    // Collect all gallery images
    galleryImages = Array.from(document.querySelectorAll('.gallery-image img')).map(img => img.src);
    currentImageIndex = imageIndex;
    
    lightboxImage.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeLightboxImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = galleryImages[currentImageIndex];
}

// Enhanced Form Validation
function setupFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = form.querySelectorAll('input, select, textarea');
    
    fields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearError);
    });

    form.addEventListener('submit', handleFormSubmit);
}

function validateField(e) {
    const field = e.target;
    const fieldContainer = field.closest('.form-field');
    const errorMessage = fieldContainer.querySelector('.error-message');
    
    let isValid = true;
    let message = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = 'This field is required';
    } else if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }

    if (isValid) {
        fieldContainer.classList.remove('error');
        fieldContainer.classList.add('success');
        errorMessage.textContent = '';
        errorMessage.classList.remove('show');
    } else {
        fieldContainer.classList.remove('success');
        fieldContainer.classList.add('error');
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }

    return isValid;
}

function clearError(e) {
    const field = e.target;
    const fieldContainer = field.closest('.form-field');
    const errorMessage = fieldContainer.querySelector('.error-message');
    
    if (field.value.trim()) {
        fieldContainer.classList.remove('error');
        errorMessage.classList.remove('show');
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const spinner = submitButton.querySelector('.loading-spinner');
    
    // Validate all fields
    const fields = form.querySelectorAll('input, select, textarea');
    let isFormValid = true;
    
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            isFormValid = false;
        }
    });

    if (!isFormValid) return;

    // Show loading state
    buttonText.style.display = 'none';
    spinner.style.display = 'inline-block';
    submitButton.disabled = true;

    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showSuccessMessage();
            form.reset();
            // Clear all validation states
            fields.forEach(field => {
                const fieldContainer = field.closest('.form-field');
                fieldContainer.classList.remove('success', 'error');
            });
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        showErrorMessage('There was a problem submitting your form. Please try again.');
    } finally {
        // Reset button state
        buttonText.style.display = 'inline';
        spinner.style.display = 'none';
        submitButton.disabled = false;
    }
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-notification';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    message.textContent = 'Message sent successfully! We\'ll get back to you soon.';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => message.remove(), 300);
    }, 4000);
}

function showErrorMessage(text) {
    const message = document.createElement('div');
    message.className = 'error-notification';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc2626;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    message.textContent = text;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => message.remove(), 300);
    }, 4000);
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Enhanced Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
});

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
    
    // Add click listeners for gallery images
    document.querySelectorAll('.gallery-image img').forEach((img, index) => {
        img.addEventListener('click', () => {
            openLightbox(img.src, index);
        });
        img.style.cursor = 'pointer';
    });
});

// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.5s ease-in-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add stagger effect for children
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Skill items scroll observer - Framer-style animation
const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.stat-item, .category-card, .gallery-item, .contact-item');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Observe skills grid for skill items animation
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        skillObserver.observe(skillsGrid);
    }
});

// Enhanced Category Card Interactions
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const link = card.querySelector('.category-btn');
        if (link) {
            // Add page transition effect
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                window.location.href = link.href;
            }, 300);
        }
    });
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu and lightbox
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const lightbox = document.getElementById('lightbox');
        
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        if (lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    }
    
    // Arrow keys for lightbox navigation
    if (document.getElementById('lightbox').classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    }
});

// Performance optimization: Debounced scroll handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero && scrollY < hero.offsetHeight) {
        const rate = scrollY * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Update progress indicators or other scroll-based elements
    document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight * 0.8) {
            el.classList.add('visible');
        }
    });
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Enhanced Skill Items Interactions
function setupSkillItemInteractions() {
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsGrid = document.querySelector('.skills-grid');
    
    // Simple floating animation for skill items
    if (skillsGrid) {
        skillsGrid.querySelectorAll('.skill-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('floating');
            }, index * 200);
        });
    }
    
    skillItems.forEach((item, index) => {
        // Add tabindex for keyboard accessibility
        item.setAttribute('tabindex', '0');
        
        // Click interaction with haptic feedback
        item.addEventListener('click', function() {
            // Remove any existing active states
            skillItems.forEach(si => si.classList.remove('skill-active'));
            
            // Add active state
            this.classList.add('skill-active');
            
            // Create ripple effect
            createRippleEffect(this, event);
            
            // Remove active state after animation
            setTimeout(() => {
                this.classList.remove('skill-active');
            }, 600);
            
            // Vibration for mobile devices
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
        });
        
        // Keyboard interaction
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Mouse enter/leave for 3D effects
        item.addEventListener('mouseenter', function(e) {
            this.style.transform = `perspective(1000px) rotateX(${(e.offsetY - this.offsetHeight/2) / 10}deg) rotateY(${(e.offsetX - this.offsetWidth/2) / 10}deg) translateY(-10px) scale(1.05)`;
        });
        
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotateY = (x - this.offsetWidth/2) / 15;
            const rotateX = (y - this.offsetHeight/2) / 15;
            
            this.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.05)`;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Touch interactions for mobile
        item.addEventListener('touchstart', function(e) {
            this.classList.add('skill-touched');
        });
        
        item.addEventListener('touchend', function(e) {
            this.classList.remove('skill-touched');
        });
    });
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(16, 108, 223, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Add ripple animation CSS
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .skill-active {
        transform: translateY(-12px) scale(1.08) !important;
        box-shadow: 0 20px 50px rgba(16, 108, 223, 0.4) !important;
    }
    
    .skill-touched {
        transform: translateY(-5px) scale(1.02);
        transition: all 0.1s ease;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .skill-item,
        .skill-item * {
            animation: none !important;
            transition: none !important;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Console welcome message
console.log('%c🎨 Welcome to Rehein Graphic Design Portfolio!', 'color: #03346E; font-size: 16px; font-weight: bold;');
console.log('%c✨ Enhanced with smooth animations and interactive effects', 'color: #6b7280; font-size: 12px;');


document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.querySelector('.stagger-fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after turning visible
            }
        });
    }, { threshold: 0.1 });

    observer.observe(aboutSection);
});