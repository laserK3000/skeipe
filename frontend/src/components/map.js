
import React, { useState } from 'react'
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

import { InfoBox } from './info-box'
import { pubs } from '../helper/pubs'
import { beerIcon } from '../helper/base64Icons'

const Map = ReactMapboxGl({
  minZoom: 8,
  accessToken:
    'pk.eyJ1IjoidG9iaW9iaSIsImEiOiJjazgxaGZwYTQwZ2F3M3RtczRodnRnOTE5In0.UtzN21VEExcNBBLikohQoA'
});

const image = new Image();
// https://base64.guru/converter/encode/image/svg
image.src = beerIcon;
const images = ['beer', image];

const MapBox = () => {
  const [mapCenter, setMapCenter] = useState([8.6817, 50.1114])
  const [mapZoom, setMapZoom] = useState([12])
  const [pinInfo, setPinInfo] = useState(null)

  const onToggleHover = ({ map }, cursor) => {
    map.getCanvas().style.cursor = cursor;
  }

  const onToggleClick = (station) => {
    const [x, y] = station.coordinates
    setMapCenter([x, y])
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
      <Layer
        type="symbol"
        layout={{ "icon-image": "beer" }}
        images={images}
      >
        {pubs.map((pub) => (
          <Feature
            key={pub.name}
            coordinates={pub.coordinates}
            onMouseEnter={(e) => onToggleHover(e, "pointer")}
            onMouseLeave={(e) => onToggleHover(e, "")}
            onClick={() => onToggleClick(pub)}
          />
        ))}
      </Layer>

      {pinInfo && <Popup coordinates={pinInfo.coordinates}>
        <div className="info">
          <div className="close" onClick={() => setPinInfo(null)}><div>x</div></div>
          <InfoBox
            image={pinInfo.image}
            headline={pinInfo.name}
            link={pinInfo.link}
          />
        </div>
      </Popup>}
      <style jsx>{`
      .info {
        position: relative;
      }
      .close {
        cursor: pointer;
        color: #ddd;
        position: absolute;
        right: -25px;
        top: -25px;
        width: 50px;
        height: 50px;
        background: #333;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
        z-index: 5;
      }

  `}</style>
    </Map>
  )
}

export { MapBox }