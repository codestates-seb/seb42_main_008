import styled from 'styled-components';
import ImageFilter from 'components/Main/ImageFilter';
import { useParams } from 'react-router-dom';
import countries from 'assets/countries.json';
import { CountryData, CountryNames } from 'interfaces/ContentList.interface';

const ListTitle = () => {
  const { continent, countryCode } = useParams();
  const countriesData: CountryData[] = countries[continent as keyof object];
  const countryName = countriesData.filter(item => item.code === countryCode)[0]
    .name;
  const names: CountryNames = {
    en: countryName.split('(')[1].slice(0, -1),
    ko: countryName.split('(')[0].slice(0, -1),
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
        <h1>{names.en.toUpperCase()}</h1>
        <h2>{names.ko}</h2>
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
`;

const Filter = styled(ImageFilter)`
  opacity: 0.35;
`;

export default ListTitle;
