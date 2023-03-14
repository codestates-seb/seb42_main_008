import { thirdModal } from 'interfaces/ContentDetail.interface';
import styled from 'styled-components';

const ThirdReviewModal = ({ setThirdModal }: thirdModal) => {
  const handleThirdModal = () => {
    setThirdModal(false);
  };
  return (
    <Container>
      <BackGround>
        <ModalView onClick={event => event.stopPropagation()}>
          <button onClick={handleThirdModal}>눌러봐</button>
        </ModalView>
      </BackGround>
    </Container>
  );
};

export default ThirdReviewModal;

const Container = styled.main`
  width: 100%;
  height: 100%;
`;
const BackGround = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

export const ModalView = styled.div.attrs(() => ({
  role: 'dialog',
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 50%;
  height: 30%;
  text-align: center;
`;
