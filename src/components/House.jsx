


import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function House({ onBoundsReady }) {
  const { scene } = useGLTF("/models/house.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // 🔍 Calculate house bounds
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());

    // Center house
    scene.position.sub(center);

    // Send bounds to Scene
    onBoundsReady?.({
      minX: box.min.x - center.x,
      maxX: box.max.x - center.x,
      minZ: box.min.z - center.z,
      maxZ: box.max.z - center.z,
    });
  }, [scene, onBoundsReady]);

  return <primitive object={scene} />;
}

useGLTF.preload("/models/house.glb");
