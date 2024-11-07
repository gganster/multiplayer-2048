import Particles from "@tsparticles/react";
import configToRight from "@/assets/configToRight.json"
import configToLeft from "@/assets/configToLeft.json"

export default function VsBackground() {
  return (
    <div className="vsGradient flex absolute top-0 left-0 right-0 bottom-0 ">
      <div className="flex-1 h-screen overflow-hidden relative">
        <Particles
          id="tsparticles1"
          options={configToRight}
          />
      </div>
      <div className="flex-1 h-screen overflow-hidden relative">
        <Particles
          id="tsparticles2"
          options={configToLeft}
          style={{
          }}
        />
      </div>
    </div>
  )
}