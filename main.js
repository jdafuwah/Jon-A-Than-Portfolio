// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initSmoothScroll();
    initScrollSpy();
    initAnimations();
    initFormValidation();
    initDarkMode();
    initImageEffects();
});

// Smooth scrolling for navigation links
function initSmoothScroll() {
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
}

// Scroll spy for navigation highlighting
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.site_header_nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll reveal animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up, .slide-in').forEach(el => {
        observer.observe(el);
    });
}

// Form validation and submission
function initFormValidation() {
    const form = document.querySelector('.contact_form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic validation
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const message = form.querySelector('#message');
        let isValid = true;

        // Reset error states
        [name, email, message].forEach(field => {
            field.classList.remove('error');
        });

        // Validate name
        if (!name.value.trim()) {
            name.classList.add('error');
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.classList.add('error');
            isValid = false;
        }

        // Validate message
        if (!message.value.trim()) {
            message.classList.add('error');
            isValid = false;
        }

        if (!isValid) {
            showNotification('Please fill in all fields correctly', 'error');
            return;
        }

        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            // Replace with actual form submission logic
            await new Promise(resolve => setTimeout(resolve, 1000));
            showNotification('Message sent successfully!', 'success');
            form.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

// Dark mode implementation
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌓';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    document.body.appendChild(darkModeToggle);

    // Check for saved dark mode preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedMode = localStorage.getItem('darkMode');
    
    // Set initial dark mode state
    if (savedMode === 'dark' || (!savedMode && prefersDark.matches)) {
        document.documentElement.classList.add('dark-mode');
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');
        const isDark = document.documentElement.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
        darkModeToggle.innerHTML = isDark ? '☀️' : '🌓';
    });
}

// Image loading effects
function initImageEffects() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 4px;
        background: #333;
        color: white;
        font-size: 14px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification.success {
        background: #4caf50;
    }
    
    .notification.error {
        background: #f44336;
    }
    
    .dark-mode-toggle {
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        transition: all 0.3s ease;
    }
    
    .dark-mode-toggle:hover {
        transform: scale(1.1);
    }
    
    .dark-mode {
        --clr-bg: #1a1a1a;
        --clr-text: #f5f5f5;
        --clr-accent: #4caf50;
    }
    
    .dark-mode body {
        background: var(--clr-bg);
        color: var(--clr-text);
    }
    
    .fade-in {
        opacity: 0;
        transition: opacity 0.6s ease-in-out;
    }
    
    .slide-up {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-in-out;
    }
    
    .slide-in {
        opacity: 0;
        transform: translateX(-20px);
        transition: all 0.6s ease-in-out;
    }
    
    .animate {
        opacity: 1;
        transform: translate(0);
    }
    
    .site_header_nav a.active {
        color: var(--clr-primary);
        font-weight: bold;
    }
    
    .error {
        border-color: #f44336 !important;
    }
`;

document.head.appendChild(style);