import customAxios from 'api/customAxios';
import Loader from 'components/Loader';
import BackGroundImage from 'components/Profile/BackGroundImage';
import MemberContent from 'components/Profile/MemberContent';
import MemberInfo from 'components/Profile/MemberInfo';
import { MemberProfile } from 'interfaces/Profile.interface';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';
import styled from 'styled-components';

const Profile = () => {
  const { memberId } = useParams();
  const [member, setMember] = useState<MemberProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const loginUser = useRecoilValue(userInfo);

  const getMemberData = () => {
    const params = {
      loginMemberId: loginUser.memberId,
    };

    // ! 실제 테스트용 코드
    customAxios.get(`/members/${memberId}`, { params }).then(resp => {
      setMember(resp.data.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getMemberData();
    console.log(loginUser);
  }, [currentTab, isLoading]);

  return (
    <>
      <BackGroundImage />
      {isLoading && (
        <LoaderContainer>
          <Loader></Loader>
        </LoaderContainer>
      )}
      {!isLoading && member && (
        <Container>
          <MemberInfo member={member} setMember={setMember} />
          <MemberContent
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

const LoaderContainer = styled.div`
  z-index: 2;
  width: 100%;
  top: 50vh;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Profile;
