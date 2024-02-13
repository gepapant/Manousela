document.addEventListener('DOMContentLoaded', function () {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const fireworksContainer = document.getElementById('fireworksContainer');

    yesBtn.addEventListener('click', function () {
        // Show fireworks and greeting message
        showFireworks();
    });

    noBtn.addEventListener('click', function () {
        alert('Sorry to hear that. Maybe next time!');
    });

    function showFireworks() {
        fireworksContainer.classList.remove('hidden');

        // Fireworks effect
        const fireworksCanvas = document.getElementById('fireworksCanvas');
        const ctx = fireworksCanvas.getContext('2d');
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;

        // Fireworks effect
        const fireworks = new Fireworks(ctx);
        fireworks.start();
        
        // Start the animation loop
        loop(fireworks);
    }

    // Fireworks effect code
    class Fireworks {
        constructor(ctx) {
            this.ctx = ctx;
            this.particles = [];
            this.interval = null;
        }

        start() {
            this.interval = setInterval(() => {
                this.createParticle();
            }, 200);
            setTimeout(() => {
                clearInterval(this.interval);
            }, 5000);
        }

        createParticle() {
            const particle = {
                x: fireworksCanvas.width / 2,
                y: fireworksCanvas.height,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                radius: Math.random() * 3 + 1,
                vx: Math.random() * 6 - 3,
                vy: Math.random() * -15 - 10
            };
            this.particles.push(particle);
        }

        update() {
            this.particles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.3;
                particle.radius -= 0.05;
                if (particle.radius <= 0) {
                    this.particles.splice(index, 1);
                }
            });
        }

        draw() {
            this.ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
            this.particles.forEach(particle => {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = particle.color;
                this.ctx.fill();
            });
        }
    }

    function loop(fireworks) {
        fireworks.update();
        fireworks.draw();
        requestAnimationFrame(() => loop(fireworks));
    }
});
