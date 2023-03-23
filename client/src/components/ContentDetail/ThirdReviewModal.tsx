import customAxios from 'api/customAxios';
import { CloseButton } from 'components/Profile/ModalStyles';
import { thirdModal } from 'interfaces/ContentDetail.interface';
import { useState } from 'react';
import { CiFaceFrown, CiFaceMeh, CiFaceSmile } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import ModalScrollDisable from 'utils/ModalScrollDisable';
import { StyledModal } from './CompanionStyled';

const ThirdReviewModal = ({
  detail,
  setFirstModal,
  setSecondModal,
  setThirdModal,
  reviewId,
  score,
  setScore,
  content,
  setContent,
}: thirdModal) => {
  const { memberId } = useRecoilValue(userInfo);
  const navigate = useNavigate();
  const [good, setGood] = useState<boolean>(false);
  const [soso, setSoso] = useState<boolean>(false);
  const [bad, setBad] = useState<boolean>(false);

  const handleGood = () => {
    setGood(!good);
    setSoso(false);
    setBad(false);
    setScore(1);
  };

  const handleSoso = () => {
    setSoso(!soso);
    setGood(false);
    setBad(false);
    setScore(0);
  };

  const handleBad = () => {
    setBad(!bad);
    setScore(-1);
    setGood(false);
    setSoso(false);
  };

  const handleCloseModal = () => {
    setThirdModal(false);
    setSecondModal(false);
    setFirstModal(false);
  };

  const handleContentWrite = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleReviewWrite = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!good && !soso && !bad) {
      Swal.fire({
        icon: 'error',
        title: '점수를 선택해주세요.',
      });
      return;
    }
    if (memberId !== detail.memberId) {
      // * 참여자가 작성자에게 쓰는 리뷰
      await customAxios
        .post(`/reviews`, {
          memberId,
          reviewedMemberId: detail.memberId,
          companionId: detail.companionId,
          score,
          content,
        })
        .then(() => {
          handleCloseModal();
          Swal.fire(
            'Thank you',
            '다음에도 좋은 동행 되시길 바랍니다',
            'success'
          );
          navigate('/');
        })
        .catch(error => console.log(error));
    } else {
      // * 작성자가 참여자에게 쓰는 리뷰
      await customAxios
        .post(`/reviews`, {
          memberId,
          reviewedMemberId: reviewId,
          companionId: detail.companionId,
          score,
          content,
        })
        .then(() => {
          handleCloseModal();
          Swal.fire(
            'Thank you',
            '다음에도 좋은 동행 되시길 바랍니다',
            'success'
          );
          navigate('/');
        })
        .catch(error => {
          console.log(error);
        });
    }
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
          <Score>
            <BtnWrapper>
              <button
                className={'btn-good' + (good ? ' good' : '')}
                onClick={handleGood}
              >
                <CiFaceSmile />
              </button>
              <button
                className={'btn-soso' + (soso ? ' soso' : '')}
                onClick={handleSoso}
              >
                <CiFaceMeh />
              </button>
              <button
                className={'btn-bad' + (bad ? ' bad' : '')}
                onClick={handleBad}
              >
                <CiFaceFrown />
              </button>
            </BtnWrapper>
            <ReviewForm onSubmit={handleReviewWrite}>
              <textarea
                placeholder="리뷰를 작성해주세요..!"
                onChange={handleContentWrite}
              ></textarea>
              <button>리뷰 작성</button>
            </ReviewForm>
          </Score>
        </ModalView>
      </BackGround>
    </>
  );
};

export default ThirdReviewModal;

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
const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  height: 50%;
  button {
    width: 100%;
    background-color: transparent;
    border: none;
    cursor: pointer;
    > * {
      font-size: 2.5rem;
      font-weight: 800;
    }
    &.good {
      color: green;
    }
    &.soso {
      color: #feb35c;
    }
    &.bad {
      color: red;
    }
  }
`;
const ReviewForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  > * {
    width: 80%;
    padding: 10px;
  }
  button {
    margin-top: 10px;
    background: #feb35c;
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.2s ease 0s;
    &:hover {
      color: black;
      background-color: white;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
    }
    &:active {
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
      position: relative;
      top: 2px;
    }
  }
  textarea {
    width: 100%;
    border: none;
    resize: none;
    border: 2px solid #feb35c;
    &:focus {
      outline: none;
    }
  }
`;

/* TODO:
1. 모달 디자인 *
2. 이모지 버튼 클릭 시 색깔 유지 *
3. submit 눌렀을 시 기능 추가 
*/
