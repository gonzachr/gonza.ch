import React, { useEffect, useRef, useState } from "react";
import { unstable_createResource as createResource } from "./react-cache";
import { a, useSpring, config, useChain } from "react-spring/three";
import { Math as ThreeMath } from "three";
import { useRender } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Views, toggleLoading } from "./redux/actions";
import delay from "delay";
import store from "./redux";

const path = "./models/head/";

const resource = createResource(
  file =>
    new Promise(async res => {
      return (
        await delay(2500),
        store.dispatch(toggleLoading()),
        new GLTFLoader().load(path + file, res)
      );
    })
);

function Model({
  mouse,
  top,
  currentView,
  currentRef,
  setSpringRef,
  ...other
}) {
  const [currentRotation, setCurrentRotation] = useState([0, -3.2, 0]);
  const [positionX, setPositionX] = useState(0);
  const file = "scene.gltf";
  const tempRef = useRef();
  const width = window.innerWidth / 2;
  const height = window.innerHeight / 2;
  const { scene } = resource.read(file);
  let theta = 1;
  const { VIEW_ABOUT_ME } = Views;
  const springRef = useRef();
  const { rotation, position, opacity, ...rest } = useSpring({
    ref: springRef,
    config: config.gentle,
    from: {
      opacity: 0,
      position: [0, positionX, 0],
      rotation: currentRotation
    },
    to: {
      opacity: 1,
      position:
        currentView === VIEW_ABOUT_ME ? [-2, positionX, 2] : [0, positionX, 0],
      rotation: currentView === VIEW_ABOUT_ME ? [0, -2.5, 0] : currentRotation
    }
  });

  useEffect(() => {
    const [x, y] = mouse;
    const rotX = ThreeMath.mapLinear(x, 0, width, -3.15, -2);
    const rotY = ThreeMath.mapLinear(y, 0, height, 0, 0.5);

    setSpringRef(springRef);
    setCurrentRotation([rotY, rotX, 0]);
  }, [mouse, width, height, currentView, setSpringRef]);
  const ref = currentRef.transRef ? currentRef.transRef : tempRef;

  useChain(
    currentView === VIEW_ABOUT_ME ? [springRef, ref] : [ref, springRef],
    [0, currentView === VIEW_ABOUT_ME ? 0.5 : 1]
  );

  useRender(() => {
    const r = ThreeMath.mapLinear(
      Math.sin(ThreeMath.degToRad((theta += 2))),
      -1,
      1,
      -0.1,
      0.1
    );
    setPositionX(0.5 + r);
  });

  return (
    <a.primitive
      {...other}
      {...rest}
      object={scene}
      scale={[0.8, 0.8, 0.8]}
      rotation={rotation}
      position={position}
      transparent
      opacity={opacity}
    />
  );
}

export default Model;
