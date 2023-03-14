import styled from 'styled-components';

type Props = {
  setIsTendencyModal: (newValue: boolean) => void;
};
const TendencyModal = ({ setIsTendencyModal }: Props) => {
  const handleModalClose = () => {
    setIsTendencyModal(false);
  };

  const tendencies: string[] = [
    '계획적',
    '즉흥적',
    '외국어 가능',
    '음주 선호',
    '여행 초보',
    '여행 고수',
    '드라이버',
    '대중교통 선호',
    '관광',
    '휴양',
  ];

  return (
    <TendencyBox>
      <div className="tendency-box">
        <div className="tendency-top">
          <h3>원하는 성향을 선택하세요</h3>
          <p>1~2개의 키워드를 선택해주세요</p>
        </div>
        <label>성향</label>
        <TendencyContent>
          {tendencies.map((tendency: string, index) => (
            <li key={index}>{tendency}</li>
          ))}
        </TendencyContent>
        <div className="tendency-bottom">
          <button onClick={handleModalClose}>이전</button>
          <button>다음</button>
        </div>
      </div>
    </TendencyBox>
  );
};

export default TendencyModal;

const TendencyBox = styled.div`
  display: flex;
  width: 550px;
  height: 800px;
  border-radius: 20px;
  background-color: white;
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  flex-direction: column;
  font-size: 24px;
  .tendency-box {
    padding: 40px;
    width: 100%;
    height: 100%;
    > label {
      margin-left: 50px;
      font-size: 1.7rem;
    }
  }
  .tendency-top {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;

    > h3 {
      font-size: 2rem;
      font-weight: bold;
    }
    > p {
      font-size: 1rem;
    }
  }
  .tendency-bottom {
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding-top: 30px;
    > button:first-child {
      border: none;
      width: 96px;
      height: 44px;
      border-radius: 30px;
      background-color: #aeaeae;
      color: white;
      font-size: 1.3rem;
    }
    > button:last-child {
      border: none;
      width: 96px;
      height: 44px;
      border-radius: 30px;
      background-color: #feb35c;
      color: white;
      font-size: 1.3rem;
    }
  }
`;

const TendencyContent = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  > li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 80px;
    background-color: #d9d9d9;
    margin-bottom: 10px;
  }
`;
