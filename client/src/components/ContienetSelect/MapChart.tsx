import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

interface PropsType {
  handleMarkerClick(code: string): void;
}

interface MarkerInterface {
  markerOffset: number;
  name: string;
  coordinates: [number, number];
  code: string;
}

const MapChart = ({ handleMarkerClick }: PropsType) => {
  const geoUrl: string =
    'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

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
      <g transform="translate(-37, -39)">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="73px"
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
          fontSize: '0.6rem',
          fontWeight: '900',
        }}
      >
        {name}
      </text>
    </Marker>
  ));

  return (
    <ComposableMap
      projection="geoEquirectangular"
      projectionConfig={{ scale: 120, center: [0, 25] }}
      height={395}
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
