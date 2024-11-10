import {useState, useEffect} from "react";
import { Outlet } from "react-router-dom";
import VsBackground from "@/components/VsBackground";

export default function GameLayout() {
  const [unmountVS, setUnmountVS] = useState(false);

  //unmount and remount the VS component to restart the animation
  useEffect(() => {
    const id = setInterval(() => {
      setUnmountVS(true)
      console.log("unmount");
      setTimeout(() => {
        setUnmountVS(false)
      }, 100)
    }, 5000)
    return () => clearInterval(id)
  }, [])
  return (
    <>
      {unmountVS ? <div className="vsGradient flex absolute top-0 left-0 right-0 bottom-0 "></div> : <VsBackground />}
      <div className="flex flex-col items-center justify-center h-screen w-screen z-10 overflow-hidden">
        <Outlet />
      </div>
    </>
  )
}