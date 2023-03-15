import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  setIsShowMenu: (newValue: boolean) => void;
  setIsLogin: (newValue: boolean) => void;
};
const Menu = ({ setIsShowMenu, setIsLogin }: Props) => {
  const handleMenuEnter = () => {
    setIsShowMenu(true);
  };
  const handleMenuLeave = () => {
    setIsShowMenu(false);
  };
  const handleLogout = () => {
    window.confirm('로그아웃 하시겠습니까?');
    setIsLogin(true);
  };

  return (
    <MenuBox onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave}>
      <Link to="/:memberId/profile">Profile</Link>
      <Link to="/continents">파티 구하기</Link>
      <div onClick={handleLogout}>Logout</div>
    </MenuBox>
  );
};

export default Menu;

const MenuBox = styled.nav`
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
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    &:hover {
      background-color: #feb35c;
      color: white;
    }
  }
`;
