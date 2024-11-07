import { v4 as uuidv4 } from 'uuid';
import {useState, useEffect} from "react";
import { Loader2 } from "lucide-react"
import { useRef } from 'react';

export default function CreateSession() {
  const sessionId = useRef(String(Math.ceil(Math.random() * 9999)).padStart(4, '0'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <>
      {loading ? <Loader2 className="animate-spin" size={32} /> : (
        <>
          <div className="w-64">
            <h2 className="text-slate-900 text-2xl font-bold">Session Code:</h2>
            <div className="border-4 border-slate-800 rounded-lg bg-white opacity-80 px-8 py-4 flex items-center justify-center">
              <span className="text-4xl font-extrabold">{sessionId.current}</span>
            </div>
            <p className="text-center mt-6 font-semibold">
              Waiting your worthy opponent to join the game ...
            </p>
            <div className="flex justify-center">
              <Loader2 className="animate-spin mt-1" size={28}  />
            </div>
          </div>
        </>
      )}
    </>
  )
}