import BackGroundImage from 'components/Profile/BackGroundImage';
import MemberInfo from 'components/Profile/MemberInfo';
import styled from 'styled-components';

const Profile = () => {
  return (
    <Container>
      <BackGroundImage />
      <MemberInfo />
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  border: 3px dotted pink;
  position: relative;
`;
export default Profile;
