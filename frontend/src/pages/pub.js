import React from 'react';
import { Helmet } from "react-helmet";
import { Nav } from '../components/nav'
import { useParams } from "react-router-dom";

const Pub = () => {
  const { pubName } = useParams()
  return (
    <>
      <Helmet>
        <title>skei.pe | {pubName}</title>
      </Helmet>
      <Nav/>
      <div>
        <p>Willkommen bei {pubName}</p>
      </div>
    </>
  );
}

export { Pub };
