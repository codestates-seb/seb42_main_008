import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import Loader from 'components/Loader';
import { detailInfo } from 'interfaces/ContentDetail.interface';
import { MdLocationOn } from 'react-icons/md';
import styled from 'styled-components';

const SearchMap = ({ detail }: { detail: detailInfo }) => {
  const googleMapKey: string | undefined = process.env.REACT_APP_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapKey || '키가 없어요',
  });
  const center = {
    lat: detail.lat,
    lng: detail.lng,
  };

  return isLoaded ? (
    <MapContent>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        <MarkerF position={center} />
      </GoogleMap>
      <MapPlace>
        <LocationPin />
        {detail.address}
      </MapPlace>
    </MapContent>
  ) : (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
};

export default SearchMap;

const containerStyle = {
  width: '100%',
  height: '350px',
};

const MapContent = styled.section`
  padding: 10px;
  width: 100%;
`;
const LoaderContainer = styled(MapContent)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MapPlace = styled.div`
  background-color: white;
  border: 1px solid #555555;
  width: 100%;
  padding: 5px;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  align-items: center;
`;

const LocationPin = styled(MdLocationOn)`
  font-size: 1.5rem;
`;

/* TODO:
1. 기본 구조 * 
2. 지도 API * 
2-1. 위치 핀 찍기 *
2-2. 위치 핀찍은 장소 렌더링 *
3. useEffect 로 Loading 없애기
*/
