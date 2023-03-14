import NoteModal from 'components/NoteModal/NoteModal';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaEnvelope } from 'react-icons/fa';
import { RiLogoutBoxRLine } from 'react-icons/ri';

const Header = () => {
  // 로그인 상태 임시
  const [isLogin, setIsLogin] = useState(false);
  const LoginHandler = () => {
    setIsLogin(!isLogin);
  };
  //쪽지 모달
  const [noteModal, setNoteModal] = useState(false);
  const NoteHandler = () => {
    setNoteModal(!noteModal);
  };

  return (
    <HeaderBox>
      <div className="header-left">
        <Link to="/" className="logo">
          Party People
        </Link>
        <Link to="/continents">파티 구하기</Link>
        <button onClick={LoginHandler}>임시 로그인</button>
      </div>

      {isLogin ? (
        <LogoutNav>
          <Link to="login">Login</Link>
          <Link to="signup">SignUp</Link>
        </LogoutNav>
      ) : (
        <LoginNav>
          <Link to="/:memberId/profile">Profile</Link>
          <div className="nav-icon">
            <div className="message-icon">
              <FaEnvelope onClick={NoteHandler} size="2rem" cursor="pointer" />
              <div className="message-alert">1</div>
            </div>
            <RiLogoutBoxRLine
              onClick={LoginHandler}
              size="2rem"
              cursor="pointer"
            />
          </div>
        </LoginNav>
      )}

      {noteModal ? (
        <div className="overlay">
          <NoteModal noteModal={noteModal} setNoteModal={setNoteModal} />
        </div>
      ) : null}
    </HeaderBox>
  );
};

export default Header;

const HeaderBox = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  top: 0;
  background-color: #5d62a0;
  color: white;
  justify-content: space-between;
  padding: 10px;
  position: fixed;
  z-index: 999;
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
  }
  .header-left {
    display: flex;
    justify-content: space-around;
    width: 40%;
    height: 100%;
  }
  .logo {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const LogoutNav = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 40%;
`;

const LoginNav = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 40%;
  .nav-icon {
    display: flex;
    width: 30%;
    justify-content: space-around;
    align-items: center;
  }
  .message-icon {
    display: flex;
    align-items: center;
  }
  .message-alert {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d9506a;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-left: 5px;
  }
`;
