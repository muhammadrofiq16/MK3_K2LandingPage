// Parallax efek custom (opsional tambahan biar lebih dynamic)
window.addEventListener("scroll", () => {
    const parallaxSections = document.querySelectorAll(".parallax");
    parallaxSections.forEach(section => {
        let scrollPosition = window.scrollY;
        section.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
    });
});
