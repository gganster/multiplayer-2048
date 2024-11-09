import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Divider from "@/components/ui/Divider";
import Tile from "./Tile";
import use2048 from "./use2048";

export default function Game() {
  const { player, sessionId } = useParams();
  const {gameData, move} = use2048(player, sessionId);

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
    <div className="bg-slate-900 h-screen p-10">
      <div className="flex justify-center items-stretch gap-5">
        <div className="grid grid-cols-4 gap-4">
          {gameData.boardA.map((row, i) =>
            <React.Fragment key={i}>
              {row.map((value, j) => <Tile key={`${i}-${j}`} value={value} />)}
            </React.Fragment>
          )}
        </div>
        <Divider />
        <div className="grid grid-cols-4 gap-4">
          {gameData.boardB.map((row, i) =>
            row.map((value, j) => <Tile key={`${i}-${j}`} value={value} />)
          )}
        </div>
      </div>
    </div>
  )
}