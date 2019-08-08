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
      <FrontLine>
        Hola! I'm Gonzalo Rodríguez, a 20 years old self-taught Frontend
        Developer.
      </FrontLine>
      <div>
        Since my first game in Visual Basic (don't judge me) i never stop using
        and learning from my computer, i may found a passion. Regards my
        professional career, i have experience building{" "}
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
      </div>
    </animated.div>
  );
};

const mapStateToProps = currentView => ({ currentView });

export default connect(mapStateToProps)(AboutMe);
