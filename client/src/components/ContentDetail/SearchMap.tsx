import styled from 'styled-components';

const SearchMap = () => {
  return (
    <MapContent>
      <div className="map-place">지도자리 입니다~!</div>
    </MapContent>
  );
};

export default SearchMap;

const MapContent = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 300px;
`;

/* TODO:
1. 기본 구조
2. 지도 API
2-1. 위치 핀 찍기
2-2. 위치 핀찍은 장소 렌더링
*/
