// ============================================
// Carousel Functionality
// ============================================
class TestimonialCarousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('carouselDots');
        this.currentIndex = 0;
        this.cards = this.track.querySelectorAll('.testimonial-card');
        this.totalCards = this.cards.length;
        
        this.init();
    }
    
    init() {
        // Create dots
        this.createDots();
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Auto-play (optional - uncomment if desired)
        // this.autoPlay();
        
        // Update initial state
        this.updateCarousel();
    }
    
    createDots() {
        for (let i = 0; i < this.totalCards; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateCarousel() {
        // Move track - calculate based on wrapper width
        // Each card is 100% of wrapper width, so we translate by wrapper width * index
        const wrapper = this.track.parentElement;
        const wrapperWidth = wrapper.offsetWidth;
        const translateX = -this.currentIndex * wrapperWidth;
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update button states
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex === this.totalCards - 1 ? '0.5' : '1';
    }
    
    // Recalculate on resize
    handleResize() {
        this.updateCarousel();
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
    
    next() {
        if (this.currentIndex < this.totalCards - 1) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    autoPlay() {
        setInterval(() => {
            if (this.currentIndex < this.totalCards - 1) {
                this.next();
            } else {
                this.goToSlide(0);
            }
        }, 5000); // Change slide every 5 seconds
    }
}

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            let offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            
            // Add extra offset for pricing section to show full card with purchase button
            if (targetId === '#pricing') {
                offsetTop += 150; // Scroll further down to show the full pricing card
            }
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll Reveal Animation
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe elements for scroll reveal
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Button Click Handlers
// ============================================
document.querySelectorAll('.btn-primary, .nav-cta').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Handle specific button actions
        if (this.textContent.includes('Satın Al') || this.textContent.includes('Hemen Başla')) {
            // Scroll to pricing section
            const pricingSection = document.getElementById('pricing');
            if (pricingSection) {
                const offsetTop = pricingSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        } else if (this.textContent.includes('Paketi İncele')) {
            // Scroll to features section
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                const offsetTop = featuresSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Initialize Carousel
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialCarousel();
});

// ============================================
// Add Ripple Effect CSS (dynamically)
// ============================================
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .nav-cta {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Mobile Menu Toggle (if needed in future)
// ============================================
// Uncomment and modify if you want to add a mobile menu
/*
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.classList.add('mobile-menu-btn');
mobileMenuBtn.innerHTML = '☰';
mobileMenuBtn.style.display = 'none';

// Add mobile menu functionality here if needed
*/

// ============================================
// Form Validation (for future contact forms)
// ============================================
// Placeholder for future form validation

// ============================================
// Performance Optimization
// ============================================
// Lazy load images when they're added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

