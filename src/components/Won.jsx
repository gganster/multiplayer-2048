import Particles from "@tsparticles/react";
import configWon from "@/assets/configWon.json";

export default function Won({color}) {
  const colorHex = color === "red" ? "bg-[#ed5244]" : "bg-[#2cc7f0]";

  return (
    <div className={`${colorHex} flex absolute top-0 left-0 right-0 bottom-0`}>
      <div className="flex-1 h-screen overflow-hidden relative">
        <Particles
          id="tsparticles1"
          options={configWon}
        />
      </div>
    </div>
  )
}