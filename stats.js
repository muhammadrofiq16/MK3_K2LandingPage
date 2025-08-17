const counters = document.querySelectorAll('.counter');
let started = false; // biar cuma sekali jalan

function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // 2 detik
    const stepTime = Math.max(Math.floor(duration / target), 20);
    let current = 0;

    const timer = setInterval(() => {
        current += Math.ceil(target / (duration / stepTime));
        if (current >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            counter.textContent = current.toLocaleString();
        }
    }, stepTime);
}

// Scroll trigger pakai IntersectionObserver
const section = document.querySelector('.stats-section');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
        counters.forEach(c => animateCounter(c));
        started = true;
    }
}, { threshold: 0.4 });

observer.observe(section);
