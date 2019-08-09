import React from "react";
import { useSpring, animated } from "react-spring";
import { VIEW_ABOUT_ME } from "./redux/actions";
import { connect } from "react-redux";
import styled from "styled-components";

const FrontLine = styled.div`
  font-weight: 600;
  font-size: 18;
  margin-bottom: 2rem;
`;

const AboutMe = ({ currentView }) => {
  const { opacity } = useSpring({
    opacity: currentView === VIEW_ABOUT_ME ? 1 : 0
  });

  return (
    <animated.div className="about-me" style={{ opacity }}>
      <FrontLine>In Progress..</FrontLine>
    </animated.div>
  );
};

const mapStateToProps = currentView => ({ currentView });

export default connect(mapStateToProps)(AboutMe);
