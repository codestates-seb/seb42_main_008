import styled from 'styled-components';
import ImageFilter from 'styles/ImageFilter';
import { useNavigate, useParams } from 'react-router-dom';
import countries from 'assets/countries.json';
import { CountryData, CountryNames } from 'interfaces/ContentList.interface';
import { StyledButton } from 'styles/StyledButton';
import { MdArrowBackIosNew } from 'react-icons/md';

const ListTitle = () => {
  const navigate = useNavigate();
  const { continent, countryCode } = useParams();
  const countriesData: CountryData[] = countries[continent as keyof object];
  const countryName = countriesData.filter(item => item.code === countryCode)[0]
    .name;
  const continentName: string | undefined = continent
    ? continent[0].toUpperCase() + continent.slice(1)
    : undefined;
  const names: CountryNames = {
    en: countryName.split('(')[1].slice(0, -1),
    ko: countryName.split('(')[0].slice(0, -1),
  };

  const handleButtonClick = () => {
    navigate('/add', {
      state: {
        continent,
        countryCode,
      },
    });
  };

  const handleBackClick = () => {
    navigate(`/${continent}`);
  };

  return (
    <ListTitleWrapper
      style={{
        backgroundImage: `url(https://source.unsplash.com/featured/?${names.en.replace(
          /\s+/g,
          ''
        )},city)`,
      }}
    >
      <BackToContinent>
        <div className="continent-button" onClick={handleBackClick}>
          <span className="back-icon">
            <MdArrowBackIosNew />
          </span>
          {continentName}
        </div>
        <div className="background"></div>
      </BackToContinent>
      <TitleText>
        <h1 className="title-en">{names.en.toUpperCase()}</h1>
        <AddContentbutton onClick={handleButtonClick}>
          {names.ko}에서의 동행 찾기
        </AddContentbutton>
      </TitleText>
      <Filter></Filter>
    </ListTitleWrapper>
  );
};

const ListTitleWrapper = styled.section`
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

const TitleText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  color: #fff;
  text-align: center;
  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  .title-en {
    font-weight: 800;
    font-size: 4rem;
  }

  @media screen and (max-width: 992px) {
    .title-en {
      font-size: 3.5rem;
    }
  }
  @media screen and (max-width: 768px) {
    .title-en {
      font-size: 3rem;
    }
  }
  @media screen and (max-width: 576px) {
    .title-en {
      font-size: 2.3rem;
    }
  }
`;

const AddContentbutton = styled(StyledButton)`
  background-color: #fff;
  color: #222;
  :hover {
    background-color: #feb35c;
    color: #fff;
  }
  font-size: 1.1rem;
  @media screen and (max-width: 576px) {
    font-size: 1rem;
  }
`;

const Filter = styled(ImageFilter)`
  opacity: 0.35;
`;

const BackToContinent = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  padding: 0 20px;
  .background {
    width: 100%;
    height: 50px;
    background-color: black;
    opacity: 0.4;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .continent-button {
    color: #fff;
    opacity: 1;
    z-index: 11;
    position: absolute;
    top: 10px;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 7px;
    opacity: 0.8;
    cursor: pointer;
    transition: 0.3s;
  }
  .back-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :hover {
    .continent-button {
      transform: translateX(-5px);
      transition: 0.3s;
      opacity: 1;
    }
  }
`;

export default ListTitle;
