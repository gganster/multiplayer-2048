import {useState, useEffect} from "react";
import Won from "@/components/Won";
import VsBackground from "@/components/VsBackground";
import {computeScore} from "@/utils/gameLogic";
import { onValue, ref, set } from "firebase/database";
import { db } from "@/firebase";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function GameOver() {
  const navigate = useNavigate();
  const { player, sessionId } = useParams();
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    if (!sessionId || !player) return;
    const subscribe = onValue(ref(db, "sessions/" + sessionId), (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      setGameData(data);
    });
    return subscribe;
  }, [sessionId])

  if (!gameData) return <div>Loading...</div>;

  const scoreA = computeScore(gameData.boardA);
  const scoreB = computeScore(gameData.boardB);
  const winner = scoreA > scoreB ? "Blue" : 
                 scoreA < scoreB ? "Red" : "Draw";

  return (
    <>
      {winner === "Draw" ? <VsBackground /> : <Won color={winner === "Blue" ? "blue" : "red"} />}
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl text-center font-bold">
          {winner === "Draw" ? "It's a draw !" : `Player ${winner} Won !` }
        </h1>
        <div className="flex flex-col ">
          <p className="text-lg font-semibold">Score Player Blue: {scoreA}</p>
          <p className="text-lg font-semibold">Score Player Red: {scoreB}</p>
        </div>
        <Button onClick={() => {
          set(ref(db, "sessions/" + sessionId), null);
          navigate("/");
        }} className={`${winner === "Red" ? "" : "bg-blue-500"} text-white px-4 py-2 rounded-md`}>Back to Home</Button>
      </div>
    </>
  )
}