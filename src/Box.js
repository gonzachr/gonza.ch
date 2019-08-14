import React from "react";
import { Vector3 } from "three";
import { a, useSpring } from "react-spring/three";
import { VIEW_ABOUT_ME } from "./redux/actions";

const Box = ({
  vertices = [[-1.5, -1, 0], [0, 2, 0], [1.5, -1, 0], [-1.5, -1, 0]],
  currentView
}) => {
  const { opacity } = useSpring({
    opacity: currentView === VIEW_ABOUT_ME ? 0 : 1
  });

  return (
    <group>
      <line>
        <geometry
          attach="geometry"
          vertices={vertices.map(v => new Vector3(...v))}
          onUpdate={self => (self.verticesNeedUpdate = true)}
        />
        <a.lineBasicMaterial
          attach="material"
          transparent
          opacity={opacity}
          color="white"
        />
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
