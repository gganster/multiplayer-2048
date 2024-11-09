import {useState, useEffect} from "react";
import { onValue, ref, set } from "firebase/database";
import { moveGrid, addNumber, checkGameOver } from '@/utils/gameLogic';
import { db } from "@/firebase";

export default function use2048(player, sessionId) {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const subscribe = onValue(ref(db, "sessions/" + sessionId), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data);
        setGameData(data);
      }
    });

    return subscribe;
  }, [sessionId])

  const move = async (direction) => {
    console.log(direction);
    const grid = player === "A" ? gameData.boardA : gameData.boardB;
    console.log(grid.map(row => row.join(" ")).join("\n"));
    const {grid: newGrid} = moveGrid(grid, direction);
    if (JSON.stringify(grid) !== JSON.stringify(newGrid)) {
      const gridWithNewNumber = addNumber(newGrid);
      console.log(gridWithNewNumber.map(row => row.join(" ")).join("\n"));
      await set(ref(db, "sessions/" + sessionId + "/" + (player === "A" ? "boardA" : "boardB")), gridWithNewNumber);
    }
  }

  return {
    gameData,
    move
  }
}