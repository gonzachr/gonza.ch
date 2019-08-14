import React, { useCallback, useState, useEffect, useRef } from "react";
// import { useSpring } from "react-spring/three";
// import { Math as ThreeMath } from "three";
import Scene from "./Scene";
import Header from "./Header";
import { Provider } from "react-redux";
import store from "./redux";
import AboutMe from "./AboutMe";
import github from "./assets/github.png";
import styled from "styled-components";
import { connect } from "react-redux";
import { animated, useSpring } from "react-spring";

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

const Loading = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  font-size: 3rem;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.2);
`;

const GithubLink = () => (
  <Link href="https://github.com/gonzarodriguezt" target="_blank">
    <GitHub src={github} />
  </Link>
);

const App = ({ loadingStatus }) => {
  const [realMouse, setRealMouse] = useState([0, 0]);
  // const [{ mouse, top }, set] = useSpring(() => ({
  //   mouse: [0, 0],
  //   top: 0
  // }));
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    setRealMouse([x - window.innerWidth / 2, y - window.innerHeight / 2]);
    // set({ mouse: [x - window.innerWidth / 2, y - window.innerHeight / 2] });
  }, []);
  // const { opacity } = useSpring({
  //   from: { opacity: 0 },
  //   opacity: 1
  // });

  // const onScroll = ({ target: { scrollTop } }) => {
  //   set({ top: scrollTop });
  // };
  // const { factor } = useSpring({
  //   factor: toggle ? 1 : 0
  // });

  // const items = [
  //   { name: "header", jsx: <Header /> },
  //   { name: "about me", jsx: <AboutMe /> },
  //   {
  //     name: "github",
  //     jsx: <GithubLink />
  //   }
  // ];

  // const transitions = useTransition(
  //   loadingStatus ? [] : items,
  //   item => item.name,
  //   {
  //     unique: true,
  //     trail: 400 / items.length,
  //     from: { opacity: 0, transform: "translateY(50%)" },
  //     enter: { opacity: 1, transform: "translateY(0%)" },
  //     leave: { opacity: 0, transform: "translateY(50%)" }
  //   }
  // );

  return (
    <>
      <Scene mouse={realMouse} factor={loadingStatus ? 1 : 0} />
      {!loadingStatus && (
        <div className="container" onMouseMove={onMouseMove}>
          <Header />
          <AboutMe />
          <GithubLink />
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ loadingStatus }) => ({ loadingStatus });

export default connect(mapStateToProps)(App);
