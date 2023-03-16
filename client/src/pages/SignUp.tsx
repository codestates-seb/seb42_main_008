import axios from 'axios';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [pwcheck, setPwcheck] = useState('');

  const [nicknameMessage, setNicknameMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [pwCheckMessage, setPwCheckMessage] = useState('');

  const [isNickname, setIsNickname] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPwCheck, setIsPwCheck] = useState(false);

  const navigate = useNavigate();
  // const url = process.env.REACT_APP_SERVER;
  const url = process.env.REACT_APP_TEST_SERVER;

  // 이메일 유효성 검사
  const handleChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = event.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage('이메일 형식이 올바르지 않습니다.');
        setIsEmail(false);
      } else {
        setEmailMessage('올바른 이메일 형식입니다.');
        setIsEmail(true);
      }
    },
    []
  );

  // const handleCheckEmail = () => {
  //   Swal.fire('', '추후 추가 예정입니다');
  // };

  // 닉네임 유효성 검사
  const handleChangeNickame = useCallback<
    (event: React.ChangeEvent<HTMLInputElement>) => void
  >(event => {
    setNickname(event.target.value);
    if (event.target.value.length < 2 || event.target.value.length > 10) {
      setNicknameMessage('2글자 이상 10글자 미만으로 입력해주세요.');
      setIsNickname(false);
    } else {
      setNicknameMessage('올바른 닉네임 형식입니다.');
      setIsNickname(true);
    }
  }, []);

  // 닉네임 중복확인 버튼
  const handleCheckNickname = async () => {
    await axios
      .post(`${url}/members/nickname`, {
        nickname,
      })
      .then(res => {
        if (res.status === 409) {
          console.log('중복된 닉네임입니다.');
          setIsNickname(false);
        } else {
          Swal.fire('', '사용가능한 닉네임 입니다.');
        }
      })
      .catch(error => console.log(error));
  };

  // 비밀번호 유효성 검사
  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = event.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          '1자 이상의 숫자와 1자 이상의 영문자 조합으로 8자리 이상 입력해주세요.'
        );
        setIsPassword(false);
      } else {
        setPasswordMessage('올바른 비밀번호 형식입니다.');
        setIsPassword(true);
      }
    },
    []
  );

  // 비밀번호 확인 유효성 검사
  const handleChangePwCheck = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = event.target.value;
      setPwcheck(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPwCheckMessage('비밀번호가 일치합니다.');
        setIsPwCheck(true);
      } else {
        setPwCheckMessage('비밀번호가 다릅니다.');
        setIsPwCheck(false);
      }
    },
    [password]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      isNickname === false ||
      isEmail === false ||
      isPassword === false ||
      isPwCheck === false
    ) {
      Swal.fire('', '양식을 다시 확인해주세요');
    } else {
      // 회원가입에 성공할 시 로그인 페이지로 이동 (추후 조건 추가하기)
      await axios
        .post(`${url}/members`, {
          email,
          nickname,
          password,
        })
        .then(() => {
          console.log(email, nickname, password);
          Swal.fire('Congratulation!', '가입을 축하합니다.'),
            navigate('/login');
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <Container>
      <SignUpBox>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="group">
            <div className="wrapper">
              <label htmlFor="nickname">이메일</label>
              {/* <div className="btn-check">중복확인</div> */}
            </div>
            <input type="text" id="email" onChange={handleChangeEmail}></input>
            {email.length > 0 && (
              <span className={`message ${isEmail ? 'success' : 'error'}`}>
                {emailMessage}
              </span>
            )}
          </div>
          <div className="group">
            <div className="wrapper">
              <label htmlFor="nickname">닉네임</label>
              <div className="btn-check" onClick={handleCheckNickname}>
                중복확인
              </div>
            </div>
            <input
              type="text"
              id="nickname"
              onChange={handleChangeNickame}
            ></input>
            {nickname.length > 0 && (
              <span className={`message ${isNickname ? 'success' : 'error'}`}>
                {nicknameMessage}
              </span>
            )}
          </div>
          <div className="group">
            <label htmlFor="pw">비밀번호</label>
            <input
              type="password"
              id="pw"
              onChange={handleChangePassword}
            ></input>
            {password.length > 0 && (
              <span className={`message ${isPassword ? 'success' : 'error'}`}>
                {passwordMessage}
              </span>
            )}
          </div>
          <div className="group">
            <label htmlFor="pw-check">비밀번호 확인</label>
            <input
              type="password"
              id="pw-check"
              onChange={handleChangePwCheck}
            ></input>
            {pwcheck.length > 0 && (
              <span className={`message ${isPwCheck ? 'success' : 'error'}`}>
                {pwCheckMessage}
              </span>
            )}
          </div>
          <button id="join" type="submit">
            가입하기
          </button>
        </form>
      </SignUpBox>
    </Container>
  );
};

export default SignUp;

const Container = styled.main`
  background-color: #f6f6f6;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
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
    position: relative;
    .message {
      font-weight: 500;
      font-size: 0.7rem;
      line-height: 24px;
      letter-spacing: -1px;
      position: absolute;
      bottom: -20px;
      left: 0;
      &.success {
        color: #8f8c8b;
      }
      &.error {
        color: #ff2727;
      }
    }
  }
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btn-check {
    background-color: #feb35c;
    color: white;
    border: none;
    transition: all 0.2s ease 0s;
    width: 80px;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    font-size: 0.85rem;
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
2-1. 전부 value 가 없을 경우 *
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
3. axios 추가
 */
