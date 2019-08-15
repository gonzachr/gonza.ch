import React, { useCallback, useRef } from "react";
import Scene from "./Scene";
import Header from "./Header";
import AboutMe from "./AboutMe";
import github from "./assets/github.png";
import styled from "styled-components";
import { useSelector } from "react-redux";

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

const GithubLink = () => (
  <Link href="https://github.com/gonzarodriguezt" target="_blank">
    <GitHub src={github} />
  </Link>
);

const App = () => {
  const loading = useSelector(state => state.loading);
  const realMouse = useRef([0, 0]);
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    realMouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2];
  }, []);

  return (
    <>
      <Scene mouse={realMouse} factor={loading ? 1 : 0} />
      {!loading && (
        <div className="container" onMouseMove={onMouseMove}>
          <Header />
          <AboutMe />
          <GithubLink />
        </div>
      )}
    </>
  );
};

export default App;
