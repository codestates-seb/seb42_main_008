import { MemberSettingsProps, ProfileEdit } from 'interfaces/Profile.interface';
import { useState } from 'react';
import styled from 'styled-components';
import TextEdit from './TextEdit';

const MemberSettings = ({ member }: MemberSettingsProps) => {
  const [memberData, setMemberData] = useState<ProfileEdit | any>({});
  console.log(memberData);
  return (
    <SettingsWrapper>
      <EditWrapper>
        <ImageUpload>
          <div
            className="uploaded-img"
            style={{ backgroundImage: `url(${member?.profile})` }}
          ></div>
          <UploadButton>
            <label htmlFor="file-input">사진 선택</label>
            <input type="file" id="file-input" />
          </UploadButton>
        </ImageUpload>
        <TextEdit setMemberData={setMemberData} member={member} />
      </EditWrapper>
      <SubmitButton>수정하기</SubmitButton>
      <AccountDelete>회원탈퇴하기</AccountDelete>
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
