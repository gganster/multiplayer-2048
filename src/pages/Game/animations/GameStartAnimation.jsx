import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

export default function GameStartAnimation({player, target, children}) {
  const [hasAnimated, setHasAnimated] = useState(false);

  const bounceAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 0.5,
      repeat: 4,
      ease: "easeInOut",
      delay: 1
    }
  };

  return (
    <motion.div 
      className="w-80 absolute flex flex-col gap-5"
      initial={{ left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }}
      animate={{ 
        left: target === "A" ? "25%" : "75%", 
        top: "50%", 
        translateX: "-50%", 
        translateY: "-50%",
        ...((player === target && hasAnimated) && bounceAnimation)
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onAnimationComplete={() => setHasAnimated(true)}
    >
      {children}
    </motion.div>
  )
}