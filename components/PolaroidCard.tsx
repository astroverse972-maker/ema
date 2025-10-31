import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';

interface PolaroidCardProps {
  id: number;
  src: string;
  caption: string;
  onSwipe: (id: number) => void;
  isTop: boolean;
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({ src, caption, onSwipe, id, isTop }) => {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  useEffect(() => {
    // Animate the card to its resting state on mount
    controls.start({
      scale: 1,
      y: 0,
      transition: { type: 'spring' }
    });
  }, [controls]);

  const handleDragEnd = (event: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      controls.start({
        x: info.offset.x > 0 ? 300 : -300,
        opacity: 0,
        transition: { duration: 0.3 },
      }).then(() => onSwipe(id));
    } else {
      controls.start({
        x: 0,
        transition: { type: 'spring', stiffness: 500, damping: 30 },
      });
    }
  };

  return (
    <motion.div
      className="absolute w-64 h-80 md:w-80 md:h-96 bg-white p-4 pb-16 rounded-sm shadow-xl cursor-grab"
      style={{
        x,
        rotate,
        opacity: isTop ? opacity : 1, // Only fade the top card on drag
        zIndex: isTop ? 2 : 1,
      }}
      initial={{ scale: 0.9, y: 10 }}
      animate={controls}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div className="w-full h-full bg-warm-cream/50">
        <img src={src} alt={caption} className="w-full h-full object-cover pointer-events-none" />
      </div>
      <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
        <p className="font-caption text-3xl text-deep-umber/90">{caption}</p>
      </div>
    </motion.div>
  );
};

export default PolaroidCard;