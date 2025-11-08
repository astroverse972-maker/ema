import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import LandingPage from './components/LandingPage';
import LetterPage from './components/LetterPage';

const App: React.FC = () => {
  const [isLetterOpened, setIsLetterOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const fadeAudio = (targetVolume: number, duration: number = 500) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (targetVolume > 0 && audio.paused) {
      audio.play().catch(error => console.error("Audio playback failed:", error));
    }
    
    const controls = animate(audio.volume, targetVolume, {
      duration: duration / 1000,
      onUpdate: (latest) => {
        if (audio) audio.volume = latest;
      },
      onComplete: () => {
        if (targetVolume === 0 && audio) {
          audio.pause();
        }
      }
    });
    
    return () => controls.stop();
  };
  
  useEffect(() => {
    if (isLetterOpened && audioRef.current) {
      audioRef.current.volume = 0;
      fadeAudio(1, 1500);
    }
  }, [isLetterOpened]);

  return (
    <div className="bg-gradient-to-b from-soft-peach to-warm-cream text-deep-umber min-h-screen font-ui selection:bg-muted-rose selection:text-warm-cream">
      <audio
        ref={audioRef}
        src="https://res.cloudinary.com/dubg7bfmv/video/upload/v1761918851/someday_i_ll_get_it_mhgw8a.mp3"
        loop
      />

      <AnimatePresence>
        {!isLetterOpened && <LandingPage onOpen={() => setIsLetterOpened(true)} />}
      </AnimatePresence>

      {isLetterOpened && (
         <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8 }}
         >
            <LetterPage />
        </motion.div>
      )}

    </div>
  );
};

export default App;