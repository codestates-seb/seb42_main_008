import ThirdReviewModal from 'components/ContentDetail/ThirdReviewModal';
import { CloseButton } from 'components/Profile/ModalStyles';
import { secondModal } from 'interfaces/ContentDetail.interface';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';
import styled from 'styled-components';
import ModalScrollDisable from 'utils/ModalScrollDisable';
import { StyledModal } from './CompanionStyled';

const SecondReviewModal = ({
  detail,
  setFirstModal,
  setSecondModal,
  reviewId,
  score,
  setScore,
  content,
  setContent,
}: secondModal) => {
  const [thirdModal, setThirdModal] = useState(false);
  const { memberId } = useRecoilValue(userInfo);

  const handleThirdModal = () => {
    setThirdModal(!thirdModal);
  };

  const handleCloseModal = () => {
    setSecondModal(false);
    setFirstModal(false);
  };

  return (
    <>
      <ModalScrollDisable />
      <BackGround>
        <ModalView>
          <div className="close-btn">
            <CloseButton onClick={handleCloseModal}>
              <IoMdClose />
            </CloseButton>
          </div>
          <div className="modal-content">
            {detail.memberId === memberId ? (
              <h3>해당 참여자가 여행에 참여하셨나요?</h3>
            ) : (
              <h3>[ {detail.nickname} ] 님이 여행에 참여하셨나요?</h3>
            )}
            <div className="btn-wrapper">
              <button onClick={handleThirdModal}>네! 참석했습니다.</button>
              <button onClick={handleThirdModal}>
                아니요. 참석하지 않았습니다.
              </button>
            </div>
          </div>
        </ModalView>
      </BackGround>
      {thirdModal ? (
        <ThirdReviewModal
          detail={detail}
          setFirstModal={setFirstModal}
          setSecondModal={setSecondModal}
          setThirdModal={setThirdModal}
          reviewId={reviewId}
          score={score}
          setScore={setScore}
          content={content}
          setContent={setContent}
        />
      ) : null}
    </>
  );
};

export default SecondReviewModal;

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
const ModalView = styled(StyledModal)`
  .close-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    justify-self: flex-start;
    align-self: flex-start;
  }
  .modal-content {
    width: 100%;
  }
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
  @media screen and (max-width: 992px) {
    width: 500px;
    height: 300px;
    font-size: 20px;
    .btn-wrapper {
      button {
        width: 80%;
        font-size: 15px;
      }
    }
    .modal-content {
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 768px) {
    width: 500px;
    height: 300px;
    .modal-content {
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 576px) {
    width: 300px;
    height: 300px;
    font-size: 15px;
    .btn-wrapper {
      button {
        width: 90%;
        font-size: 15px;
      }
    }
  }
`;
