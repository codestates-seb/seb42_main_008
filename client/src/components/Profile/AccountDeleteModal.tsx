import customAxios from 'api/customAxios';
import { AccountDeleteModalProps } from 'interfaces/Profile.interface';
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import ModalScrollDisable from 'utils/ModalScrollDisable';
import { CloseButton, ModalBG, ModalContent } from './ModalStyles';

const AccountDeleteModal = ({
  member,
  setIsShowDeleteModal,
}: AccountDeleteModalProps) => {
  const [password, setPassword] = useState<string>('');

  const handleModalClose = () => {
    setIsShowDeleteModal(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleSubmitClick = () => {
    if (password === '') {
      Swal.fire({
        icon: 'error',
        text: '비밀번호를 입력해주세요!',
      });
      return;
    }

    handleModalClose();
    Swal.fire({
      title: '정말 탈퇴하시겠습니까?',
      text: '계정정보는 탈퇴 후 되돌릴 수 없습니다!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: '탈퇴하기',
      cancelButtonText: '취소',
      reverseButtons: true,
    }).then(result => {
      if (result.isConfirmed) {
        requestDeleteAccount();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', '취소되었습니다 :)', 'info');
      }
    });
  };

  const requestDeleteAccount = async () => {
    await customAxios
      .delete(`/members/${member.memberId}`, {
        data: {
          password,
        },
      })
      .then(resp => {
        console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <ModalScrollDisable />
      <ModalBG onClick={handleModalClose}></ModalBG>
      <DeleteModalContent>
        <div>
          <h1>비밀번호 확인</h1>
          <CloseButton onClick={handleModalClose}>
            <IoMdClose />
          </CloseButton>
        </div>
        <p>탈퇴하시려면 현재 계정 비밀번호를 입력해주세요.</p>
        <PasswordInput
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <SubmitButton onClick={handleSubmitClick}>확인</SubmitButton>
      </DeleteModalContent>
    </>
  );
};

const DeleteModalContent = styled(ModalContent)`
  width: 450px;
  height: fit-content;
  padding: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;

  > div {
    padding: 0;
    margin-bottom: 10px;
  }
  > p {
    width: 100%;
    color: #555;
  }

  @media screen and (max-width: 576px) {
    h1 {
      font-size: 1.3rem;
    }
    > p {
      font-size: 0.9rem;
    }
  }
`;

const PasswordInput = styled.input`
  width: 90%;
  border-radius: 30px;
  font-size: 1rem;
  border: 1px solid #222;
  padding: 7px 15px;
  margin: 10% 5%;

  :focus {
    outline: none;
    box-shadow: 0px 0px 10px rgba(0, 255, 255, 0.3);
  }
`;

const SubmitButton = styled.button`
  width: 20%;
  font-size: 1.1rem;
  border-radius: 30px;
  padding: 5px;
  background-color: #feb35c;
  color: #fff;
  font-weight: 800;
  border: none;
  cursor: pointer;
`;

export default AccountDeleteModal;
