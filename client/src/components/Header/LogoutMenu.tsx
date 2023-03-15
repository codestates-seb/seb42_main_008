import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  setIsShowMenu: (newValue: boolean) => void;
};
const LogoutMenu = ({ setIsShowMenu }: Props) => {
  const handleMenuEnter = () => {
    setIsShowMenu(true);
  };
  const handleMenuLeave = () => {
    setIsShowMenu(false);
  };
  return (
    <LogoutMenuBox
      onMouseEnter={handleMenuEnter}
      onMouseLeave={handleMenuLeave}
    >
      <Link to="login">Login</Link>
      <Link to="signup">SignUp</Link>
    </LogoutMenuBox>
  );
};

export default LogoutMenu;

const LogoutMenuBox = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  color: black;
  top: 60px;
  right: 0;
  width: 150px;
  height: 150px;
  position: fixed;
  border-bottom: 1px solid #5d62a0;
  border-left: 1px solid #5d62a0;
  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: black;
    border-bottom: 1px solid #5d62a0;
    &:hover {
      background-color: #feb35c;
      color: white;
    }
  }
`;
