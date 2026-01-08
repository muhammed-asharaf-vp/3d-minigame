// import { useEffect, useState } from "react";

// export default function useKeyboard() {
//   const [keys, setKeys] = useState({});

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       setKeys((prev) => ({ ...prev, [e.code]: true }));
//     };

//     const handleKeyUp = (e) => {
//       setKeys((prev) => ({ ...prev, [e.code]: false }));
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, []);

//   return {
//     forward: !!keys["KeyW"],
//     backward: !!keys["KeyS"],
//     left: !!keys["KeyA"],
//     right: !!keys["KeyD"],
//     interact: !!keys["KeyE"],
//   };
// }


import { useEffect, useState } from "react";

export default function useKeyboard() {
  const [keys, setKeys] = useState({});

  useEffect(() => {
    const down = (e) => {
      setKeys((k) => ({ ...k, [e.code]: true }));
    };

    const up = (e) => {
      setKeys((k) => ({ ...k, [e.code]: false }));
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  return {
    forward: !!keys["KeyW"],
    backward: !!keys["KeyS"],
    left: !!keys["KeyA"],
    right: !!keys["KeyD"],
  };
}
