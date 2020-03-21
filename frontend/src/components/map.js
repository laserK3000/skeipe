
import React, { useState } from 'react'
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

import { InfoBox } from './info-box'
import { pubs } from '../helper/pubs'

const Map = ReactMapboxGl({
  minZoom: 8,
  accessToken:
    'pk.eyJ1IjoidG9iaW9iaSIsImEiOiJjazgxaGZwYTQwZ2F3M3RtczRodnRnOTE5In0.UtzN21VEExcNBBLikohQoA'
});

const image = new Image();
// https://base64.guru/converter/encode/image/svg
image.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDE4OSAxODkiPjxkZWZzPjxjbGlwUGF0aD48cGF0aCBkPSJNMCAwIDE4OSAwIDE4OSAxODkgMCAxODlaIi8+PC9jbGlwUGF0aD48Y2xpcFBhdGg+PHBhdGggZD0iTTYgNiAxODMgNiAxODMgMTgzIDYgMTgzWiIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoPjxwYXRoIGQ9Ik02IDYgMTgzIDYgMTgzIDE4MyA2IDE4M1oiLz48L2NsaXBQYXRoPjxjbGlwUGF0aD48cGF0aCBkPSJNNiA2IDE4MyA2IDE4MyAxODMgNiAxODNaIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAxKSI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAyKSI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAzKSI+PHBhdGggZD0iTTEwNi43IDYwLjIgMTA0LjUgMjIuNiAxMDcuNCAyMi42IDEwNy40IDIwLjhDMTA3LjQgMTcuNCAxMDUuMiAxNC43IDEwMi4yIDEzLjcgMTAxLjkgMTMuNiAxMDEuNSAxMy40IDEwMSAxMy40TDEwMCAxMy40IDg5IDEzLjQgODggMTMuNEM4Ny41IDEzLjQgODcuMSAxMy42IDg2LjggMTMuNyA4My44IDE0LjcgODEuNiAxNy40IDgxLjYgMjAuOEw4MS42IDIyLjYgODQuNSAyMi42IDgyLjMgNjAuMkM3NS4zIDYzLjkgNzAuNSA3MS4zIDcwLjUgNzkuOEw3MC41IDE2OC4zQzcwLjUgMTcyLjMgODEuMiAxNzUuNiA5NC41IDE3NS42IDEwNy44IDE3NS42IDExOC41IDE3Mi4zIDExOC41IDE2OC4zTDExOC41IDc5LjhDMTE4LjUgNzEuMyAxMTMuNyA2My45IDEwNi43IDYwLjJaTTExMS4xIDE2NS45QzEwOC41IDE2NyAxMDIuNiAxNjguMyA5NC41IDE2OC4zIDg2LjQgMTY4LjMgODAuNSAxNjcgNzcuOSAxNjUuOUw3Ny45IDEzNS4xIDgzLjMgMTM1LjFDODYgMTQwLjggOTAuMSAxNDQuMyA5NC41IDE0NC4zIDk4LjkgMTQ0LjMgMTAzLjIgMTQwLjggMTA1LjcgMTM1LjFMMTExLjEgMTM1LjEgMTExLjEgMTY1LjlaTTExMS4xIDEwMS45IDEwNS43IDEwMS45QzEwMyA5Ni4yIDk4LjkgOTIuNyA5NC41IDkyLjcgOTAuMSA5Mi43IDg1LjggOTYuMiA4My4zIDEwMS45TDc3LjkgMTAxLjkgNzcuOSA3OS44Qzc3LjkgNzQuMiA4MC45IDY5LjIgODUuOCA2Ni43TDg5LjUgNjQuNiA4OS43IDYwLjQgOTEuMiAzNS41IDk3LjggMzUuNSA5OS4zIDYwLjYgOTkuNSA2NC44IDEwMy4yIDY2LjhDMTA4LjEgNjkuMiAxMTEuMSA3NC4yIDExMS4xIDc5LjhMMTExLjEgMTAxLjlaIi8+PC9nPjwvZz48L2c+PHBhdGggZD0iTTkzLjYgMjguNkM5Ni4yIDIzLjUgMTAxLjMgMzEuNiAxMDIuOCAzNy41IDEwNC4zIDQzLjQgMTAxLjkgNTcuNiAxMDIuOCA2NCAxMDMuNyA3MC4zIDEwNC4xIDYwLjQgMTA4LjIgNzUuNiAxMTIuMiA5MC43IDExMS4yIDE0MC4yIDExMi4xIDE1NC45IDExMi45IDE2OS41IDExNy4zIDE2MS40IDExMy40IDE2My43IDEwOS40IDE2NiA5NC45IDE2OC41IDg4LjMgMTY4LjcgODEuNyAxNjguOSA3NiAxNzMuMiA3My44IDE2NC45IDcxLjYgMTU2LjcgNzQuOSAxMzQuNyA3NS4xIDExOS41IDc1LjMgMTA0LjQgNzMuMSA4Mi45IDc1LjEgNzQuMSA3Ny4xIDY1LjIgODIuOSA3OS4xIDg2LjcgNjguMyA5MC41IDU3LjQgOTAuOSAzMy44IDkzLjYgMjguNloiLz48L2c+PC9zdmc+Cg==';
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
        height: 'calc(100vh - 4.5em)',
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