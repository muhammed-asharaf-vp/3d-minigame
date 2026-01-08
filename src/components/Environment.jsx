import { Environment, Sky } from "@react-three/drei";

export default function GameEnvironment() {
  return (
    <>
      {/* Sky for outdoor light feel */}
      <Sky
        sunPosition={[100, 20, 100]}
        turbidity={8}
        rayleigh={6}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* HDR environment lighting */}
      <Environment preset="apartment" />

      {/* Base ambient light */}
      <ambientLight intensity={0.3} />
    </>
  );
}
