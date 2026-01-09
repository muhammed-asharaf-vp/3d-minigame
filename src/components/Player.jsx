

import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import useKeyboard from "../hooks/useKeyboard";

export default function Player({ bounds }) {
  const { camera, gl, scene } = useThree();
  const keys = useKeyboard();

  const yaw = useRef(0);
  const pitch = useRef(0);
  const raycaster = useRef(new THREE.Raycaster());

  //  AUDIO
  const footstep = useRef(null);
  const audioReady = useRef(false);
  const stepTimer = useRef(0);
  const wasMoving = useRef(false); //  IMPORTANT

  //  SPEED + FOOTSTEP SYNC
  const SPEED = 1.5;
  const BASE_SPEED = 3;
  const BASE_STEP_INTERVAL = 0.45;

  const PLAYER_HEIGHT = 1.3;
  const WALL_PADDING = 0.3;
  const WALL_RAY_DISTANCE = 0.4;

  // =========================
  //  AUDIO SETUP (BRAVE SAFE)
  // =========================
  useEffect(() => {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const sound = new THREE.PositionalAudio(listener);
    sound.setRefDistance(1);
    sound.setVolume(0.4);

    const loader = new THREE.AudioLoader();
    loader.load("/sounds/footstep.mp3", (buffer) => {
      sound.setBuffer(buffer);
      audioReady.current = true;
      console.log("✅ Footstep loaded");
    });

    footstep.current = sound;

    const unlock = () => {
      if (!audioReady.current) return;
      const ctx = sound.context;
      if (ctx.state === "suspended") ctx.resume();
      gl.domElement.removeEventListener("click", unlock);
    };

    gl.domElement.addEventListener("click", unlock);

    return () => {
      sound.stop();
      camera.remove(listener);
      gl.domElement.removeEventListener("click", unlock);
    };
  }, [camera, gl.domElement]);

  //  Mouse look
  useEffect(() => {
    const onMouseMove = (e) => {
      yaw.current -= e.movementX * 0.002;
      pitch.current -= e.movementY * 0.002;
      pitch.current = Math.max(-1.4, Math.min(1.4, pitch.current));
    };
    gl.domElement.addEventListener("mousemove", onMouseMove);
    return () =>
      gl.domElement.removeEventListener("mousemove", onMouseMove);
  }, [gl.domElement]);

  useFrame((_, delta) => {
    if (!bounds) return;

    //  Camera rotation
    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw.current;
    camera.rotation.x = pitch.current;

    //  Directions
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, camera.up).normalize();

    //  Input
    const move = new THREE.Vector3();
    if (keys.forward) move.add(forward);
    if (keys.backward) move.sub(forward);
    if (keys.right) move.add(right);
    if (keys.left) move.sub(right);

    const moving = move.lengthSq() > 0;

    // =========================
    //  APPLY MOVEMENT
    // =========================
    if (moving) {
      move.normalize().multiplyScalar(SPEED * delta);
      const nextPos = camera.position.clone().add(move);

      //  Bounds
      if (
        nextPos.x >= bounds.minX + WALL_PADDING &&
        nextPos.x <= bounds.maxX - WALL_PADDING &&
        nextPos.z >= bounds.minZ + WALL_PADDING &&
        nextPos.z <= bounds.maxZ - WALL_PADDING
      ) {
        //  Wall collision
        raycaster.current.set(camera.position, move.clone().normalize());
        const wallHits = raycaster.current
          .intersectObjects(scene.children, true)
          .filter(
            (h) =>
              h.distance < WALL_RAY_DISTANCE &&
              Math.abs(h.face?.normal.y) < 0.5
          );

        if (wallHits.length === 0) {
          camera.position.x = nextPos.x;
          camera.position.z = nextPos.z;
        }
      }
    }

    //  Floor detection
    raycaster.current.set(
      new THREE.Vector3(
        camera.position.x,
        camera.position.y + 1.5,
        camera.position.z
      ),
      new THREE.Vector3(0, -1, 0)
    );

    const floorHits = raycaster.current
      .intersectObjects(scene.children, true)
      .filter((h) => h.face && h.face.normal.y > 0.5);

    if (floorHits.length > 0) {
      const floorY = floorHits[0].point.y;
      camera.position.y +=
        (floorY + PLAYER_HEIGHT - camera.position.y) * 0.3;
    }

    // =========================
    //  FOOTSTEP AUDIO (FIXED)
    // =========================
    if (audioReady.current && moving && footstep.current) {
      const speedFactor = SPEED / BASE_SPEED;
      const stepInterval = BASE_STEP_INTERVAL / speedFactor;

      stepTimer.current += delta;

      if (stepTimer.current >= stepInterval) {
        footstep.current.setPlaybackRate(
          0.9 + Math.random() * 0.2
        );
        footstep.current.play();
        stepTimer.current = 0;
      }
    }

    //  HARD STOP FOOTSTEP WHEN PLAYER STOPS
    if (!moving && wasMoving.current && footstep.current) {
      footstep.current.stop(); // ⛔ IMPORTANT
      stepTimer.current = 0;
    }

    wasMoving.current = moving;
  });

  return null;
}
