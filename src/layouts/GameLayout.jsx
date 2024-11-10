import { Outlet } from "react-router-dom";
import VsBackground from "@/components/VsBackground";

export default function GameLayout() {
  return (
    <>
      <VsBackground />
      <div className="flex flex-col items-center justify-center h-screen w-screen z-10 overflow-hidden">
        <Outlet />
      </div>
    </>
  )
}