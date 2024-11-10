import { v4 as uuidv4 } from 'uuid';
import {useState, useEffect} from "react";
import { onValue, ref, set } from "firebase/database";
import { moveGrid, addNumber, checkGameOver, computeScore, hasWon } from '@/utils/gameLogic';
import { db } from "@/firebase";
import { useNavigate } from "react-router-dom";

export default function use2048(player, sessionId) {
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const subscribe = onValue(ref(db, "sessions/" + sessionId), (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      setGameData(data);

      //check won state
      if (data.stateA === "WON" || data.stateB === "WON")
        return navigate(`/gameover/${player}/${sessionId}`);
      
      if (data.stateA === "GAME_OVER" && data.stateB === "GAME_OVER") {
        return navigate(`/gameover/${player}/${sessionId}`);
      }
    });
    return subscribe;
  }, [sessionId])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!gameData) return;

      //disable controls
      if (gameData[`state${player}`] !== "PLAYING") return;
      if (gameData[`queue${player}`]?.type === "ice") return;

      if (event.key === 'ArrowUp') move('up');
      else if (event.key === 'ArrowDown') move('down');
      else if (event.key === 'ArrowLeft') move('left');
      else if (event.key === 'ArrowRight') move('right');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameData]);

  const move = async (direction) => {
    const grid = player === "A" ? gameData.boardA : gameData.boardB;
    const {grid: newGrid} = moveGrid(grid, direction);
    if (JSON.stringify(grid) !== JSON.stringify(newGrid)) {
      const gridWithNewNumber = addNumber(newGrid);
      await set(ref(db, "sessions/" + sessionId + "/" + (player === "A" ? "boardA" : "boardB")), gridWithNewNumber);

      //random bonus
      if (Math.random() < 0.1) randomlyAddBonus();
    }

    //check won state
    if (hasWon(newGrid)) {
      await set(ref(db, `sessions/${sessionId}/stateA`), "WON");
    }

    if (checkGameOver(newGrid)) {
      await set(ref(db, `sessions/${sessionId}/state${player}`), "GAME_OVER");
    }
  }

  const randomlyAddBonus = () => {
    console.log("randomly add bonus");

    const actuals = [...gameData[`bonus${player}`]];
    const emptyIndex = actuals.findIndex(b => !b);
    if (emptyIndex === -1) return;

    const random = Math.floor(Math.random() * 3);
    actuals[emptyIndex] = {uid: uuidv4(), type: random === 0 ? "fire" : random === 1 ? "ice" : "blind"};
    set(ref(db, `sessions/${sessionId}/bonus${player}`), actuals);
  }

  const activateBonus = async (uid) => {
    const usersBonus = gameData[`bonus${player}`];

    const bonus = usersBonus.find(b => b?.uid === uid);
    const index = usersBonus.findIndex(b => b?.uid === uid);
    const newBonusArray = usersBonus.map((b, i) => i === index ? 0 : b);

    if (!bonus) return;

    await set(ref(db, `sessions/${sessionId}/queue${player === "A" ? "B" : "A"}`), bonus);
    await set(ref(db, `sessions/${sessionId}/bonus${player}`), newBonusArray);
  }

  return {
    gameData,
    activateBonus,
  }
}