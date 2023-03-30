import customAxios from 'api/customAxios';
import LogoutMenu from 'components/Header/LogoutMenu';
import Menu from 'components/Header/Menu';
import NoteModal from 'components/MessageModal/NoteModal';
import { useEffect, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, userInfo } from 'states/userState';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Header = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const navigate = useNavigate();
  //멤버아이디
  const UserInfo = useRecoilValue(userInfo);
  const memberId = UserInfo.memberId;
  const handleLogout = async () => {
    Swal.fire({
      title: '로그아웃 하시겠습니까??',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네, 로그아웃 할게요',
      cancelButtonText: '아니요',
    }).then(async result => {
      if (result.isConfirmed) {
        customAxios
          .post(`/members/logout`)
          .then(() => {
            Swal.fire('Logout!', '로그아웃 되었어요!', 'success');
            localStorage.clear();
            navigate('/');
            setIsLogin(false);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };
  //쪽지 모달
  const [noteModal, setNoteModal] = useState(false);
  const [animationMode, setAnimationMode] = useState(false);
  const NoteHandler = () => {
    setNoteModal(!noteModal);
    setAnimationMode(true);
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
    if (isLogin === true) {
      customAxios
        .get(`/messages?memberId=${memberId}`)
        .then(response => {
          setNotes(response.data.data);
        })
        .catch(error => console.log(error));
    }
  }, [memberId]);

  // 안읽은 쪽지 개수확인
  const [notRead, setNotRead] = useState(0);

  useEffect(() => {
    if (isLogin === true) {
      const eventSource = new EventSource(
        `${process.env.REACT_APP_SERVER}/messages/not-read/${memberId}`
      );
      eventSource.addEventListener('notReadCount', event => {
        const data = JSON.parse(event.data);
        setNotRead(data.data.notReadCount);
      });
      eventSource.onerror = () => {
        if (eventSource.readyState === EventSource.CLOSED) {
          eventSource.close();
        }
      };
    }
  }, [notes, isLogin]);

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
          <NoteModal
            setNoteModal={setNoteModal}
            animationMode={animationMode}
            setAnimationMode={setAnimationMode}
          />
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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  .overlay {
    position: fixed;
    top: 60px;
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
    font-size: 2.1rem;
    font-weight: bold;
    font-family: 'Lobster', cursive;
    position: relative;
    bottom: 2px;
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
