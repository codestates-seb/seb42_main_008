import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';

const CountrySelect = () => {
  const { continent } = useParams();
  const navigate = useNavigate();

  // 타이틀
  let title = '';
  let titleImg = '';
  type Countries = {
    name: string;
    code: string;
  };
  let countries: Countries[] = [];
  //대륙별 고정 국가
  if (continent === 'europe') {
    title = 'Europe';
    titleImg =
      'https://cdn.pixabay.com/photo/2020/07/12/16/40/paris-5397889_1280.jpg';
    countries = [
      {
        name: 'England',
        code: 'gbr',
      },
      {
        name: 'France',
        code: 'fra',
      },
      {
        name: 'Spain',
        code: 'esp',
      },
      {
        name: 'Germany',
        code: 'deu',
      },
    ];
  } else if (continent === 'africa') {
    title = 'Africa';
    titleImg =
      'https://cdn.pixabay.com/photo/2019/03/02/21/25/morocco-4030733_1280.jpg';
    countries = [
      {
        name: 'Egypt',
        code: 'egy',
      },
      {
        name: 'Morocco',
        code: 'mar',
      },
      {
        name: 'South Africa',
        code: 'zaf',
      },
      {
        name: 'Kenya',
        code: 'ken',
      },
    ];
  } else if (continent === 'asia') {
    title = 'Asia';
    titleImg =
      'https://cdn.pixabay.com/photo/2020/07/23/01/16/heritage-5430081_1280.jpg';
    countries = [
      {
        name: 'Korea',
        code: 'kor',
      },
      {
        name: 'Japan',
        code: 'jpn',
      },
      {
        name: 'China',
        code: 'chn',
      },
      {
        name: 'Vietnam',
        code: 'vnm',
      },
    ];
  } else if (continent === 'northAmerica') {
    title = 'North America';
    titleImg =
      'https://cdn.pixabay.com/photo/2020/06/08/20/58/nyc-5276112__480.jpg';
    countries = [
      {
        name: 'USA',
        code: 'usa',
      },
      {
        name: 'Canada',
        code: 'can',
      },
      {
        name: 'Mexico',
        code: 'mex',
      },
      {
        name: 'Cuba',
        code: 'cub',
      },
    ];
  } else if (continent === 'southAmerica') {
    title = 'South America';
    titleImg =
      'https://cdn.pixabay.com/photo/2019/02/06/00/06/peru-3978148_1280.jpg';
    countries = [
      {
        name: 'Brazil',
        code: 'bra',
      },
      {
        name: 'Peru',
        code: 'per',
      },
      {
        name: 'Argentina',
        code: 'arg',
      },
      {
        name: 'Chile',
        code: 'bol',
      },
    ];
  } else if (continent === 'oceania') {
    title = 'Oceania';
    titleImg =
      'https://cdn.pixabay.com/photo/2019/05/15/18/22/sydney-4205646_1280.jpg';
    countries = [
      {
        name: 'Australia',
        code: 'aus',
      },
      {
        name: 'New Zealand',
        code: 'nzl',
      },
      {
        name: 'Fiji',
        code: 'fji',
      },
      {
        name: 'Papua New Guinea',
        code: 'png',
      },
    ];
  }

  const handleCountryClick = (code: string): void => {
    navigate(`/${continent}/${code}`);
  };

  return (
    <CountryListContainer>
      <div
        className="country-name-box"
        style={{ backgroundImage: `url(${titleImg})` }}
      >
        <h1>{title}</h1>
        <p>동행자를 구하고 싶은 나라를 선택해보세요!</p>
      </div>
      <div className="list-top">
        <div>내가 함께하고 싶은 도시가 없나요?</div>
        <Link to="/add">글 작성하기</Link>
      </div>
      <CountryListBox>
        <div className="countrybox">
          <ul className="hot-country">
            {countries.map((country, idx) => (
              <li
                onClick={() => handleCountryClick(country.code)}
                key={idx}
                style={{
                  backgroundImage: `url(
                    https://source.unsplash.com/featured/?${country.name.replace(
                      /\s+/g,
                      ','
                    )},travel
                  )`,
                  backgroundSize: `100% 100%`,
                  backgroundRepeat: `no-repeat`,
                  cursor: 'pointer',
                }}
              >
                <div>
                  {country.name} <FaChevronRight />
                </div>
              </li>
            ))}
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
        font-size: 2rem;
      }
    }
    > p {
      font-size: 1rem;
      @media screen and (max-width: 768px) {
        font-size: 0.8rem;
      }
      @media screen and (max-width: 576px) {
        font-size: 0.6rem;
      }
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
    font-size: 1rem;
    @media screen and (max-width: 768px) {
      font-size: 0.8rem;
    }
    @media screen and (max-width: 576px) {
      font-size: 0.6rem;
    }
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
  margin-bottom: 20px;

  .countrybox {
    display: flex;
    width: 80%;
    min-height: 600px;
    margin-top: 20px;

    @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      width: 100%;
      align-items: center;
    }
  }
  .hot-country {
    width: 70%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);

    @media screen and (max-width: 768px) {
      display: grid;
      width: 80%;
      flex-direction: column;
      margin-top: 20px;
      grid-template-columns: repeat(1, 1fr);
    }
    > li {
      border: 0.5px solid black;
      display: flex;
      width: 100%;
      height: 100%;
      align-items: flex-end;
      @media screen and (max-width: 768px) {
        display: flex;
        justify-content: flex-end;
      }

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
        @media screen and (max-width: 768px) {
          display: flex;
          align-items: center;
          width: 50%;
          height: 100%;
          padding: 10px;
          background-color: rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
  .random-country {
    width: 30%;
    display: grid;
    grid-template-rows: repeat(7, 1fr);

    @media screen and (max-width: 768px) {
      display: grid;
      flex-direction: column;
      grid-template-columns: repeat(1, 1fr);
      width: 80%;
    }

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
