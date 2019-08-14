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
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    setRealMouse([x - window.innerWidth / 2, y - window.innerHeight / 2]);
  }, []);

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
