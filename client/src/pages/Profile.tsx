import customAxios from 'api/customAxios';
import BackGroundImage from 'components/Profile/BackGroundImage';
import MemberContent from 'components/Profile/MemberContent';
import MemberInfo from 'components/Profile/MemberInfo';
import { LoginUser, MemberProfile } from 'interfaces/Profile.interface';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Profile = () => {
  const userData: LoginUser = {
    memberId: 1,
    nickname: 'TestUSER',
    email: 'test@user.com',
    profile:
      'https://user-images.githubusercontent.com/6022883/45476027-e45c1a80-b778-11e8-9716-4e39c6d6e58e.png',
    memberStatus: '...',
    gender: 'male',
  };

  const [user, setUser] = useState<LoginUser>(userData);
  const [member, setMember] = useState<MemberProfile | null>(null);

  const getMemberData = async () => {
    await customAxios.get('/members').then(resp => {
      setMember(resp.data);
    });
  };

  useEffect(() => {
    getMemberData();
  }, [user]);

  const handleTestButtonClick = () => {
    setUser(cur => {
      let memberId;
      if (cur.memberId === 1) {
        memberId = 2;
      } else {
        memberId = 1;
      }
      return Object.assign({}, cur, {
        memberId,
      });
    });
  };

  return (
    <>
      <BackGroundImage />
      <Container>
        <TestButton onClick={handleTestButtonClick}>로그인 테스트</TestButton>
        <MemberInfo user={user} member={member} />
        <MemberContent user={user} member={member} />
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 80%;
  position: relative;
  color: #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 992px) {
    width: 90%;
  }
`;

const TestButton = styled.button`
  width: 100px;
  height: 50px;
  position: absolute;
  top: 50px;
  left: 100px;
  z-index: 10;
`;
export default Profile;
