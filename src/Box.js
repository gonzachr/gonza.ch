import React from "react";
import { a } from "react-spring/three";
import { Math as ThreeMath } from "three";

const Box = ({ mouse, position: { x, y }, color }) => {
  const timesX = ThreeMath.mapLinear(x, 0, 6, 0, window.innerWidth / 2);
  const width = window.innerWidth / 2;
  const height = window.innerHeight / 2;

  return (
    <group>
      <a.mesh position={[x, y, 0]}>
        <boxGeometry attach="geometry" />
        <meshPhongMaterial attach="material" color={color} />
      </a.mesh>
    </group>
  );
};

Box.defaultProps = {
  position: { x: 0, y: 0 },
  color: 0xffffff,
  mouse: [0, 0]
};

export default Box;
