window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");

    // Delay 3 detik sebelum masuk ke konten utama
    setTimeout(() => {
        loadingScreen.style.display = "none";
        mainContent.classList.remove("hidden");
        mainContent.classList.add("show");
        document.body.style.overflow = "auto"; // Aktifkan scroll lagi
    }, 3000);
});
