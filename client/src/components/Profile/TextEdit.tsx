import styled from 'styled-components';

const TextEdit = () => {
  return (
    <TextEditWrapper>
      <NicknameEdit>
        <h1>닉네임</h1>
        <div>
          <input type="text" />
          <div>중복확인</div>
        </div>
      </NicknameEdit>
      <GenderEdit>
        <h1>성별</h1>
        <ul>
          <li>남성</li>
          <li>여성</li>
        </ul>
      </GenderEdit>
      <div>
        <h1>자기소개</h1>
        <textarea />
      </div>
      <PasswordEdit>
        <h1>비밀번호</h1>
        <input type="password" />
        <h1>비밀번호 확인</h1>
        <input type="password" />
      </PasswordEdit>
    </TextEditWrapper>
  );
};

const TextEditWrapper = styled.section`
  width: 75%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  input {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 1rem;
    padding: 5px 10px;
    border-radius: 30px;
    border: 1px solid #888;
  }
  textarea {
    width: 100%;
    resize: none;
    border-radius: 10px;
    border: 1px solid #888;
    height: 100px;
  }
  h1 {
    margin-bottom: 5px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 20px 0;
  }
`;

const NicknameEdit = styled.div`
  width: 100%;
  > div {
    display: flex;
    gap: 10px;
    > input {
      width: calc(100% - 100px);
    }
    > div {
      width: 90px;
      padding: 5px;
      border-radius: 20px;
      background-color: #666;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
    }
  }
`;

const GenderEdit = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > ul {
    width: 40%;
    display: flex;
    > li {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border: 1px solid #feb35c;
      padding: 5px 10px;
      cursor: pointer;
      :first-of-type {
        border-radius: 30px 0px 0px 30px;
      }
      :last-of-type {
        border-radius: 0px 30px 30px 0px;
        border-left: none;
      }
      :hover {
        filter: brightness(0.9);
      }
      .active {
        background-color: #feb35c;
        color: #fff;
        :hover {
          filter: brightness(1);
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    > ul {
      width: 80%;
    }
  }
`;

const PasswordEdit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default TextEdit;
