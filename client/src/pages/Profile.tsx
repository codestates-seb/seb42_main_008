import MemberInfo from 'components/Profile/MemberInfo';
import styled from 'styled-components';

const Profile = () => {
  return (
    <Container>
      <MemberInfo />
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  border: 3px dotted pink;
  padding: 20px;
`;
export default Profile;
