import {useState, useEffect} from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 

import configToRight from "@/assets/configToRight.json"
import configToLeft from "@/assets/configToLeft.json"

import Logo from "@/assets/logo.png"

import Button from "@/components/ui/Button"
import Title from "@/components/ui/Title"
import Divider from "@/components/ui/Divider";

export default function HomePage() {
  const [ init, setInit ] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
      initParticlesEngine(async (engine) => {
          await loadSlim(engine);
      }).then(() => {
          setInit(true);
      });
  }, []);

  return (
    <>  
      <div className="vsGradient flex absolute top-0 left-0 right-0 bottom-0 ">
        <div className="flex-1 h-screen overflow-hidden relative">
          { init && <Particles
            id="tsparticles1"
            options={configToRight}
            />
          }
        </div>
        <div className="flex-1 h-screen overflow-hidden relative">
          { init && <Particles
            id="tsparticles2"
            options={configToLeft}
            style={{
            }}
            />
          }
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-screen z-10">
        <img src={Logo} className="w-64 h-64 z-10 rounded-xl" alt="logo" />
        <Title className="z-10 mt-6">The 2048 Multiplayer game</Title>
        <div className="z-10 flex jsutify-center items-center mt-6">
          <div className="w-48">
            <Button>Create a session</Button>
          </div>
          <Divider />
          <div className="w-48">
            <Button className="bg-blue-500">Join a session</Button>
          </div>
        </div>
      </div>
    </>
  )
}