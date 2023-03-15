import React from 'react';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';

type Props = {
  setCountryModal: (newValue: boolean) => void;
};
const CountrySelectModal = ({ setCountryModal }: Props) => {
  const handleModal = () => {
    setCountryModal(false);
  };
  return (
    <CountryBox>
      <div className="country-box">
        <div className="country-top">
          <div className="country-title">나라</div>
          <div>
            <GrClose onClick={handleModal} cursor="pointer" />
          </div>
        </div>
        <input
          className="country-input"
          placeholder="나라를 입력해주세요.."
        ></input>
        <ul className="country-content">
          <li>
            <div>잉글랜드</div>
            <button>선택</button>
          </li>
          <li>
            <div>잉글랜드</div>
            <button>선택</button>
          </li>
          <li>
            <div>잉글랜드</div>
            <button>선택</button>
          </li>
          <li>
            <div>잉글랜드</div>
            <button>선택</button>
          </li>
          <li>
            <div>잉글랜드</div>
            <button>선택</button>
          </li>
          <li>
            <div>잉글랜드</div>
            <button>선택</button>
          </li>
          <li>
            <div>잉글랜드</div>
            <button>선택</button>
          </li>
          <li>
            <div>잉글랜드</div>
            <button>선택</button>
          </li>
          <li>
            <div>잉글랜드</div>
            <button>선택</button>
          </li>
          <li>
            <div>잉글랜드</div>
            <button>선택</button>
          </li>
        </ul>
      </div>
    </CountryBox>
  );
};

export default CountrySelectModal;

const CountryBox = styled.div`
  display: flex;
  width: 600px;
  height: 600px;
  border-radius: 20px;
  background-color: white;
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  flex-direction: column;
  font-size: 2rem;
  @media screen and (max-width: 768px) {
    width: 400px;
    height: 400px;
    font-size: 1.5rem;
  }
  @media screen and (max-width: 576px) {
    width: 300px;
    height: 300px;
    font-size: 1.2rem;
  }
  .country-box {
    padding: 30px;
    overflow-y: auto;
  }
  .country-top {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    padding-bottom: 15px;
  }
  .country-title {
    display: flex;
    align-items: center;
    width: 30%;
    padding-left: 20px;
  }
  .country-content {
    display: flex;
    flex-direction: column;
    background-color: white;
    margin-top: 15px;
    height: auto;
    width: 100%;
    padding: 10px;
    > li {
      border-bottom: 1px solid #dddddd;
      height: 60px;
      width: 100%;
      justify-content: space-between;
      display: flex;
      align-items: center;
      > button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 40px;
        font-size: 2rem;
        color: white;
        background-color: #feb35c;
        border-radius: 30px;
        border: none;
        cursor: pointer;
        @media screen and (max-width: 768px) {
          width: 80px;
          height: 30px;
          font-size: 1.5rem;
        }
        @media screen and (max-width: 576px) {
          width: 60px;
          height: 20px;
          font-size: 1.2rem;
        }
      }
    }
  }
  .country-input {
    width: 100%;
    height: 50px;
    border-radius: 30px;
    font-size: 2rem;
    padding-left: 15px;
    @media screen and (max-width: 768px) {
      height: 40px;
      font-size: 1.5rem;
    }
    @media screen and (max-width: 576px) {
      height: 30px;
      font-size: 1rem;
    }
  }
`;
