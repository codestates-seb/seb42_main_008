import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';
import randomCountries from '../assets/countries.json';
import { useRecoilValue } from 'recoil';
import { loginState } from 'states/userState';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import customAxios from 'api/customAxios';
const randomCountriesPick: RandomCountries = randomCountries;
type RandomCountries = {
  [key: string]: {
    name: string;
    code: string;
    image?: string;
  }[];
};
type Countries = {
  name: string;
  code: string;
  image: string;
};
let countries: Countries[] = [];

interface Props {
  filteredCountry: string[];
}

const CountrySelect = () => {
  const { continent } = useParams<{ continent: string }>();
  const navigate = useNavigate();

  // 대륙에 맞는 대륙번호
  let continentNumber: number;
  if (continent === 'africa') {
    continentNumber = 1;
  } else if (continent === 'asia') {
    continentNumber = 2;
  } else if (continent === 'europe') {
    continentNumber = 3;
  } else if (continent === 'northAmerica') {
    continentNumber = 4;
  } else if (continent === 'oceania') {
    continentNumber = 5;
  } else if (continent === 'southAmerica') {
    continentNumber = 6;
  }

  //현재 대륙에서 나라 글작성된 국가리스트 받아오기
  const [countryList, setCountryList] = useState([]);
  useEffect(() => {
    console.log(randomCountries);
    customAxios
      .get(`/companions/continents?continent=${continentNumber}`)
      .then(response => {
        setCountryList(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // 타이틀
  let title = '';
  let titleImg = '';

  //대륙별 고정 국가
  if (continent === 'europe') {
    title = 'Europe';
    titleImg =
      'https://cdn.pixabay.com/photo/2020/07/12/16/40/paris-5397889_1280.jpg';
    countries = [
      {
        name: 'United Kingdom',
        code: 'gbr',
        image:
          'https://images.unsplash.com/photo-1514729797186-944d57303199?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
      {
        name: 'France',
        code: 'fra',
        image:
          'https://images.unsplash.com/photo-1605701877331-645ad05dcb97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80',
      },
      {
        name: 'Spain',
        code: 'esp',
        image:
          'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
      },
      {
        name: 'Germany',
        code: 'deu',
        image:
          'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
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
        image:
          'https://cdn.pixabay.com/photo/2018/10/17/11/45/pyramids-3753769_1280.jpg',
      },
      {
        name: 'Morocco',
        code: 'mar',
        image:
          'https://cdn.pixabay.com/photo/2019/09/24/09/58/marrakech-4500910_1280.jpg',
      },
      {
        name: 'South Africa',
        code: 'zaf',
        image:
          'https://cdn.pixabay.com/photo/2017/01/15/18/55/south-africa-1982418_1280.jpg',
      },
      {
        name: 'Kenya',
        code: 'ken',
        image:
          'https://cdn.pixabay.com/photo/2017/03/27/13/02/elephants-2178578_1280.jpg',
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
        image:
          'https://as2.ftcdn.net/v2/jpg/01/75/43/47/1000_F_175434765_8BcLDKzt4asGu2TUe0EXkQZVGPBIQYOO.jpg',
      },
      {
        name: 'Japan',
        code: 'jpn',
        image:
          'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80',
      },
      {
        name: 'China',
        code: 'chn',
        image:
          'https://images.unsplash.com/photo-1600160366979-6ba227486e30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
      {
        name: 'Vietnam',
        code: 'vnm',
        image:
          'https://images.unsplash.com/photo-1526139334526-f591a54b477c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
    ];
  } else if (continent === 'northAmerica') {
    title = 'North America';
    titleImg =
      'https://cdn.pixabay.com/photo/2020/06/08/20/58/nyc-5276112_1280.jpg';
    countries = [
      {
        name: 'USA',
        code: 'usa',
        image:
          'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      },
      {
        name: 'Canada',
        code: 'can',
        image:
          'https://images.unsplash.com/photo-1533417457911-4ec911485388?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2874&q=80',
      },
      {
        name: 'Mexico',
        code: 'mex',
        image:
          'https://images.unsplash.com/photo-1547995886-6dc09384c6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2826&q=80',
      },
      {
        name: 'Cuba',
        code: 'cub',
        image:
          'https://images.unsplash.com/photo-1570299437488-d430e1e677c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80',
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
        image:
          'https://images.unsplash.com/photo-1619546952812-520e98064a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80',
      },
      {
        name: 'Peru',
        code: 'per',
        image:
          'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
      },
      {
        name: 'Argentina',
        code: 'arg',
        image:
          'https://images.unsplash.com/photo-1600627094717-809e6a3f29f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2865&q=80',
      },
      {
        name: 'Chile',
        code: 'bol',
        image:
          'https://images.unsplash.com/photo-1490782300182-697b80ad4293?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3027&q=80',
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
        image:
          'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2833&q=80',
      },
      {
        name: 'New Zealand',
        code: 'nzl',
        image:
          'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80',
      },
      {
        name: 'Fiji',
        code: 'fji',
        image:
          'https://images.unsplash.com/photo-1541292426587-b6ca8230532b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      },
      {
        name: 'Papua New Guinea',
        code: 'png',
        image:
          'https://images.unsplash.com/photo-1613183919710-2ff7b3bec845?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
      },
    ];
  }
  // 변경 : 해당대륙으로만 필터된 배열
  // 이 배열에서 글이 작성된 국가만 가져와야함
  //countryList 배열 = [{nationCode:'jpn',companionsCount:3}]
  let filteredrandomCountriesPick: any = [];
  if (continent !== undefined) {
    filteredrandomCountriesPick = randomCountriesPick[continent];
  }

  const codes = countries.map((country: any) => country.code);

  const nationCodeChange = countryList
    .filter((country: any) => {
      return !codes.includes(country.nationCode);
    })
    .sort((a: any, b: any) => b.companionsCount - a.companionsCount);
  const nationCode = nationCodeChange.map((country: any) => country.nationCode);

  //정렬 미치겠다!!!!!!!!!!
  const filteredCountry = filteredrandomCountriesPick
    .filter((country: any) => nationCode.includes(country.code))
    .sort((a: any, b: any) => {
      const indexA = nationCode.indexOf(a.code);
      const indexB = nationCode.indexOf(b.code);
      return indexA - indexB;
    });

  // 위 배열 상태는 유명 4개국가는 제외시켜놓은, 글이 작성된 국가의 국가코드로만 이루어진 배열

  // 코드값들로 배열변환, 일치하는지 통과 판별 some() >> 걸러야되는 4개국가
  // const excludedCountries = countries
  //   .map(obj => obj.code)
  //   .filter(code =>
  //     filteredrandomCountriesPick.some((country: any) => country.code === code)
  //   )
  //   .slice(0, 4);
  // 유명국가 4개를 제거하고 7개 잘라내기
  // filteredrandomCountriesPick = filteredrandomCountriesPick
  //   .filter((country: any) => !excludedCountries.includes(country.code))
  //   .slice(0, 7);

  const handleCountryClick = (code: string): void => {
    navigate(`/${continent}/${code}`);
  };

  // 로그인 사용자만 글작성 이동 클릭 라우터
  const login = useRecoilValue(loginState);
  const countryCode = '';
  const handleMoveAddPage = () => {
    if (login === true) {
      navigate('/add', {
        state: {
          continent,
          countryCode,
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        text: '로그인이 필요한 서비스입니다',
      });
      navigate('/login');
    }
  };
  return (
    <CountryListContainer>
      <div
        className="country-name-box"
        style={{ backgroundImage: `url(${titleImg})` }}
      >
        <ImageFilter></ImageFilter>
        <h1>{title.toUpperCase()}</h1>
        <p>동행자를 구하고 싶은 나라를 선택해보세요!</p>
      </div>
      <div className="list-top">
        <div>내가 함께하고 싶은 도시가 없나요?</div>
        <div className="addpage-route" onClick={handleMoveAddPage}>
          글 작성하기
        </div>
      </div>
      <CountryListBox filteredCountry={filteredCountry}>
        <div className="countrybox">
          <ul className="hot-country">
            {countries.map((country, index) => (
              <li
                onClick={() => handleCountryClick(country.code)}
                key={index}
                style={{
                  backgroundImage: `url(${country.image})`,
                  backgroundSize: `cover`,
                  backgroundPosition: 'center',
                  backgroundRepeat: `no-repeat`,
                  cursor: 'pointer',
                }}
              >
                <ImageFilter></ImageFilter>

                <div>
                  {country.name} <FaChevronRight />
                </div>
              </li>
            ))}
          </ul>
          <ul className="random-country">
            {filteredCountry.map((country: any, index: number) => {
              return (
                <li
                  key={index}
                  onClick={() => handleCountryClick(country.code)}
                  style={{
                    backgroundImage: `url(${country.image})`,
                    backgroundRepeat: `no-repeat`,
                    cursor: 'pointer',
                    backgroundSize: `cover`,
                    backgroundPosition: 'center',
                  }}
                >
                  <ImageFilter></ImageFilter>
                  <div>
                    <div>{country.name.match(/[a-zA-Z\s]+/g)}</div>
                    <FaChevronRight />
                  </div>
                </li>
              );
            })}
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
  height: 100%;

  .country-name-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    width: 100%;
    position: relative;
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
        font-size: 2rem;
      }
    }
    > p {
      font-size: 1rem;
      z-index: 20;
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
    color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    @media screen and (max-width: 768px) {
      font-size: 0.8rem;
    }
    @media screen and (max-width: 576px) {
      font-size: 0.6rem;
    }
    > .addpage-route {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      width: 100px;
      height: 30px;
      font-weight: bold;
      border-radius: 10px;
      cursor: pointer;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      color: black;
      transition: 0.3s;
      &:hover {
        background-color: #feb35c;
        color: white;
        box-shadow: 0px 0px 10px #fff;
        transition: 0.3s;
      }
    }
  }
`;

const CountryListBox = styled.section<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 100%;

  .countrybox {
    display: grid;
    width: 80%;
    min-height: 600px;
    margin-top: 20px;
    height: 100%;
    grid-template-columns: ${(props: any) =>
      props.filteredCountry.length !== 0 ? `7fr 3fr` : `10fr 0fr`};

    @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      width: 100%;
      align-items: center;
    }
  }
  .hot-country {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    position: relative;
    @media screen and (max-width: 768px) {
      display: grid;
      width: 80%;
      flex-direction: column;
      margin-top: 20px;
      height: 600px;
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: repeat(4, 1fr);
    }
    > li {
      border: 0.5px solid black;
      display: flex;
      width: 100%;
      height: 100%;
      align-items: flex-end;
      position: relative;

      @media screen and (max-width: 768px) {
        display: flex;
        justify-content: flex-end;
      }

      > div {
        word-wrap: break-word;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        height: 25%;
        padding: 10px;
        font-size: 1.5rem;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 20;
        @media screen and (max-width: 768px) {
          display: flex;
          align-items: center;
          width: 50%;
          height: 100%;
          padding: 10px;
          font-size: 1.2rem;
          background-color: rgba(0, 0, 0, 0.3);
        }

        @media screen and (max-width: 576px) {
          font-size: 0.8rem;
        }
      }
    }
  }
  .random-country {
    display: grid;
    grid-template-rows: repeat(1fr);
    position: relative;

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
      position: relative;
      > div {
        word-wrap: break-word;
        display: flex;
        flex-direction: column;
        font-size: 1.2rem;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 100%;
        padding: 10px;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 20;
        @media screen and (max-width: 768px) {
          font-size: 1.2rem;
          flex-direction: row;
          justify-content: flex-end;
        }
        @media screen and (max-width: 576px) {
          font-size: 0.8rem;
          justify-content: flex-end;
        }
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 80%;
          max-height: 80%;
        }
      }
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
// .random-country //repeat 첫인자에 랜덤으로 들어갈 개수 넣기

// FIXME: map사용해서 나라리스트 받아올때 href 라우팅걸기
