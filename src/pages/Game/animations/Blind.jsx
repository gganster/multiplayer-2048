import { motion, AnimatePresence } from 'framer-motion';

export default function Blind({target}) {
  const tiles = document.querySelectorAll(`#board-${target} .tile`);

  const getRandomRotation = () => {
    const angle = Math.random() * 15 - 7.5;
    return [0, angle, -angle, angle/2, -angle, angle, -angle/2, angle/2, -angle, angle/2, -angle/2, 0];
  };

  return (
    <AnimatePresence>
      {target && Array.from(tiles).map((tile, index) => {
        const rect = tile.getBoundingClientRect();
        const randomDelay = Math.random() * 0.5;
        
        return (
          <motion.div
            key={index}
            style={{
              position: 'fixed',
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.98), rgba(255,240,200,0.98))',
              borderRadius: 'inherit',
              pointerEvents: 'none',
              backdropFilter: 'blur(4px)',
              mixBlendMode: 'hard-light',
              transformOrigin: 'center',
              boxShadow: '0 0 15px rgba(255,255,255,0.9)',
            }}
            initial={{ opacity: 0, scale: 1, rotate: 0 }}
            animate={{
              opacity: [
                0, 1, 0.8, 1, 0.9, 1, 0.95, 1, 0.8, 1,
                0.9, 1, 0.95, 1, 0.9, 1, 0.8, 1, 0.95, 0
              ],
              scale: [
                1, 1.3, 0.9, 1.2, 0.95, 1.25, 0.9, 1.2, 1, 1.3,
                0.9, 1.2, 0.95, 1.25, 0.9, 1.2, 1, 1.3, 0.9, 1
              ],
              rotate: getRandomRotation(),
              filter: [
                'blur(0px)', 'blur(4px)', 'blur(2px)', 'blur(5px)',
                'blur(1px)', 'blur(4px)', 'blur(2px)', 'blur(5px)',
                'blur(3px)', 'blur(4px)', 'blur(2px)', 'blur(5px)',
                'blur(1px)', 'blur(4px)', 'blur(3px)', 'blur(5px)',
                'blur(2px)', 'blur(4px)', 'blur(1px)', 'blur(0px)'
              ]
            }}
            transition={{
              duration: 25,
              delay: randomDelay,
              times: [
                0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45,
                0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.95, 1
              ],
              ease: "easeInOut"
            }}
          />
        );
      })}
    </AnimatePresence>
  );
}