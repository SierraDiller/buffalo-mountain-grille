// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Testimonial Carousel
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial and activate corresponding dot
    if (testimonials[n]) {
        testimonials[n].classList.add('active');
    }
    if (dots[n]) {
        dots[n].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
}

function currentSlideFunction(n) {
    currentSlide = n;
    showSlide(currentSlide);
}

// Auto-advance testimonials every 5 seconds
setInterval(nextSlide, 5000);

// Initialize first slide
showSlide(0);

// Smooth Scrolling for Navigation Links
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

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(54, 69, 79, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(54, 69, 79, 0.95)';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
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
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 10px;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
`;
document.head.appendChild(notificationStyles);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.menu-item, .feature, .info-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Lazy Loading for Images (if real images are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Reservation System (Demo)
function handleReservation() {
    const reservationData = {
        date: new Date().toISOString().split('T')[0],
        time: '19:00',
        guests: 2,
        name: 'Demo User',
        email: 'demo@example.com',
        phone: '(555) 123-4567'
    };
    
    showNotification(`Reservation confirmed for ${reservationData.date} at ${reservationData.time} for ${reservationData.guests} guests!`, 'success');
}

// Add click handlers for reservation buttons
document.querySelectorAll('a[href="#reservations"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        handleReservation();
    });
});

// Performance optimization: Debounce scroll events
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
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(54, 69, 79, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(54, 69, 79, 0.95)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Console welcome message
console.log(`
%cBuffalo Mountain Grille
%cWelcome to our demo website!
%c
%cThis is a demonstration website showcasing modern web development techniques.
%cBuilt with HTML5, CSS3, and vanilla JavaScript.
%c
%cFeatures:
%c- Responsive design
%c- Smooth animations
%c- Interactive elements
%c- Accessibility features
%c- Performance optimized
%c
%cFor business inquiries, please contact the developer.
`, 
'color: #8B4513; font-size: 24px; font-weight: bold;',
'color: #DAA520; font-size: 16px; font-weight: bold;',
'color: #666; font-size: 12px;',
'color: #333; font-size: 12px;',
'color: #333; font-size: 12px;',
'color: #333; font-size: 12px;',
'color: #333; font-size: 12px;',
'color: #228B22; font-size: 12px;',
'color: #228B22; font-size: 12px;',
'color: #228B22; font-size: 12px;',
'color: #228B22; font-size: 12px;',
'color: #228B22; font-size: 12px;',
'color: #333; font-size: 12px;'
); 