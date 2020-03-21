
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
image.src = 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQwcHQiIHZpZXdCb3g9Ii0xNDYgMCA1MTIgNTEyLjAwMSIgd2lkdGg9IjQwcHQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTIxMS41NjY0MDYgMTY5LjE5NTMxMmMtNC4xODM1OTQgMC03LjU3NDIxOCAzLjM5MDYyNi03LjU3NDIxOCA3LjU3NDIxOXY3LjYyODkwN2MwIDI3LjgzMjAzMS00Ljk4ODI4MiA1NS4xNDQ1MzEtMTQuODIwMzEzIDgxLjE3OTY4N2wtMy43MTQ4NDQgOS44MjgxMjVjLTEwLjQ4NDM3NSAyNy43NS0xNS44MDA3ODEgNTYuODYzMjgxLTE1LjgwMDc4MSA4Ni41MzEyNXY4NS40MzM1OTRoLTEyMC4xNzE4NzV2LTI4LjQwMjM0NGMwLTQuMTgzNTk0LTMuMzkwNjI1LTcuNTc0MjE5LTcuNTc0MjE5LTcuNTc0MjE5cy03LjU3NDIxOCAzLjM5MDYyNS03LjU3NDIxOCA3LjU3NDIxOXYzMi45NDUzMTJsLTEyLjUzNTE1NyAxMy4xNjQwNjNjLTQuOTQxNDA2IDUuMTg3NS03LjY2NDA2MiAxMS45ODgyODEtNy42NjQwNjIgMTkuMTUyMzQ0IDAgMTUuMzEyNSAxMi40NjA5MzcgMjcuNzY5NTMxIDI3Ljc3MzQzNyAyNy43Njk1MzFoMTM1LjMyMDMxM2MxNS4zMTI1IDAgMjcuNzY5NTMxLTEyLjQ1NzAzMSAyNy43Njk1MzEtMjcuNzY5NTMxIDAtNy4xNjQwNjMtMi43MTg3NS0xMy45NjQ4NDQtNy42NjAxNTYtMTkuMTUyMzQ0bC0xMi41MzUxNTYtMTMuMTY0MDYzdi04OS45NzY1NjJjMC0yNy44MjgxMjUgNC45ODgyODEtNTUuMTQwNjI1IDE0LjgyMDMxMi04MS4xNzU3ODFsMy43MTQ4NDQtOS44MjgxMjVjMTAuNDg0Mzc1LTI3Ljc1MzkwNiAxNS44MDA3ODEtNTYuODY3MTg4IDE1LjgwMDc4MS04Ni41MzEyNXYtNy42MzI4MTNjMC00LjE4MzU5My0zLjM5MDYyNS03LjU3NDIxOS03LjU3NDIxOS03LjU3NDIxOXptLTIxLjcxMDkzNyAzMTUuMDM1MTU3YzAgNi45NjA5MzctNS42NjQwNjMgMTIuNjIxMDkzLTEyLjYyNSAxMi42MjEwOTNoLTEzNS4zMjAzMTNjLTYuOTYwOTM3IDAtMTIuNjI1LTUuNjY0MDYyLTEyLjYyNS0xMi42MjEwOTMgMC0zLjI1NzgxMyAxLjIzODI4Mi02LjM0NzY1NyAzLjQ4NDM3NS04LjcwNzAzMWwxMi4zODY3MTktMTMuMDA3ODEzaDEyOC44MjgxMjVsMTIuMzg2NzE5IDEzLjAwNzgxM2MyLjI0NjA5NCAyLjM1OTM3NCAzLjQ4NDM3NSA1LjQ0OTIxOCAzLjQ4NDM3NSA4LjcwNzAzMXptMCAwIi8+PHBhdGggZD0ibTE4NS42ODM1OTQgMjIuOTAyMzQ0Yy02LjgwMDc4Mi0xMy44NzEwOTQtMjEuMDExNzE5LTIyLjkwMjM0NC0zNi43MjY1NjMtMjIuOTAyMzQ0LTYuOTcyNjU2IDAtMTMuNjg3NSAxLjczMDQ2OS0xOS42OTUzMTIgNS4wNDY4NzUtNi4wMDc4MTMtMy4zMTY0MDYtMTIuNzIyNjU3LTUuMDQ2ODc1LTE5LjY5MTQwNy01LjA0Njg3NXMtMTMuNjgzNTkzIDEuNzMwNDY5LTE5LjY5MTQwNiA1LjA0Njg3NWMtNi4wMDc4MTItMy4zMTY0MDYtMTIuNzIyNjU2LTUuMDQ2ODc1LTE5LjY5NTMxMi01LjA0Njg3NS0xNS43MTQ4NDQgMC0yOS45MjU3ODIgOS4wMzEyNS0zNi43MjY1NjMgMjIuOTAyMzQ0LTE5LjEwNTQ2OSAzLjUyMzQzNy0zMy40NTcwMzEgMjAuMzM5ODQ0LTMzLjQ1NzAzMSA0MC4yMTQ4NDR2MTIxLjI4MTI1YzAgMjkuNjY3OTY4IDUuMzE2NDA2IDU4Ljc4MTI1IDE1LjgwMDc4MSA4Ni41MzEyNWwzLjcxMDkzOCA5LjgyODEyNGM5LjgzNTkzNyAyNi4wMzUxNTcgMTQuODI0MjE5IDUzLjM0NzY1NyAxNC44MjQyMTkgODEuMTc5Njg4djIxLjk3NjU2MmMwIDQuMTgzNTk0IDMuMzkwNjI0IDcuNTc0MjE5IDcuNTc0MjE4IDcuNTc0MjE5czcuNTc0MjE5LTMuMzkwNjI1IDcuNTc0MjE5LTcuNTc0MjE5di0yMS45NzY1NjJjMC0yOS42Njc5NjktNS4zMTY0MDYtNTguNzgxMjUtMTUuODAwNzgxLTg2LjUzNTE1NmwtMy43MTQ4NDQtOS44MjQyMTljLTkuODMyMDMxLTI2LjAzNTE1Ni0xNC44MjAzMTItNTMuMzQ3NjU2LTE0LjgyMDMxMi04MS4xNzk2ODd2LTU1LjEzNjcxOWg0OS40ODA0Njh2MTguNjgzNTkzYzAgMTIuNTc0MjE5IDkuODk4NDM4IDIzLjU2MjUgMjIuNTk3NjU2IDI0LjE2MDE1NyAxMy4zMzk4NDQuNjIxMDkzIDI0Ljg2NzE4OC0xMC4zMzk4NDQgMjQuODY3MTg4LTIzLjcwNzAzMXYtMTkuMTM2NzE5aDE5LjU1ODU5NGMzLjY3OTY4NyA3LjcxMDkzNyAxMS4yNTM5MDYgMTMuMTM2NzE5IDIwLjIwMzEyNSAxMy41NTg1OTMgOS45MjU3ODEuNDU3MDMyIDE4LjYxMzI4MS01LjIyMjY1NiAyMi41NzgxMjUtMTMuNTU4NTkzaDI5LjU1ODU5NHYxMS45OTIxODdjMCA0LjE4MzU5NCAzLjM5MDYyNCA3LjU3NDIxOSA3LjU3NDIxOCA3LjU3NDIxOXM3LjU3NDIxOS0zLjM5MDYyNSA3LjU3NDIxOS03LjU3NDIxOXYtNzguMTM2NzE4YzAtMTkuODc1LTE0LjM1MTU2My0zNi42OTE0MDctMzMuNDU3MDMxLTQwLjIxNDg0NHptLTEyMS4wNTA3ODIgOTEuMjEwOTM3aC00OS40ODQzNzR2LTQzLjQyMTg3NWg0MC44OTg0MzdjNC43MzQzNzUgMCA4LjU4NTkzNyAzLjg0NzY1NiA4LjU4NTkzNyA4LjU4MjAzMnptNjQuNjI4OTA3IDBoLTE3LjE2Nzk2OXYtMTUuMTk1MzEyYzAtNC43NjU2MjUgMy42NjAxNTYtOC44MTY0MDcgOC4xNjAxNTYtOS4wMzEyNSA0LjkyNTc4Mi0uMjM4MjgxIDkuMDA3ODEzIDMuNzAzMTI1IDkuMDA3ODEzIDguNTc0MjE5em0zMi4zMTY0MDYtMzQuODM5ODQzdjM5LjgzOTg0M2MwIDQuODc1LTQuMTAxNTYzIDguODE2NDA3LTkuMDA3ODEzIDguNTc0MjE5LTQuNS0uMjEwOTM4LTguMTYwMTU2LTQuMjYxNzE5LTguMTYwMTU2LTkuMDI3MzQ0di0yMC4xOTkyMThjMC0xMy40NjA5MzgtMTEuMjU3ODEyLTI0LjMzNTkzOC0yNC44NjcxODctMjMuNzAzMTI2LTEyLjY3MTg3NS41OTc2NTctMjIuNTkzNzUgMTEuMjEwOTM4LTIyLjU5Mzc1IDI0LjE2MDE1N3Y0OS40ODQzNzVjMCA0Ljg3NS00LjA5NzY1NyA4LjgyMDMxMi05LjAwNzgxMyA4LjU3NDIxOC00LjUtLjIxNDg0My04LjE2MDE1Ni00LjI2NTYyNC04LjE2MDE1Ni05LjAzMTI1di02OC42NzE4NzRjMC0xMy4wODU5MzgtMTAuNjQ0NTMxLTIzLjczMDQ2OS0yMy43MzA0NjktMjMuNzMwNDY5aC0zOS43NjE3MTljMy4wNzgxMjYtOS45NTcwMzEgMTIuMDU4NTk0LTE3LjQyMTg3NSAyMi45MzM1OTQtMTguMTE3MTg4IDMuMDM1MTU2LS4xOTUzMTIgNS42NTYyNS0yLjE4MzU5MyA2LjY2NDA2My01LjA1MDc4MSAzLjYxMzI4MS0xMC4zMDQ2ODggMTMuMzc4OTA2LTE3LjIyNjU2MiAyNC4zMDA3ODEtMTcuMjI2NTYyIDUuNTE1NjI1IDAgMTAuNzczNDM4IDEuNzE4NzUgMTUuMjEwOTM4IDQuOTc2NTYyIDIuNjY3OTY4IDEuOTU3MDMxIDYuMjk2ODc0IDEuOTU3MDMxIDguOTY0ODQzIDAgNC40MzM1OTQtMy4yNTc4MTIgOS42OTUzMTMtNC45NzY1NjIgMTUuMjEwOTM4LTQuOTc2NTYyczEwLjc3MzQzNyAxLjcxODc1IDE1LjIxMDkzNyA0Ljk3NjU2MmMyLjY2Nzk2OSAxLjk1NzAzMSA2LjI5Njg3NSAxLjk1NzAzMSA4Ljk2MDkzOCAwIDQuNDM3NS0zLjI1NzgxMiA5LjY5OTIxOC00Ljk3NjU2MiAxNS4yMTQ4NDQtNC45NzY1NjIgMTAuOTE3OTY4IDAgMjAuNjgzNTkzIDYuOTIxODc0IDI0LjMwMDc4MSAxNy4yMjY1NjIgMS4wMDM5MDYgMi44NjcxODggMy42Mjg5MDYgNC44NTU0NjkgNi42NjAxNTYgNS4wNTA3ODEgMTAuODc4OTA2LjY5OTIxOSAxOS44NTkzNzUgOC4xNjAxNTcgMjIuOTMzNTk0IDE4LjExNzE4OGgtMTcuNTQ2ODc1Yy0xMy4wODU5MzggMC0yMy43MzA0NjkgMTAuNjQ0NTMxLTIzLjczMDQ2OSAyMy43MzA0Njl6bTQyLjQxNDA2MyAzNC44Mzk4NDNoLTI3LjI2NTYyNnYtMzQuODM5ODQzYzAtNC43MzQzNzYgMy44NTE1NjMtOC41ODIwMzIgOC41ODIwMzItOC41ODIwMzJoMTguNjgzNTk0em0wIDAiLz48L3N2Zz4=';
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
    setMapCenter([x, y + 0.015])
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