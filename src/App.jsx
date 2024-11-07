import {useState, useEffect} from "react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/Home";
import HomeLayout from "./layouts/HomeLayout";
import CreateSession from "./pages/CreateSession";
import JoinSession from "./pages/JoinSession";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {path: "/", element: <HomePage />},
      {path: "/create", element: <CreateSession />},
      {path: "/join", element: <JoinSession />},
    ]
  },
]);

function App() {
  const [ init, setInit ] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return;

  return (
    <RouterProvider router={router} />
  )
}

export default App
