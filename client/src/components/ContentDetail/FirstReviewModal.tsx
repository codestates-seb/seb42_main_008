import SecondReviewModal from 'components/ContentDetail/SecondReviewModal';
import { firstModal } from 'interfaces/ContentDetail.interface';
import { useState } from 'react';
import styled from 'styled-components';

const FirstReviewModal = ({ setFirstModal }: firstModal) => {
  const handleFirstModal = () => {
    setFirstModal(false);
  };

  // 두번째 리뷰 모달 상태
  const [secondModal, setSecondModal] = useState<boolean>(false);
  const handleSecondModal = () => {
    setSecondModal(!secondModal);
  };

  return (
    <Container>
      <BackGround onClick={handleFirstModal}>
        <ModalView onClick={event => event.stopPropagation()}>
          {/* 작상자는 {작성자ID}로 수정 예정*/}
          <h3>작성자와의 여행에 참석하셨나요?</h3>
          <div className="btn-wrapper">
            <button onClick={handleSecondModal}>네! 참석했습니다.</button>
            <button onClick={handleFirstModal}>
              아니요. 참석하지 않았습니다.
            </button>
          </div>
          {secondModal ? (
            <SecondReviewModal
              setFirstModal={setFirstModal}
              setSecondModal={setSecondModal}
            />
          ) : null}
        </ModalView>
      </BackGround>
    </Container>
  );
};

export default FirstReviewModal;

const Container = styled.main`
  width: 100%;
  height: 100%;
`;
const BackGround = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
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
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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
