import MapChart from 'components/ContienetSelect/MapChart';
import styled from 'styled-components';

const ContinentSelect = () => {
  return (
    <Container>
      <Title>
        <h1>대륙별 둘러보기</h1>
      </Title>
      <MapChart />
    </Container>
  );
};

const Container = styled.section`
  border: 1px solid red;
  width: 100%;
  height: calc(100vh - 60px);
  overflow: hidden;
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
  height: 80px;
  background-color: #feb35c;
  position: absolute;
  right: 0;
  top: 50px;
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
