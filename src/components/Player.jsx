// import { useFrame, useThree } from "@react-three/fiber";
// import * as THREE from "three";
// import useKeyboard from "../hooks/useKeyboard";

// export default function Player() {
//   const { camera } = useThree();
//   const keys = useKeyboard();
//   const direction = new THREE.Vector3();
//   const speed = 4;

//   useFrame((_, delta) => {
//     direction.set(0, 0, 0);

//     if (keys.forward) direction.z -= 1;
//     if (keys.backward) direction.z += 1;
//     if (keys.left) direction.x -= 1;
//     if (keys.right) direction.x += 1;

//     if (direction.length() > 0) {
//       direction.normalize().multiplyScalar(speed * delta);
//       camera.position.add(direction);
//     }

//     camera.position.y = 1.6; // eye height
//   });

//   return null;
// }


// import { useFrame, useThree } from "@react-three/fiber";
// import * as THREE from "three";
// import { useRef,useEffect } from "react";
// import useKeyboard from "../hooks/useKeyBoard";

// export default function Player({ bounds }) {
//   const { camera, gl } = useThree();
//   const keys =useKeyboard()

//   const velocity = useRef(new THREE.Vector3());
//   const direction = new THREE.Vector3();
//   const speed = 4;

//   // Mouse look values
//   const yaw = useRef(0);
//   const pitch = useRef(0);

//   // 🔥 Mouse move (FPS look)
//   useEffect(() => {
//     const onMouseMove = (e) => {
//       yaw.current -= e.movementX * 0.002;
//       pitch.current -= e.movementY * 0.002;

//       pitch.current = Math.max(
//         -Math.PI / 2,
//         Math.min(Math.PI / 2, pitch.current)
//       );
//     };

//     gl.domElement.addEventListener("mousemove", onMouseMove);
//     return () => gl.domElement.removeEventListener("mousemove", onMouseMove);
//   }, [gl.domElement]);

//   useFrame((_, delta) => {
//     if (!bounds) return;

//     // Camera rotation
//     camera.rotation.order = "YXZ";
//     camera.rotation.y = yaw.current;
//     camera.rotation.x = pitch.current;

//     direction.set(0, 0, 0);

//     if (keys.forward) direction.z -= 1;
//     if (keys.backward) direction.z += 1;
//     if (keys.left) direction.x -= 1;
//     if (keys.right) direction.x += 1;

//     direction.normalize();

//     // Move relative to camera direction
//     const move = new THREE.Vector3();
//     move
//       .copy(direction)
//       .applyEuler(camera.rotation)
//       .multiplyScalar(speed * delta);

//     const nextX = camera.position.x + move.x;
//     const nextZ = camera.position.z + move.z;

//     // 🚧 FULL HOUSE COLLISION
//     if (
//       nextX > bounds.minX &&
//       nextX < bounds.maxX &&
//       nextZ > bounds.minZ &&
//       nextZ < bounds.maxZ
//     ) {
//       camera.position.x = nextX;
//       camera.position.z = nextZ;
//     }

//     camera.position.y = 1.6; // eye height
//   });

//   return null;
// }

// import { useFrame, useThree } from "@react-three/fiber";
// import * as THREE from "three";
// import { useRef, useEffect } from "react";
// import useKeyboard from "../hooks/useKeyboard";

// export default function Player({ bounds }) {
//   const { camera, gl } = useThree();
//   const keys = useKeyboard(); // ✅ MUST CALL HOOK

//   const direction = new THREE.Vector3();
//   const speed = 4;

//   const yaw = useRef(0);
//   const pitch = useRef(0);

//   // 🖱 Mouse look (FPS)
//   useEffect(() => {
//     const onMouseMove = (e) => {
//       yaw.current -= e.movementX * 0.002;
//       pitch.current -= e.movementY * 0.002;

//       pitch.current = Math.max(
//         -Math.PI / 2,
//         Math.min(Math.PI / 2, pitch.current)
//       );
//     };

//     gl.domElement.addEventListener("mousemove", onMouseMove);
//     return () => gl.domElement.removeEventListener("mousemove", onMouseMove);
//   }, [gl.domElement]);

//   useFrame((_, delta) => {
//     if (!bounds) return;

//     // Camera rotation
//     camera.rotation.order = "YXZ";
//     camera.rotation.y = yaw.current;
//     camera.rotation.x = pitch.current;

//     direction.set(0, 0, 0);

//     if (keys.forward) direction.z -= 1;
//     if (keys.backward) direction.z += 1;
//     if (keys.left) direction.x -= 1;
//     if (keys.right) direction.x += 1;

//     // ❗ IMPORTANT: only normalize if moving
//     if (direction.lengthSq() === 0) return;

//     direction.normalize();

//     const move = direction
//       .clone()
//       .applyEuler(camera.rotation)
//       .multiplyScalar(speed * delta);

//     const nextX = camera.position.x + move.x;
//     const nextZ = camera.position.z + move.z;

//     // 🚧 Collision
//     if (
//       nextX > bounds.minX &&
//       nextX < bounds.maxX &&
//       nextZ > bounds.minZ &&
//       nextZ < bounds.maxZ
//     ) {
//       camera.position.x = nextX;
//       camera.position.z = nextZ;
//     }

//     camera.position.y = 1.6;
//   });

//   return null;
// }



// import { useFrame, useThree } from "@react-three/fiber";
// import { useRef, useEffect } from "react";
// import useKeyboard from "../hooks/useKeyboard";

// export default function Player({ bounds }) {
//   const { camera, gl } = useThree();
//   const keys = useKeyboard();

//   const yaw = useRef(0);
//   const pitch = useRef(0);
//   const speed = 3;

//   // 🖱 Mouse look
//   useEffect(() => {
//     const onMouseMove = (e) => {
//       yaw.current -= e.movementX * 0.002;
//       pitch.current -= e.movementY * 0.002;
//       pitch.current = Math.max(-1.5, Math.min(1.5, pitch.current));
//     };

//     gl.domElement.addEventListener("mousemove", onMouseMove);
//     return () =>
//       gl.domElement.removeEventListener("mousemove", onMouseMove);
//   }, [gl.domElement]);

//   useFrame((_, delta) => {
//     let dx = 0;
//     let dz = 0;

//     if (keys.forward) dz -= 1;
//     if (keys.backward) dz += 1;
//     if (keys.left) dx -= 1;
//     if (keys.right) dx += 1;

//     // Rotate camera
//     camera.rotation.order = "YXZ";
//     camera.rotation.y = yaw.current;
//     camera.rotation.x = pitch.current;

//     const sin = Math.sin(camera.rotation.y);
//     const cos = Math.cos(camera.rotation.y);

//     const moveX = (dx * cos - dz * sin) * speed * delta;
//     const moveZ = (dz * cos + dx * sin) * speed * delta;

//     const nextX = camera.position.x + moveX;
//     const nextZ = camera.position.z + moveZ;

//     // 🚧 Collision only if inside bounds
//     if (
//       !bounds ||
//       (nextX > bounds.minX &&
//         nextX < bounds.maxX &&
//         nextZ > bounds.minZ &&
//         nextZ < bounds.maxZ)
//     ) {
//       camera.position.x = nextX;
//       camera.position.z = nextZ;
//     }

//     camera.position.y = 1.6;
//   });

//   return null;
// }




// import { useFrame, useThree } from "@react-three/fiber";
// import { useRef, useEffect } from "react";
// import * as THREE from "three";
// import useKeyboard from "../hooks/useKeyboard";

// export default function Player({ bounds }) {
//   const { camera, gl, scene } = useThree();
//   const keys = useKeyboard();

//   const yaw = useRef(0);
//   const pitch = useRef(0);
//   const raycaster = useRef(new THREE.Raycaster());

//   const SPEED = 3;
//   const PLAYER_HEIGHT = 1.3;
//   const WALL_PADDING = 0.3;

//   // 🖱 Mouse look
//   useEffect(() => {
//     const onMouseMove = (e) => {
//       yaw.current -= e.movementX * 0.002;
//       pitch.current -= e.movementY * 0.002;
//       pitch.current = Math.max(-1.4, Math.min(1.4, pitch.current));
//     };
//     gl.domElement.addEventListener("mousemove", onMouseMove);
//     return () =>
//       gl.domElement.removeEventListener("mousemove", onMouseMove);
//   }, [gl.domElement]);

//   useFrame((_, delta) => {
//     if (!bounds) return;

//     let dx = 0;
//     let dz = 0;

//     if (keys.forward) dz -= 1;
//     if (keys.backward) dz += 1;
//     if (keys.left) dx -= 1;
//     if (keys.right) dx += 1;

//     // Camera rotation
//     camera.rotation.order = "YXZ";
//     camera.rotation.y = yaw.current;
//     camera.rotation.x = pitch.current;

//     const sin = Math.sin(camera.rotation.y);
//     const cos = Math.cos(camera.rotation.y);

//     const moveX = (dx * cos - dz * sin) * SPEED * delta;
//     const moveZ = (dz * cos + dx * sin) * SPEED * delta;

//     const nextX = camera.position.x + moveX;
//     const nextZ = camera.position.z + moveZ;

//     // 🧱 Wall collision
//     if (
//       nextX < bounds.minX + WALL_PADDING ||
//       nextX > bounds.maxX - WALL_PADDING ||
//       nextZ < bounds.minZ + WALL_PADDING ||
//       nextZ > bounds.maxZ - WALL_PADDING
//     ) {
//       return;
//     }

//     // 🔽 FLOOR DETECTION
//     raycaster.current.set(
//       new THREE.Vector3(nextX, camera.position.y + 2, nextZ),
//       new THREE.Vector3(0, -1, 0)
//     );

//     const hits = raycaster.current
//       .intersectObjects(scene.children, true)
//       .filter((h) => h.face && h.face.normal.y > 0.5);

//     if (hits.length > 0) {
//       const floorY = hits[0].point.y;
//       const targetY = floorY + PLAYER_HEIGHT;
//       const diff = targetY - camera.position.y;

//       // ⬇ Go down smoothly
//       if (diff < 0) {
//         camera.position.y += diff * 0.25;
//       }

//       // ⬆ Small up correction
//       if (diff > 0 && diff < 0.25) {
//         camera.position.y += diff;
//       }
//     }

//     // ✅ ALWAYS APPLY MOVEMENT
//     camera.position.x = nextX;
//     camera.position.z = nextZ;
//   });

//   return null;
// }


// import { useFrame, useThree } from "@react-three/fiber";
// import { useRef, useEffect } from "react";
// import * as THREE from "three";
// import useKeyboard from "../hooks/useKeyboard";

// export default function Player({ bounds }) {
//   const { camera, gl, scene } = useThree();
//   const keys = useKeyboard();

//   const yaw = useRef(0);
//   const pitch = useRef(0);
//   const raycaster = useRef(new THREE.Raycaster());

//   const SPEED = 3;
//   const PLAYER_HEIGHT = 1.3;
//   const WALL_PADDING = 0.3;

//   // 🖱 Mouse look
//   useEffect(() => {
//     const onMouseMove = (e) => {
//       yaw.current -= e.movementX * 0.002;
//       pitch.current -= e.movementY * 0.002;
//       pitch.current = Math.max(-1.4, Math.min(1.4, pitch.current));
//     };
//     gl.domElement.addEventListener("mousemove", onMouseMove);
//     return () =>
//       gl.domElement.removeEventListener("mousemove", onMouseMove);
//   }, [gl.domElement]);

//   useFrame((_, delta) => {
//     if (!bounds) return;

//     let dx = 0;
//     let dz = 0;

//     if (keys.forward) dz -= 1;
//     if (keys.backward) dz += 1;
//     if (keys.left) dx -= 1;
//     if (keys.right) dx += 1;

//     camera.rotation.order = "YXZ";
//     camera.rotation.y = yaw.current;
//     camera.rotation.x = pitch.current;

//     const sin = Math.sin(camera.rotation.y);
//     const cos = Math.cos(camera.rotation.y);

//     const moveX = (dx * cos - dz * sin) * SPEED * delta;
//     const moveZ = (dz * cos + dx * sin) * SPEED * delta;

//     const nextX = camera.position.x + moveX;
//     const nextZ = camera.position.z + moveZ;

//     // 🧱 Wall collision
//     if (
//       nextX < bounds.minX + WALL_PADDING ||
//       nextX > bounds.maxX - WALL_PADDING ||
//       nextZ < bounds.minZ + WALL_PADDING ||
//       nextZ > bounds.maxZ - WALL_PADDING
//     )
//       return;

//     // 🔽 Floor detection
//    raycaster.current.set(
//   new THREE.Vector3(nextX, camera.position.y + 1.5, nextZ),
//   new THREE.Vector3(0, -1, 0)
// );

// const hits = raycaster.current
//   .intersectObjects(scene.children, true)
//   .filter(
//     (h) =>
//       h.face &&
//       h.face.normal.y > 0.5 &&
//       h.point.y <= camera.position.y
//   );


//    if (hits.length > 0) {
//   const floorY = hits[0].point.y;
//   const targetY = floorY + PLAYER_HEIGHT;
//   const diff = targetY - camera.position.y;

//   // uniform smooth correction
//   camera.position.y += diff * 0.3;
// }


//     camera.position.x = nextX;
//     camera.position.z = nextZ;
//   });

//   return null;
// }



// import { useFrame, useThree } from "@react-three/fiber";
// import { useRef, useEffect } from "react";
// import * as THREE from "three";
// import useKeyboard from "../hooks/useKeyboard";

// export default function Player({ bounds }) {
//   const { camera, gl, scene } = useThree();
//   const keys = useKeyboard();

//   const yaw = useRef(0);
//   const pitch = useRef(0);
//   const raycaster = useRef(new THREE.Raycaster());

//   const SPEED = 3;
//   const PLAYER_HEIGHT = 1.3;
//   const WALL_PADDING = 0.3;

//   // 🖱 Mouse look
//   useEffect(() => {
//     const onMouseMove = (e) => {
//       yaw.current -= e.movementX * 0.002;
//       pitch.current -= e.movementY * 0.002;
//       pitch.current = Math.max(-1.4, Math.min(1.4, pitch.current));
//     };
//     gl.domElement.addEventListener("mousemove", onMouseMove);
//     return () =>
//       gl.domElement.removeEventListener("mousemove", onMouseMove);
//   }, [gl.domElement]);

//   useFrame((_, delta) => {
//     if (!bounds) return;

//     // 🎥 Camera rotation
//     camera.rotation.order = "YXZ";
//     camera.rotation.y = yaw.current;
//     camera.rotation.x = pitch.current;

//     // 👉 Forward direction (face direction)
//     const forward = new THREE.Vector3();
//     camera.getWorldDirection(forward);
//     forward.y = 0;
//     forward.normalize();

//     // 👉 Right direction
//     const right = new THREE.Vector3();
//     right.crossVectors(forward, camera.up).normalize();

//     // 👉 Movement vector
//     const move = new THREE.Vector3();

//     if (keys.forward) move.add(forward);
//     if (keys.backward) move.sub(forward);
//     if (keys.right) move.add(right);
//     if (keys.left) move.sub(right);

//     if (move.lengthSq() === 0) return;

//     move.normalize().multiplyScalar(SPEED * delta);

//     const nextX = camera.position.x + move.x;
//     const nextZ = camera.position.z + move.z;

//     // 🧱 Wall collision
//     if (
//       nextX < bounds.minX + WALL_PADDING ||
//       nextX > bounds.maxX - WALL_PADDING ||
//       nextZ < bounds.minZ + WALL_PADDING ||
//       nextZ > bounds.maxZ - WALL_PADDING
//     )
//       return;

//     // 🔽 Floor detection (only below player)
//     raycaster.current.set(
//       new THREE.Vector3(nextX, camera.position.y + 1.5, nextZ),
//       new THREE.Vector3(0, -1, 0)
//     );

//     const hits = raycaster.current
//       .intersectObjects(scene.children, true)
//       .filter(
//         (h) =>
//           h.face &&
//           h.face.normal.y > 0.5 &&
//           h.point.y <= camera.position.y
//       );

//     if (hits.length > 0) {
//       const floorY = hits[0].point.y;
//       const targetY = floorY + PLAYER_HEIGHT;
//       const diff = targetY - camera.position.y;

//       // smooth height correction
//       camera.position.y += diff * 0.3;
//     }

//     // ✅ Apply movement
//     camera.position.x = nextX;
//     camera.position.z = nextZ;
//   });

//   return null;
// }




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

  const SPEED = 3;
  const PLAYER_HEIGHT = 1.3;
  const WALL_PADDING = 0.3;
  const WALL_RAY_DISTANCE = 0.4; // 🔥 wall thickness

  // 🖱 Mouse look
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

    // 🎥 Camera rotation
    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw.current;
    camera.rotation.x = pitch.current;

    // 👉 Forward direction
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    // 👉 Right direction
    const right = new THREE.Vector3();
    right.crossVectors(forward, camera.up).normalize();

    // 👉 Movement vector
    const move = new THREE.Vector3();
    if (keys.forward) move.add(forward);
    if (keys.backward) move.sub(forward);
    if (keys.right) move.add(right);
    if (keys.left) move.sub(right);

    if (move.lengthSq() === 0) return;

    move.normalize().multiplyScalar(SPEED * delta);

    const nextPos = camera.position.clone().add(move);

    // 🧱 OUTER BOUNDS (optional safety)
    if (
      nextPos.x < bounds.minX + WALL_PADDING ||
      nextPos.x > bounds.maxX - WALL_PADDING ||
      nextPos.z < bounds.minZ + WALL_PADDING ||
      nextPos.z > bounds.maxZ - WALL_PADDING
    ) {
      return;
    }

    // 🧱 INNER WALL COLLISION (🔥 IMPORTANT)
    raycaster.current.set(
      camera.position,
      move.clone().normalize()
    );

    const wallHits = raycaster.current
      .intersectObjects(scene.children, true)
      .filter(
        (h) =>
          h.distance < WALL_RAY_DISTANCE &&
          Math.abs(h.face?.normal.y) < 0.5 // ignore floor & ceiling
      );

    if (wallHits.length > 0) {
      return; // 🚫 blocked by wall
    }

    // 🔽 FLOOR DETECTION
    raycaster.current.set(
      new THREE.Vector3(nextPos.x, camera.position.y + 1.5, nextPos.z),
      new THREE.Vector3(0, -1, 0)
    );

    const floorHits = raycaster.current
      .intersectObjects(scene.children, true)
      .filter(
        (h) =>
          h.face &&
          h.face.normal.y > 0.5 &&
          h.point.y <= camera.position.y
      );

    if (floorHits.length > 0) {
      const floorY = floorHits[0].point.y;
      const targetY = floorY + PLAYER_HEIGHT;
      const diff = targetY - camera.position.y;

      camera.position.y += diff * 0.3;
    }

    // ✅ APPLY MOVEMENT
    camera.position.x = nextPos.x;
    camera.position.z = nextPos.z;
  });

  return null;
}




// import { useFrame, useThree } from "@react-three/fiber";
// import { useRef, useEffect } from "react";
// import * as THREE from "three";
// import useKeyboard from "../hooks/useKeyboard";

// export default function Player({ bounds }) {
//   const { camera, gl, scene } = useThree();
//   const keys = useKeyboard();

//   const yaw = useRef(0);
//   const pitch = useRef(0);
//   const raycaster = useRef(new THREE.Raycaster());

//   // 🔥 Physics
//   const velocityY = useRef(0);
//   const isGrounded = useRef(false);

//   const SPEED = 3;
//   const PLAYER_HEIGHT = 1.3;
//   const WALL_PADDING = 0.3;
//   const WALL_RAY_DISTANCE = 0.4;

//   const GRAVITY_UP = 18; //WHILE RISING
//   const JUMP_FORCE = 6;  //WHILE FALLING
//   const GRAVITY_DOWN = 32;  // while falling (stronger)
//   const AIR_CONTROL = 0.35; // limit movement in air

//   // 🖱 Mouse look
//   useEffect(() => {
//     const onMouseMove = (e) => {
//       yaw.current -= e.movementX * 0.002;
//       pitch.current -= e.movementY * 0.002;
//       pitch.current = Math.max(-1.4, Math.min(1.4, pitch.current));
//     };
//     gl.domElement.addEventListener("mousemove", onMouseMove);
//     return () =>
//       gl.domElement.removeEventListener("mousemove", onMouseMove);
//   }, [gl.domElement]);

//   useFrame((_, delta) => {
//     if (!bounds) return;

//     // 🎥 Camera rotation
//     camera.rotation.order = "YXZ";
//     camera.rotation.y = yaw.current;
//     camera.rotation.x = pitch.current;

//     // 👉 Direction vectors
//     const forward = new THREE.Vector3();
//     camera.getWorldDirection(forward);
//     forward.y = 0;
//     forward.normalize();

//     const right = new THREE.Vector3();
//     right.crossVectors(forward, camera.up).normalize();

//     // 👉 Horizontal movement
//     const move = new THREE.Vector3();
//     if (keys.forward) move.add(forward);
//     if (keys.backward) move.sub(forward);
//     if (keys.right) move.add(right);
//     if (keys.left) move.sub(right);

//     let nextPos = camera.position.clone();

//     if (move.lengthSq() > 0) {
//       move.normalize().multiplyScalar(SPEED * delta);
//       nextPos.add(move);

//       // 🧱 OUTER BOUNDS
//       if (
//         nextPos.x < bounds.minX + WALL_PADDING ||
//         nextPos.x > bounds.maxX - WALL_PADDING ||
//         nextPos.z < bounds.minZ + WALL_PADDING ||
//         nextPos.z > bounds.maxZ - WALL_PADDING
//       ) {
//         nextPos.copy(camera.position);
//       } else {
//         // 🧱 INNER WALL COLLISION
//         raycaster.current.set(
//           new THREE.Vector3(
//             camera.position.x,
//             camera.position.y - PLAYER_HEIGHT / 2,
//             camera.position.z
//           ),
//           move.clone().normalize()
//         );

//         const wallHits = raycaster.current
//           .intersectObjects(scene.children, true)
//           .filter(
//             (h) =>
//               h.distance < WALL_RAY_DISTANCE &&
//               Math.abs(h.face?.normal.y) < 0.5
//           );

//         if (wallHits.length > 0) {
//           nextPos.copy(camera.position);
//         }
//       }
//     }

//     // 🔽 FLOOR CHECK (ground detection)
//     raycaster.current.set(
//       new THREE.Vector3(nextPos.x, camera.position.y + 1.5, nextPos.z),
//       new THREE.Vector3(0, -1, 0)
//     );

//     const floorHits = raycaster.current
//       .intersectObjects(scene.children, true)
//       .filter(
//         (h) =>
//           h.face &&
//           h.face.normal.y > 0.5 &&
//           h.point.y <= camera.position.y
//       );

//     if (floorHits.length > 0) {
//       const floorY = floorHits[0].point.y;
//       const targetY = floorY + PLAYER_HEIGHT;

//       if (camera.position.y <= targetY + 0.05) {
//         isGrounded.current = true;
//         velocityY.current = 0;
//         camera.position.y = targetY;
//       } else {
//         isGrounded.current = false;
//       }
//     } else {
//       isGrounded.current = false;
//     }

//     // 🆙 JUMP
//     if (keys.jump && isGrounded.current) {
//       velocityY.current = JUMP_FORCE;
//       isGrounded.current = false;
//     }

//     // ⬇ GRAVITY
//     velocityY.current -= GRAVITY * delta;
//     camera.position.y += velocityY.current * delta;

//     // ✅ APPLY POSITION
//     camera.position.x = nextPos.x;
//     camera.position.z = nextPos.z;
//   });

//   return null;
// }


