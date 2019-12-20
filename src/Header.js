import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { SET_VIEW, VIEW_ABOUT_ME, VIEW_HOME } from "./redux/actions";

const Nav = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  position: absolute;
  top: 0;
  z-index: 999;
`;

const Logo = styled.span`
  background-color: #fff;
  color: #000;
  display: flex;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
`;

const Link = styled.a`
  padding: 1.5rem;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
`;

const Item = styled.span`
  padding: 1.5rem;
  cursor: pointer;
  text-transform: uppercase;
`;

const Header = React.memo(({ setView }) => {
  const dispatch = useDispatch();

  return (
    <Nav>
      <Logo
        onClick={() => dispatch({ type: SET_VIEW, view: VIEW_HOME })}
        className="logo"
      >
        gr
      </Logo>
      <div>
        <Link href="mailto:gonzarodriguezt@icloud.com">contact</Link>
      </div>
    </Nav>
  );
});

//<Item onClick={() => dispatch({ type: SET_VIEW, view: VIEW_ABOUT_ME })}>
//about me
//</Item>

export default Header;
