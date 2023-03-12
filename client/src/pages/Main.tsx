import FirstSection from 'components/Main/FirstSection';
import FourthSection from 'components/Main/FourthSection';
import SecondSection from 'components/Main/SecondSection';
import ThirdSection from 'components/Main/ThirdSection';
import styled from 'styled-components';

const Main = () => {
  return (
    <Container>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default Main;
