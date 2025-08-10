// Fungsi untuk menambahkan produk saat tombol See All diklik
document.getElementById('see-all-btn').addEventListener('click', function() {
    const productsGrid = document.getElementById('all-products-grid');
    
    // Produk tambahan yang akan ditampilkan
    const additionalProducts = [
        {
            image: "https://via.placeholder.com/300x200.png?text=iPhone+13+Pro",
            title: "iPhone 13 Pro 256GB",
            description: "Kondisi 94% seperti baru, baterai kesehatan 97%, fullset dengan box.",
            grade: "grade-a",
            price: "Rp 10.999.000"
        },
        {
            image: "https://via.placeholder.com/300x200.png?text=iPhone+SE+2022",
            title: "iPhone SE 2022 64GB",
            description: "Kondisi 90% seperti baru, baterai kesehatan 93%, unit only.",
            grade: "grade-b",
            price: "Rp 4.999.000"
        },
        {
            image: "https://via.placeholder.com/300x200.png?text=iPhone+6s",
            title: "iPhone 6s 32GB",
            description: "Kondisi 70%, baterai kesehatan 75%, unit only, kondisi fisik ada baret.",
            grade: "grade-c",
            price: "Rp 1.799.000"
        },
        {
            image: "https://via.placeholder.com/300x200.png?text=iPhone+12+Pro+Max",
            title: "iPhone 12 Pro Max 128GB",
            description: "Kondisi 91% seperti baru, baterai kesehatan 94%, fullset dengan box.",
            grade: "grade-a",
            price: "Rp 9.999.000"
        },
        {
            image: "https://via.placeholder.com/300x200.png?text=iPhone+11+Pro+Max",
            title: "iPhone 11 Pro Max 256GB",
            description: "Kondisi 89% seperti baru, baterai kesehatan 92%, unit only.",
            grade: "grade-b",
            price: "Rp 8.999.000"
        },
        {
            image: "https://via.placeholder.com/300x200.png?text=iPhone+XS+Max",
            title: "iPhone XS Max 64GB",
            description: "Kondisi 84% seperti baru, baterai kesehatan 88%, unit only.",
            grade: "grade-b",
            price: "Rp 6.499.000"
        },
        {
            image: "https://via.placeholder.com/300x200.png?text=iPhone+14+Pro+Max",
            title: "iPhone 14 Pro Max 256GB",
            description: "Kondisi 97% seperti baru, baterai kesehatan 100%, fullset dengan box.",
            grade: "grade-a",
            price: "Rp 16.999.000"
        },
        {
            image: "https://via.placeholder.com/300x200.png?text=iPhone+8",
            title: "iPhone 8 64GB",
            description: "Kondisi 76%, baterai kesehatan 79%, unit only, kondisi fisik cukup baik.",
            grade: "grade-c",
            price: "Rp 2.999.000"
        },
        {
            image: "https://via.placeholder.com/300x200.png?text=iPhone+XR",
            title: "iPhone XR 64GB",
            description: "Kondisi 81% seperti baru, baterai kesehatan 84%, unit only.",
            grade: "grade-b",
            price: "Rp 4.299.000"
        }
    ];
    
    // Tambahkan produk baru ke grid
    additionalProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <span class="product-grade ${product.grade}">${product.grade.split('-')[1].toUpperCase()}</span>
                <p class="product-price">${product.price}</p>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // Nonaktifkan tombol setelah diklik
    this.disabled = true;
    this.textContent = 'Semua Produk Ditampilkan';
});