import {create} from 'zustand';
import { moveGrid, addNumber, checkGameOver } from '@/utils/gameLogic';

const initialState = () => ({
  grid: Array(4)
    .fill()
    .map(() => Array(4).fill(0)),
  score: 0,
  gameOver: false,
});

const useStore = create((set) => ({
  ...initialState(),

  initGame: () =>
    set((state) => {
      let newGrid = addNumber(state.grid);
      newGrid = addNumber(newGrid);
      return { ...state, grid: newGrid, score: 0, gameOver: false };
    }),

  move: (direction) =>
    set((state) => {
      const { grid: newGrid, score: gainedScore } = moveGrid(state.grid, direction);
      if (JSON.stringify(state.grid) !== JSON.stringify(newGrid)) {
        const gridWithNewNumber = addNumber(newGrid);
        const gameOver = checkGameOver(gridWithNewNumber);
        return {
          ...state,
          grid: gridWithNewNumber,
          score: state.score + gainedScore,
          gameOver,
        };
      } else {
        return state; // Pas de changement
      }
    }),

  resetGame: () => set(() => initialState()),
}));

export default useStore;