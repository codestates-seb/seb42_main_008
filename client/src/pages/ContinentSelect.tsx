import MapChart from 'components/ContienetSelect/MapChart';
import styled from 'styled-components';

const ContinentSelect = () => {
  return (
    <>
      <Title>
        <h1>대륙별 둘러보기</h1>
      </Title>
      <MapContainer>
        <MapChart />
      </MapContainer>
    </>
  );
};

const MapContainer = styled.section`
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: hidden;
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
`;

export default ContinentSelect;
