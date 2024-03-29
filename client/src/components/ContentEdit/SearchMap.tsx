import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  GoogleMap,
  LoadScriptProps,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import styled from 'styled-components';
import { FaMapMarkerAlt } from 'react-icons/fa';
interface LatLngWithAddress extends google.maps.LatLngLiteral {
  address: string | null;
}

interface Props {
  markerLocation: { lat: number; lng: number };
  savedAddress: string | null;
  setSavedAddress: Dispatch<SetStateAction<string | null>>;
  setMarkerLocation: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
}

const libraries: LoadScriptProps['libraries'] = ['places'];
const SearchMap: React.FC<Props> = ({
  savedAddress,
  setSavedAddress,
  markerLocation,
  setMarkerLocation,
}) => {
  // 구글 api
  const googleKey: string | undefined = process.env.REACT_APP_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleKey || '키가 없어요',
    libraries,
  });
  const initialCenter = {
    lat: 37.5665,
    lng: 126.978,
  };
  //  마커위치 및 화면 위치
  const [center, setCenter] =
    useState<google.maps.LatLngLiteral>(initialCenter);

  // 포인트 위치정보와 주소
  const [markerPosition, setMarkerPosition] =
    useState<LatLngWithAddress | null>({
      lat: markerLocation.lat,
      lng: markerLocation.lng,
      address: savedAddress,
    });
  // 인풋값
  const [searchPlace, setSearchPlace] = useState('');

  // 맵클릭시 마커 이동
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const geocoder = new google.maps.Geocoder();
      const latLng: LatLngWithAddress = {
        ...event.latLng.toJSON(),
        address: '',
      };
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results) {
          const location = results[0].geometry.location.toJSON();
          const formmatedAddress = results[0].formatted_address;
          setMarkerPosition(latLng);
          setCenter(location);
          setSavedAddress(formmatedAddress);
          setMarkerLocation(location);
        }
      });
    }
  };

  // 검색 인풋 핸들러
  const handlePlaceSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPlace(e.target.value);
  };

  // 장소 검색, 마커 이동, 센터 이동
  const handleSearchClick = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { address: searchPlace },
      (
        results: google.maps.GeocoderResult[] | null,
        status: google.maps.GeocoderStatus
      ) => {
        if (status === google.maps.GeocoderStatus.OK && results) {
          const location = results[0].geometry.location.toJSON();
          const formmatedAddress = results[0].formatted_address;
          setMarkerPosition({
            lat: Number(location.lat),
            lng: Number(location.lng),
            address: formmatedAddress,
          });
          setSavedAddress(formmatedAddress);
          setCenter(location);
          setMarkerLocation(location);
        }
      }
    );
  };

  return isLoaded ? (
    <div>
      <SearchForm onSubmit={handleSearchClick}>
        <input type="text" onChange={handlePlaceSelect} />
        <button type="submit">Search</button>
      </SearchForm>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleMapClick}
      >
        {markerPosition && (
          <MarkerF
            position={
              markerPosition && {
                lat: markerPosition.lat,
                lng: markerPosition.lng,
              }
            }
          />
        )}
      </GoogleMap>
      {markerPosition && (
        <AddressRender>
          <FaMapMarkerAlt className="mark-icon" />
          <div>{savedAddress}</div>
        </AddressRender>
      )}
    </div>
  ) : (
    <></>
  );
};

export default SearchMap;

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '400px',
};

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  justify-content: space-between;
  > input {
    border-radius: 20px;
    border: 1px solid #cecece;
    outline: none;
    width: 80%;
    height: 30px;
    padding-left: 10px;
  }
  > button {
    border: none;
    color: white;
    width: 20%;
    background-color: #feb35c;
    border-radius: 30px;
    cursor: pointer;
  }
`;
const AddressRender = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-top: none;
  border-radius: 0px 0px 10px 10px;
  font-size: 1.3rem;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 576px) {
    font-size: 0.8rem;
  }
  .mark-icon {
    width: 10%;
  }
`;
