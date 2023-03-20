import NoteModal from 'components/NoteModal/NoteModal';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEnvelope } from 'react-icons/fa';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import Menu from 'components/Header/Menu';
import LogoutMenu from 'components/Header/LogoutMenu';
import { useRecoilValue } from 'recoil';
import { loginState, userInfo, userToken } from 'states/userState';
import axios from 'axios';
const Header = () => {
  const isLogin = useRecoilValue(loginState);
  const token = useRecoilValue(userToken);
  const navigate = useNavigate();
  //멤버아이디
  const UserInfo = useRecoilValue(userInfo);
  const memberId = UserInfo.memberId;
  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_TEST_SERVER}/members/logout`,
        null,
        {
          headers: { Authorization: token },
        }
      );
      localStorage.clear();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  //쪽지 모달
  const [noteModal, setNoteModal] = useState(false);
  const NoteHandler = () => {
    setNoteModal(!noteModal);
  };

  // 햄버거 메뉴 반응형
  const [isShowMenu, setIsShowMenu] = useState(false);
  const handleMenuEnter = () => {
    setIsShowMenu(true);
  };
  const handleMenuLeave = () => {
    setIsShowMenu(false);
  };

  // 쪽지 목록 불러오기
  const [notes, setNotes] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/messages?memberId=${memberId}`)
      .then(response => {
        setNotes(response.data.data);
      })
      .catch(error => console.log(error));
  }, []);
  console.log(notes);

  // 안읽은 쪽지 개수확인
  const [notRead, setNotRead] = useState();
  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_SERVER}/messages/not-read/${memberId}`
    );
    eventSource.addEventListener('notReadCount', event => {
      const data = JSON.parse(event.data);
      setNotRead(data.data.notReadCount);
    });
    eventSource.onerror = error => {
      console.log(error);
      eventSource.close();
    };
  }, [notes]);

  return (
    <HeaderBox>
      <div className="header-left">
        <Link to="/" className="logo">
          Party People
        </Link>
        <Link to="/continents" className="party-link">
          파티 구하기
        </Link>
      </div>

      {!isLogin ? (
        <LogoutNav>
          <Link to="login">Login</Link>
          <Link to="signup">SignUp</Link>
        </LogoutNav>
      ) : (
        <LoginNav>
          <Link to={`/${memberId}/profile`}>Profile</Link>
          <div className="nav-icon">
            <div className="message-icon">
              <FaEnvelope onClick={NoteHandler} cursor="pointer" />
              <div className="message-alert">{notRead}</div>
            </div>
            <RiLogoutBoxRLine onClick={handleLogout} cursor="pointer" />
          </div>
        </LoginNav>
      )}

      {noteModal ? (
        <div className="overlay">
          <NoteModal noteModal={noteModal} setNoteModal={setNoteModal} />
        </div>
      ) : null}
      <nav className="mobile-menu">
        {isLogin ? (
          <div className="envelope-alert">
            <FaEnvelope
              className="envelope"
              onClick={NoteHandler}
              cursor="pointer"
            />
            <div className="message-alert">{notRead}</div>
          </div>
        ) : null}

        <div
          className="burger-hover"
          onMouseEnter={handleMenuEnter}
          onMouseLeave={handleMenuLeave}
        >
          <GiHamburgerMenu className="burger-bar" />
        </div>
      </nav>
      {isShowMenu ? (
        isLogin ? (
          <Menu setIsShowMenu={setIsShowMenu} handleLogout={handleLogout} />
        ) : (
          <LogoutMenu setIsShowMenu={setIsShowMenu} />
        )
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

  .header-left {
    display: flex;
    justify-content: space-around;
    width: 50%;
    height: 100%;
    @media screen and (max-width: 768px) {
      width: 70%;
      justify-content: flex-start;
    }
    > a:first-child {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: white;
    }
  }
  .party-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .logo {
    font-size: 2rem;
    font-weight: bold;
  }

  .mobile-menu {
    display: none;

    @media screen and (max-width: 768px) {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 20%;
    }
  }
  .envelope-alert {
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
    @media screen and (max-width: 768px) {
      width: 15px;
      height: 15px;
      font-size: 0.5rem;
    }
  }
  .burger-hover {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 60px;
    width: 40px;
  }
  .burger-bar {
    width: 32px;
    height: 32px;
  }
  .envelope {
    width: 32px;
    height: 32px;
  }
`;

const LogoutNav = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 20%;
  @media screen and (max-width: 768px) {
    display: none;
  }
  > a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
  }
`;

const LoginNav = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 30%;
  @media screen and (max-width: 768px) {
    display: none;
  }

  > a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
  }
  .nav-icon {
    display: flex;
    width: 50%;
    justify-content: space-around;
    align-items: center;
    > svg {
      width: 32px;
      height: 32px;
    }
  }
  .message-icon {
    display: flex;
    align-items: center;
    > svg {
      width: 32px;
      height: 32px;
    }
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
