import customAxios from 'api/customAxios';
import { MemberBox } from 'components/Login/MemberStyled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginState, userInfo } from 'states/userState';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { setCookie } from 'utils/userCookies';
import SocialLogin from 'components/Login/SocialLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const setUser = useSetRecoilState(userInfo);

  const navigate = useNavigate();

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangePw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmtiLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    customAxios
      .post(`/members/login`, {
        email: email.trim(),
        password: password.trim(),
      })
      .then(res => {
        setCookie('accessToken', res.headers.authorization, {
          path: '/',
        });
        setCookie('refreshToken', res.headers.refresh, {});
        const decodeToken = res.headers.authorization
          .split(' ')[1]
          .split('.')[1];
        return JSON.parse(decodeURIComponent(escape(window.atob(decodeToken))));
      })
      .then(res => {
        setUser(res);
        setIsLogin(!isLogin);
        navigate('/');
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          text: '양식을 다시 확인해주세요',
        });
        console.log(error);
      });
  };

  return (
    <Container>
      <h1>PartyPeople</h1>
      <LoginBox>
        <h2>로그인</h2>
        <form onSubmit={handleSubmtiLogin}>
          <div className="group">
            <label htmlFor="email">이메일</label>
            <input type="text" id="email" onChange={handleChangeEmail}></input>
          </div>
          <div className="group">
            <label htmlFor="pw">비밀번호</label>
            <input type="password" id="pw" onChange={handleChangePw}></input>
          </div>
          <button id="btn-login">로그인</button>
        </form>
        <OauthLoginBox>
          <div className="divider">
            <hr />
            <span>OR</span>
            <hr />
          </div>
          <SocialLogin />
        </OauthLoginBox>
      </LoginBox>
    </Container>
  );
};

export default Login;

const Container = styled.main`
  background-color: #f6f6f6;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    margin-bottom: 25px;
    color: #5d62a0;
  }
`;
const LoginBox = styled(MemberBox)`
  .group {
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
  }
  label {
    color: #777777;
    font-size: 15px;
  }
  input {
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid #888888;
    padding: 5px;
    &:focus {
      outline: none;
    }
  }
  #btn-login {
    width: 100%;
    color: white;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
    border-radius: 5px;
    background-color: #feb35c;
    transition: all 0.2s ease 0s;
    border: none;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    &:hover {
      color: black;
      background-color: white;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
    }
    &:active {
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
      position: relative;
      top: 2px;
    }
  }
`;
const OauthLoginBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .divider {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 1px;
    margin: 20px;
    span {
      color: #888888;
      font-weight: 600;
      margin: 0px 20px;
    }
    hr {
      width: 100%;
      border: none;
      height: 1px;
      background-color: #888888;
    }
  }
  .btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  #btn-google {
    cursor: pointer;
    background: white;
    border: 0px white;
    width: 40px;
    height: 40px;
    border-radius: 100%;
  }
`;
