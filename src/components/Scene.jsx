import { useState } from "react";
import House from "./House";
import Player from "./Player";
import GameEnvironment from "./Environment";

export default function Scene() {
  const [bounds, setBounds] = useState(null);

  return (
    <>
      <GameEnvironment />
      <House onBoundsReady={setBounds} />
      <Player bounds={bounds} />
    </>
  );
}
