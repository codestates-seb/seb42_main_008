import MapChart from 'components/ContienetSelect/MapChart';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';

interface Continent {
  name: string;
  code: string;
}

const ContinentSelect = () => {
  const navigate = useNavigate();

  const CONTINENTS: Continent[] = [
    { name: 'Africa', code: 'africa' },
    { name: 'Asia', code: 'asia' },
    { name: 'Europe', code: 'europe' },
    { name: 'North America', code: 'northAmerica' },
    { name: 'Oceania', code: 'oceania' },
    { name: 'South America', code: 'southAmerica' },
  ];

  const handleMarkerClick = (code: string): void => {
    navigate(`/${code}`);
  };

  return (
    <Container>
      <Title>
        <h1>파티 구할 대륙 선택하기</h1>
      </Title>
      <MapContainer>
        <MapChart handleMarkerClick={handleMarkerClick} />
      </MapContainer>
      <ContinentList>
        <ul>
          {CONTINENTS.map((continent, idx) => (
            <ContinentContent
              key={idx}
              style={{
                backgroundImage: `url(https://source.unsplash.com/featured/?${continent.code},city)`,
              }}
              role="presentation"
              onClick={() => handleMarkerClick(continent.code)}
            >
              <ImageFilter></ImageFilter>
              <p>
                {continent.name}&nbsp;&nbsp;
                <MdArrowForwardIos />
              </p>
            </ContinentContent>
          ))}
        </ul>
      </ContinentList>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
`;

const Title = styled.div`
  width: 70%;
  height: 70px;
  background-color: #feb35c;
  position: absolute;
  right: 0;
  top: 70px;
  display: flex;
  align-items: center;
  padding: 30px;
  > h1 {
    color: #fff;
    font-weight: 800;
    font-size: 1.8rem;
  }
  @media screen and (max-width: 992px) {
    height: 60px;
  }
  @media screen and (max-width: 576px) {
    > h1 {
      font-size: 1.5rem;
    }
  }
`;

const MapContainer = styled.section`
  width: 100%;
  g {
    > path {
      :nth-of-type(7) {
        display: none;
      }
    }
  }
  .rsm-marker {
    cursor: pointer;
    :hover {
      path {
        fill: #feb35c;
      }
    }
  }
  .rsm-svg {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ContinentList = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5d62a0;
  padding: auto;
  > ul {
    width: 100%;
    padding: 50px 100px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 250px);
  }
  @media screen and (max-width: 768px) {
    background-color: #fff;
    > ul {
      padding: 50px;
      padding-top: 100px;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 250px);
    }
  }
  @media screen and (max-width: 576px) {
    > ul {
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: repeat(6, 200px);
    }
  }
`;

const ContinentContent = styled.li`
  border: 1px solid #444;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  > p {
    width: 100%;
    height: 80px;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    font-size: 1.5rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px;
    z-index: 2;
  }
`;

const ImageFilter = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000650;
  opacity: 0.25;
`;

export default ContinentSelect;
