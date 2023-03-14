import { modalProps } from 'interfaces/ContentDetail.interface';
import styled from 'styled-components';

const ReviewModal2 = ({ reviewModal, setReviewModal }: modalProps) => {
  const handleModal = () => {
    setReviewModal(!reviewModal);
  };
  return (
    <Container>
      <BackGround onClick={handleModal}>
        <ModalView onClick={event => event.stopPropagation()}>
          <h3>작성자와의 여행에 참석하셨나요?</h3>
          <div className="btn-wrapper">
            <button>네! 참석했습니다.</button>
            <button>아니요. 참석하지 않았습니다.</button>
          </div>
        </ModalView>
      </BackGround>
    </Container>
  );
};

export default ReviewModal2;

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
  flex-direction: column;
  background-color: white;
  width: 50%;
  height: 30%;
  text-align: center;
  border-radius: 30px;
  padding: 30px;
  h3 {
    padding-bottom: 30px;
  }
  .btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    button {
      cursor: pointer;
      color: white;
      border: none;
      padding: 10px;
      width: 80%;
      border-radius: 30px;
    }
    > :nth-child(1) {
      background-color: #9bb76a;
      margin-bottom: 10px;
    }
    > :nth-child(2) {
      background-color: #d9506a;
    }
  }
`;
