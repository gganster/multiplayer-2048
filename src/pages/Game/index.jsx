import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { computeScore } from "@/utils/gameLogic";

import Tile from "./Tile";
import Bonus from "./Bonus";
import Fire from "./animations/Fire";
import Ice from "./animations/Ice";
import GameStartAnimation from "./animations/GameStartAnimation";

import use2048 from "../../hooks/use2048";
import Blind from "./animations/Blind";

export default function Game() {
  const { player, sessionId } = useParams();
  const {gameData, activateBonus} = use2048(player, sessionId);
  const scoreA = useMemo(() => computeScore(gameData?.boardA), [gameData]);
  const scoreB = useMemo(() => computeScore(gameData?.boardB), [gameData]);

  const [fireballTarget, setFireballTarget] = useState(null);
  const [iceTarget, setIceTarget] = useState(null);
  const [blindTarget, setBlindTarget] = useState(null);

  const _activateBonus = async (item) => {
    const targetBoard = player === "A" ? "B" : "A";
    await activateBonus(item?.uid);

    if (item?.type === "fire") {
      setFireballTarget(targetBoard);
      setTimeout(() => setFireballTarget(null), 2000); 
    }
    if (item?.type === "ice") {
      setIceTarget(targetBoard);
      setTimeout(() => setIceTarget(null), 10000);
    }
    if (item?.type === "blind") {
      setBlindTarget(targetBoard);
      setTimeout(() => setBlindTarget(null), 20000);
    }
  }

  if (!gameData) return <div>Loading...</div>;
  return (
    <div className="relative w-full h-screen">
      <GameStartAnimation player={player} target="A">
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
      </GameStartAnimation>
      <GameStartAnimation player={player} target="B">
        <h2 className="text-3xl font-semibold text-center text-slate-950">Score: {scoreB}</h2>
        <div className="grid grid-cols-4 gap-4">
          {gameData.boardB.map((row, i) =>
            row.map((value, j) => <Tile key={`${i}-${j}`} value={value} player="B" />)
          )}
        </div>
        <div className="flex justify-center gap-2">
          {gameData.bonusB.map(i => (
            <Bonus key={i.uid} item={i} onActivate={_activateBonus}/>
          ))}
        </div>
      </GameStartAnimation>
      
      <Fire target={fireballTarget} />
      <Ice target={iceTarget} />
      <Blind target={blindTarget} />
    </div>
  )
}