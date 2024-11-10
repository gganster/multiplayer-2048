import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { computeScore } from "@/utils/gameLogic";
import Tile from "./Tile";
import Bonus from "./Bonus";
import use2048 from "../../hooks/use2048";

export default function Game() {
  const { player, sessionId } = useParams();
  const {gameData, activateBonus} = use2048(player, sessionId);
  const scoreA = useMemo(() => computeScore(gameData?.boardA), [gameData]);
  const scoreB = useMemo(() => computeScore(gameData?.boardB), [gameData]);
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

  const _activateBonus = async (item) => {
    console.log(item)
    await activateBonus(item?.uid);
  }

  if (!gameData) return <div>Loading...</div>;
  return (
    <div className="relative w-full h-screen">
      <motion.div 
        className="w-80 absolute flex flex-col gap-5"
        initial={{ left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }}
        animate={{ 
          left: "25%", 
          top: "50%", 
          translateX: "-50%", 
          translateY: "-50%",
          ...((player === "A" && hasAnimated) && bounceAnimation)
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onAnimationComplete={() => setHasAnimated(true)}
      >
        <h2 className="text-3xl font-semibold text-center text-slate-950">Score: {scoreA}</h2>
        <div className="grid grid-cols-4 gap-4">
          {gameData.boardA.map((row, i) =>
            <React.Fragment key={i}>
              {row.map((value, j) => <Tile key={`${i}-${j}`} value={value} player="A" />)}
            </React.Fragment>
          )}
        </div>
        <div className="flex justify-center gap-2">
          {gameData.bonusA.map(i => (
            <Bonus key={i.uid} item={i} onActivate={_activateBonus}/>
          ))}
        </div>
      </motion.div>
      <motion.div 
        className="w-80 absolute flex flex-col gap-5"
        initial={{ left: "50%", top: "50%", translateX: "-50%", translateY: "-50%" }}
        animate={{ 
          left: "75%", 
          top: "50%", 
          translateX: "-50%", 
          translateY: "-50%",
          ...((player === "B" && hasAnimated) && bounceAnimation)
        }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      >
        <h2 className="text-3xl font-semibold text-center text-slate-950">Score: {scoreB}</h2>
        <div className="grid grid-cols-4 gap-4">
          {gameData.boardB.map((row, i) =>
            row.map((value, j) => <Tile key={`${i}-${j}`} value={value} player="B" />)
          )}
        </div>
        <div className="flex justify-center gap-2">
          {gameData.bonusB.map(i => (
            <Bonus key={i.uid} item={i} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}