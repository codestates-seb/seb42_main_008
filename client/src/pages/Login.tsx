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
          <button id="btn-login" type="submit">
            로그인
          </button>
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

const Container = styled.div`
  background-color: #f6f6f6;
  width: 100vw;
  height: calc(100vh - 60px);
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
