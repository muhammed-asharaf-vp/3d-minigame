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

  // AUDIO REFS

  const footstep = useRef(null);
  const wallHit = useRef(null);
  const audioReady = useRef(false);

  const stepTimer = useRef(0);
  const wasMoving = useRef(false);
  const justStartedMoving = useRef(false);
  const lastWallHitTime = useRef(0);

  // CONSTANTS

  const SPEED = 1.5;
  const BASE_SPEED = 3;
  const BASE_STEP_INTERVAL = 0.45;

  const PLAYER_HEIGHT = 1.3;
  const WALL_PADDING = 0.3;
  const WALL_RAY_DISTANCE = 0.4;
  const WALL_SOUND_COOLDOWN = 500; // ms

  // AUDIO SETUP

  useEffect(() => {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const foot = new THREE.PositionalAudio(listener);
    const wall = new THREE.PositionalAudio(listener);

    foot.setRefDistance(1);
    foot.setVolume(0.4);

    wall.setRefDistance(1);
    wall.setVolume(0.8);

    const loader = new THREE.AudioLoader();

    loader.load("/sounds/footstep.mp3", (buffer) => {
      foot.setBuffer(buffer);
    });

    loader.load("/sounds/wall_crack.mp3", (buffer) => {
      wall.setBuffer(buffer);
      audioReady.current = true;
    });

    footstep.current = foot;
    wallHit.current = wall;

    const unlock = () => {
      if (foot.context.state === "suspended") {
        foot.context.resume();
      }
      gl.domElement.removeEventListener("click", unlock);
    };

    gl.domElement.addEventListener("click", unlock);

    return () => {
      foot.stop();
      wall.stop();
      camera.remove(listener);
      gl.domElement.removeEventListener("click", unlock);
    };
  }, [camera, gl.domElement]);

  
  // MOUSE LOOK

  useEffect(() => {
    const onMouseMove = (e) => {
      yaw.current -= e.movementX * 0.002;
      pitch.current -= e.movementY * 0.002;
      pitch.current = THREE.MathUtils.clamp(pitch.current, -1.4, 1.4);
    };

    gl.domElement.addEventListener("mousemove", onMouseMove);
    return () =>
      gl.domElement.removeEventListener("mousemove", onMouseMove);
  }, [gl.domElement]);

  // GAME LOOP

  useFrame((_, delta) => {
    if (!bounds) return;

    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw.current;
    camera.rotation.x = pitch.current;

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, camera.up).normalize();

    const move = new THREE.Vector3();
    if (keys.forward) move.add(forward);
    if (keys.backward) move.sub(forward);
    if (keys.right) move.add(right);
    if (keys.left) move.sub(right);

    const moving = move.lengthSq() > 0;
    if (moving && !wasMoving.current) justStartedMoving.current = true;

    // MOVEMENT + WALL HIT

    if (moving) {
      move.normalize().multiplyScalar(SPEED * delta);
      const nextPos = camera.position.clone().add(move);

      if (
        nextPos.x >= bounds.minX + WALL_PADDING &&
        nextPos.x <= bounds.maxX - WALL_PADDING &&
        nextPos.z >= bounds.minZ + WALL_PADDING &&
        nextPos.z <= bounds.maxZ - WALL_PADDING
      ) {
        raycaster.current.set(camera.position, move.clone().normalize());

        const hits = raycaster.current
          .intersectObjects(scene.children, true)
          .filter(
            (h) =>
              h.distance < WALL_RAY_DISTANCE &&
              h.object.userData.isWall &&
              Math.abs(h.face?.normal.y) < 0.5
          );

        if (hits.length === 0) {
          camera.position.x = nextPos.x;
          camera.position.z = nextPos.z;
        } else {
          //  WALL BASH SOUND
          const now = performance.now();
          if (
            audioReady.current &&
            wallHit.current &&
            now - lastWallHitTime.current > WALL_SOUND_COOLDOWN
          ) {
            wallHit.current.playbackRate = 0.9 + Math.random() * 0.2;
            wallHit.current.play();
            lastWallHitTime.current = now;
          }
        }
      }
    }

    // FLOOR DETECTION

    raycaster.current.set(
      new THREE.Vector3(
        camera.position.x,
        camera.position.y + 4,
        camera.position.z
      ),
      new THREE.Vector3(0, -1, 0)
    );

    const hits = raycaster.current
      .intersectObjects(scene.children, true)
      .filter(
        (h) =>
          h.face &&
          h.face.normal.y > 0.5 &&
          h.point.y <= camera.position.y
      );

    if (hits.length > 0) {
      const bestFloor = hits.reduce((a, b) =>
        a.point.y > b.point.y ? a : b
      );
      camera.position.y = bestFloor.point.y + PLAYER_HEIGHT;
    }

    // FOOTSTEP AUDIO

    if (audioReady.current && moving && footstep.current) {
      const stepInterval =
        BASE_STEP_INTERVAL / (SPEED / BASE_SPEED);

      if (justStartedMoving.current) {
        footstep.current.play();
        stepTimer.current = 0;
        justStartedMoving.current = false;
      } else {
        stepTimer.current += delta;
        if (stepTimer.current >= stepInterval) {
          footstep.current.play();
          stepTimer.current = 0;
        }
      }
    }

    if (!moving && wasMoving.current && footstep.current) {
      footstep.current.stop();
      stepTimer.current = 0;
    }

    wasMoving.current = moving;
  });

  return null;
}
