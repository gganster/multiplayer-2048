import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";

const Sparkles = () => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-blue-300 rounded-full"
        initial={{ scale: 0, x: "50%", y: "50%" }}
        animate={{
          scale: [0, 1.5, 0],
          x: ["50%", `${Math.random() * 100}%`],
          y: ["50%", `${Math.random() * 100}%`],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.1,
        }}
      />
    ))}
  </div>
);

export default function JoinSession() {
  const [sessionId, setSessionId] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

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
          <Button className="w-full py-2  font-semibold rounded-lg">
            Join Session
          </Button>
        </div>
      ) : null}
    </div>
  );
}