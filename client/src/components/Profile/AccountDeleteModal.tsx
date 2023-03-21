import customAxios from 'api/customAxios';
import { AccountDeleteModalProps } from 'interfaces/Profile.interface';
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState } from 'states/userState';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import ModalScrollDisable from 'utils/ModalScrollDisable';
import { CloseButton, ModalBG, ModalContent } from './ModalStyles';

const AccountDeleteModal = ({
  setIsShowDeleteModal,
}: AccountDeleteModalProps) => {
  const navigate = useNavigate();
  const { memberId } = useParams();
  const [password, setPassword] = useState<string>('');
  const setIsLogin = useSetRecoilState(loginState);

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
        setIsLogin(false);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', '취소되었습니다 :)', 'info');
      }
    });
  };

  const requestDeleteAccount = async () => {
    await customAxios
      .delete(`/members/${memberId}`, {
        data: {
          password,
        },
      })
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        if (error.response.status === 403) {
          Swal.fire({
            icon: 'error',
            title: '탈퇴가 취소되었습니다',
            text: '비밀번호가 틀립니다! 다시 시도해주세요.',
          });
        }
      });
  };

  return (
    <>
      <ModalScrollDisable />
      <ModalBG onClick={handleModalClose}></ModalBG>
      <DeleteModalContent>
        <div className="modal-title-wrapper">
          <h1 className="modal-title">비밀번호 확인</h1>
          <CloseButton onClick={handleModalClose}>
            <IoMdClose />
          </CloseButton>
        </div>
        <p className="modal-desc">
          탈퇴하시려면 현재 계정 비밀번호를 입력해주세요.
        </p>
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

  .modal-title-wrapper {
    padding: 0;
    margin-bottom: 10px;
  }
  .modal-desc {
    width: 100%;
    color: #555;
  }

  @media screen and (max-width: 576px) {
    width: 80%;
    .modal-title-wrapper {
      font-size: 1.3rem;
    }
    .modal-desc {
      font-size: 0.9rem;
    }
  }
`;

const PasswordInput = styled.input`
  width: 100%;
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
