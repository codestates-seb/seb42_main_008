import ThirdReviewModal from 'components/ContentDetail/ThirdReviewModal';
import { secondModal } from 'interfaces/ContentDetail.interface';
import { useState } from 'react';
import styled from 'styled-components';

const SecondReviewModal = ({ setFirstModal, setSecondModal }: secondModal) => {
  const handleSecondModal = () => {
    setSecondModal(false);
  };

  const [thirdModal, setThirdModal] = useState(false);
  const handleThirdModal = () => {
    setThirdModal(!thirdModal);
  };

  return (
    <Container>
      <BackGround onClick={handleSecondModal}>
        <ModalView onClick={event => event.stopPropagation()}>
          <h3>작성자님이 여행에 참석하셨나요?</h3>
          <div className="btn-wrapper">
            <button onClick={handleThirdModal}>네! 참석했습니다.</button>
            <button onClick={handleThirdModal}>
              아니요. 참석하지 않았습니다.
            </button>
          </div>
          {thirdModal ? (
            <ThirdReviewModal
              setFirstModal={setFirstModal}
              setSecondModal={setSecondModal}
              setThirdModal={setThirdModal}
            />
          ) : null}
        </ModalView>
      </BackGround>
    </Container>
  );
};

export default SecondReviewModal;

const Container = styled.main`
  width: 100%;
  height: 100%;
`;
const BackGround = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;
const ModalView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  width: 50%;
  height: 40%;
  text-align: center;
  border-radius: 30px;
  padding: 30px;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.25);
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
