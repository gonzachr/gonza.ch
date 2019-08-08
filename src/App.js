import React, { useCallback, useState, useEffect, useRef } from "react";
import { useSpring } from "react-spring/three";
import { Math as ThreeMath } from "three";
import Scene from "./Scene";
import Header from "./Header";
import { Provider } from "react-redux";
import store from "./redux";
import AboutMe from './AboutMe';

const App = () => {
  const [realMouse, setRealMouse] = useState([0, 0]);
  const scroll = useRef();
  const [{ mouse, top }, set] = useSpring(() => ({
    mouse: [0, 0],
    top: 0
  }));
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) => {
      setRealMouse([x - window.innerWidth / 2, y - window.innerHeight / 2]);
      set({ mouse: [x - window.innerWidth / 2, y - window.innerHeight / 2] });
    },
    [set]
  );
  const { opacity } = useSpring({
    from: { opacity: 0 },
    opacity: 1
  });

  const onScroll = ({ target: { scrollTop } }) => {
    set({ top: scrollTop });
  };
  // const { factor } = useSpring({
  //   factor: toggle ? 1 : 0
  // });

  return (
    <Provider store={store}>
      <Scene top={top} mouse={realMouse} />
      <div
        className="container"
        onScroll={onScroll}
        ref={scroll}
        onMouseMove={onMouseMove}
      >
        <Header />
        <AboutMe />
      </div>
    </Provider>
  );
};

export default App;
