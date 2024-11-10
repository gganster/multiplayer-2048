import {motion, AnimatePresence} from "framer-motion";

export default function Fire({target}) {
  return (
    <AnimatePresence>
      {target && (
        <motion.div
          className="absolute w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #fef08a, #fbbf24, #ea580c, #7c2d12)',
            boxShadow: '0 0 60px #ea580c, inset 0 0 40px rgba(251, 191, 36, 0.8)',
          }}
          initial={{ 
            left: "50%",
            top: "50%",
            scale: 1,
            opacity: 0,
            rotate: 0,
            width: "8rem"
          }}
          animate={{
            left: target === "A" ? "25%" : "75%",
            top: "50%",
            scale: [1.5, 3.5, 5],
            opacity: [0, 1, 0],
            rotate: 1440,
            width: ["8rem", "16rem", "24rem"],
            height: ["8rem", "8rem", "12rem"],
            filter: ["blur(8px)", "blur(20px)", "blur(12px)"]
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.7, 1]
          }}
        />
      )}
    </AnimatePresence>
  )
}