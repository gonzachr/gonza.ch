import React, { useCallback, Suspense } from "react";
import { extend, Canvas } from "react-three-fiber";
import { apply as applySpring } from "react-spring/three";
import Box from "./Box";
import Effects from "./Effects";
import Text from "./Text";
import { connect } from "react-redux";

import { EffectComposer } from "./postprocessing/EffectComposer";
import { RenderPass } from "./postprocessing/RenderPass";
import { GlitchPass } from "./postprocessing/GlitchPass";
import { FilmPass } from "./postprocessing/FilmPass";
import Model from "./Model";
import Stars from "./Stars";

applySpring({ EffectComposer, GlitchPass, RenderPass, FilmPass });
extend({ EffectComposer, GlitchPass, RenderPass, FilmPass });

const Scene = ({ mouse, factor, top, currentView }) => {
  return (
    <Canvas className="canvas">
      <spotLight color={0xffffff} position={[10, 5, 0]} />
      <Effects factor={0} />
      <directionalLight color={0xffffff} intensity={1} position={[-1, 2, 4]} />
      {/* <mesh position={[0, 0, -5]}>
        <planeGeometry attach="geometry" args={[30, 20, 0.1]} />
        <meshBasicMaterial attach="material" color="#000000" />
      </mesh> */}
      <Stars position={[0, 0, 0]} />
      <Suspense fallback={<Box />}>
        <Model
          top={top}
          position={[0, 0, 0]}
          mouse={mouse}
          currentView={currentView}
        />
      </Suspense>
    </Canvas>
  );
};

const mapStateToProps = currentView => ({ currentView });

export default connect(mapStateToProps)(Scene);
