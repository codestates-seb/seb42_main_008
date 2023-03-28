import MapChart from 'components/ContienetSelect/MapChart';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';

interface Continent {
  name: string;
  code: string;
  image: string;
}

const ContinentSelect = () => {
  const navigate = useNavigate();

  const CONTINENTS: Continent[] = [
    {
      name: 'Africa',
      code: 'africa',
      image:
        'https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80',
    },
    {
      name: 'Asia',
      code: 'asia',
      image:
        'https://images.unsplash.com/photo-1522547902298-51566e4fb383?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    },
    {
      name: 'Europe',
      code: 'europe',
      image:
        'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2920&q=80',
    },
    {
      name: 'North America',
      code: 'northAmerica',
      image:
        'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
    },
    {
      name: 'Oceania',
      code: 'oceania',
      image:
        'https://images.unsplash.com/photo-1589330273594-fade1ee91647?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
    {
      name: 'South America',
      code: 'southAmerica',
      image:
        'https://images.unsplash.com/photo-1504814532849-cff240bbc503?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2500&q=80',
    },
  ];

  const handleMarkerClick = (code: string): void => {
    navigate(`/${code}`);
  };

  return (
    <Container>
      <Title>
        <h1 className="title-text">파티 구하러 가기</h1>
      </Title>
      <MapContainer>
        <MapChart handleMarkerClick={handleMarkerClick} />
      </MapContainer>
      <ContinentList>
        <ul className="continent-list">
          {CONTINENTS.map((continent, idx) => (
            <ContinentContent
              key={idx}
              // style={{
              //   backgroundImage: `url(${continent.image})`,
              // }}
              role="presentation"
              onClick={() => handleMarkerClick(continent.code)}
            >
              <ImageFilter></ImageFilter>
              <div className="continent-name">
                <p className="continent-name-text">
                  {continent.name}&nbsp;&nbsp;
                  <span className="continent-name-icon">
                    <MdArrowForwardIos />
                  </span>
                </p>
              </div>
              <img
                className="continent-image"
                src={continent.image}
                alt={continent.name}
              />
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
  .title-text {
    color: #fff;
    font-weight: 800;
    font-size: 1.8rem;
  }
  @media screen and (max-width: 992px) {
    height: 60px;
  }
  @media screen and (max-width: 576px) {
    .title-text {
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
  .continent-list {
    width: 100%;
    padding: 50px 100px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 250px);
  }
  @media screen and (max-width: 768px) {
    background-color: #fff;
    .continent-list {
      padding: 50px;
      padding-top: 100px;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 250px);
    }
  }
  @media screen and (max-width: 576px) {
    .continent-list {
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: repeat(6, 200px);
    }
  }
`;

const ContinentContent = styled.li`
  border: 1px solid #444;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  .continent-name {
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
    z-index: 20;
  }
  .continent-name-text {
    display: flex;
    align-items: center;
    transition: 0.3s;
  }
  .continent-name-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
  }
  .continent-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: 0.3s;
  }
  :hover {
    .continent-image {
      scale: 1.1;
      transition: 0.3s;
    }
    .continent-name-icon {
      transform: translateX(5px);
      transition: 0.3s;
    }
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
  z-index: 10;
`;

export default ContinentSelect;
