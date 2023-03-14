import BackGroundImage from 'components/Profile/BackGroundImage';
import MemberContent from 'components/Profile/MemberContent';
import MemberInfo from 'components/Profile/MemberInfo';
import { LoginUser } from 'interfaces/Profile.interface';
import { useState } from 'react';
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
    <Container>
      <TestButton onClick={handleTestButtonClick}>로그인 테스트</TestButton>
      <BackGroundImage />
      <MemberInfo user={user} />
      <MemberContent user={user} />
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  border: 3px dotted pink;
  position: relative;
  color: #222;
`;

const TestButton = styled.button`
  width: 100px;
  height: 50px;
  position: absolute;
  top: 100px;
  left: 100px;
  z-index: 10;
`;
export default Profile;
