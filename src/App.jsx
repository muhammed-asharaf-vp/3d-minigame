import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import "./App.css";

export default function App() {
  return (
    <Canvas
        tabIndex={0}
  onPointerDown={(e) => {
    e.target.focus();
    e.target.requestPointerLock(); // 🔥 FPS mouse lock
  }}
      shadows
      camera={{
        position: [0, 1.6, 0], // starting eye position
        fov: 65,
        near: 0.1,
        far: 1000,
      }}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Scene />
    </Canvas>
  );
}
