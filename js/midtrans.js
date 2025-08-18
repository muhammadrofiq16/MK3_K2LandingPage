// midtrans.js
class MidtransPayment {
    constructor() {
        this.checkoutBtn = document.querySelector('.checkout-btn');
        this.cart = new ShoppingCart(); // Menggunakan instance cart yang sudah ada
        
        if (this.checkoutBtn) {
            this.checkoutBtn.addEventListener('click', () => this.handlePayment());
        }
    }

    async handlePayment() {
        const cartItems = this.cart.getCart();
        
        if (cartItems.length === 0) {
            alert('Keranjang belanja kosong');
            return;
        }

        // Hitung total harga
        const totalPrice = cartItems.reduce((total, item) => {
            const priceValue = parseFloat(item.price.replace(/[^\d]/g, ''));
            return total + (priceValue * item.quantity);
        }, 0);

        // Siapkan data untuk Midtrans
        const transactionDetails = {
            order_id: 'ILUX-' + Math.floor(Math.random() * 1000000),
            gross_amount: totalPrice
        };

        const itemDetails = cartItems.map(item => ({
            id: item.id,
            price: parseFloat(item.price.replace(/[^\d]/g, '')),
            quantity: item.quantity,
            name: item.name
        }));

        const customerDetails = {
            first_name: 'Pelanggan',
            last_name: 'iLuxury',
            email: 'customer@example.com',
            phone: '08123456789'
        };

        try {
            // Tampilkan loading
            this.checkoutBtn.disabled = true;
            this.checkoutBtn.textContent = 'Memproses...';

            // Request token ke server (dalam implementasi nyata, ini harus dari backend)
            // Untuk demo, kita akan gunakan Snap Token langsung
            const response = await this.getSnapToken({
                transaction_details: transactionDetails,
                item_details: itemDetails,
                customer_details: customerDetails
            });

            // Buka popup pembayaran Midtrans
            window.snap.pay(response.token, {
                onSuccess: (result) => {
                    this.showToast('Pembayaran berhasil!', 'success');
                    this.cart.clearCart();
                },
                onPending: (result) => {
                    this.showToast('Menunggu pembayaran...', 'info');
                },
                onError: (result) => {
                    this.showToast('Pembayaran gagal', 'error');
                },
                onClose: () => {
                    this.showToast('Anda menutup popup pembayaran', 'info');
                }
            });
        } catch (error) {
            console.error('Payment error:', error);
            this.showToast('Terjadi kesalahan saat memproses pembayaran', 'error');
        } finally {
            this.checkoutBtn.disabled = false;
            this.checkoutBtn.textContent = 'Checkout';
        }
    }

    // Method untuk mendapatkan Snap Token (dalam implementasi nyata, ini harus dari backend)
    async getSnapToken(payload) {
        // NOTE: Ini hanya untuk demo. Dalam produksi, Anda harus membuat endpoint backend
        // yang meng-handle request ke Midtrans API untuk mendapatkan Snap Token.
        
        // Simulasikan request ke backend
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    token: 'demo-token-' + Math.random().toString(36).substring(7)
                });
            }, 1000);
        });
    }

    showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                          type === 'error' ? 'fa-times-circle' : 
                          'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        const container = document.getElementById('toast-container');
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Tambahkan method clearCart ke ShoppingCart class
ShoppingCart.prototype.clearCart = function() {
    this.cart = [];
    this.saveCart();
    this.updateCartUI();
    this.showNotification('Keranjang belanja telah dikosongkan');
};

// Inisialisasi Midtrans Payment ketika DOM siap
document.addEventListener('DOMContentLoaded', () => {
    new MidtransPayment();
});