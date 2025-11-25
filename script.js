// ===== Carousel Functions =====
let currentCarouselIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselDotsContainer = document.getElementById('carouselDots');

// Generate dots dynamically
function generateCarouselDots() {
    carouselDotsContainer.innerHTML = '';
    carouselItems.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => currentCarousel(index);
        carouselDotsContainer.appendChild(dot);
    });
}

// Generate dots on page load
generateCarouselDots();

function showCarousel(index) {
    const dots = document.querySelectorAll('.dot');
    carouselItems.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    carouselItems[index].classList.add('active');
    dots[index].classList.add('active');
}

function scrollCarousel(direction) {
    currentCarouselIndex += direction;
    if (currentCarouselIndex >= carouselItems.length) {
        currentCarouselIndex = 0;
    } else if (currentCarouselIndex < 0) {
        currentCarouselIndex = carouselItems.length - 1;
    }
    showCarousel(currentCarouselIndex);
}

function currentCarousel(index) {
    currentCarouselIndex = index;
    showCarousel(currentCarouselIndex);
}

// Auto-rotate carousel every 5 seconds
setInterval(() => {
    scrollCarousel(1);
}, 5000);

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.backgroundColor = '#10b981';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        } else {
            alert('Please fill in all fields');
        }
    });
}

// Scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and program items
document.querySelectorAll('.program-card, .activity-card, .stat, .news-card, .staff-card, .event-card, .testimonial-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Dark Mode Toggle =====
const themeBtn = document.getElementById('themeBtn');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.toggle('dark-mode', currentTheme === 'dark');
updateThemeButton();

themeBtn.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeButton();
});

function updateThemeButton() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeBtn.textContent = isDarkMode ? '☀️' : '🌙';
}

// ===== FAQ Accordion =====
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        
        // Close other items
        faqQuestions.forEach(other => {
            if (other !== question) {
                other.parentElement.classList.remove('active');
            }
        });
        
        // Toggle current item
        faqItem.classList.toggle('active');
    });
});

// ===== Gallery Lightbox (Optional Enhancement) =====
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        
        // Create and show modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            cursor: pointer;
        `;
        
        const imgContainer = document.createElement('div');
        imgContainer.style.cssText = `
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
        `;
        
        const largeImg = document.createElement('img');
        largeImg.src = img.src;
        largeImg.alt = title;
        largeImg.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            border-radius: 10px;
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: -40px;
            background: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.remove();
        });
        
        modal.addEventListener('click', () => {
            modal.remove();
        });
        
        imgContainer.appendChild(largeImg);
        imgContainer.appendChild(closeBtn);
        modal.appendChild(imgContainer);
        document.body.appendChild(modal);
    });
});

// ===== Admission Steps Animation =====
const steps = document.querySelectorAll('.steps li');
steps.forEach((step, index) => {
    step.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
    step.style.opacity = '0';
});

// Add a welcome message to console
console.log('%cWelcome to Sunrise Academy Website!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cTheme: Light/Dark Mode enabled | Scroll animations enabled', 'color: #764ba2; font-size: 12px;');

// ===== Back to Top Button =====
const backToTopBtn = document.getElementById('backToTopBtn');

// Show button when user scrolls down
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Scroll to top smoothly when button is clicked
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Alternative: Show button on mobile when scrolled down
document.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
});


