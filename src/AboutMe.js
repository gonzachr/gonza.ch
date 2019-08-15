import React, { useRef, useEffect } from "react";
import { animated, useTransition } from "react-spring";
import { VIEW_ABOUT_ME } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { SET_TRANS_REF } from "./redux/actions";
import items from "./data";

const AboutMe = () => {
  const dispatch = useDispatch();
  const currentView = useSelector(state => state.currentView);
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
    dispatch({ type: SET_TRANS_REF, ref: transRef });
  }, [transRef, dispatch]);

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

export default AboutMe;
