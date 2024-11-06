import React, { useEffect } from 'react';
import useStore from '@/contexts/gameStore';
import Tile from './Tile';

function App() {
  const { grid, initGame, move, gameOver, score, resetGame } = useStore();

  useEffect(() => {
    initGame();

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') move('up');
      else if (event.key === 'ArrowDown') move('down');
      else if (event.key === 'ArrowLeft') move('left');
      else if (event.key === 'ArrowRight') move('right');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [initGame, move]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="mb-4 text-2xl font-bold">Score : {score}</div>
      <div className="grid grid-cols-4 gap-4">
        {grid.map((row, i) =>
          row.map((value, j) => <Tile key={`${i}-${j}`} value={value} />)
        )}
      </div>
      {gameOver && (
        <div className="mt-4 text-xl font-bold">
          Game Over !
          <button
            onClick={resetGame}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Recommencer
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
