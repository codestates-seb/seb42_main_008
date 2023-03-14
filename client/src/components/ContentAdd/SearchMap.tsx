import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const SearchMap = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectPlace, setSelectPlace] =
    useState<google.maps.LatLngLiteral | null>(null);

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

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchInput}&key=${googlekey}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data.status === 'OK') {
        const result = data.results[0];
        const location = result.geometry.location;
        setSelectPlace(location);
        console.log(location);
        if (map) {
          map.panTo(location);
        }
      }
    } catch (error) {
      console.log(error);
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
  > input {
    border-radius: 20px;
    border: 1px solid #555555;
    outline: none;
    width: 100%;
    height: 30px;
    padding-left: 10px;
  }
`;
