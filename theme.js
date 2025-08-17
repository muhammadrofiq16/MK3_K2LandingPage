const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Cek preferensi theme dari localStorage
if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    toggleBtn.textContent = "☀️";
}

// Event listener toggle
toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        toggleBtn.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        toggleBtn.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});
