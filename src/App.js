import React from 'react';
import { MapBox } from './components/map'
import { Helmet } from "react-helmet";
import { Nav } from './components/nav'

function App() {
  return (
    <>
      <Helmet>
        <title>skei.pe</title>
      </Helmet>
      <Nav />
      <div>
        <MapBox />
      </div>
    </>
  );
}

export default App;
