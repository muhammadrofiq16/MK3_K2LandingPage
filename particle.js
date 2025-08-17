const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d', { alpha: true });

// Retina scaling
let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
function resize() {
    canvas.width = Math.floor(innerWidth * dpr);
    canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
addEventListener('resize', resize);
resize();

// Settings
let PARTICLE_COUNT = 120;
const MAX_PARTICLES = 300;
const MIN_PARTICLES = 40;
const LINK_DIST = 120;      // jarak koneksi garis
const LINK_ALPHA = 0.12;
const SPEED = 0.6;          // kecepatan dasar
const FOLLOW_FORCE = 0.06;  // tarikan ke mouse saat follow
let mode = 'wander';        // 'wander' | 'follow'

// UI
const toggleBtn = document.getElementById('toggleMode');
const densityInput = document.getElementById('density');
toggleBtn.onclick = () => {
    mode = mode === 'wander' ? 'follow' : 'wander';
    toggleBtn.textContent = 'Mode: ' + (mode === 'wander' ? 'Wander' : 'Follow');
};
densityInput.oninput = (e) => {
    const val = Math.max(MIN_PARTICLES, Math.min(MAX_PARTICLES, Number(e.target.value)));
    PARTICLE_COUNT = val;
    rebuild();
};

// Mouse target
const mouse = { x: innerWidth / 2, y: innerHeight / 2, active: false };
addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
});
addEventListener('mouseleave', () => mouse.active = false);
addEventListener('touchmove', (e) => {
    if (!e.touches[0]) return;
    mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; mouse.active = true;
}, { passive: true });
addEventListener('touchend', () => mouse.active = false);

// Color palette (neon gradient)
const palette = [
    { r: 0, g: 255, b: 200 },    // cyan
    { r: 0, g: 119, b: 255 },    // blue
    { r: 170, g: 0, b: 255 },    // purple
];

// Particle
class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * innerWidth;
        this.y = Math.random() * innerHeight;
        const angle = Math.random() * Math.PI * 2;
        const speed = SPEED * (0.5 + Math.random());
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = 1.3 + Math.random() * 2.2;
        this.color = palette[(Math.random() * palette.length) | 0];
        this.life = 0; // untuk efek pulsing
    }
    step() {
        // Wander: sedikit noise
        if (mode === 'wander') {
            const jitter = (Math.random() - 0.5) * 0.25;
            this.vx += jitter * 0.06;
            this.vy += jitter * 0.06;
        }
        // Follow: tarik ke mouse
        if (mode === 'follow' && mouse.active) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            this.vx += dx * FOLLOW_FORCE * 0.0015;
            this.vy += dy * FOLLOW_FORCE * 0.0015;
        }

        // Update posisi
        this.x += this.vx;
        this.y += this.vy;

        // Bounce edge
        if (this.x < -50 || this.x > innerWidth + 50) this.vx *= -1;
        if (this.y < -50 || this.y > innerHeight + 50) this.vy *= -1;

        this.life += 0.02;
    }
    draw(ctx) {
        const pulse = 0.6 + Math.sin(this.life) * 0.4;
        const r = Math.round(this.color.r * pulse);
        const g = Math.round(this.color.g * pulse);
        const b = Math.round(this.color.b * pulse);
        ctx.shadowBlur = 18;
        ctx.shadowColor = `rgba(${r},${g},${b},.9)`;
        ctx.fillStyle = `rgba(${r},${g},${b},.85)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let particles = [];
function rebuild() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
}
rebuild();

// Render loop
function drawLinks(ctx, p, q) {
    const dx = p.x - q.x, dy = p.y - q.y;
    const dist = Math.hypot(dx, dy);
    if (dist < LINK_DIST) {
        const a = (1 - dist / LINK_DIST) * LINK_ALPHA;
        const midR = Math.round((p.color.r + q.color.r) / 2);
        const midG = Math.round((p.color.g + q.color.g) / 2);
        const midB = Math.round((p.color.b + q.color.b) / 2);
        ctx.strokeStyle = `rgba(${midR},${midG},${midB},${a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
    }
}

let last = 0;
function loop(t = 0) {
    const dt = Math.min(32, t - last); last = t;

    // Clear dengan sedikit trail (efek jejak neon)
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(5,10,22,0.35)';
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    // Mode add untuk glow
    ctx.globalCompositeOperation = 'lighter';

    // Update + draw
    for (let i = 0; i < particles.length; i++) {
        particles[i].step(dt);
        particles[i].draw(ctx);
    }

    // Links
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            drawLinks(ctx, particles[i], particles[j]);
        }
    }

    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

// Optimisasi saat tab tidak aktif
document.addEventListener('visibilitychange', () => {
    if (document.hidden) { /* bisa pause kalau mau */ }
});

// Resize density otomatis sesuai layar
addEventListener('resize', () => {
    const base = Math.round(Math.min(Math.max(innerWidth * innerHeight / 18000, 40), 220));
    densityInput.value = base;
    PARTICLE_COUNT = base;
    rebuild();
});

// Inisialisasi density awal berdasarkan layar
(() => {
    const base = Math.round(Math.min(Math.max(innerWidth * innerHeight / 18000, 40), 220));
    densityInput.value = base;
    PARTICLE_COUNT = base;
    rebuild();
})();
