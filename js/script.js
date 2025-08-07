// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
// Navbar scroll effect - Perbaikan
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '1rem 5%';
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.padding = '1.5rem 5%';
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Product hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(138, 43, 226, 0.2)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Testimonial slider functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const testimonialCount = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

// Initialize testimonial slider
showTestimonial(currentTestimonial);

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCount;
    showTestimonial(currentTestimonial);
}, 5000);

// Product buttons functionality
document.querySelectorAll('.product-actions button').forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.closest('.product-card').querySelector('h3').textContent;

        if (this.classList.contains('buy-now')) {
            alert(`Added ${productName} to your cart!`);
                window.location = 'checkout.html';
        } else {
            alert(`Showing details for ${productName}`);
        }
    });
});

// Burger menu functionality
const burgerMenu = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

burgerMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Fungsi untuk menangani resize window
function handleResize() {
    if (window.innerWidth > 768) {
        // Reset semua state menu saat kembali ke desktop
        burgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
    }
}

// Tambahkan event listener untuk resize
window.addEventListener('resize', handleResize);
});

// Close menu when clicking on a link
document.querySelectorAll('.mobile-links a').forEach(link => {
    link.addEventListener('click', function() {
        burgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (!mobileMenu.contains(e.target) && !burgerMenu.contains(e.target) && mobileMenu.classList.contains('active')) {
        burgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
    }
});

// Close menu on escape key press
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        burgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
    }
});