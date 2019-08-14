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
  // const refTemp = useRef();

  useEffect(() => {
    if (currentRef !== transRef) {
      setTransRef(transRef);
    }
  });

  // useChain(
  //   currentView === VIEW_ABOUT_ME
  //     ? [currentRef.springRef ? currentRef.springRef : refTemp, transRef]
  //     : [
  //         (transRef: refTemp),
  //         currentRef.springRef ? currentRef.springRef : refTemp
  //       ],
  //   [0, currentView === VIEW_ABOUT_ME ? 0.5 : 1]
  // );

  return (
    <div className="about-me">
      {transitions.map(({ item, key, props }) => (
        <animated.p
          key={key}
          style={{ ...props, ...item.css }}
          dangerouslySetInnerHTML={item.text}
        >
          {/* {item.text} */}
          {/* <FrontLine>
            Hola! I'm Gonzalo Rodríguez, a 20 years old self-taught Frontend
            Developer.
          </FrontLine>
          <div>
            Since my first game in Visual Basic (don't judge me) i never stop
            using and learning from my computer, i may found a passion. Regards
            my professional career, i have experience building{" "}
            <a
              target="blank"
              href="https://github.com/FundacionParaguaya/stoplight-web"
            >
              complex applications
            </a>{" "}
            , with a sense on{" "}
            <a
              target="blank"
              href="https://github.com/FundacionParaguaya/stoplight-web/pull/406"
            >
              engineering intuition
            </a>
            , and somewhat good{" "}
            <a
              target="blank"
              href="https://github.com/FundacionParaguaya/stoplight-web/pull/430"
            >
              communication skills
            </a>
            .
          </div> */}
        </animated.p>
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
