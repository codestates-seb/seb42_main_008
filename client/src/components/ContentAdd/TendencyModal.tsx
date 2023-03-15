import { useState } from 'react';
import styled from 'styled-components';
import ThemeModal from './ThemeModal';

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

  // 성향을 2개 골라야 다음 모달로 넘어가도록
  const [isThemeModal, setIsThemeModal] = useState(false);
  const handleTendencySubmit = () => {
    if (selectedTendencies.length >= 1) {
      setIsThemeModal(!isThemeModal);
    } else {
      alert('하나 이상 선택해주세요!');
    }
  };

  const [selectedTendencies, setSelectedTendencies] = useState<string[]>([]);
  const handleCheckboxClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const option = target.value;
    if (target.checked) {
      if (selectedTendencies.length < 2) {
        setSelectedTendencies(item => [...item, option]);
      } else {
        target.checked = false;
      }
    } else {
      const index = selectedTendencies.indexOf(option);
      if (index !== -1) {
        setSelectedTendencies(item => item.filter(thing => thing !== option));
      }
    }
  };
  return (
    <TendencyBox>
      <div className="tendency-box">
        <div className="tendency-top">
          <h3>원하는 성향을 선택하세요</h3>
          <p>1~2개의 키워드를 선택해주세요</p>
        </div>
        <label>성향</label>
        <TendencyContent>
          {tendencies.map((theme: string) => (
            <li key={theme}>
              <label>
                <input
                  type="checkbox"
                  value={theme}
                  onClick={handleCheckboxClick}
                ></input>
                {theme}
              </label>
            </li>
          ))}
        </TendencyContent>
        <div className="selected-tendency">
          {selectedTendencies.map((tendency, index) => (
            <div key={index}>{tendency}</div>
          ))}
        </div>
        <div className="tendency-bottom">
          <button onClick={handleModalClose}>이전</button>
          <button onClick={handleTendencySubmit}>다음</button>
        </div>
      </div>
      {isThemeModal ? (
        <div className="overlay">
          <ThemeModal
            setIsTendencyModal={setIsTendencyModal}
            setIsThemeModal={setIsThemeModal}
          />
        </div>
      ) : null}
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
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .tendency-box {
    padding: 40px;
    width: 100%;
    height: 100%;
    > label {
      margin-left: 20px;
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
      cursor: pointer;
    }
    > button:last-child {
      border: none;
      width: 96px;
      height: 44px;
      border-radius: 30px;
      background-color: #feb35c;
      color: white;
      font-size: 1.3rem;
      cursor: pointer;
    }
  }
  .selected-tendency {
    display: flex;
    width: 100%;
    justify-content: space-around;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      width: 130px;
      height: 30px;
      background-color: #5d62a0;
      color: white;
      font-size: 1.2rem;
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
    > label {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      &:hover {
        background-color: #feb35c;
      }
      > input {
        display: none;
      }
    }
  }
`;
