import { thirdModal } from 'interfaces/ContentDetail.interface';
import { useState } from 'react';
import { CiFaceFrown, CiFaceMeh, CiFaceSmile } from 'react-icons/ci';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const ThirdReviewModal = ({
  setFirstModal,
  setSecondModal,
  setThirdModal,
}: thirdModal) => {
  const handleThirdModal = () => {
    setThirdModal(false);
    setSecondModal(false);
    setFirstModal(false);
  };

  const [good, setGood] = useState<boolean>(false);
  const [soso, setSoso] = useState<boolean>(false);
  const [bad, setBad] = useState<boolean>(false);

  // 1점
  const handleGood = () => {
    setGood(!good);
  };
  // 0점
  const handleSoso = () => {
    setSoso(!soso);
  };
  // -1점
  const handleBad = () => {
    setBad(!bad);
  };

  if (good && soso && bad) {
    Swal.fire({
      icon: 'error',
      title: '하나만 선택해주세요',
    });
  } else if (good && soso) {
    Swal.fire({
      icon: 'error',
      title: '하나만 선택해주세요',
    });
  } else if (good && bad) {
    Swal.fire({
      icon: 'error',
      title: '하나만 선택해주세요',
    });
  } else if (soso && bad) {
    Swal.fire({
      icon: 'error',
      title: '하나만 선택해주세요',
    });
  }

  return (
    <Container>
      <BackGround>
        <ModalView onClick={event => event.stopPropagation()}>
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
            <ReviewForm onSubmit={handleThirdModal}>
              <textarea placeholder="리뷰를 작성해주세요..!"></textarea>
              <button>리뷰 작성</button>
            </ReviewForm>
          </Score>
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
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 40%;
  text-align: center;
  border-radius: 30px;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.25);
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
  > button {
    margin-top: 10px;
    background: #feb35c;
    color: white;
    border: none;
    border-radius: 15px;
  }
`;

/* TODO:
1. 모달 디자인 *
2. 이모지 버튼 클릭 시 색깔 유지 *
3. submit 눌렀을 시 기능 추가 
*/
