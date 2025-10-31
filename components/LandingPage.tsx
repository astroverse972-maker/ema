import React from 'react';
import { motion } from 'framer-motion';
import FloatingParticles from './FloatingParticles';

interface LandingPageProps {
  onOpen: () => void;
}

const EnvelopeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-deep-umber/70 group-hover:text-muted-rose transition-colors duration-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
);


const LandingPage: React.FC<LandingPageProps> = ({ onOpen }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-warm-cream z-50 flex flex-col items-center justify-center text-center p-4"
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
    >
      <FloatingParticles />
      <div className="relative z-10">
        <motion.h1 
            className="font-headline text-4xl md:text-6xl text-deep-umber mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            A Message For Ema
        </motion.h1>
        <motion.button
          onClick={onOpen}
          className="group"
          aria-label="Open the letter"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
        >
          <div className="p-6 bg-soft-peach rounded-full shadow-lg">
            <EnvelopeIcon />
          </div>
          <span className="mt-4 block font-medium text-deep-umber/90 group-hover:text-muted-rose transition-colors">Click to Open</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LandingPage;