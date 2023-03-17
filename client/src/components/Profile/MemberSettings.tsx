import customAxios from 'api/customAxios';
import axios from 'axios';
import {
  MemberSettingsProps,
  ProfileEdit,
  Validations,
} from 'interfaces/Profile.interface';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { editValidationCheck } from 'utils/profileEditValidation';
import AccountDeleteModal from './AccountDeleteModal';
import TextEdit from './TextEdit';

const MemberSettings = ({ member, setCurrentTab }: MemberSettingsProps) => {
  const [memberData, setMemberData] = useState<ProfileEdit | object>({});
  const [profile, setProfile] = useState<string>(member.profile);
  const [validation, setValidation] = useState<Validations>(
    editValidationCheck({ ...memberData })
  );
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    if (event.target.files) {
      formData.append('image', event.target.files[0]);

      if (event.target.files[0].size < 3000000) {
        axios
          .post('https://api.imgur.com/3/image', formData, {
            headers: {
              Authorization: 'Client-ID 2dce0c293bfd544',
              Accept: 'application/json',
            },
          })
          .then(response => {
            setProfile(response.data.data.link);
            setMemberData(cur => ({
              ...cur,
              profile: response.data.data.link,
            }));
          });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: '파일 용량 초과',
        text: '이미지 용량이 너무 큽니다!',
      });
      return;
    }
  };

  const handleSubmitClick = () => {
    if (!validation.totalValid) {
      Swal.fire({
        icon: 'error',
        title: '수정할 수 없습니다',
        text: '모든 형식이 올바른지 확인해 주세요!',
      });
      return;
    }
    if (!validation.nicknameUnique) {
      Swal.fire({
        icon: 'error',
        title: '수정할 수 없습니다',
        text: '닉네임 중복을 다시 확인해 주세요!',
      });
      return;
    }

    Swal.fire({
      text: '정말 수정하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
    }).then(async result => {
      if (result.isConfirmed) {
        await customAxios.patch(`/members/${member.memberId}`, {
          ...memberData,
        });
        setCurrentTab(0);
        window.scrollTo(0, 0);
      } else {
        toast.info('취소되었습니다');
      }
    });
  };

  const handleAccountDeleteClick = () => {
    setIsShowDeleteModal(true);
  };

  return (
    <SettingsWrapper>
      {isShowDeleteModal && (
        <AccountDeleteModal
          member={member}
          setIsShowDeleteModal={setIsShowDeleteModal}
        />
      )}
      <EditWrapper>
        <ImageUpload>
          <div
            className="uploaded-img"
            style={{ backgroundImage: `url(${profile})` }}
          ></div>
          <UploadButton>
            <label htmlFor="file-input">사진 선택</label>
            <input type="file" id="file-input" onChange={onFileChange} />
          </UploadButton>
        </ImageUpload>
        <TextEdit
          setMemberData={setMemberData}
          member={member}
          validation={validation}
          setValidation={setValidation}
        />
      </EditWrapper>
      <SubmitButton onClick={handleSubmitClick}>수정하기</SubmitButton>
      <AccountDelete onClick={handleAccountDeleteClick}>
        회원탈퇴하기
      </AccountDelete>
    </SettingsWrapper>
  );
};

const SettingsWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const EditWrapper = styled.div`
  width: 100%;
  padding: 20px;
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageUpload = styled.section`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .uploaded-img {
    width: 70%;
    padding-bottom: 70%;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    .uploaded-img {
      width: 40%;
      padding-bottom: 40%;
    }
  }
`;

const UploadButton = styled.div`
  margin-top: 20px;
  > label {
    padding: 5px 10px;
    height: 50px;
    background-color: #feb35c;
    color: #fff;
    border-radius: 50px;
    cursor: pointer;
  }
  > input {
    display: none;
  }
`;

const SubmitButton = styled.div`
  padding: 10px 20px;
  background-color: #feb35c;
  color: #fff;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 30px;
  transition: 0.3s;
  cursor: pointer;

  :hover,
  :active {
    background-color: #fff;
    color: #222;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
`;

const AccountDelete = styled.div`
  position: absolute;
  bottom: 40px;
  right: 40px;
  color: #888;
  font-size: 0.9rem;
  cursor: pointer;
  :hover {
    filter: brightness(0.8);
  }
`;

export default MemberSettings;
