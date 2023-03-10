import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [pwcheck, setPwcheck] = useState('');
  const navigate = useNavigate();

  // 회원가입에 성공할 시 로그인 페이지로 이동 (추후 조건 추가하기)
  // const handleClick = () => {
  //   navigate('/login');
  // };

  const handleClick = () => {
    if (email === '') {
      Swal.fire('', '이메일을 입력해주세요!');
    } else if (nickname === '') {
      Swal.fire('', '닉네임을 입력해주세요!');
    } else if (password === '') {
      Swal.fire('', '비밀번호를 입력해주세요!');
    } else if (pwcheck === '') {
      Swal.fire('', '비밀번호 확인을 해주세요!');
    } else {
      Swal.fire('Congratulation!', '가입을 축하합니다.');
      navigate('/login');
    }
  };

  return (
    <Container>
      <SignUpBox>
        <h2>회원가입</h2>
        <form>
          <div className="group">
            <label htmlFor="email">이메일</label>
            <input
              type="text"
              id="email"
              onChange={event => setEmail(event.target.value)}
            ></input>
          </div>
          <div className="group">
            <div className="wrapper">
              <label htmlFor="nickname">닉네임</label>
              <button id="nick-check">중복확인</button>
            </div>
            <input
              type="text"
              id="nickname"
              onChange={event => setNickname(event.target.value)}
            ></input>
          </div>
          <div className="group">
            <label htmlFor="pw">비밀번호</label>
            <input
              type="password"
              id="pw"
              onChange={event => setPassword(event.target.value)}
            ></input>
          </div>
          <div className="group">
            <label htmlFor="pw-check">비밀번호 확인</label>
            <input
              type="password"
              id="pw-check"
              onChange={event => setPwcheck(event.target.value)}
            ></input>
          </div>
        </form>
        <button id="join" type="submit" onClick={handleClick}>
          가입하기
        </button>
      </SignUpBox>
    </Container>
  );
};

export default SignUp;

const Container = styled.main`
  background-color: #f6f6f6;
  width: 100vw;
  height: 100vh;
`;
const SignUpBox = styled.section`
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
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #nick-check {
    background-color: #feb35c;
    color: white;
    border: none;
    transition: all 0.2s ease 0s;
    width: 80px;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      color: black;
      background-color: white;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
    }
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
  #join {
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

/* TODO:
1. 기본 구조 * 
2. 유효성 검사
2-1. 전부 value 가 없을 경우
2-2. 이메일
2-2-1. 이메일이 비어있는 경우
2-2-2. 이미 가입된 이메일인 경우
2-2-3. 이메일이 올바르지 않은 형식일 경우
2-3. 닉네임
2-3-1. 닉네임이 비어있는 경우
2-3-2. 중복된 닉네임인 경우
2-4. 비밀번호
2-4-1. 비밀번호가 비어있을 경우
2-4-2. 비밀번호가 올바르지 않은 경우
2-5. 비밀번호 확인
2-5-1. 비밀번호 확인란이 비어있는 경우
2-5-1. 처음 입력한 비밀번호와 일치하지 않는 경우
 */
