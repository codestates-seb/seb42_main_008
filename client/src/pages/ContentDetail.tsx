import styled from 'styled-components';

const ContentDetail = () => {
  return (
    <Container>
      <ContentBox></ContentBox>
    </Container>
  );
};

export default ContentDetail;

const Container = styled.main`
  background-color: #5d62a0;
`;
const ContentBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 1280px;
  height: 860px;
  padding: 50px;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
