import customAxios from 'api/customAxios';
import { TextEditProps } from 'interfaces/Profile.interface';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { editValidationCheck } from 'utils/profileEditValidation';

const TextEdit = ({
  setMemberData,
  member,
  validation,
  setValidation,
}: TextEditProps) => {
  const [nickname, setNickname] = useState<string | undefined>(member.nickname);
  const [gender, setGender] = useState<string | undefined>(
    member.gender ? member.gender : undefined
  );
  const [content, setContent] = useState<string | undefined>(
    member.content ? member.content : ''
  );
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue:
      | React.Dispatch<React.SetStateAction<string | undefined>>
      | React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { value } = event.target;
    setValue(value);
  };

  const handleTabClick = (genderStr: string) => {
    setGender(genderStr);
  };

  const handleUniqueCheck = async () => {
    await customAxios
      .post('/members/nickname', { nickname })
      .then(() => {
        toast.success('사용 가능한 닉네임입니다.');
        setValidation(cur => ({
          ...cur,
          nicknameUnique: true,
        }));
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: '중복된 닉네임입니다',
          text: '다른 닉네임을 입력해 주세요',
        });
        setValidation(cur => ({
          ...cur,
          nicknameUnique: false,
        }));
      });
  };

  useEffect(() => {
    setMemberData((cur: object) => ({
      ...cur,
      nickname,
      gender,
      content,
      password,
    }));
    setValidation(cur => ({
      ...cur,
      ...editValidationCheck({ nickname, content, password, passwordCheck }),
    }));
  }, [nickname, gender, content, password, passwordCheck]);

  return (
    <TextEditWrapper>
      <NicknameEdit
        className={!validation.nicknameValid ? 'valid-false' : undefined}
      >
        <h1>닉네임</h1>
        <div>
          <input
            type="text"
            value={nickname}
            onChange={event => handleChange(event, setNickname)}
          />
          <div onClick={handleUniqueCheck}>중복확인</div>
        </div>
        {!validation.nicknameValid && (
          <ValidMessage>2글자 이상 10글자 미만으로 입력해주세요.</ValidMessage>
        )}
      </NicknameEdit>
      <GenderEdit>
        <h1>성별</h1>
        <ul>
          <li
            className={gender === 'male' ? 'active' : undefined}
            onClick={() => handleTabClick('male')}
          >
            남성
          </li>
          <li
            className={gender === 'female' ? 'active' : undefined}
            onClick={() => handleTabClick('female')}
          >
            여성
          </li>
        </ul>
      </GenderEdit>
      <ContentEdit
        className={
          !validation.contentValid && content?.length !== 0
            ? 'valid-false'
            : undefined
        }
      >
        <div>
          <h1>자기소개</h1>
          <span
            className={
              !validation.contentValid && content?.length !== 0
                ? 'over-length'
                : undefined
            }
          >
            ({content?.length}/100)
          </span>
        </div>
        <textarea
          value={content}
          onChange={event => handleChange(event, setContent)}
        />
        {!validation.contentValid && content?.length !== 0 && (
          <ValidMessage>
            자기소개는 100글자 이하로 작성해야 합니다.
          </ValidMessage>
        )}
      </ContentEdit>
      <PasswordEdit>
        <h1>비밀번호 수정</h1>
        <section
          className={!validation.passwordValid ? 'valid-false' : undefined}
        >
          <input
            type="password"
            value={password}
            onChange={event => handleChange(event, setPassword)}
          />
          {!validation.passwordValid && (
            <ValidMessage>
              1자 이상의 숫자와 1자 이상의 영문자 조합으로 8자리 이상
              입력해주세요.
            </ValidMessage>
          )}
        </section>
        <h1>비밀번호 확인</h1>
        <section
          className={!validation.passwordCheckValid ? 'valid-false' : undefined}
        >
          <input
            type="password"
            value={passwordCheck}
            onChange={event => handleChange(event, setPasswordCheck)}
          />
          {!validation.passwordCheckValid && (
            <ValidMessage>비밀번호가 같지 않습니다!</ValidMessage>
          )}
        </section>
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
    border-radius: 30px;
    border: 1px solid #888;
  }
  input,
  textarea {
    padding: 5px 10px;
    :focus {
      :focus {
        outline: none;
        box-shadow: 0px 0px 5px rgba(0, 255, 255, 0.7);
      }
    }
  }
  h1 {
    margin-bottom: 5px;
  }

  .valid-false {
    input,
    textarea {
      border: 1px solid red;
      :focus {
        outline: none;
        border: 1px solid red;
        box-shadow: 0px 0px 5px rgba(255, 0, 0, 0.8);
      }
    }
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
      transition: 0.3s;
      cursor: pointer;

      :hover,
      :active {
        background-color: #fff;
        color: #222;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        transition: 0.3s;
      }
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
    }
    .active {
      background-color: #feb35c;
      color: #fff;
      :hover {
        filter: brightness(1);
      }
    }
  }
  @media screen and (max-width: 768px) {
    > ul {
      width: 80%;
    }
  }
`;

const ContentEdit = styled.div`
  width: 100%;
  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    > span {
      color: #333;
      font-size: 0.9rem;
    }
    .over-length {
      color: red;
    }
  }
  textarea {
    width: 100%;
    resize: none;
    border-radius: 10px;
    border: 1px solid #888;
    height: 100px;
  }
`;

const PasswordEdit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ValidMessage = styled.p`
  font-size: 0.9rem;
  color: red;
  margin-left: 10px;
`;

export default TextEdit;
