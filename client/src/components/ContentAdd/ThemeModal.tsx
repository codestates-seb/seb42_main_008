import customAxios from 'api/customAxios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import ModalScrollDisable from 'utils/ModalScrollDisable';

type LatLng = {
  lat: number;
  lng: number;
};

type Props = {
  setIsTendencyModal: (newValue: boolean) => void;
  setIsThemeModal: (newValue: boolean) => void;
  titleInput: string;
  contentInput: string;
  startDate: Date | null;
  savedAddress: string | null;
  markerLocation: LatLng;
  continentSelect: string;
  countrySelect: string | undefined;
  countryCode: string;
  selectedTendencies: any;
  formattedDate: string;
};
const ThemeModal = ({
  setIsTendencyModal,
  setIsThemeModal,
  titleInput,
  contentInput,
  formattedDate,
  savedAddress,
  markerLocation,
  continentSelect,
  countrySelect,
  countryCode,
  selectedTendencies,
}: Props) => {
  const handleTendencyOpen = () => {
    setIsTendencyModal(true);
    setIsThemeModal(false);
  };
  const navigate = useNavigate();

  // 테마 태그 종류
  const themes: string[] = [
    '맛집',
    '명소',
    '공연/전시',
    '스포츠 경기',
    '액티비티',
    '쇼핑',
    '힐링',
    '사진',
    '파티',
    '기타',
  ];

  // 대륙 번호
  let continentNumber: number;
  if (continentSelect === 'africa') {
    continentNumber = 1;
  } else if (continentSelect === 'asia') {
    continentNumber = 2;
  } else if (continentSelect === 'europe') {
    continentNumber = 3;
  } else if (continentSelect === 'northAmerica') {
    continentNumber = 4;
  } else if (continentSelect === 'oceania') {
    continentNumber = 5;
  } else if (continentSelect === 'southAmerica') {
    continentNumber = 6;
  }

  // 테마 담기 // 최대개수
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const handleCheckboxClick = (option: string) => {
    if (selectedThemes.includes(option)) {
      setSelectedThemes(selectedThemes.filter(item => item !== option));
    } else {
      if (selectedThemes.length < 3) {
        setSelectedThemes([...selectedThemes, option]);
      }
    }
  };
  // 성향,테마 태그 종합
  const allTags = selectedTendencies.concat(selectedThemes);

  // 멤버아이디
  const user = useRecoilValue(userInfo);

  // 모든 양식 제출 post 요청
  // 멤버아이디는 토큰받아 입력 // 대륙은 정수?
  const handleAllSubmit = async (event: any) => {
    if (selectedThemes.length >= 1) {
      event.preventDefault();
      Swal.fire({
        title: '작성 완료하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '네, 작성하겠습니다!',
        cancelButtonText: '아니요',
      })
        .then(async result => {
          if (result.isConfirmed) {
            await customAxios
              .post(`/companions`, {
                title: titleInput,
                content: contentInput,
                date: formattedDate,
                address: savedAddress,
                lat: markerLocation.lat,
                lng: markerLocation.lng,
                nationName: countrySelect,
                nationCode: countryCode,
                continent: continentNumber,
                tags: allTags,
                memberId: user.memberId,
              })
              .then(() => {
                setIsThemeModal(false);
                navigate(`/${continentSelect}/${countryCode}`);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      Swal.fire({
        icon: 'error',
        text: '하나 이상 선택해주세요!',
      });
    }
  };

  return (
    <ThemeBox>
      <ModalScrollDisable />
      <div className="theme-box">
        <div className="theme-top">
          <h3>원하는 테마를 선택하세요</h3>
          <p>1~3개의 키워드를 선택해주세요</p>
        </div>
        <label>테마</label>
        <ThemeContent>
          {themes.map((theme: string) => {
            const isSelected = selectedThemes.includes(theme);
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
        </ThemeContent>
        <div className="theme-bottom">
          <button onClick={handleTendencyOpen}>이전</button>
          <button onClick={handleAllSubmit}>작성 완료</button>
        </div>
      </div>
    </ThemeBox>
  );
};

export default ThemeModal;

const ThemeBox = styled.div`
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
  .theme-box {
    padding: 40px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    > label {
      margin-left: 20px;
      font-size: 1.7rem;
    }
  }
  .theme-top {
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
  .theme-bottom {
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
  .selected-theme {
    display: flex;
    width: 100%;
    justify-content: space-around;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      width: 100px;
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

const ThemeContent = styled.ul`
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
