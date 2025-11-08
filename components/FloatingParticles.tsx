import React, { useRef, useEffect } from 'react';

const FloatingParticles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particlesArray: Particle[] = [];
        const numberOfParticles = window.innerWidth > 768 ? 50 : 15;
        const colors = [
            '240, 167, 160', // muted-rose
            '212, 175, 55',  // gentle-gold
            '253, 246, 227'  // warm-cream
        ];

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        const handleResize = () => {
            setCanvasSize();
            init(); // Re-initialize particles on resize
        };
        window.addEventListener('resize', handleResize);

        class Particle {
            x: number;
            y: number;
            size: number;
            speedY: number;
            color: string;
            life: number;
            maxLife: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedY = Math.random() * 0.5 + 0.1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.maxLife = Math.random() * 200 + 100;
                this.life = Math.random() * this.maxLife;
            }

            draw() {
                if(!ctx) return;
                const opacity = Math.abs(Math.cos(this.life / (this.maxLife / 2)));
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${opacity * 0.7})`;
                ctx.fill();
            }

            update() {
                this.y -= this.speedY;
                this.life += 1;

                if (this.y < -this.size) {
                    this.y = canvas.height + this.size;
                    this.x = Math.random() * canvas.width;
                    this.life = 0;
                }
                
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            if(!ctx) return;
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        }

        init();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default FloatingParticles;