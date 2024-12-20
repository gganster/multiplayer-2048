import Logo from "@/assets/logo.png"

import VsBackground from "@/components/vsBackground";
import Button from "@/components/ui/Button"
import Title from "@/components/ui/Title"
import Divider from "@/components/ui/Divider";

export default function HomePage() {
  return (
    <div>
      <Title>The 2048 multiplayer game</Title>
      <div className="flex justify-center items-center mt-6">
        <div className="w-48">
          <Button>Create a session</Button>
        </div>
        <Divider />
        <div className="w-48">
          <Button className="bg-blue-500">Join a session</Button>
        </div>
      </div>
    </div>
  )
}