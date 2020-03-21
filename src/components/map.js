
import React, { useState } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoidG9iaW9iaSIsImEiOiJjazgxaGZwYTQwZ2F3M3RtczRodnRnOTE5In0.UtzN21VEExcNBBLikohQoA'
});

const getCirclePaint = {
  'circle-radius': 15,
  'circle-color': '#53f',
  'circle-opacity': 0.8
};


const MapBox = () => {
  const [mapCenter, setMapCenter] = useState([8.6817, 50.1114])
  const [mapZoom, setMapZoom] = useState([10])
  const [pinInfo, setPinInfo] = useState({})


  const onToggleHover = ({ map }, cursor) => {
    map.getCanvas().style.cursor = cursor;
  }

  const onToggleClick = (station) => {
    setMapCenter([8.6817, 50.1113])
    setPinInfo(station)
    // setMapZoom([14]) //TODO: doesn' work parallel to center change
  }

  return (
    <Map
      zoom={mapZoom}
      center={mapCenter}
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: '100vh',
        width: '100vw'
      }}
    >
      <Layer type="circle" paint={getCirclePaint}>
        <Feature
          coordinates={[8.6817, 50.1114,]}
          onMouseEnter={(e) => onToggleHover(e, "pointer")}
          onMouseLeave={(e) => onToggleHover(e, "")}
          onClick={onToggleClick}
        />
      </Layer>
    </Map>
  )
}

export { MapBox }



