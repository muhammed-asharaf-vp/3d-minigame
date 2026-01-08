


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
