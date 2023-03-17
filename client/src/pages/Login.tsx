import axios from 'axios';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState, userInfo, userToken } from 'states/userState';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [token, setToken] = useRecoilState(userToken);
  const [decodedToken, setDecodedToken] = useRecoilState(userInfo);

  // const userInfo = {
  //   roles: ['USER'],
  //   gender: '',
  //   nickname: '',
  //   memberStatus: '',
  //   email: '',
  //   memberId: 0,
  //   sub: '',
  //   iat: 0,
  //   exp: 0,
  // };

  const navigate = useNavigate();

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangePw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmtiLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_TEST_SERVER}/members/login`, {
        email,
        password,
      })
      .then(res => {
        setToken(res.headers.authorization.split(' ')[1].split('.')[1]);
        setIsLogin(!isLogin);
        console.log(isLogin);
        setDecodedToken(window.atob(token));
        console.log(token);
        console.log(decodedToken);
        navigate('/');
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          text: '입력해주세요',
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
          <div className="btn-wrapper">
            <button id="btn-google">
              <GoogleLogo />
            </button>
          </div>
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
const LoginBox = styled.section`
  background-color: white;
  width: 400px;
  padding: 50px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    margin-bottom: 25px;
  }
  form {
    width: 100%;
  }
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
const GoogleLogo = styled(FcGoogle)`
  width: 100%;
  height: 100%;
`;

/* TODO:
1. 기본 구조 * 
2. 유효성 검사
2-1. 둘 다 value 가 없을 경우
2-2. 이메일이 비어있을 경우
2-3. 이메일이 가입되지 않은 이메일인 경우
2-4. 이메일이 올바르지 않은 형식일 경우
2-5. 비밀번호가 비어있을 경우
2-6. 비밀번호가 가입되지 않은 비밀번호인 경우
2-7. 비밀번호가 올바르지 않은 경우
 */
