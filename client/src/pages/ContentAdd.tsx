import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import CountrySelectModal from 'components/ContentAdd/CountrySelectModal';
import TendencyModal from 'components/ContentAdd/TendencyModal';
import countries from '../assets/countries.json';
import ThemeModal from 'components/ContentAdd/ThemeModal';
import SearchMap from 'components/ContentAdd/SearchMap';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
const countriesPick: Countries = countries;
type Countries = {
  [key: string]: {
    name: string;
    code: string;
  }[];
};

registerLocale('ko', ko);

const ContentAdd = () => {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, 'link'],
        [
          {
            color: [
              '#000000',
              '#e60000',
              '#ff9900',
              '#ffff00',
              '#008a00',
              '#0066cc',
              '#9933ff',
              'custom-color',
            ],
          },
          { background: [] },
        ],
        ['image', 'video'],
        ['clean'],
      ],
    },
  };
  // 라우터 이동에 맞춰 국가 대륙
  const location = useLocation();
  const { continent, countryCode: locationCode } = location.state;
  // countries 에 있는 국가의 코드와 받아온 코드의 값이 일치한 부분의 국가이름
  const continentObj: { name: string; code: string }[] =
    countriesPick[continent];
  const countryName = continentObj.find(
    country => country.code === locationCode
  )?.name;
  const koreanRegex = /[가-힣]+/g;
  const routeKorCountryName = countryName
    ? countryName.match(koreanRegex)?.join('')
    : '국가선택';

  //취소 라우터
  const handleCancel = () => {
    window.history.back();
  };

  // 대륙 선택 옵션
  const [continentSelect, setContinentSelect] = useState(continent);
  // 나라 선택
  const [countrySelect, setCountrySelect] = useState(routeKorCountryName);
  // 나라 코드
  const [countryCode, setCountryCode] = useState(locationCode);

  // 대륙 초기화시 나라,코드리셋
  // useEffect(() => {
  //   setCountrySelect('국가선택');
  //   setCountryCode('');
  // }, [continentSelect]);

  let title = '대륙을 선택하세요!';
  let titleImg =
    'https://cdn.pixabay.com/photo/2022/10/22/19/11/travel-7539914__480.jpg';

  if (continentSelect === 'europe') {
    title = 'Europe';
    titleImg =
      'https://cdn.pixabay.com/photo/2020/07/12/16/40/paris-5397889_1280.jpg';
  } else if (continentSelect === 'africa') {
    title = 'Africa';
    titleImg =
      'https://cdn.pixabay.com/photo/2019/03/02/21/25/morocco-4030733_1280.jpg';
  } else if (continentSelect === 'asia') {
    title = 'Asia';
    titleImg =
      'https://cdn.pixabay.com/photo/2020/07/23/01/16/heritage-5430081_1280.jpg';
  } else if (continentSelect === 'northAmerica') {
    title = 'North America';
    titleImg =
      'https://cdn.pixabay.com/photo/2020/06/08/20/58/nyc-5276112__480.jpg';
  } else if (continentSelect === 'southAmerica') {
    title = 'South America';
    titleImg =
      'https://cdn.pixabay.com/photo/2019/02/06/00/06/peru-3978148_1280.jpg';
  } else if (continentSelect === 'oceania') {
    title = 'Oceania';
    titleImg =
      'https://cdn.pixabay.com/photo/2019/05/15/18/22/sydney-4205646_1280.jpg';
  } else if (continentSelect === '대륙선택') {
    title = '대륙을 선택하세요!';
    titleImg =
      'https://cdn.pixabay.com/photo/2022/10/22/19/11/travel-7539914__480.jpg';
  }

  // 국가 선택 모달
  const [countryModal, setCountryModal] = useState(false);
  const handleCountryModal = () => {
    setCountryModal(!countryModal);
  };
  // 제목
  const [titleInput, setTitleInput] = useState('');
  // 내용
  const [contentInput, setContentInput] = useState('');
  // 여행 시작일
  const [startDate, setStartDate] = useState<Date | null>(null);
  // 세부 주소 정보
  const [savedAddress, setSavedAddress] = useState<string | null>(null);
  // lat, lng 위치 정보
  const [markerLocation, setMarkerLocation] = useState({
    lat: 37.2635727,
    lng: 127.0286009,
  });
  // 선택한 성향 태그 배열
  const [selectedTendencies, setSelectedTendencies] = useState<string[]>([]);
  // 성향 모달
  const [isTendencyModal, setIsTendencyModal] = useState(false);
  // 테마 모달
  const [isThemeModal, setIsThemeModal] = useState(false);

  const handleContentSubmit = () => {
    if (!titleInput) {
      Swal.fire({
        icon: 'error',
        text: '글 제목을 입력해주세요',
      });
      return;
    }
    if (!contentInput.replace(/<\/?p>/gi, '')) {
      Swal.fire({
        icon: 'error',
        text: '글 내용을 작성해주세요',
      });
      return;
    }
    if (!startDate) {
      Swal.fire({
        icon: 'error',
        text: '날짜를 입력해주세요',
      });
      return;
    }
    if (!savedAddress) {
      Swal.fire({
        icon: 'error',
        text: '위치를 입력해주세요',
      });
      return;
    }
    if (continentSelect === '대륙선택') {
      Swal.fire({
        icon: 'error',
        text: '대륙을 선택해주세요!',
      });
      return;
    }
    if (countrySelect === '국가선택') {
      Swal.fire({
        icon: 'error',
        text: '국가를 선택해주세요!',
      });
    }
    if (
      titleInput &&
      contentInput &&
      startDate &&
      savedAddress &&
      continentSelect &&
      countrySelect !== '국가선택'
    ) {
      setIsTendencyModal(!isTendencyModal);
    }
  };
  let formattedDate = '';
  if (startDate) {
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0');
    const day = String(startDate.getDate()).padStart(2, '0');
    formattedDate = `${year}-${month}-${day}`;
  }

  const handleContinentChange = (event: any) => {
    setContinentSelect(event.target.value);
    setCountrySelect('국가선택');
    setCountryCode('');
  };

  return (
    <ContentAddContainer>
      <TitleBox style={{ backgroundImage: `url(${titleImg})` }}>
        <ImageFilter></ImageFilter>
        <h1>{title.toUpperCase()}</h1>
        <p>동행자를 모집하는 글을 작성해보세요!</p>
      </TitleBox>
      <ContentBox>
        <nav className="location-select">
          <div>
            <label>
              대륙
              <select value={continentSelect} onChange={handleContinentChange}>
                <option value="대륙선택">대륙선택</option>

                {Object.keys(countries).map((country, index) => {
                  return (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          <div className="country-state">
            <label>
              <div className="country-label">나라</div>
              <div className="country-name">{countrySelect}</div>
              <button onClick={handleCountryModal}>선택</button>
            </label>
          </div>
        </nav>
        <div className="add-set">
          <label>제목</label>
          <input
            className="title-input"
            onChange={event => setTitleInput(event.target.value)}
          ></input>
        </div>
        <div className="add-set">
          <label>여행 날짜</label>
          <div className="date-picker">
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              placeholderText="Start Date"
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
            />
          </div>
        </div>
        <div className="add-set">
          <label>여행 장소</label>
          <SearchMap
            savedAddress={savedAddress}
            setSavedAddress={setSavedAddress}
            markerLocation={markerLocation}
            setMarkerLocation={setMarkerLocation}
          />
        </div>
        <div className="add-set">
          <label>모집 내용</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            onChange={event => {
              setContentInput(event);
            }}
          />
        </div>
        <div className="bottom-button">
          <button className="add-form" onClick={handleCancel}>
            작성 취소
          </button>
          <button className="add-form" onClick={handleContentSubmit}>
            태그 선택하기
          </button>
        </div>
      </ContentBox>
      {countryModal ? (
        <div className="overlay">
          <CountrySelectModal
            setCountryModal={setCountryModal}
            setCountrySelect={setCountrySelect}
            continentSelect={continentSelect}
            setCountryCode={setCountryCode}
          />
        </div>
      ) : null}
      {isTendencyModal ? (
        <div className="overlay">
          <TendencyModal
            setIsTendencyModal={setIsTendencyModal}
            setIsThemeModal={setIsThemeModal}
            setSelectedTendencies={setSelectedTendencies}
          />
        </div>
      ) : null}
      {isThemeModal ? (
        <div className="overlay">
          <ThemeModal
            setIsTendencyModal={setIsTendencyModal}
            setIsThemeModal={setIsThemeModal}
            titleInput={titleInput}
            contentInput={contentInput}
            startDate={startDate}
            savedAddress={savedAddress}
            markerLocation={markerLocation}
            continentSelect={continentSelect}
            countrySelect={countrySelect}
            countryCode={countryCode}
            selectedTendencies={selectedTendencies}
            formattedDate={formattedDate}
          />
        </div>
      ) : null}
    </ContentAddContainer>
  );
};

export default ContentAdd;

const ContentAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  align-items: center;
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const TitleBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
  font-weight: bold;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  > h1 {
    font-size: 4rem;
    z-index: 20;
    font-family: 'Archivo Black', sans-serif;
    @media screen and (max-width: 768px) {
      font-size: 3rem;
    }
    @media screen and (max-width: 576px) {
      font-size: 2.5rem;
    }
  }
  > p {
    font-size: 1rem;
    z-index: 20;
    @media screen and (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
  .date-picker {
    display: flex;
    width: 50%;
    .react-datepicker-wrapper {
      width: 120px;
      > div {
        > input {
          width: 120px;
          outline: none;
          cursor: pointer;
        }
      }
    }
  }

  .country-state {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    white-space: nowrap;

    @media screen and (max-width: 768px) {
      font-size: 1.3rem;
    }
  }
  .country-name {
    display: flex;
    background-color: #cecece;
    align-items: center;
    justify-content: center;
    color: white;
    width: 200px;
    height: 36px;
    font-size: 1.5rem;
    border-radius: 30px;
    margin-left: 10px;
    @media screen and (max-width: 768px) {
      font-size: 1.3rem;
    }
  }
  .location-select {
    display: flex;
    padding: 20px;
    width: 100%;
    justify-content: space-between;
    font-size: 1.5rem;
    align-items: center;
    white-space: nowrap;
    border-bottom: 1px solid #dddddd;
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
    > div {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-around;
      @media screen and (max-width: 768px) {
        font-size: 1.3rem;
      }

      > label {
        display: flex;
        align-items: center;
        width: 100%;
        > select {
          margin: 10px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          display: flex;
          border: none;
          outline: none;
          align-items: center;
          justify-content: center;
          text-align: center;
          border: none;
          width: 190px;
          height: 36px;
          background-color: #feb35c;
          border-radius: 30px;
          font-size: 1.5rem;
          color: white;
          cursor: pointer;
          @media screen and (max-width: 768px) {
            font-size: 1.3rem;
          }
        }
        > button {
          border: none;
          background-color: #feb35c;
          color: white;
          width: 60px;
          height: 36px;
          font-size: 1.5rem;
          border-radius: 30px;
          cursor: pointer;
          margin-left: 10px;
          @media screen and (max-width: 768px) {
            font-size: 1.3rem;
          }
        }
      }
    }
  }
  .add-set {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 1.3rem;
  }
  .ql-container {
    box-sizing: border-box;
    font-family: 'Gowun Batang';
    font-size: 1.25rem;
    font-weight: 400;
    color: #565759;
    min-height: 15rem;
    margin: 0px;
    position: relative;
  }

  .ql-editor {
    min-height: 15rem;
  }
  @media screen and (max-width: 600px) {
    .ql-container {
      font-size: 1.125rem;
    }
  }
  .title-input {
    border-radius: 20px;
    border: 1px solid #555555;
    outline: none;
    width: 100%;
    height: 30px;
    padding-left: 10px;
  }
  .day-input {
    border-radius: 20px;
    border: 1px solid #555555;
    outline: none;
    width: 50%;
    height: 30px;
    padding-left: 10px;
  }

  .add-form {
    border: none;
    background-color: #feb35c;
    color: white;
    width: 96px;
    height: 36px;
    font-size: 1rem;
    border-radius: 30px;
    cursor: pointer;
  }
  .bottom-button {
    display: flex;
    width: 100%;
    justify-content: space-around;
    > :first-child {
      background-color: #cecece;
    }
  }
`;
const ImageFilter = styled.section`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000650;
  opacity: 0.25;
`;
