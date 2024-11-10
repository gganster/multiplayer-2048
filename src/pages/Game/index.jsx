import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { computeScore, applyFireEffect } from "@/utils/gameLogic";
import { set, ref } from "firebase/database";
import { db } from "@/firebase";

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

  const startAnimation = (animation, target) => new Promise(resolve => {
    if (animation === "fire") {
      setFireballTarget(target);
      setTimeout(() => {
        setFireballTarget(null)
        resolve();
      }, 2000);
    }
    if (animation === "ice") {
      setIceTarget(target);
      setTimeout(() => {
        setIceTarget(null)
        resolve();
      }, 10000);
    }
    if (animation === "blind") {
      setBlindTarget(target);
      setTimeout(() => {
        setBlindTarget(null)
        resolve();
      }, 20000);
    }
  })


  useEffect(() => {
    (async () => {
      if (!gameData) return;
      if (!gameData[`queue${player}`]?.type) return;
  
      await startAnimation(gameData[`queue${player}`]?.type, player);
      await set(ref(db, `sessions/${sessionId}/queue${player}`), 0);

      if (gameData[`queue${player}`]?.type === "fire") {
        const newGrid = applyFireEffect(gameData[`board${player}`]);
        await set(ref(db, `sessions/${sessionId}/board${player}`), newGrid);
      }
    })()
  }, [gameData?.[`queue${player}`]]);

  const _activateBonus = async (item) => {
    const targetBoard = player === "A" ? "B" : "A";
    await activateBonus(item?.uid);
    startAnimation(item?.type, targetBoard);
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
            <Bonus key={i.uid} item={i} onActivate={(bonus) => {
              if (player === "B") return;
              _activateBonus(bonus)
            }}/>
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
            <Bonus key={i.uid} item={i} onActivate={(bonus) => {
              if (player === "A") return;
              _activateBonus(bonus)
            }}/>
          ))}
        </div>
      </GameStartAnimation>
      
      <Fire target={fireballTarget} />
      <Ice target={iceTarget} />
      <Blind target={blindTarget} />
    </div>
  )
}