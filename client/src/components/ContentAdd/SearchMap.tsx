import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt } from 'react-icons/fa';
interface LatLngWithAddress extends google.maps.LatLngLiteral {
  address: string;
}

const SearchMap = ({
  savedAddress,
  setSavedAddress,
  markerLocation,
  setMarkerLocation,
}: any) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectPlace, setSelectPlace] = useState<LatLngWithAddress | null>(
    null
  );

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const googlekey: any = process.env.REACT_APP_API_KEY;

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchInput}&key=${process.env.REACT_APP_API_KEY}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data.status === 'OK') {
        const result = data.results[0];
        const location = result.geometry.location;
        const formmatedAddress = result.formatted_address;
        setSelectPlace({
          lat: Number(location.lat),
          lng: Number(location.lng),
          address: formmatedAddress,
        });
        setSavedAddress(formmatedAddress);
        setMarkerLocation(location);
        if (map) {
          map.panTo(location);
        }
      }
    } catch (error) {
      console.log(error);
      console.log(markerLocation);
    }
  };

  return (
    <LoadScript googleMapsApiKey={googlekey}>
      <SearchForm onSubmit={handleSearchSubmit}>
        <input type="text" value={searchInput} onChange={handleSearch} />
        <button type="submit">Search</button>
      </SearchForm>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
      >
        {selectPlace && <Marker position={selectPlace} />}
      </GoogleMap>
      {selectPlace && (
        <AddressRender>
          <FaMapMarkerAlt className="mark-icon" />
          <div>{savedAddress}</div>
        </AddressRender>
      )}
    </LoadScript>
  );
};

export default SearchMap;

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 37.5665,
  lng: 126.978,
};

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  justify-content: space-between;
  > input {
    border-radius: 20px;
    border: 1px solid #555555;
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
