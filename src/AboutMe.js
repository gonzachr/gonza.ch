import React, { useRef, useEffect, useState } from "react";
import { animated, useTransition, useChain } from "react-spring";
import { VIEW_ABOUT_ME } from "./redux/actions";
import { connect } from "react-redux";
import styled from "styled-components";
import { setTransRef } from "./redux/actions";
import items from "./data";

const FrontLine = styled.div`
  font-weight: 600;
  font-size: 18;
  margin-bottom: 2rem;
`;

const AboutMe = ({ currentView, currentRef, setTransRef }) => {
  const transRef = useRef();
  const transitions = useTransition(
    currentView === VIEW_ABOUT_ME ? items : [],
    item => item.key,
    {
      ref: transRef,
      unique: true,
      trail: 400 / items.length,
      from: { opacity: 0, transform: "translateY(50%)" },
      enter: { opacity: 1, transform: "translateY(0%)" },
      leave: { opacity: 0, transform: "translateY(50%)" }
    }
  );

  useEffect(() => {
    if (currentRef.transRef !== transRef) {
      setTransRef(transRef);
    }
  });

  return (
    <div className="about-me">
      {transitions.map(({ item, key, props }) => (
        <animated.p
          key={key}
          style={{ ...props, ...item.css }}
          dangerouslySetInnerHTML={item.text}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ currentView, currentRef }) => ({
  currentView,
  currentRef
});
const mapDispatchToProps = { setTransRef };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutMe);
