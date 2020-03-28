
import React, { useState } from 'react'
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

import { InfoBox } from './info-box'
import { pubs } from '../helper/pubs'
import { beerIcon } from '../helper/base64Icons'

const Map = ReactMapboxGl({
  maxZoom: 18,
  minZoom: 8,
  accessToken:
    'pk.eyJ1IjoidG9iaW9iaSIsImEiOiJjazgxaGZwYTQwZ2F3M3RtczRodnRnOTE5In0.UtzN21VEExcNBBLikohQoA'
});

const image = new Image();
// https://base64.guru/converter/encode/image/svg
image.src = beerIcon;
const images = ['beer', image];

const MapBox = () => {
  let lat = 52.480728
  let long = 13.432050
  const [mapCenter, setMapCenter] = useState([long, lat])
  const [mapZoom, setMapZoom] = useState([12])
  const [pinInfo, setPinInfo] = useState(null)
  const [hoverInfo, setHoverInfo] = useState(null)

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {setMapCenter([pos.coords.longitude, pos.coords.latitude])})
  }

  fetch("https://api.skei.pe/v1/get_bars_in_vicinity?lat=" + lat + "&long=" + long)
    .then(res => res.json())
    .then(response => {
      console.log(response)
  })
  .catch(err => {
    console.error("Kneipen search is not working")
  });

  const onToggleHover = ({ map }, cursor, info) => {
    map.getCanvas().style.cursor = cursor;
    setHoverInfo(info)
  }

  const onToggleClick = (station) => {
    // const [x,y] = station.coordinates
    // setMapCenter([x,y +((0.002 * (18-mapZoom) )*.2)])
    setMapCenter(station.coordinates)
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
            onMouseEnter={(e) => onToggleHover(e, "pointer", pub)}
            onMouseLeave={(e) => onToggleHover(e, "", null)}
            onClick={() => onToggleClick(pub)}
          />
        ))}
      </Layer>
      {hoverInfo && <Popup coordinates={hoverInfo.coordinates}>
        <div className="info">
          <h3>
            {hoverInfo.name}
          </h3>
        </div>
      </Popup>}

      {pinInfo && <Popup coordinates={pinInfo.coordinates}>
        <div className="info">
          <div className="close" onClick={() => setPinInfo(null)}><div>x</div></div>
          <InfoBox
            headline={pinInfo.name}
            guestCount={pinInfo.guests}
            link={pinInfo.link}
            isOpen={pinInfo.isOpen}
            openingInfo={pinInfo.openingInfo}
          />
        </div>
      </Popup>}
      <style jsx>{`
      .mapboxgl-map {
        font-size: inherit;
      }
      .mapboxgl-popup-anchor-left .mapboxgl-popup-tip{
        border-right-color:rgba(42, 56, 65, 0.98);
      }
      .mapboxgl-popup-anchor-right .mapboxgl-popup-tip{
        border-left-color:rgba(42, 56, 65, 0.98);
      }
      .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip{
        border-top-color:rgba(42, 56, 65, 0.98);
      }
      .mapboxgl-popup-content{
        color: #F8F5EE;
        background: rgba(42, 56, 65, 0.98);
      }
      .info {
        position: relative;
      }
      .close {
        cursor: pointer;
        color: #153C56;
        position: absolute;
        right: -25px;
        top: -25px;
        width: 50px;
        height: 50px;
        background: #F8F5EE;
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