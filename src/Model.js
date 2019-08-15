import React, { useRef, useState } from "react";
import { unstable_createResource as createResource } from "./react-cache";
import { a, useSpring, config, useChain } from "react-spring/three";
import { Math as ThreeMath } from "three";
import { useRender } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Views, TOGGLE_LOADING } from "./redux/actions";
import delay from "delay";
import store from "./redux";

const path = "./models/head/";

const resource = createResource(
  file =>
    new Promise(async res => {
      return (
        await delay(2500),
        store.dispatch({ type: TOGGLE_LOADING }),
        new GLTFLoader().load(path + file, res)
      );
    })
);

function Model({
  top,
  currentView,
  currentRef,
  mouse,
  setSpringRef,
  ...other
}) {
  const [positionX, setPositionX] = useState(0);
  const tempRef = useRef();
  const width = window.innerWidth / 2;
  const height = window.innerHeight / 2;
  const { scene } = resource.read("scene.gltf");
  let theta = 1;
  const { VIEW_ABOUT_ME } = Views;
  const springRef = useRef();
  const aboutMe = currentView === VIEW_ABOUT_ME;

  const { rotation, position, opacity, ...rest } = useSpring({
    ref: springRef,
    config: config.gentle,
    from: {
      opacity: 0,
      position: [0, positionX, 0],
      rotation: [...mouse.current, 0]
    },
    to: {
      opacity: 1,
      position: aboutMe ? [-2, positionX, 2] : [0, positionX, 0],
      rotation: aboutMe ? [420, 0, 0] : [...mouse.current, 0]
    }
  });

  const ref = currentRef.transRef ? currentRef.transRef : tempRef;

  useChain(aboutMe ? [springRef, ref] : [ref, springRef], [
    0,
    aboutMe ? 0.5 : 1
  ]);

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
      rotation={rotation.interpolate((x, y, z) => [
        ThreeMath.mapLinear(y, 0, height, 0, 0.5),
        ThreeMath.mapLinear(x, 0, width, -3.15, -2),
        z
      ])}
      position={position}
    />
  );
}

export default Model;
