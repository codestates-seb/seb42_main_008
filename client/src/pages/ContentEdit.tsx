import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import countries from '../assets/countries.json';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SearchMap from 'components/ContentEdit/SearchMap';
import CountrySelectModal from 'components/ContentEdit/CountrySelectModal';
import TendencyModal from 'components/ContentEdit/TendencyModal';
import ThemeModal from 'components/ContentEdit/ThemeModal';

registerLocale('ko', ko);

const ContentEdit = () => {
  // 해당글 내용 불러오기
  const { contentId } = useParams();

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

  // 대륙 선택 옵션
  const [continentSelect, setContinentSelect] = useState('');

  // 대륙 번호 받기
  const [continentNumber, setContinentNumber] = useState();

  // 나라 선택
  const [countrySelect, setCountrySelect] = useState('국가선택');

  // 나라 코드
  const [countryCode, setCountryCode] = useState('');

  // 제목
  const [titleInput, setTitleInput] = useState('');

  // 내용
  const [contentInput, setContentInput] = useState('');

  // 여행 시작일
  const [startDate, setStartDate] = useState<Date | null>(null);
  // 여행 종료일
  const [endDate, setEndDate] = useState<Date | null>(null);
  // 세부 주소 정보
  const [savedAddress, setSavedAddress] = useState<string | null>(null);
  // lat, lng 위치 정보
  const [markerLocation, setMarkerLocation] = useState({
    lat: 37.2635727,
    lng: 127.0286009,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/companions/${contentId}`)
      .then(response => {
        setContinentNumber(response.data.data.continent);
        setCountrySelect(response.data.data.nationName);
        setCountryCode(response.data.data.nationCode);
        setTitleInput(response.data.data.title);
        setContentInput(response.data.data.content);
        const dateObj = new Date(response.data.data.date);
        setStartDate(dateObj);
        setSavedAddress(response.data.data.address);
        setMarkerLocation({
          lat: response.data.data.lat,
          lng: response.data.data.lng,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // 대륙 번호에 맞춰 대륙 문자열 변경
  useEffect(() => {
    if (continentNumber === 1) {
      setContinentSelect('africa');
    } else if (continentNumber === 2) {
      setContinentSelect('asia');
    } else if (continentNumber === 3) {
      setContinentSelect('europe');
    } else if (continentNumber === 4) {
      setContinentSelect('northAmerica');
    } else if (continentNumber === 5) {
      setContinentSelect('oceania');
    } else if (continentNumber === 6) {
      setContinentSelect('southAmerica');
    }
  }, [continentNumber]);

  // 대륙 초기화시 나라,코드리셋
  useEffect(() => {
    setCountrySelect('국가선택');
    setCountryCode('');
  }, [continentSelect]);

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

  // 선택한 성향 태그 배열
  const [selectedTendencies, setSelectedTendencies] = useState<string[]>([]);
  // 성향 모달
  const [isTendencyModal, setIsTendencyModal] = useState(false);
  // 테마 모달
  const [isThemeModal, setIsThemeModal] = useState(false);

  const handleContentSubmit = () => {
    if (!titleInput) {
      alert('글 제목을 입력해주세요!');
      return;
    }
    if (!contentInput.replace(/<\/?p>/gi, '')) {
      alert('글 내용을 작성해주세요!');
      return;
    }
    if (!startDate || !endDate) {
      alert('날짜를 입력해주세요!');
      return;
    }
    if (!savedAddress) {
      alert('위치를 입력해주세요!');
      return;
    }
    if (continentSelect === '대륙선택') {
      alert('대륙을 선택해주세요!');
      return;
    }
    if (countrySelect === '국가선택') {
      alert('나라를 선택해주세요!');
    }
    if (
      titleInput &&
      contentInput &&
      startDate &&
      endDate &&
      savedAddress &&
      continentSelect &&
      countrySelect !== '국가선택'
    ) {
      setIsTendencyModal(!isTendencyModal);
    }
  };

  //날짜 받기
  //원래 값 형태로 한번 바꿔준 dateObj
  // startDate 는 원래 날짜 형태
  // 온체인지 이벤트에 넣으려면 이렇게 바꿔줘야하고
  // 온체인지로 상태변경한 startDate를 다시 요청가능한 형태로 변경

  let formattedDate = '';
  if (startDate) {
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0');
    const day = String(startDate.getDate()).padStart(2, '0');
    formattedDate = `${year}-${month}-${day}`;
  }

  return (
    <ContentAddContainer>
      <TitleBox style={{ backgroundImage: `url(${titleImg})` }}>
        <h1>{title}</h1>
        <p>동행자를 모집하는 글을 작성해보세요!</p>
      </TitleBox>
      <ContentBox>
        <nav className="location-select">
          <div>
            <label>
              대륙
              <select
                value={continentSelect}
                onChange={event => setContinentSelect(event.target.value)}
              >
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
            value={titleInput}
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
              endDate={endDate}
              placeholderText="Start Date"
              dateFormat="yyyy-MM-dd"
            />
            ~
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              dateFormat="yyyy-MM-dd"
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
            value={contentInput}
            onChange={event => {
              setContentInput(event);
            }}
          />
        </div>
        <button className="add-form" onClick={handleContentSubmit}>
          다음
        </button>
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
            selectedTendencies={selectedTendencies}
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

export default ContentEdit;

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: white;
  font-weight: bold;
  > h1 {
    font-size: 4rem;
    @media screen and (max-width: 768px) {
      font-size: 3rem;
    }
    @media screen and (max-width: 576px) {
      font-size: 2.5rem;
    }
  }
  > p {
    font-size: 1rem;
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
    font-size: 1.5rem;
    border-radius: 30px;
    cursor: pointer;
  }
`;
