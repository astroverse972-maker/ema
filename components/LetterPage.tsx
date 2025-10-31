import React from 'react';
import { motion } from 'framer-motion';
import FloatingParticles from './FloatingParticles';

const LetterPage: React.FC = () => {

  return (
    <motion.main
      className="bg-warm-cream min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
    >
      <section className="relative py-20 md:py-32 px-6 text-deep-umber/90 overflow-hidden">
        <FloatingParticles />
        <motion.div 
          className="relative z-10 max-w-prose mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        >
          <p className="font-body text-2xl leading-relaxed mb-8">
            Hey Ema,
          </p>
          <p className="font-body text-xl leading-loose mb-8">
            I know... this is a bit much. A whole website. But I just really needed to get a message to you, and this felt like the only way you might see it.
          </p>
          <p className="font-body text-xl leading-loose mb-8">
            I noticed that someone is commenting on your TikTok video aajkal and you’re replying to him too. I lowkey felt kasto kasto when i saw that.
          </p>
          <p className="font-body text-xl leading-loose mb-8">
            I never forced you to accept me. Timlai annoying lagla bhanera text garna man lagda ni garthena. When you said that you will stay single for 3 years — huna ta testo seriously leko ta thena tyo kura — but still some part of me thought that you will like me in the future. Now that faith is gone, and I accept that you’re never gonna like me.
          </p>
          <p className="font-body text-xl leading-loose mb-8">
            Sorry bro, ma chai timlai still like garchu and idk what to do about that. It’s frustrating, but what can I do. Tei ho ki, atleast unblock me so I can  move on.
          </p>
          <p className="font-body text-xl leading-loose mb-8">
            Btw, ekdin move on huna sakchu bhanni hope cha, but tyo hope matrai ho. I know I can’t forget you lol — sakni bhako bhaye I wouldn’t have done this for more than 2 years. But still, can you lowkey make it easy and unblock me??? Garna man nalaye ta nagara, it’s fine. I’m not forcing.
          </p>
          <p className="font-body text-xl leading-loose mb-12">
            I just… hope you stay happy forever, Ema.
          </p>
        </motion.div>
      </section>
    </motion.main>
  );
};

export default LetterPage;