import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useEffect, useState } from 'react';

const CountrySelect = () => {
  // 엔드포인트와 대륙이 일치할때 값으로 이미지, 대륙이름 조정
  // 나라 이미지 api
  // 쿼리 검색값 조정
  //FIXME: 키값 변수 설정 필요
  const [countryImageURL, setCountryImageURL] = useState('');
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=34284444-6b3b851d07d7372bd0e3f9184&q=영국+여행&image_type=photo`
        );
        const images = response.data.hits;
        const randomIdx = Math.floor(Math.random() * images.length);
        setCountryImageURL(images[randomIdx].webformatURL);
      } catch (error) {
        console.log(error);
      }
    };
    fetchImage();
  }, []);

  return (
    <CountryListContainer>
      <div className="country-name-box">
        <h1>대륙 이름</h1>
        <p>동행자를 구하고 싶은 나라를 선택해보세요!</p>
      </div>
      <div className="list-top">
        <div>내가 함께하고 싶은 도시가 없나요?</div>
        <Link to="/add">글 작성하기</Link>
      </div>
      <CountryListBox>
        <div className="countrybox">
          <ul className="hot-country">
            <li
              style={{
                backgroundImage: `url(${countryImageURL})`,
                backgroundSize: `100% 100%`,
                backgroundRepeat: `no-repeat`,
              }}
            >
              <div>
                England <FaChevronRight />
              </div>
            </li>
            <li>
              <div>
                France <FaChevronRight />
              </div>
            </li>
            <li>
              <div>
                Spain <FaChevronRight />
              </div>
            </li>
            <li>
              <div>
                Germany <FaChevronRight />
              </div>
            </li>
          </ul>
          <ul className="random-country">
            <li>
              <div>
                국 <FaChevronRight />
              </div>
            </li>
            <li>
              <div>
                국<FaChevronRight />
              </div>
            </li>
            <li>
              <div>
                국<FaChevronRight />
              </div>
            </li>
            <li>
              <div>
                국<FaChevronRight />
              </div>
            </li>
            <li>
              <div>
                국<FaChevronRight />
              </div>
            </li>
            <li>
              <div>
                국<FaChevronRight />
              </div>
            </li>
            <li>
              <div>
                국<FaChevronRight />
              </div>
            </li>
          </ul>
        </div>
      </CountryListBox>
    </CountryListContainer>
  );
};

export default CountrySelect;

const CountryListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  align-items: center;

  .country-name-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    width: 100%;
    background-image: url('https://cdn.pixabay.com/photo/2020/07/12/16/40/paris-5397889_1280.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: white;
    font-weight: bold;
    > h1 {
      font-size: 4rem;
    }
  }
  .list-top {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #feb35c;
    height: 60px;
    top: 270px;
    z-index: 500;
    width: 80%;
    padding: 0px 30px 0px 30px;
    > a {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      width: 100px;
      height: 30px;
      font-weight: bold;
      border-radius: 10px;
    }
  }
`;

const CountryListBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  margin-top: 20px;

  .countrybox {
    display: flex;
    width: 80%;
    min-height: 600px;
    margin-top: 20px;
  }
  .hot-country {
    width: 70%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    > li {
      border: 0.5px solid black;
      display: flex;
      width: 100%;
      height: 100%;
      align-items: flex-end;

      > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        height: 25%;
        padding: 10px;
        font-size: 1.5rem;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
  }
  .random-country {
    width: 30%;
    display: grid;
    grid-template-rows: repeat(7, 1fr);

    > li {
      border: 0.5px solid black;
      display: flex;
      width: 100%;
      height: 100%;
      align-items: flex-end;
      justify-content: flex-end;
      > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 50%;
        height: 100%;
        padding: 10px;
        font-size: 1.5rem;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
  }
`;
// .random-country //repeat 첫인자에 랜덤으로 들어갈 개수 넣기

// FIXME: map사용해서 나라리스트 받아올때 href 라우팅걸기
