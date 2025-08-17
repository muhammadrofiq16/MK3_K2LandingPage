// Switch between login & register
function switchForm(type) {
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("register-box").classList.add("hidden");

    if (type === "login") {
        document.getElementById("login-box").classList.remove("hidden");
    } else {
        document.getElementById("register-box").classList.remove("hidden");
    }
}

// Register user (save to localStorage)
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let username = document.getElementById("reg-username").value;
    let email = document.getElementById("reg-email").value;
    let password = document.getElementById("reg-password").value;

    if (localStorage.getItem(username)) {
        alert("Username sudah dipakai, coba yang lain!");
    } else {
        localStorage.setItem(username, JSON.stringify({ email, password }));
        alert("Registrasi berhasil! Silakan login.");
        switchForm('login');
    }
});

// Login user (check from localStorage)
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let user = JSON.parse(localStorage.getItem(username));

    if (user && user.password === password) {
        alert("Login sukses! Selamat datang, " + username);
        // redirect ke halaman utama
        window.location.href = "index.html";
    } else {
        alert("Username atau password salah!");
    }
});
