import customAxios from 'api/customAxios';
import { TextEditProps } from 'interfaces/Profile.interface';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StyledButton } from 'styles/StyledButton';
import Swal from 'sweetalert2';
import { editValidationCheck } from 'utils/profileEditValidation';

const TextEdit = ({
  setMemberData,
  member,
  validation,
  setValidation,
}: TextEditProps) => {
  const [nickname, setNickname] = useState<string | undefined>(member.nickname);
  const [content, setContent] = useState<string | undefined>(
    member.content ? member.content : ''
  );
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue:
      | React.Dispatch<React.SetStateAction<string | undefined>>
      | React.Dispatch<React.SetStateAction<string>>,
    type: string
  ) => {
    const { value } = event.target;
    setValue(value);
    if (type === 'nickname') {
      if (value !== member.nickname) {
        setValidation(cur => ({
          ...cur,
          nicknameUnique: false,
        }));
      } else if (value === member.nickname) {
        setValidation(cur => ({
          ...cur,
          nicknameUnique: true,
        }));
      }
    }
  };

  const handleUniqueCheck = async () => {
    await customAxios
      .post('/members/nickname', { nickname })
      .then(() => {
        Swal.fire({
          icon: 'success',
          text: '사용 가능한 닉네임입니다',
        });
        setValidation(cur => ({
          ...cur,
          nicknameUnique: true,
        }));
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          text: '중복된 닉네임입니다',
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
      content,
      password,
    }));
    setValidation(cur => ({
      ...cur,
      ...editValidationCheck({
        nickname,
        content,
        password,
        passwordCheck,
        memberNickname: member.nickname,
      }),
    }));
  }, [nickname, content, password, passwordCheck]);

  return (
    <TextEditWrapper>
      <NicknameEdit
        className={!validation.nicknameValid ? 'valid-false' : undefined}
      >
        <h1 className="edit-title nickname-title">닉네임</h1>
        <div className="nickname-input-wrapper">
          <input
            className="edit-input nickname-input"
            type="text"
            value={nickname}
            onChange={event => handleChange(event, setNickname, 'nickname')}
          />
          <UniqueCheckButton onClick={handleUniqueCheck}>
            중복확인
          </UniqueCheckButton>
        </div>
        {!validation.nicknameValid && (
          <ValidMessage>2글자 이상 10글자 이하로 입력해주세요.</ValidMessage>
        )}
      </NicknameEdit>
      <ContentEdit
        className={
          !validation.contentValid && content?.length !== 0
            ? 'valid-false'
            : undefined
        }
      >
        <div className="content-title-wrapper">
          <h1 className="edit-title">자기소개</h1>
          <span
            className={`content-length ${
              !validation.contentValid && content?.length !== 0
                ? 'over-length'
                : undefined
            }`}
          >
            ({content?.length}/100)
          </span>
        </div>
        <textarea
          className="edit-input edit-textarea"
          value={content}
          onChange={event => handleChange(event, setContent, 'content')}
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
            className="edit-input"
            type="password"
            value={password}
            onChange={event => handleChange(event, setPassword, 'password')}
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
            className="edit-input"
            type="password"
            value={passwordCheck}
            onChange={event =>
              handleChange(event, setPasswordCheck, 'passwordCheck')
            }
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

  .edit-input {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 1rem;
    border-radius: 30px;
    border: 1px solid #888;
    padding: 5px 10px;
    :focus {
      :focus {
        outline: none;
        box-shadow: 0px 0px 5px rgba(0, 255, 255, 0.7);
      }
    }
  }
  .edit-title {
    margin-bottom: 5px;
  }
  .valid-false {
    .edit-input {
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
  .nickname-input-wrapper {
    display: flex;
    gap: 10px;
  }
  .nickname-input {
    width: calc(100% - 100px);
  }
`;

const UniqueCheckButton = styled(StyledButton)`
  width: 90px;
  padding: 5px;
  border-radius: 20px;
  background-color: #666;
  font-size: 0.9rem;
`;

const ContentEdit = styled.div`
  width: 100%;
  .content-title-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .content-length {
      color: #333;
      font-size: 0.9rem;
    }
    .over-length {
      color: red;
    }
  }
  .edit-textarea {
    resize: none;
    border-radius: 10px;
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
