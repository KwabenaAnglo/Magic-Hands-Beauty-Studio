// Main JavaScript for Magic Hands Beauty Studio

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-links');
    const body = document.body;
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            navMenu.classList.toggle('show');
            this.classList.toggle('open');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('show');
                mobileMenuBtn.classList.remove('open');
                body.classList.remove('menu-open');
            }
        });
        
        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                mobileMenuBtn.classList.remove('open');
                body.classList.remove('menu-open');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only handle same-page anchors
            if (targetId !== '#') {
                e.preventDefault();
                
                // If it's a different page link (like services.html#section)
                if (targetId.includes('.html')) {
                    window.location.href = targetId;
                    return;
                }
                
                // Handle same-page anchors
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        navMenu.classList.remove('show');
                        mobileMenuBtn.classList.remove('open');
                        body.classList.remove('menu-open');
                    }
                    
                    // Update URL without page reload
                    history.pushState(null, '', targetId);
                }
            }
        });
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            contactForm.appendChild(successMessage);
            
            // Reset form
            this.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Image lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || '';
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || '';
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for very old browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src || '';
            });
        }
    }
});

// Add responsive class to body for mobile detection
function checkMobile() {
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

// Run on load and resize
window.addEventListener('load', checkMobile);
window.addEventListener('resize', checkMobile);
