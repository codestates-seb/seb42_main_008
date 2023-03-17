import customAxios from 'api/customAxios';
import Loader from 'components/Loader';
import BackGroundImage from 'components/Profile/BackGroundImage';
import MemberContent from 'components/Profile/MemberContent';
import MemberInfo from 'components/Profile/MemberInfo';
import { LoginUser, MemberProfile } from 'interfaces/Profile.interface';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Profile = () => {
  const userData: LoginUser = {
    memberId: 2,
    nickname: 'TestUSER',
    email: 'test@user.com',
    profile:
      'https://user-images.githubusercontent.com/6022883/45476027-e45c1a80-b778-11e8-9716-4e39c6d6e58e.png',
    memberStatus: '...',
    gender: 'male',
  };

  const { memberId } = useParams();
  const [user, setUser] = useState<LoginUser>(userData);
  const [member, setMember] = useState<MemberProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const getMemberData = () => {
    const userId = 3;

    const params = {
      loginMemberId: userId,
    };

    // ! 실제 테스트용 코드
    customAxios.get(`/members/${memberId}`, { params }).then(resp => {
      setMember(resp.data.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getMemberData();
  }, [user, currentTab, isLoading]);

  const handleTestButtonClick = () => {
    setUser(cur => {
      let memberId;
      if (cur.memberId === 2) {
        memberId = 3;
      } else {
        memberId = 2;
      }
      return Object.assign({}, cur, {
        memberId,
      });
    });
  };

  return (
    <>
      <BackGroundImage />
      {isLoading && <Loader></Loader>}
      {!isLoading && member && (
        <Container>
          <TestButton onClick={handleTestButtonClick}>로그인 테스트</TestButton>
          <MemberInfo user={user} member={member} setMember={setMember} />
          <MemberContent
            user={user}
            member={member}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </Container>
      )}
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
