import React from "react";
import { a } from "react-spring/three";
import { Math as ThreeMath } from "three";

const Box = ({ mouse, position: { x, y }, color }) => {
  const timesX = ThreeMath.mapLinear(x, 0, 6, 0, window.innerWidth / 2);
  console.log(timesX);
  const width = window.innerWidth / 2;
  const height = window.innerHeight / 2;

  return (
    <group>
      <a.mesh
        position={[x, y, 0]}
        rotation={mouse.interpolate((x, y) => {

          return [
            ThreeMath.mapLinear(y, 0, height, 0, 1),
            ThreeMath.mapLinear(x - timesX, 0, width, 0, 1),
            0
          ];
        })}
      >
        <boxGeometry attach="geometry" />
        <meshPhongMaterial attach="material" color={color} />
      </a.mesh>
    </group>
  );
};

Box.defaultProps = {
  position: { x: 0, y: 0 }
};

export default Box;
