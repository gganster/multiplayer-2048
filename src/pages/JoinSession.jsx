import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import {ref, set, onValue, get} from "firebase/database";
import {db} from "../firebase";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

export default function JoinSession() {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const joinSession = async () => {
    const sessionIdValue = sessionId.join("");
    const sessionRef = ref(db, "sessions/" + sessionIdValue);
    const sessionSnapshot = await get(sessionRef);
    if (sessionSnapshot.exists()) {
      const session = sessionSnapshot.val();
      if (session.state === "WAITING_FOR_OPPONENT") {
        onValue(sessionRef, (snapshot) => {
          const data = snapshot.val();
          if (data.state === "PLAYING") {
            navigate(`/game/B/${sessionIdValue}`);
          }
        });
        set(sessionRef, {
          ...session,
          state: "OPPONENT_JOINING",
        });
        toast("Session joined successfully!");
      } else {
        toast("Session is not available!");
      }
    } else {
      toast("Session not found!");
    }
  }

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newSessionId = [...sessionId];
      newSessionId[index] = value;
      setSessionId(newSessionId);
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !sessionId[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "Enter" && sessionId.join("").length === 4) {
      joinSession();
    }
  };

  return (
    <div className="w-64">
      <h1 className="text-3xl font-semibold text-center">Session Id:</h1>
      <div className="flex gap-2 justify-center mt-1">
        {sessionId.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-12 h-16 border-2 border-slate-800 rounded-lg text-4xl text-center font-extrabold"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>
      {sessionId.join("").length === 4 ? (
        <div className="relative mt-4">
          <Button className="w-full py-2  font-semibold rounded-lg" onClick={joinSession}>
            Join Session
          </Button>
        </div>
      ) : null}
    </div>
  );
}