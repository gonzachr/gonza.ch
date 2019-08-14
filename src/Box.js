import React from "react";
import { Vector3 } from "three";

const Box = ({
  vertices = [[-1, -1, 0], [0, 1, 0], [1, -1, 0], [-1, -1, 0]]
}) => {
  return (
    <group>
      <line>
        <geometry
          attach="geometry"
          vertices={vertices.map(v => new Vector3(...v))}
          onUpdate={self => (self.verticesNeedUpdate = true)}
        />
        <lineBasicMaterial attach="material" color="white" />
      </line>
    </group>
  );
};

Box.defaultProps = {
  position: { x: 0, y: 0 },
  color: 0xffffff,
  mouse: [0, 0]
};

export default Box;
