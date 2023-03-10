import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { useNavigate } from 'react-router-dom';

const MapChart = () => {
  const navigate = useNavigate();
  const geoUrl: string =
    'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

  const handleMarkerClick = (code: string) => {
    navigate(`/${code}`);
  };

  interface MarkerInterface {
    markerOffset: number;
    name: string;
    // eslint-disable-next-line
    coordinates: any;
    code: string;
  }

  const markers: MarkerInterface[] = [
    {
      markerOffset: 15,
      name: 'North America',
      coordinates: [-100.1551, 48.801],
      code: 'northAmerica',
    },

    {
      markerOffset: 15,
      name: 'South America',
      coordinates: [-56.0721, -10.711],
      code: 'southAmerica',
    },
    {
      markerOffset: 15,
      name: 'Europe',
      coordinates: [14.1551, 55],
      code: 'europe',
    },
    {
      markerOffset: 15,
      name: 'Africa',
      coordinates: [20.1551, 7],
      code: 'africa',
    },
    {
      markerOffset: 15,
      name: 'Asia',
      coordinates: [90.59, 40.33],
      code: 'asia',
    },
    {
      markerOffset: 15,
      name: 'Oceania',
      coordinates: [136.59, -25.33],
      code: 'oceania',
    },
  ];

  const mapMarker = markers.map(({ name, coordinates, markerOffset, code }) => (
    <Marker
      key={name}
      coordinates={coordinates}
      onClick={() => handleMarkerClick(code)}
    >
      <g transform="translate(-55, -38)">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="110px"
          height="50px"
          viewBox="0 0 163.000000 81.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,81.000000) scale(0.050000,-0.050000)"
            fill="#5D62A0"
            stroke="none"
          >
            <path d="M108 1597 c-99 -48 -108 -100 -108 -596 0 -673 -65 -621 786 -621 l624 0 109 -190 c72 -124 115 -181 125 -165 9 14 58 99 110 190 l93 165 626 0 c853 0 787 -52 787 620 0 502 -9 550 -109 596 -69 31 -2979 32 -3043 1z" />
          </g>
        </svg>
      </g>
      <text
        textAnchor="middle"
        y={markerOffset - 30}
        style={{
          fill: 'white',
          fontSize: '0.8rem',
          fontWeight: '900',
        }}
      >
        {name}
      </text>
    </Marker>
  ));

  return (
    <ComposableMap
      className="composableMap"
      projection="geoEquirectangular"
      projectionConfig={{ scale: 130 }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              name={geo.properties}
              style={{
                default: {
                  fill: '#BCBCBC',
                  outline: 'none',
                },
                hover: {
                  fill: '#BCBCBC',
                  outline: 'none',
                },
                pressed: {
                  fill: '#BCBCBC',
                  outline: 'none',
                },
              }}
            />
          ))
        }
      </Geographies>
      {mapMarker}
    </ComposableMap>
  );
};

export default MapChart;
