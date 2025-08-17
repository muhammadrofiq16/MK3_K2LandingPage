// Navbar blur intensify when scrolling + show back-to-top
const nav = document.getElementById('nav');
const toTop = document.getElementById('toTop');

const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle('scrolled', y > 8);
    toTop.style.display = y > 220 ? 'inline-flex' : 'none';
};
window.addEventListener('scroll', onScroll);
onScroll();

// Smooth scroll to top
toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Lightweight tilt/parallax effect for elements with [data-tilt]
const tilts = document.querySelectorAll('[data-tilt]');
tilts.forEach(el => {
    let rect;
    const maxTilt = 10; // deg

    const enter = () => rect = el.getBoundingClientRect();

    const move = (e) => {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const px = (e.clientX - cx) / (rect.width / 2);
        const py = (e.clientY - cy) / (rect.height / 2);
        const rx = Math.max(Math.min(-py * maxTilt, maxTilt), -maxTilt);
        const ry = Math.max(Math.min(px * maxTilt, maxTilt), -maxTilt);
        el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    };

    const leave = () => {
        el.style.transform = 'rotateX(0) rotateY(0)';
    };

    el.addEventListener('mouseenter', enter);
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
});

// Prevent heavy transforms on touch devices (optional)
if ('ontouchstart' in window) {
    document.querySelectorAll('.tilt').forEach(el => el.classList.remove('tilt'));
}
