import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import ModalScrollDisable from 'utils/ModalScrollDisable';

type Props = {
  setIsTendencyModal: (newValue: boolean) => void;
  setIsThemeModal: (newValue: boolean) => void;
  setSelectedTendencies: Dispatch<SetStateAction<string[]>>;
};
const TendencyModal = ({
  setIsTendencyModal,
  setIsThemeModal,
  setSelectedTendencies,
}: Props) => {
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

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxClick = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      if (selectedOptions.length < 2) {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };
  const handleTendencySubmit = () => {
    if (selectedOptions.length >= 1) {
      setSelectedTendencies(selectedOptions);
      setIsThemeModal(true);
      setIsTendencyModal(false);
    } else {
      Swal.fire({
        icon: 'error',
        text: '하나 이상 선택해주세요!',
      });
    }
  };
  return (
    <TendencyBox>
      <ModalScrollDisable />
      <div className="tendency-box">
        <div className="tendency-top">
          <h3>원하는 성향을 선택하세요</h3>
          <p>1~2개의 키워드를 선택해주세요</p>
        </div>
        <label>성향</label>
        <TendencyContent>
          {tendencies.map((theme: string) => {
            const isSelected = selectedOptions.includes(theme);
            return (
              <li
                key={theme}
                className={isSelected ? 'selected' : 'not-selected'}
              >
                <label>
                  <input
                    type="checkbox"
                    value={theme}
                    checked={isSelected}
                    onChange={() => handleCheckboxClick(theme)}
                  ></input>
                  {theme}
                </label>
              </li>
            );
          })}
        </TendencyContent>
        <div className="tendency-bottom">
          <button onClick={handleModalClose}>이전</button>
          <button onClick={handleTendencySubmit}>다음</button>
        </div>
      </div>
    </TendencyBox>
  );
};

export default TendencyModal;

const TendencyBox = styled.div`
  display: flex;
  width: 550px;
  height: auto;
  border-radius: 20px;
  background-color: white;
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  flex-direction: column;
  font-size: 2rem;
  z-index: 50;
  overflow-y: hidden;
  @media screen and (max-width: 768px) {
    width: 450px;
    height: auto;
    font-size: 1.5rem;
  }
  @media screen and (max-width: 576px) {
    width: 350px;
    height: auto;
    font-size: 1.2rem;
  }
  @media screen and (max-height: 900px) {
    height: 500px;
  }
  @media screen and (max-height: 650px) {
    height: 300px;
  }
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
    overflow-y: auto;
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
    @media screen and (max-width: 768px) {
      margin-bottom: 40px;
    }
    @media screen and (max-width: 576px) {
      margin-bottom: 30px;
    }

    > h3 {
      font-size: 2rem;
      font-weight: bold;
      @media screen and (max-width: 768px) {
        font-size: 1.8rem;
      }
      @media screen and (max-width: 576px) {
        font-size: 1.5rem;
      }
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
    @media screen and (max-height: 1000px) {
      padding-bottom: 20px;
    }
    @media screen and (max-height: 650px) {
      padding-bottom: 20px;
    }
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
      @media screen and (max-width: 768px) {
        width: 80px;
        height: 30px;
        font-size: 0.8rem;
      }
      @media screen and (max-width: 576px) {
        width: 70px;
        height: 25px;
        font-size: 0.6rem;
      }
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

    @media screen and (max-width: 768px) {
      width: 150px;
      height: 60px;
    }
    @media screen and (max-width: 576px) {
      width: 120px;
      height: 36px;
    }
    &.selected {
      background-color: #feb35c;
      color: white;
    }
    > label {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      cursor: pointer;
      > input {
        display: none;
      }
    }
  }
`;
