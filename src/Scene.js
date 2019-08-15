import React, { Suspense } from "react";
import { extend, Canvas } from "react-three-fiber";
import { apply as applySpring } from "react-spring/three";
import Box from "./Box";
import Effects from "./Effects";
import { connect } from "react-redux";

import { EffectComposer } from "./postprocessing/EffectComposer";
import { RenderPass } from "./postprocessing/RenderPass";
import { GlitchPass } from "./postprocessing/GlitchPass";
import { FilmPass } from "./postprocessing/FilmPass";
import Model from "./Model";

applySpring({ EffectComposer, GlitchPass, RenderPass, FilmPass });
extend({ EffectComposer, GlitchPass, RenderPass, FilmPass });

const Scene = ({
  factor,
  mouse,
  currentRef,
  currentView,
  loading,
  setSpringRef
}) => {
  return (
    <Canvas className="canvas">
      <spotLight color={0xffffff} position={[10, 4, 0]} />
      <directionalLight color={0xffffff} intensity={1} position={[-1, 2, 4]} />
      <Effects loading={loading} factor={factor} />
      <Suspense fallback={<Box />}>
        <Model
          mouse={mouse}
          currentView={currentView}
          currentRef={currentRef}
          setSpringRef={setSpringRef}
        />
      </Suspense>
      {!loading && <Box currentView={currentView} />}
    </Canvas>
  );
};

const mapStateToProps = ({ currentView, currentRef, loading }) => ({
  currentRef,
  currentView,
  loading
});

export default connect(mapStateToProps)(Scene);
