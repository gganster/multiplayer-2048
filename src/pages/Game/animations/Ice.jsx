import { motion, AnimatePresence } from 'framer-motion';

export default function Ice({target}) {
  const targetElement = document.querySelector(`#board-${target}`);
  const rect = targetElement?.getBoundingClientRect() || { top: 0, left: 0, width: 0, height: 0 };

  const generateRandomParticles = (count) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * rect.width - rect.width/2,
      y: Math.random() * rect.height - rect.height/2,
      size: Math.random() * 50 + 60, // Augmenté de 15+10 à 25+20
      delay: Math.random() * 0.5,
    }));
  };

  const particles = generateRandomParticles(20);

  return (
    <AnimatePresence>
      {target && (
        <>
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(255,255,255,0) 0%,
                  rgba(255,255,255,1) 20%,
                  rgba(148,216,233,0.9) 50%,
                  rgba(186,230,253,0.7) 80%,
                  rgba(186,230,253,0) 100%
                )`,
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                transformOrigin: '50% 50%',
                WebkitBackfaceVisibility: 'hidden',
                width: particle.size,
                height: particle.size,
              }}
              initial={{ 
                top: rect.top + rect.height/2,
                left: rect.left + rect.width/2,
                opacity: 0,
                rotate: Math.random() * 360,
                x: particle.x,
                y: particle.y,
              }}
              animate={{
                opacity: [0, 1, 0.4, 1, 0.3, 0.9],
                scale: [0.8, 1, 0.9, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: particle.delay,
                times: [0, 0.2, 0.4, 0.6, 0.8, 1]
              }}
            />
          ))}
          <motion.div
            style={{
              position: 'fixed',
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
              borderRadius: 'inherit',
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
            }}
            transition={{ 
              duration: 10,
              times: [0, 0.1, 0.9, 1]
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}