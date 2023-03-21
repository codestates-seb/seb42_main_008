import customAxios from 'api/customAxios';
import { ModalBG, ModalContent } from 'components/Profile/ModalStyles';
import { SearchOption } from 'interfaces/ContentList.interface';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userInfo } from 'states/userState';
import styled from 'styled-components';
import { StyledButton } from 'styles/StyledButton';
import Swal from 'sweetalert2';
import ModalScrollDisable from 'utils/ModalScrollDisable';

interface Props {
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const GenderSelect = ({ setIsShowModal }: Props) => {
  const [gender, setGender] = useState<SearchOption>({
    value: '',
    field: '',
  });
  const [loginUser, setLoginUser] = useRecoilState(userInfo);

  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === 'male') {
      setGender({ value, field: '남성' });
    } else {
      setGender({ value, field: '여성' });
    }
  };

  const handleSubmitClick = () => {
    if (gender.value === '') {
      Swal.fire({
        icon: 'error',
        title: '성별을 선택해주세요!',
        text: '아무것도 선택되지 않았습니다. 다시 확인해 주세요!',
      });
      return;
    }
    Swal.fire({
      title: `${gender.field}을 선택하신게 맞나요?`,
      text: '성별은 한번 등록 후 다시 수정할 수 없습니다!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        await customAxios
          .patch(`/members/${loginUser.memberId}`, {
            gender: gender.value,
          })
          .then(() => {
            setIsShowModal(false);
            setLoginUser({
              ...loginUser,
              gender: gender.value,
            });
          });
      }
    });
  };

  return (
    <>
      <ModalScrollDisable />
      <ModalBG></ModalBG>
      <SelectModalContent>
        <div className="modal-title-wrapper">
          <h1 className="modal-title">🎉 가입을 환영합니다! 🎉</h1>
        </div>
        <p className="modal-desc">
          더 나은 동행자찾기 경험을 위해 성별을 선택해주세요!
        </p>
        <GenderSelectList>
          <GenderSelectItem>
            <input
              id="male"
              type="radio"
              value="male"
              name="gender"
              onChange={handleChangeGender}
            />
            <span>남성</span>
          </GenderSelectItem>
          <GenderSelectItem>
            <input
              id="female"
              type="radio"
              value="female"
              name="gender"
              onChange={handleChangeGender}
            />
            <span>여성</span>
          </GenderSelectItem>
        </GenderSelectList>
        <SubmitButton onClick={handleSubmitClick}>선택 완료</SubmitButton>
      </SelectModalContent>
    </>
  );
};

const SelectModalContent = styled(ModalContent)`
  height: fit-content;
  padding: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .modal-title-wrapper {
    padding: 0;
    margin-bottom: 10px;
  }
  .modal-desc {
    width: 100%;
  }

  @media screen and (max-width: 576px) {
    .modal-title {
      font-size: 1.3rem;
    }
    .modal-desc {
      font-size: 0.9rem;
    }
  }
`;

const GenderSelectList = styled.fieldset`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  margin: 20px 0;
  background-color: #ddd;
  border-radius: 10px;
  border: none;
`;

const GenderSelectItem = styled.label`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #222;
  font-size: 1.1rem;
  transition: 0.3s;
  font-weight: 800;

  :has([type='radio']:checked) {
    background-color: #feb35c;
    color: #fff;
  }
  [type='radio'] {
    vertical-align: middle;
    appearance: none;
    border: max(2px, 0.1em) solid gray;
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;
    transition: border 0.3s ease-in-out;
    background-color: #fff;
  }
  [type='radio']:checked {
    border: 5px solid #5d62a0;
  }
  [type='radio']:hover {
    box-shadow: 0 0 0 max(4px, 3px) lightgray;
    cursor: pointer;
  }
`;

const SubmitButton = styled(StyledButton)`
  font-size: 1rem;
`;

export default GenderSelect;
