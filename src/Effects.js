import React, { useRef, useEffect } from "react";
import { useThree, useRender } from "react-three-fiber";
import { a, useSpring } from "react-spring/three";

const Effects = React.memo(({ loadingStatus, factor }) => {
  const pixelRatio = window.devicePixelRatio;
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();

  useEffect(() => {
    return void composer.current.setSize(
      size.width * pixelRatio,
      size.height * pixelRatio
    );
  }, [size, pixelRatio, loadingStatus]);
  useRender(() => {
    return composer.current.render();
  }, true);

  // const factor = useSpring({
  //   factor: loadingStatus ? 1 : 0
  // });

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      <filmPass attachArray="passes" args={[0.5, 0.025, 648, false]} />
      <a.glitchPass attachArray="passes" renderToScreen factor={factor} />
    </effectComposer>
  );
});

export default Effects;
