import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import CountrySelectModal from 'components/contentadd/CountrySelectModal';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
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
  // 대륙 선택 옵션
  const [continentSelect, setContinentSelect] = useState('');
  // 국가 선택 모달
  const [countryModal, setCountryModal] = useState(false);
  const handleCountryModal = () => {
    setCountryModal(!countryModal);
  };
  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <ContentAddContainer>
      <TitleBox>
        <h1>대륙</h1>
        <p>동행자를 모집하는 글을 작성해보세요!</p>
      </TitleBox>
      <ContentBox>
        <nav className="location-select">
          <div>
            <label>대륙</label>
            <select
              value={continentSelect}
              onChange={event => setContinentSelect(event.target.value)}
            >
              <option value="">대륙선택</option>
              <option value="유럽">유럽</option>
              <option value="아시아">아시아</option>
              <option value="북아메리카">북아메리카</option>
              <option value="남아메리카">남아메리카</option>
              <option value="아프리카">아프리카</option>
              <option value="오세아니아">오세아니아</option>
            </select>
          </div>
          <div className="country-state">
            <label>나라</label>
            <div className="country-name">잉글랜드</div>
          </div>
          <button onClick={handleCountryModal}>선택</button>
        </nav>
        <div className="add-set">
          <label>제목</label>
          <input
            className="title-input"
            onChange={event => setTitleInput(event.target.value)}
          ></input>
          {titleInput}
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
            />
          </div>
        </div>
        <div className="add-set">
          <label>여행 장소</label>
          <input className="place-input"></input>
          <div>지도</div>
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
          <div dangerouslySetInnerHTML={{ __html: contentInput }} />
        </div>
        <button className="add-form">다음</button>
      </ContentBox>
      {countryModal ? (
        <div className="overlay">
          <CountrySelectModal setCountryModal={setCountryModal} />
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  background-color: aliceblue;
  > h1 {
    font-size: 4rem;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 724px;
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
  .country-name {
    background-color: #cecece;
    text-align: center;
    color: white;
    width: 200px;
    height: 36px;
    font-size: 24px;
    border-radius: 30px;
  }
  .location-select {
    display: flex;
    padding: 20px;
    width: 100%;
    justify-content: space-between;
    font-size: 24px;
    align-items: center;
    border-bottom: 1px solid #dddddd;
    > div {
      display: flex;
      align-items: center;
      width: 40%;
      justify-content: space-around;
      > select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: flex;
        border: none;
        outline: none;
        align-items: center;
        justify-content: center;
        border: none;
        padding-left: 20px;
        width: 200px;
        height: 36px;
        background-color: #feb35c;
        border-radius: 30px;
        font-size: 24px;
        color: white;
      }
    }
    > button {
      border: none;
      background-color: #feb35c;
      color: white;
      width: 96px;
      height: 36px;
      font-size: 24px;
      border-radius: 30px;
      cursor: pointer;
    }
  }
  .add-set {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
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
  .place-input {
    border-radius: 20px;
    border: 1px solid #555555;
    outline: none;
    width: 100%;
    height: 30px;
    padding-left: 10px;
  }
  .add-form {
    border: none;
    background-color: #feb35c;
    color: white;
    width: 96px;
    height: 36px;
    font-size: 24px;
    border-radius: 30px;
    cursor: pointer;
  }
`;
