import styled from 'styled-components';
import ImageFilter from 'styles/ImageFilter';
import { useNavigate, useParams } from 'react-router-dom';
import countries from 'assets/countries.json';
import { CountryData, CountryNames } from 'interfaces/ContentList.interface';
import { StyledButton } from 'styles/StyledButton';

const ListTitle = () => {
  const navigate = useNavigate();
  const { continent, countryCode } = useParams();
  const countriesData: CountryData[] = countries[continent as keyof object];
  const countryName = countriesData.filter(item => item.code === countryCode)[0]
    .name;
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

  return (
    <ListTitleWrapper
      style={{
        backgroundImage: `url(https://source.unsplash.com/featured/?${names.en.replace(
          /\s+/g,
          ''
        )},city)`,
      }}
    >
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

export default ListTitle;
