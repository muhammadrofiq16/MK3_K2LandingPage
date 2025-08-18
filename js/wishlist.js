let celebrationMode = "ultimate";
let clickCount = 0;
let clickTimer = null;
let hideTimer = null;

// Ambil wishlist dari localStorage
function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
}

// Simpan wishlist ke localStorage
function saveWishlist(wishlist) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Render Wishlist
function renderWishlist() {
    const container = document.getElementById("wishlist-container");
    container.innerHTML = "";

    const wishlist = getWishlist();

    if (wishlist.length === 0) {
        container.innerHTML = "<p>Your wishlist is empty 💔</p>";
        return;
    }

    wishlist.forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "wishlist-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button onclick="removeFromWishlist(${index})">Remove</button>
        `;

        container.appendChild(card);
    });
}

// Hapus produk dari wishlist
function removeFromWishlist(index) {
    const wishlist = getWishlist();
    wishlist.splice(index, 1);
    saveWishlist(wishlist);
    renderWishlist();
}

// 🎉 Celebration Modes
function showCelebration(message) {
    if (celebrationMode === "ultimate") {
        showCelebrationUltimate(message);
    } else {
        showCelebrationMinimal(message);
    }
}

// Ultimate Mode
function showCelebrationUltimate(message) {
    const wishlistCount = getWishlist().length;
    const audio = new Audio("sounds/celebration.mp3");
    audio.volume = 0.8;
    audio.play();

    const celebrationEl = document.createElement("div");
    celebrationEl.className = "celebration-message";
    celebrationEl.innerHTML = `
        🎉 ${message} 🎉<br>
        <small>You’ve reached ${wishlistCount} items in your wishlist!</small>
        <div class="celebration-buttons">
            <button onclick="share('wa')">WhatsApp</button>
            <button onclick="share('tw')">Twitter</button>
            <button onclick="share('fb')">Facebook</button>
        </div>
    `;
    document.body.appendChild(celebrationEl);

    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            confetti({
                particleCount: 80,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#64ffda', '#ffb347', '#6a5acd', '#ffffff']
            });
        }, i * 300);
    }

    setTimeout(() => celebrationEl.remove(), 5000);
}

// Minimal Mode
function showCelebrationMinimal(message) {
    const wishlistCount = getWishlist().length;
    const audio = new Audio("sounds/celebration.mp3");
    audio.volume = 0.6;
    audio.play();

    const celebrationEl = document.createElement("div");
    celebrationEl.className = "celebration-message-minimal";
    celebrationEl.innerHTML = `
        🎉 ${message} 🎉<br>
        <small>You’ve reached ${wishlistCount} items!</small>
        <div class="celebration-buttons-minimal">
            <button onclick="share('wa')">WA</button>
            <button onclick="share('tw')">TW</button>
            <button onclick="share('fb')">FB</button>
        </div>
    `;
    document.body.appendChild(celebrationEl);

    confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#64ffda', '#ffb347', '#6a5acd', '#ffffff']
    });

    setTimeout(() => celebrationEl.remove(), 4000);
}

// Share Function
function share(type) {
    const wishlistCount = getWishlist().length;
    const msg = `🎉 I just reached ${wishlistCount} items in my wishlist on iLuxury! 🛍✨`;

    if (type === "wa") {
        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
    } else if (type === "tw") {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(msg)}`, "_blank");
    } else if (type === "fb") {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://yourwebsite.com")}&quote=${encodeURIComponent(msg)}`, "_blank");
    }
}

// 🔒 Secret Button
const modeSwitchBtn = document.createElement("button");
modeSwitchBtn.id = "mode-switch-btn";
modeSwitchBtn.textContent = `Mode: ${celebrationMode}`;
document.body.appendChild(modeSwitchBtn);

modeSwitchBtn.addEventListener("click", () => {
    celebrationMode = (celebrationMode === "ultimate") ? "minimal" : "ultimate";
    modeSwitchBtn.textContent = `Mode: ${celebrationMode}`;

    // Toast
    const toast = document.createElement("div");
    toast.className = "mode-change-toast";
    toast.textContent = `Mode changed to ${celebrationMode}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);

    resetHideTimer();
});

// Show/Hide button
function showSecretButton() {
    modeSwitchBtn.classList.add("visible", "spin");

    const blingSound = new Audio("sounds/bling.mp3");
    blingSound.volume = 0.8;
    blingSound.play();

    let confettiColors = (celebrationMode === "ultimate")
        ? ['#64ffda', '#ffb347', '#6a5acd', '#ffffff']
        : ['#64ffda', '#cccccc', '#ffffff'];

    confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.85 },
        colors: confettiColors
    });

    setTimeout(() => {
        modeSwitchBtn.classList.add("shake");
        setTimeout(() => modeSwitchBtn.classList.remove("shake"), 400);
    }, 600);

    resetHideTimer();
}

function hideSecretButton() {
    modeSwitchBtn.classList.remove("visible");
}

function resetHideTimer() {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => hideSecretButton(), 10000);
}

// Klik logo 5x → Unlock button
const logo = document.querySelector(".logo");
if (logo) {
    logo.addEventListener("click", () => {
        clickCount++;
        if (clickTimer) clearTimeout(clickTimer);
        clickTimer = setTimeout(() => clickCount = 0, 2000);

        if (clickCount >= 5) {
            showSecretButton();
            clickCount = 0;
        }
    });
}

// Render pertama kali
document.addEventListener("DOMContentLoaded", renderWishlist);
