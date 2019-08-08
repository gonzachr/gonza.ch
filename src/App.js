import React, { useCallback, useState, useEffect, useRef } from "react";
import { useSpring } from "react-spring/three";
import { Math as ThreeMath } from "three";
import Scene from "./Scene";
import Header from "./Header";
import { Provider } from "react-redux";
import store from "./redux";
import AboutMe from "./AboutMe";
import github from "./assets/github.png";
import styled from "styled-components";

const Link = styled.a`
  text-decoration: none;
`;

const GitHub = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  width: 24px;
  height: 24px;
  padding: 1.3em;
`;

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
        <Link href="https://github.com/gonzarodriguezt" target="_blank">
          <GitHub src={github} />
        </Link>
      </div>
    </Provider>
  );
};

export default App;
