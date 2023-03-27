import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
import countries from '../../assets/countries.json';
import Swal from 'sweetalert2';
import ModalScrollDisable from 'utils/ModalScrollDisable';
const countriesPick: Countries = countries;
type Countries = {
  [key: string]: {
    name: string;
    code: string;
  }[];
};

interface Props {
  setCountryModal: Dispatch<SetStateAction<boolean>>;
  continentSelect: string;
  setCountrySelect: Dispatch<SetStateAction<string>>;
  setCountryCode: Dispatch<SetStateAction<string>>;
}
const CountrySelectModal = ({
  setCountryModal,
  setCountrySelect,
  continentSelect,
  setCountryCode,
}: Props) => {
  if (!continentSelect || continentSelect === '대륙선택') {
    setCountryModal(false);
    Swal.fire({
      icon: 'error',
      text: '대륙을 선택해주세요',
    });
  }

  const handleModal = () => {
    setCountryModal(false);
  };
  // 고른 국가 상태 저장
  const handleCountry = (country: string, code: string) => {
    const koreanRegex = /[가-힣]+/g;
    const koreanMatches = country.match(koreanRegex);
    const koreanString = koreanMatches ? koreanMatches.join('') : '';
    setCountrySelect(koreanString);
    setCountryCode(code);
    setCountryModal(false);
  };
  // 국가이름 한글만 골라내기
  const koreanRegex = /[가-힣]+/g;

  //나라 검색 필터 추가
  const [searchCountry, setSearchCountry] = useState('');

  return (
    <CountryBox>
      <ModalScrollDisable />
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
          onChange={event => setSearchCountry(event.target.value)}
        ></input>
        <ul className="country-content">
          {countriesPick[continentSelect]
            .filter(country => country.name.includes(searchCountry))
            .map((country, index: number) => {
              return (
                <li
                  key={index}
                  onClick={() => handleCountry(country.name, country.code)}
                >
                  {country.name.match(koreanRegex)?.join('')}
                </li>
              );
            })}
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
  overflow-y: hidden;
  z-index: 1000;
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
      cursor: pointer;
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
