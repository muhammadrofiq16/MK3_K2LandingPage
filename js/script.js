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

// Burger menu functionality
const burgerMenu = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

burgerMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
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

// Shopping Cart Class
class ShoppingCart {
    constructor() {
        this.cart = [];
        this.cartIcon = document.querySelector('.fa-shopping-bag');
        this.cartCount = document.querySelector('.cart-count');
        this.cartPopup = document.querySelector('.cart-popup');
        this.cartItemsContainer = document.querySelector('.cart-items');
        this.totalPriceElement = document.querySelector('.total-price');
        
        this.init();
    }
    
    init() {
        // Toggle cart popup
        this.cartIcon.closest('.cart-icon-container').addEventListener('click', (e) => {
            e.stopPropagation();
            this.cartPopup.classList.toggle('active');
        });
        
        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.cart-icon-container') && !e.target.closest('.cart-popup')) {
                this.cartPopup.classList.remove('active');
            }
        });
        
        // Close button
        document.querySelector('.close-cart').addEventListener('click', () => {
            this.cartPopup.classList.remove('active');
        });
        
        // Load cart from localStorage
        this.loadCart();
    }
    
    addItem(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showNotification(`${product.name} ditambahkan ke keranjang`);
        this.cartPopup.classList.add('active');
    }
    
    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Produk dihapus dari keranjang');
    }
    
    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    }
    
    loadCart() {
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
            this.updateCartUI();
        }
    }
    
    updateCartUI() {
        // Update count
        const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
        this.cartCount.textContent = totalItems;
        
        // Update cart items
        this.cartItemsContainer.innerHTML = '';
        
        if (this.cart.length === 0) {
            this.cartItemsContainer.innerHTML = '<p class="empty-cart-message">Keranjang belanja kosong</p>';
            this.totalPriceElement.textContent = 'Rp 0';
            return;
        }
        
        let totalPrice = 0;
        
        this.cart.forEach(item => {
            // Extract numeric value from price string
            const priceValue = parseFloat(item.price.replace(/[^\d]/g, ''));
            totalPrice += priceValue * item.quantity;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price} × ${item.quantity}</div>
                </div>
                <i class="fas fa-times remove-item" data-id="${item.id}"></i>
            `;
            
            this.cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Update total price
        this.totalPriceElement.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;
        
        // Add event listeners to remove buttons
        this.cartItemsContainer.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = button.getAttribute('data-id');
                this.removeItem(productId);
            });
        });
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    getCart() {
        return this.cart;
    }
}

// Initialize shopping cart
const cart = new ShoppingCart();

// Product buttons functionality
document.querySelectorAll('.product-actions button').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        const productImage = productCard.querySelector('.product-image').src;
        const productId = productName.toLowerCase().replace(/\s+/g, '-');
        
        if (this.classList.contains('add-to-cart') || this.classList.contains('buy-now')) {
            // Add to cart
            cart.addItem({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage
            });
            
            // Jika tombol Buy Now, arahkan ke checkout setelah 1 detik
            if (this.classList.contains('buy-now')) {
                setTimeout(() => {
                    window.location.href = 'checkout.html';
                }, 1000);
            }
        }
    });
});

// Handle window resize for mobile menu
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

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    const cartPopup = document.querySelector('.cart-popup');
    const cartIcon = document.querySelector('.cart-icon-container');
    
    if (cartPopup.classList.contains('active') && 
        !cartPopup.contains(e.target) && 
        !cartIcon.contains(e.target)) {
        cartPopup.classList.remove('active');
    }
});