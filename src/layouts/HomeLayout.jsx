import { Outlet } from "react-router-dom";
import VsBackground from "@/components/VsBackground";
import Logo from "@/assets/logo.png";

export default function HomeLayout() {
  return (
    <>
      <VsBackground />
      <div className="flex flex-col items-center justify-center h-screen z-10">
        <img src={Logo} className="w-64 h-64 z-10 rounded-xl" alt="logo" />
        <div className="z-10 mt-6">
          <Outlet />
        </div>
      </div>
    </>
  )
}