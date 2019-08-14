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
import { setSpringRef } from "./redux/actions";

applySpring({ EffectComposer, GlitchPass, RenderPass, FilmPass });
extend({ EffectComposer, GlitchPass, RenderPass, FilmPass });

const Scene = ({
  mouse,
  factor,
  top,
  currentRef,
  currentView,
  loadingStatus,
  setSpringRef
}) => {
  return (
    <Canvas className="canvas">
      <spotLight color={0xffffff} position={[10, 4, 0]} />
      <directionalLight color={0xffffff} intensity={1} position={[-1, 2, 4]} />
      <Effects loadingStatus={loadingStatus} factor={factor} />
      <Suspense fallback={<Box />}>
        <Model
          top={top}
          mouse={mouse}
          currentView={currentView}
          currentRef={currentRef}
          setSpringRef={setSpringRef}
        />
      </Suspense>
    </Canvas>
  );
};

const mapStateToProps = ({ currentView, currentRef, loadingStatus }) => ({
  currentRef,
  currentView,
  loadingStatus
});
const mapDispatchToProps = { setSpringRef };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scene);
