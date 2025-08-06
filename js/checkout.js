document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const colorOptions = document.querySelectorAll('.color-option');
    const storageOptions = document.querySelectorAll('.storage-option');
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const productImage = document.getElementById('product-image');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total-price');
    const checkoutForm = document.getElementById('checkout-form');

    // Product data
    let currentPrice = 1299;
    let currentColor = 'noir';
    let currentStorage = '128';
    let quantity = 1;

    // Color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));

            // Add active class to clicked option
            this.classList.add('active');

            // Update product image
            const newImage = this.getAttribute('data-image');
            productImage.src = newImage;

            // Update current color
            currentColor = this.getAttribute('data-color');
        });
    });

    // Storage selection
    storageOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Remove active class from all options
            storageOptions.forEach(opt => opt.classList.remove('active'));

            // Add active class to clicked option
            this.classList.add('active');

            // Update current price and storage
            currentPrice = parseInt(this.getAttribute('data-price'));
            currentStorage = this.getAttribute('data-storage');

            // Update totals
            updateTotals();
        });
    });

    // Quantity controls
    decreaseBtn.addEventListener('click', function () {
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
            updateTotals();
        }
    });

    increaseBtn.addEventListener('click', function () {
        if (quantity < 5) {
            quantity++;
            quantityInput.value = quantity;
            updateTotals();
        }
    });

    quantityInput.addEventListener('change', function () {
        quantity = parseInt(this.value);
        if (quantity < 1) quantity = 1;
        if (quantity > 5) quantity = 5;
        this.value = quantity;
        updateTotals();
    });

    // Update price totals
    function updateTotals() {
        const subtotal = currentPrice * quantity;
        subtotalElement.textContent = `$${subtotal.toLocaleString()}.00`;
        totalElement.textContent = `$${subtotal.toLocaleString()}.00`;
    }

    // Form submission
    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const fullName = document.getElementById('full-name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const notes = document.getElementById('notes').value;

        // Prepare WhatsApp message
        const productName = document.getElementById('product-name').textContent;
        const totalPrice = totalElement.textContent;

        let message = `*NEW ORDER - iPhone Noir*%0A%0A`;
        message += `*Product:* ${productName}%0A`;
        message += `*Color:* ${currentColor.toUpperCase()}%0A`;
        message += `*Storage:* ${currentStorage}GB%0A`;
        message += `*Quantity:* ${quantity}%0A`;
        message += `*Total Price:* ${totalPrice}%0A%0A`;
        message += `*Customer Information*%0A`;
        message += `Name: ${fullName}%0A`;
        message += `Phone: ${phone}%0A`;
        message += `Email: ${email}%0A`;
        message += `Address: ${address}%0A`;
        if (notes) message += `Notes: ${notes}%0A`;

        // Open WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/6281215235064?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });

    // Initialize totals
    updateTotals();
});