import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { computeScore } from "@/utils/gameLogic";
import Divider from "@/components/ui/Divider";
import Tile from "./Tile";
import use2048 from "./use2048";

export default function Game() {
  const { player, sessionId } = useParams();
  const {gameData, move} = use2048(player, sessionId);
  const scoreA = useMemo(() => computeScore(gameData?.boardA), [gameData]);
  const scoreB = useMemo(() => computeScore(gameData?.boardB), [gameData]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') move('up');
      else if (event.key === 'ArrowDown') move('down');
      else if (event.key === 'ArrowLeft') move('left');
      else if (event.key === 'ArrowRight') move('right');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameData]);

  if (!gameData) return <div>Loading...</div>;
  return (
    <div className="flex justify-around items-stretch z-10 w-full">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold text-center text-slate-950">Score: {scoreA}</h2>
        <div className="grid grid-cols-4 gap-4">
          {gameData.boardA.map((row, i) =>
            <React.Fragment key={i}>
              {row.map((value, j) => <Tile key={`${i}-${j}`} value={value} player="A" />)}
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold text-center text-slate-950">Score: {scoreB}</h2>
        <div className="grid grid-cols-4 gap-4">
          {gameData.boardB.map((row, i) =>
            row.map((value, j) => <Tile key={`${i}-${j}`} value={value} player="B" />)
          )}
        </div>
      </div>
    </div>
  )
}