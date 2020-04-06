import React, { useState } from 'react'
import ReactMapboxGl, { Popup } from 'react-mapbox-gl';
import { GeolocateControl, NavigationControl } from 'mapbox-gl';

import { InfoBox } from './info-box'
import { beerIcon } from '../helper/base64Icons'

import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-compass.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-geolocate.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-in.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-out.svg';
import { useApiService } from '../contexts/apiService';


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


  const onToggleHover = (id, lng, lat, numVisitors, name) => {

    if (!id) {
      setHoverInfo(null);
      return;
    }
    setHoverInfo({
      lng,
      lat,
      numVisitors,
      name,
    })
  }

  const onToggleClick = (id, lng, lat, numVisitors, name) => {
    setPinInfo({
      id,
      lng,
      lat,
      numVisitors,
      name,
    })
  }

  // const moveToPub = useCallback((pub) => {
  //   ReactDOM.unstable_batchedUpdates(() => {
  //     const { coordinates: [x,y] } = pub
  //     setMapCenter([x,y +((0.002 * (18-mapZoom) )*.2)])
  //     setMapZoom([14])
  //
  //   }, [])
  // })
  //
  // const onMoveEnd = useCallback(async (map) => {
  //   try {
  //
  //     const { lng, lat } = map.getCenter()
  //     const bounds = map.getBounds()
  //     const distance = Math.ceil(Math.max(
  //       Math.abs(bounds.getNorth() - bounds.getSouth()),
  //       Math.abs(bounds.getEast() - bounds.getWest()),
  //     ))
  //     const allNewPubs = await apiService.getPubs(lng, lat, distance)
  //     const trueNewPubs = allNewPubs.filter(nP => (!pubs.find(p => (p.id === nP.id))))
  //     setPubs([...pubs, ...trueNewPubs]);
  //   } catch (e) {
  //     // todo error handling
  //     console.error(e);
  //   }
  //
  // }, [apiService, pubs])

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

        initPubs(map, onToggleHover, onToggleClick)

      }}
    >
      {hoverInfo && <Popup coordinates={[hoverInfo.lng, hoverInfo.lat]}>
        <div className="info">
          <h3>
            {hoverInfo.name} ({hoverInfo.numVisitors})
          </h3>
        </div>
      </Popup>}

      {pinInfo && <Popup coordinates={[pinInfo.lng, pinInfo.lat]}>
        <div className="info">
          <div className="close" onClick={() => setPinInfo(null)}>
            <div>x</div>
          </div>
          <InfoBox
            headline={pinInfo.name}
            guestCount={pinInfo.numVisitors}
            link={'/stream/' + encodeURIComponent(pinInfo.id)}
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

var getGeoJSONdata = fetch('https://skei.pe/geojson/kneipen.geojson').then((res) => { return res.json() })

async function initPubs(map, onToggleHover, onToggleClick) {

 map.addSource('pubs', {
  type: 'geojson',
  data: await getGeoJSONdata.then((res) => { return res}),
  cluster: true,
  clusterMaxZoom: 14, // Max zoom to cluster points on
  clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
});

  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'pubs',
    filter: ['has', 'point_count'],
    paint: {
// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
// with three steps to implement three types of circles:
//   * Blue, 20px circles when point count is less than 100
//   * Yellow, 30px circles when point count is between 100 and 750
//   * Pink, 40px circles when point count is greater than or equal to 750
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#51bbd6',
        100,
        '#f1f075',
        750,
        '#f28cb1'
      ],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        20,
        100,
        30,
        750,
        40
      ]
    }
  });

  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'pubs',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
    }
  });

  map.addImage(...images);
  map.addLayer({
    id: 'unclustered-point',
    type: 'symbol',
    source: 'pubs',
    filter: ['!', ['has', 'point_count']],
    layout: { 'icon-image': 'beer'},

  });

  map.on('click', 'clusters', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['clusters']
    });
    var clusterId = features[0].properties.cluster_id;
    map.getSource('pubs').getClusterExpansionZoom(
      clusterId,
      function (err, zoom) {
        if (err) return;

        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom
        });
      }
    );
  });

// When a click event occurs on a feature in
// the unclustered-point layer, open a popup at
// the location of the feature, with
// description HTML from its properties.
  map.on('click', 'unclustered-point', function (e) {

    const { features: [ feature ] } = e;
    const { geometry: { coordinates: [lng, lat] }, properties: { '@id': id, name, visitors } } = feature

// Ensure that if the map is zoomed out such that
// multiple copies of the feature are visible, the
// popup appears over the copy being pointed to.
//     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//     }

    console.log(feature.properties)
    onToggleClick(id, lng, lat, getNumVisitors(visitors), name)
  });

  map.on('mouseenter', 'unclustered-point', function (e) {
    const { features: [ feature ] } = e;
    const { geometry: { coordinates: [lng, lat] }, properties: { '@id': id, name, visitors } } = feature

    map.getCanvas().style.cursor = 'pointer';
    onToggleHover(id, lng, lat, getNumVisitors(visitors), name)
  });
  map.on('mouseleave', 'unclustered-point', function () {
    map.getCanvas().style.cursor = '';
    onToggleHover()
  });


  map.on('mouseenter', 'clusters', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'clusters', function () {
    map.getCanvas().style.cursor = '';
  });
}

function getNumVisitors(visitors) {
  let numVisitors = 0
  if (visitors) {
    visitors = JSON.parse(visitors)
  }
  if (visitors && visitors.tables) {
    numVisitors = Object.keys(visitors.tables).reduce((red, tableId) => {
      const { visitors: tableVisitors } = visitors.tables[tableId];
      return red += tableVisitors ? tableVisitors.length : 0;
    }, 0)
  }
  return numVisitors
}
export { MapBox, getGeoJSONdata }
