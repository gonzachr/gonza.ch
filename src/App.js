import React, { useCallback } from "react";
import { Canvas } from "react-three-fiber";
import { useSpring } from "react-spring/three";
import Box from "./Box";

const App = () => {
  const [{ mouse }, set] = useSpring(() => ({ mouse: [0, 0] }));
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) => {
      set({ mouse: [x - window.innerWidth / 2, y - window.innerHeight / 2] });
    },
    [set]
  );

  return (
    <Canvas className="canvas" onMouseMove={onMouseMove}>
      <directionalLight color={0xffffff} intensity={1} position={[-1, 2, 4]} />
      <spotLight color={0xffffff} position={[10, 5, 0]} />
      <Box mouse={mouse} position={{ y: 0, x: -3 }} color={0x161429} />
      <Box mouse={mouse} position={{ y: 0, x: 0 }} color={0xcd979c} />
      <Box mouse={mouse} position={{ y: 0, x: 3 }} color={0xddbabd} />
    </Canvas>
  );
};

export default App;
