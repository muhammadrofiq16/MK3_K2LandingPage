document.addEventListener('DOMContentLoaded', function() {
    // 1. Dynamic Particle Background
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.prepend(canvas);
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 100;
    const colors = ['#64ffda', '#48aff0', '#5e87f5', '#7d6bff', '#a64dff'];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            angle: 0,
            angleSpeed: (Math.random() - 0.5) * 0.05
        });
    }

    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background overlay
        ctx.fillStyle = 'rgba(10, 25, 47, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            
            // Draw particle with glow effect
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'rgba(100, 255, 218, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
            ctx.restore();
            
            // Update position and angle
            p.x += p.speedX;
            p.y += p.speedY;
            p.angle += p.angleSpeed;
            
            // Bounce off edges
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        });
        
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 2. Floating Elements Animation
    const floatingElements = document.querySelectorAll('h2, form');
    floatingElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200);
    });

    // 3. Enhanced Form Interactions
    const formFields = document.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.style.transition = 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
        field.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        field.style.border = '1px solid rgba(100, 255, 218, 0.3)';
        field.style.color = '#ffffff';
        field.style.padding = '12px 18px';
        field.style.borderRadius = '6px';
        field.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        
        field.addEventListener('focus', function() {
            this.style.borderColor = '#64ffda';
            this.style.boxShadow = '0 0 0 2px rgba(100, 255, 218, 0.2)';
            this.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
        });
        
        field.addEventListener('blur', function() {
            this.style.borderColor = 'rgba(100, 255, 218, 0.3)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        });
    });

    // 4. Premium Submit Button
    const submitBtn = document.querySelector('button, input[type="submit"]');
    if (submitBtn) {
        submitBtn.style.transition = 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
        submitBtn.style.background = 'linear-gradient(135deg, #64ffda 0%, #48aff0 100%)';
        submitBtn.style.color = '#0a192f';
        submitBtn.style.border = 'none';
        submitBtn.style.padding = '14px 32px';
        submitBtn.style.borderRadius = '30px';
        submitBtn.style.cursor = 'pointer';
        submitBtn.style.fontWeight = '600';
        submitBtn.style.boxShadow = '0 4px 15px rgba(100, 255, 218, 0.3)';
        submitBtn.style.position = 'relative';
        submitBtn.style.overflow = 'hidden';
        
        // Ripple effect
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size/2;
            const y = e.clientY - rect.top - size/2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            this.appendChild(ripple);
            
            // Change state
            this.innerHTML = '<span class="btn-text">✓ Terkirim</span>';
            this.style.background = 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)';
            this.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.innerHTML = '<span class="btn-text">Kirim Pesan</span>';
                this.style.background = 'linear-gradient(135deg, #64ffda 0%, #48aff0 100%)';
                this.style.boxShadow = '0 4px 15px rgba(100, 255, 218, 0.3)';
            }, 2000);
        });
    }

    // Add ripple animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .btn-text {
            position: relative;
            z-index: 1;
        }
        ::placeholder {
            color: rgba(255, 255, 255, 0.4) !important;
        }
    `;
    document.head.appendChild(style);
});