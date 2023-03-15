import { thirdModal } from 'interfaces/ContentDetail.interface';
import { CiFaceFrown, CiFaceMeh, CiFaceSmile } from 'react-icons/ci';
import styled from 'styled-components';

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
  return (
    <Container>
      <BackGround>
        <ModalView onClick={event => event.stopPropagation()}>
          <Score>
            <BtnWrapper>
              <button>
                <CiFaceSmile />
              </button>
              <button>
                <CiFaceMeh />
              </button>
              <button>
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
  width: 50%;
  height: 40%;
  text-align: center;
  border-radius: 30px;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.25);
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
      font-size: 1.5rem;
      font-weight: bold;
      &:active {
        color: green;
      }
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
2. 이모지 버튼 클릭 시 색깔 유지 
3. submit 눌렀을 시 기능 추가 
*/
