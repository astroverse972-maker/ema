import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

const images = [
  'https://res.cloudinary.com/dubg7bfmv/image/upload/v1762592767/ss3_gffn30.png',
  'https://res.cloudinary.com/dubg7bfmv/image/upload/v1762592829/ss2_gwrelq.png',
  'https://res.cloudinary.com/dubg7bfmv/image/upload/v1762592831/ss1_vxrcw3.png',
  'https://res.cloudinary.com/dubg7bfmv/image/upload/v1762587156/IMG_5301_nhu3jo.png',
  'https://res.cloudinary.com/dubg7bfmv/image/upload/v1762587156/IMG_5302_y888mz.png',
  'https://res.cloudinary.com/dubg7bfmv/image/upload/v1762588435/em_vqmlig.jpg',
];

const chatScreenshotUrl = 'https://res.cloudinary.com/dubg7bfmv/image/upload/v1762590507/Screenshot_2025-11-08_at_2.13.12_PM_uxupxu.png';


const MacbookFolderIcon = () => (
    <svg viewBox="0 0 102 80" className="w-24 h-auto drop-shadow-lg">
        <path d="M96.1 19.4c-.9-2.3-3.8-6.1-6.1-6.1H40.2c-4.2 0-4.2 4.2-6.3 6.3L15.9 37.6c-2.1 2.1-4.2 2.1-6.3 2.1H5.9C3.6 39.7 0 42 0 46.1v28c0 4.2 3.6 5.9 5.9 5.9h89.9c2.3 0 6.1-1.7 6.1-5.9V25.7c0-2.3-1.8-5.4-5.8-6.3z" fill="#0093E4"></path>
        <path d="M101.3 28.5c-.3-.8-1.3-2.1-2.1-2.1h-85c-1.6 0-1.6 1.4-2.2 2.2l-10 12.6c-.6.8-1.4.8-2.2.8h-.1c-1.6 0-2.2 2.2-2.2 4.4v22.2c0 1.6 1 3.5 2.2 3.5h94.9c1.2 0 3.5-.6 3.5-2.2V32.9c0-.8-.6-3.6-2.1-4.4z" fill="#00AEFF"></path>
    </svg>
);


const MacWindow: React.FC<{ images: string[]; onClose: () => void }> = ({ images, onClose }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };
    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    };
    
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isMobile && contentRef.current) {
                const { scrollHeight, clientHeight } = contentRef.current;
                if (scrollHeight > clientHeight) {
                    setShowScrollIndicator(true);
                }
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [isMobile]);

    const handleScroll = () => {
        if (showScrollIndicator) {
            setShowScrollIndicator(false);
        }
    };

    return (
        <motion.div
            drag
            dragHandle=".drag-handle"
            dragMomentum={false}
            className="w-[90vw] max-w-2xl h-[70vh] bg-warm-cream/95 backdrop-blur-md rounded-xl shadow-2xl flex flex-col overflow-hidden border border-black/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            {/* Title Bar */}
            <div className="drag-handle bg-neutral-200/80 px-2 sm:px-4 py-2 flex items-center gap-1 sm:gap-2 border-b border-black/10 cursor-grab active:cursor-grabbing">
                <button onClick={onClose} className="w-8 h-8 md:w-6 md:h-6 flex-shrink-0 flex items-center justify-center rounded-full group" aria-label="Close window">
                    <div className="w-3.5 h-3.5 bg-red-500 rounded-full border border-red-600/50 group-hover:bg-red-600"></div>
                </button>
                <div className="w-8 h-8 md:w-6 md:h-6 flex-shrink-0 flex items-center justify-center rounded-full">
                    <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full border border-yellow-600/50"></div>
                </div>
                <div className="w-8 h-8 md:w-6 md:h-6 flex-shrink-0 flex items-center justify-center rounded-full">
                    <div className="w-3.5 h-3.5 bg-green-500 rounded-full border border-green-600/50"></div>
                </div>
                <span className="ml-auto text-sm font-medium text-neutral-600 truncate px-2">WP</span>
            </div>

            {/* Content */}
            <div ref={contentRef} onScroll={handleScroll} className="p-4 overflow-y-auto flex-grow relative">
                 <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {images.map((src, index) => (
                        <motion.div key={index} className="overflow-hidden rounded-md shadow-md aspect-w-1 aspect-h-1" variants={itemVariants}>
                            <img src={src} alt={`Memory ${index + 1}`} className="w-full h-full object-cover" />
                        </motion.div>
                    ))}
                </motion.div>
                 <AnimatePresence>
                    {showScrollIndicator && (
                         <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="sticky bottom-4 w-full flex justify-center pointer-events-none"
                        >
                            <div className="flex items-center justify-center w-12 h-12 bg-black/10 rounded-full">
                                <motion.svg
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                    xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-deep-umber/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </motion.svg>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
};

const ZoomModal: React.FC<{ src: string, onClose: () => void }> = ({ src, onClose }) => (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.img
        src={src}
        alt="Zoomed screenshot"
        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()} 
      />
    </motion.div>
);

interface LetterPageProps {
  onFolderOpen: () => void;
  onFolderClose: () => void;
}

const LetterPage: React.FC<LetterPageProps> = ({ onFolderOpen, onFolderClose }) => {
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [hasFolderBeenOpened, setHasFolderBeenOpened] = useState(false);
    const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

    const folderAudioRef = useRef<HTMLAudioElement>(null);
    const isInitialMount = useRef(true);
    
    const contentVariant = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } 
        }
    };

    const fadeFolderAudio = (targetVolume: number, duration: number = 500, onComplete?: () => void) => {
        const audio = folderAudioRef.current;
        if (!audio) return;
        
        if (targetVolume > 0 && audio.paused) {
          audio.currentTime = 0;
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
              audio.currentTime = 0;
            }
            onComplete?.();
          }
        });
        
        return () => controls.stop();
    };

    useEffect(() => {
        if (isWindowOpen) {
            onFolderOpen();
            if (folderAudioRef.current) {
                folderAudioRef.current.volume = 0;
            }
            fadeFolderAudio(1, 500);
        } else {
            if (isInitialMount.current) {
                isInitialMount.current = false;
            } else {
                fadeFolderAudio(0, 500, () => {
                    onFolderClose();
                });
            }
        }
    }, [isWindowOpen, onFolderOpen, onFolderClose]);

    const handleOpenFolder = () => {
        setIsWindowOpen(true);
        if (!hasFolderBeenOpened) {
            setHasFolderBeenOpened(true);
        }
    };

  return (
    <main className="bg-transparent relative text-deep-umber/90 overflow-x-hidden">
      <audio
        ref={folderAudioRef}
        src="https://res.cloudinary.com/dubg7bfmv/video/upload/v1762594635/jojoj_rscpg4.mp3"
        preload="auto"
      />
      
      <div className="relative z-10">
        {/* The Letter */}
        <div className="flex flex-col items-center justify-center pt-24 sm:pt-32 pb-16 px-4 space-y-12">
          <motion.div
            className="max-w-xl w-full text-center bg-warm-cream/80 p-8 rounded-lg shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={contentVariant}
          >
            <p className="font-body text-2xl md:text-3xl leading-loose">
              ema unblock me. i really love u gng. i kinda wanna treat u right. but at last its your choice. maila kei force garnu chaina
            </p>
          </motion.div>
        </div>

        {/* Folder & Image Section */}
        <div className="relative z-10 pb-24 sm:pb-32 px-4 flex flex-col items-center justify-center">
            <div
                className="text-center"
            >
                <button
                    onClick={handleOpenFolder}
                    className="group focus:outline-none"
                    aria-label="Open folder"
                >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <MacbookFolderIcon />
                    </motion.div>
                    <p className="mt-4 font-caption text-4xl text-deep-umber/80 group-hover:text-deep-umber transition-colors">
                        WP <span className="text-2xl">(click to open)</span>
                    </p>
                </button>
            </div>

            <AnimatePresence>
                {hasFolderBeenOpened && (
                     <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-8 text-center"
                        aria-hidden="true"
                    >
                        <div className="relative inline-flex items-center justify-center w-16 h-16">
                            <div className="absolute w-full h-full bg-deep-umber/5 rounded-full"></div>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="flex items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-deep-umber/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
              className="mt-48 sm:mt-24 w-full max-w-xs mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
              }}
            >
              <div className="relative">
                <div className="relative bg-white p-4 pb-16 rounded-sm shadow-xl transform -rotate-2">
                  <div className="relative">
                    <img 
                      src="https://res.cloudinary.com/dubg7bfmv/image/upload/v1762595271/yearn_mo4qyl.jpg" 
                      alt="A heartfelt message" 
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
                      <p className="font-caption text-3xl text-deep-umber/90">PLS UNBLOCK ME GNG</p>
                  </div>

                  <motion.div
                      className="absolute inset-0 bg-deep-umber rounded-sm"
                      animate={{ opacity: hasFolderBeenOpened ? 0 : 1 }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      style={{ pointerEvents: hasFolderBeenOpened ? 'none' : 'auto' }} 
                  />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="mt-20 max-w-xl w-full text-center bg-warm-cream/80 p-8 rounded-lg shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={contentVariant}
            >
              <p className="font-body text-2xl md:text-3xl leading-loose">
                i really forgot to remove you as a follower that day, i wasn't trying to make you look like a fan. sorry gng if your ego got hurt. if i knew this would have happened, i would've never done that.
              </p>
            </motion.div>
            
            <motion.div 
                className="mt-20 flex justify-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={contentVariant}
            >
                <div className="bg-white p-3 pb-10 rounded-sm shadow-xl relative transform rotate-3 w-52">
                    <img src="https://res.cloudinary.com/dubg7bfmv/image/upload/v1762589005/IMG_5292_m9wwto.jpg" alt="Memory photo 1" className="w-full h-auto" />
                </div>
            </motion.div>

            <motion.div
              className="mt-20 max-w-xl w-full text-center bg-warm-cream/80 p-8 rounded-lg shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={contentVariant}
            >
              <p className="font-body text-2xl md:text-3xl leading-loose">
                You're the real art, Ema. You're the light, twin. You mog everyone. You are the coolest, most beautiful, most unique girl that I've ever seen.
              </p>
            </motion.div>

            <motion.div 
                className="mt-20 flex justify-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={contentVariant}
            >
                <div 
                    className="bg-white p-3 pb-10 rounded-sm shadow-xl relative transform -rotate-2 w-72 cursor-pointer group"
                    onClick={() => setIsZoomModalOpen(true)}
                >
                    <img src={chatScreenshotUrl} alt="Memory photo 2" className="w-full h-auto" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3h-6" />
                        </svg>
                    </div>
                    <p className="sm:hidden absolute bottom-2 left-0 right-0 text-center font-caption text-2xl text-deep-umber/80 tracking-wider">(Click to Zoom)</p>
                </div>
            </motion.div>

            <motion.div
              className="mt-20 max-w-xl w-full text-center bg-warm-cream/80 p-8 rounded-lg shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={contentVariant}
            >
              <p className="font-body text-2xl md:text-3xl leading-loose">
                I've been losing my sleep, gng. I can't sleep 'til 2-5 am, thinking about you.
              </p>
            </motion.div>

            <motion.div 
                className="mt-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={contentVariant}
            >
                <div className="bg-white p-3 pb-10 rounded-sm shadow-xl relative transform rotate-2 w-72">
                    <img src="https://res.cloudinary.com/dubg7bfmv/image/upload/v1762600389/__3_ij9akn.jpg" alt="Memory photo 3" className="w-full h-auto" />
                </div>
            </motion.div>
            
             <motion.div
              className="mt-20 max-w-xl w-full text-center bg-warm-cream/80 p-8 rounded-lg shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={contentVariant}
            >
              <p className="font-body text-2xl md:text-3xl leading-loose">
                please ema i need this
              </p>
            </motion.div>
            
            <motion.div
                className="mt-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={contentVariant}
            >
                <div className="bg-white p-3 pb-10 rounded-sm shadow-xl relative transform -rotate-1 w-72">
                    <img src="https://res.cloudinary.com/dubg7bfmv/image/upload/v1762603731/emasp_smdjjo.png" alt="Final memory" className="w-full h-auto" />
                </div>
            </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isWindowOpen && (
           <div className="fixed inset-0 z-50 flex items-center justify-center">
             <MacWindow images={images} onClose={() => setIsWindowOpen(false)} />
           </div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isZoomModalOpen && (
            <ZoomModal 
                src={chatScreenshotUrl} 
                onClose={() => setIsZoomModalOpen(false)} 
            />
        )}
      </AnimatePresence>

    </main>
  );
};

export default LetterPage;