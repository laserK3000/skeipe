import React from 'react';
import { MapBox } from './components/map'
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>skeip.pe</title>
      </Helmet>
      <div>
        <MapBox />
      </div>
    </>
  );
}

export default App;
