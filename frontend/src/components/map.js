import React, { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import { GeolocateControl, NavigationControl } from 'mapbox-gl';

import { InfoBox } from './info-box'
import { pubs } from '../helper/pubs'
import { beerIcon } from '../helper/base64Icons'

import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-compass.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-geolocate.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-in.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-out.svg';
import { useApiService } from '../contexts/apiService';

import MOCK_get_bars_in_vincity from '../MOCK_get_bars_in_vincity';

const Map = ReactMapboxGl({
  maxZoom: 18,
  minZoom: 4,
  accessToken:
    'pk.eyJ1IjoidG9iaW9iaSIsImEiOiJjazgxaGZwYTQwZ2F3M3RtczRodnRnOTE5In0.UtzN21VEExcNBBLikohQoA',

});


const image = new Image();
// https://base64.guru/converter/encode/image/svg
image.src = beerIcon;
const images = ['beer', image];

const MapBox = () => {


  const apiService = useApiService();

  const [mapCenter, setMapCenter] = useState([13.432050, 52.480728])
  const [mapZoom, setMapZoom] = useState([12])
  const [pinInfo, setPinInfo] = useState(null)
  const [hoverInfo, setHoverInfo] = useState(null)
  const [pubs, setPubs] = useState([])


  const onToggleHover = ({ map }, cursor, info) => {
    map.getCanvas().style.cursor = cursor;
    setHoverInfo(info)
  }

  const onToggleClick = (pub) => {
    setPinInfo(pub)
  }

  // const moveToPub = useCallback((pub) => {
  //   ReactDOM.unstable_batchedUpdates(() => {
  //     const { coordinates: [x,y] } = pub
  //     setMapCenter([x,y +((0.002 * (18-mapZoom) )*.2)])
  //     setMapZoom([14])
  //
  //   }, [])
  // })

  const onMoveEnd = useCallback(async (map) => {
    try {

      const { lng, lat } = map.getCenter()
      const bounds = map.getBounds()
      const distance = Math.ceil(Math.max(
        Math.abs(bounds.getNorth() - bounds.getSouth()),
        Math.abs(bounds.getEast() - bounds.getWest()),
      ))
      // const allNewPubs = await apiService.getPubs(lng, lat, distance)
      const allNewPubs = MOCK_get_bars_in_vincity
      const trueNewPubs = allNewPubs.filter(nP => (!pubs.find(p => (p.id === nP.id))))
      setPubs([...pubs, ...trueNewPubs]);
    } catch (e) {
      // todo error handling
      console.error(e);
    }

  }, [apiService, pubs])

  return (
    <Map
      zoom={mapZoom}
      center={mapCenter}
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        flex: '1',
        width: '100%',
        outline: 'none',
      }}
      onMoveEnd={onMoveEnd}
      onStyleLoad={(map) => {
        map.addControl(
          new GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            showAccuracyCircle: false,
            showUserLocation: false
          })
        );
        map.addControl(new NavigationControl(
        ));
        onMoveEnd(map);

      }}
    >
      <Layer
        type="symbol"
        layout={{ 'icon-image': 'beer' }}
        images={images}
      >
        {pubs.map((pub) => (
          <Feature
            key={pub.name}
            coordinates={[pub.long, pub.lat]}
            onMouseEnter={(e) => onToggleHover(e, 'pointer', pub)}
            onMouseLeave={(e) => onToggleHover(e, '', null)}
            onClick={() => onToggleClick(pub)}
          />
        ))}
      </Layer>
      {hoverInfo && <Popup coordinates={[hoverInfo.long, hoverInfo.lat]}>
        <div className="info">
          <h3>
            {hoverInfo.name}
          </h3>
        </div>
      </Popup>}

      {pinInfo && <Popup coordinates={[pinInfo.long, pinInfo.lat]}>
        <div className="info">
          <div className="close" onClick={() => setPinInfo(null)}>
            <div>x</div>
          </div>
          <InfoBox
            headline={pinInfo.name}
            guestCount={pinInfo.guests}
            link={pinInfo.link}
            isOpen={pinInfo.isOpen}
            openingInfo={pinInfo.openingInfo}
          />
        </div>
      </Popup>}
      <style>{`
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
