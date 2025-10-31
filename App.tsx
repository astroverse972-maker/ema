import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import LetterPage from './components/LetterPage';

const App: React.FC = () => {
  const [isLetterOpened, setIsLetterOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isLetterOpened && audioRef.current) {
      // Start playing audio after the user interaction of opening the letter
      audioRef.current.play().catch(error => {
        console.error("Audio autoplay was prevented:", error);
      });
    }
  }, [isLetterOpened]);

  return (
    <div className="bg-warm-cream text-deep-umber min-h-screen font-ui selection:bg-muted-rose selection:text-warm-cream">
      <audio
        ref={audioRef}
        src="https://res.cloudinary.com/dubg7bfmv/video/upload/v1761918851/someday_i_ll_get_it_mhgw8a.mp3"
        loop
      />

      <AnimatePresence>
        {!isLetterOpened && <LandingPage onOpen={() => setIsLetterOpened(true)} />}
      </AnimatePresence>

      {isLetterOpened && (
        <LetterPage />
      )}

    </div>
  );
};

export default App;
