import React from 'react';
import { MapBox } from '../components/map'
import { Nav } from '../components/nav'

const Home = () => {
  return (
    <>
      <Nav />
      <div>
        <MapBox />
      </div>
    </>
  );
}

export { Home };
