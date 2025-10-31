import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import HeroCanvas from './HeroCanvas';

const ParallaxLayer: React.FC<{ children: React.ReactNode; factor: number; x: any; y: any }> = ({ children, factor, x, y }) => {
    const springX = useSpring(x, { stiffness: 100, damping: 20 });
    const springY = useSpring(y, { stiffness: 100, damping: 20 });
    const transformedX = useTransform(springX, (latest) => latest * factor);
    const transformedY = useTransform(springY, (latest) => latest * factor);

    return (
        <motion.div
            className="absolute inset-0"
            style={{
                x: transformedX,
                y: transformedY,
            }}
        >
            {children}
        </motion.div>
    );
};

const MobileParallaxBackground = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [hasGyroscope, setHasGyroscope] = useState(false);

    useEffect(() => {
        const handleDeviceMotion = (event: DeviceOrientationEvent) => {
            if (event.gamma !== null && event.beta !== null) {
                if (!hasGyroscope) setHasGyroscope(true);
                x.set(event.gamma);
                y.set(event.beta - 45); 
            }
        };

        if (typeof window.DeviceOrientationEvent !== 'undefined') {
            window.addEventListener('deviceorientation', handleDeviceMotion);
        }

        return () => {
            window.removeEventListener('deviceorientation', handleDeviceMotion);
        };
    }, [x, y, hasGyroscope]);

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!hasGyroscope) {
            const { clientX, clientY, currentTarget } = event;
            const { width, height } = currentTarget.getBoundingClientRect();
            const offsetX = (clientX / width - 0.5) * 40;
            const offsetY = (clientY / height - 0.5) * 40;
            x.set(offsetX);
            y.set(offsetY);
        }
    }

    return (
        <div className="absolute inset-0" onMouseMove={handleMouseMove}>
            <ParallaxLayer factor={-15} x={x} y={y}>
                <motion.div 
                  className="w-full h-full bg-gradient-radial from-gentle-gold/30 to-transparent"
                  animate={!hasGyroscope ? { scale: [1, 1.1, 1], rotate: [0, 5, 0], transition: { duration: 20, repeat: Infinity, ease: "easeInOut" }} : {}}
                />
            </ParallaxLayer>
            <ParallaxLayer factor={10} x={x} y={y}>
                <motion.div 
                  className="w-full h-full bg-gradient-radial from-muted-rose/30 to-transparent"
                  animate={!hasGyroscope ? { scale: [1.2, 1, 1.2], rotate: [5, -5, 5], transition: { duration: 25, repeat: Infinity, ease: "easeInOut" }} : {}}
                />
            </ParallaxLayer>
             <ParallaxLayer factor={-5} x={x} y={y}>
                <div className="w-full h-full bg-gradient-radial from-warm-cream/50 to-transparent" />
            </ParallaxLayer>
        </div>
    )
}


const HeroSection: React.FC<{ theirName: string; }> = ({ theirName }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  
  return (
    <section id="hero" className="h-screen w-full relative flex flex-col items-center justify-center text-center overflow-hidden bg-soft-peach">
      {/* Conditionally render hero background */}
      {isDesktop ? <HeroCanvas /> : <MobileParallaxBackground />}

      <div className="relative z-10 p-4">
        <motion.h1 
          className="font-headline text-5xl md:text-7xl text-deep-umber drop-shadow-[0_2px_10px_rgba(189,131,122,0.3)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Please Unblock Me.
        </motion.h1>
        <motion.p 
          className="mt-4 max-w-md text-lg md:text-xl text-deep-umber/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          I made this entire world just to get a message to you, {theirName}.
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-10 z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <span className="text-deep-umber/70 text-sm font-medium">Please scroll to read my letter</span>
        <svg className="w-6 h-6 text-deep-umber/70 mt-2 animate-bounce-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;