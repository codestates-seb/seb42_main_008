import customAxios from 'api/customAxios';
import SecondReviewModal from 'components/ContentDetail/SecondReviewModal';
import { firstModal } from 'interfaces/ContentDetail.interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import ModalScrollDisable from 'utils/ModalScrollDisable';
import { StyledModal } from './CompanionStyled';

const FirstReviewModal = ({ detail, setFirstModal, reviewId }: firstModal) => {
  const navigate = useNavigate();
  const { memberId } = useRecoilValue(userInfo);
  const [score, setScore] = useState<number>(0);
  const [content, setContent] = useState<string>('');

  const handleFirstModal = async () => {
    await customAxios
      .post(`/reviews`, {
        memberId,
        reviewedMemberId: memberId,
        companionId: detail.companionId,
        score: 0,
        content,
      })
      .then(() => {
        setFirstModal(false);
        Swal.fire('Thank you', '다음에도 좋은 동행 되시길 바랍니다', 'success');
        navigate('/');
      })
      .catch(error => console.log(error));
  };

  // 두번째 리뷰 모달 상태
  const [secondModal, setSecondModal] = useState<boolean>(false);
  const handleSecondModal = () => {
    setSecondModal(!secondModal);
  };

  return (
    <Container>
      <ModalScrollDisable />
      <BackGround>
        <ModalView>
          <h3>{detail.nickname}님와(과)의 여행에 참여하셨나요?</h3>
          <div className="btn-wrapper">
            <button onClick={handleSecondModal}>네! 참석했습니다.</button>
            <button onClick={handleFirstModal}>
              아니요. 참석하지 않았습니다.
            </button>
          </div>
        </ModalView>
      </BackGround>
      {secondModal ? (
        <SecondReviewModal
          detail={detail}
          setFirstModal={setFirstModal}
          setSecondModal={setSecondModal}
          reviewId={reviewId}
          score={score}
          setScore={setScore}
          content={content}
          setContent={setContent}
        />
      ) : null}
    </Container>
  );
};

export default FirstReviewModal;

const Container = styled.section`
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
const ModalView = styled(StyledModal)`
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
  }
  @media screen and (max-width: 768px) {
    width: 500px;
    height: 300px;
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
