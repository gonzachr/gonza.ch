import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setView, Views } from "./redux/actions";

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

const Item = styled.span`
  padding: 1.5rem;
  cursor: pointer;
`;

const Header = ({ setView, currentView }) => {
  const { VIEW_ABOUT_ME, VIEW_CONTACT, VIEW_HOME } = Views;

  return (
    <Nav>
      <Logo
        onClick={() => setView({ currentView, newView: VIEW_HOME })}
        className="logo"
      >
        gr
      </Logo>
      <div>
        <Item onClick={() => setView({ currentView, newView: VIEW_ABOUT_ME })}>
          about me
        </Item>
        <Item onClick={() => setView({ currentView, newView: VIEW_CONTACT })}>
          contact
        </Item>
      </div>
    </Nav>
  );
};

const mapStateToProps = currentView => ({ currentView });
const mapDispatchToProps = { setView };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
