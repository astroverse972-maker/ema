import React from 'react';
import { motion } from 'framer-motion';

const Particle: React.FC<{
    duration: number;
    delay: number;
    size: number;
    x: number;
    color: string;
}> = ({ duration, delay, size, x, color }) => {
    return (
        <motion.div
            className="absolute bottom-0 rounded-full"
            style={{
                width: size,
                height: size,
                left: `${x}%`,
                backgroundColor: color,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: '-100vh', opacity: [0, 0.7, 0] }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'linear',
            }}
        />
    );
};

const FloatingParticles: React.FC = () => {
    const particles = [
        { size: 10, duration: 15, delay: 0, x: 10, color: 'rgba(240, 167, 160, 0.3)' },
        { size: 20, duration: 20, delay: 2, x: 20, color: 'rgba(212, 175, 55, 0.3)' },
        { size: 15, duration: 25, delay: 5, x: 30, color: 'rgba(240, 167, 160, 0.3)' },
        { size: 8, duration: 18, delay: 7, x: 45, color: 'rgba(212, 175, 55, 0.3)' },
        { size: 25, duration: 30, delay: 9, x: 60, color: 'rgba(240, 167, 160, 0.3)' },
        { size: 12, duration: 16, delay: 11, x: 75, color: 'rgba(212, 175, 55, 0.3)' },
        { size: 18, duration: 22, delay: 13, x: 90, color: 'rgba(240, 167, 160, 0.3)' },
    ];

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((particle, index) => (
                <Particle key={index} {...particle} />
            ))}
        </div>
    );
};

export default FloatingParticles;