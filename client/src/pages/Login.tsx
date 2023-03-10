import { FcGoogle } from 'react-icons/fc';

import styled from 'styled-components';

const Login = () => {
  return (
    <Container>
      <h1>PartyPeople</h1>
      <LoginBox>
        <h2>로그인</h2>
        <form>
          <div className="group">
            <label htmlFor="email">이메일</label>
            <input type="text" id="email"></input>
          </div>
          <div className="group">
            <label htmlFor="pw">비밀번호</label>
            <input type="text" id="pw"></input>
          </div>
          <button type="submit">로그인</button>
        </form>
        <OauthLoginBox>
          <div>---- OR ----</div>
          <div>
            <FcGoogle />
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
  height: 100vh;
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
  button {
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
`;
