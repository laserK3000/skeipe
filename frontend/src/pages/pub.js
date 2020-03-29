import React from 'react';
import { Helmet } from "react-helmet";
import { Nav } from '../components/nav'
import { useParams } from "react-router-dom";
import { pubs_DEPRICATED } from '../helper/pubs_DEPRICATED'

const getPub = (id) => {
  return pubs_DEPRICATED.filter(pub => pub.id === id)[0]
}

const Pub = () => {
  const { pubName } = useParams()
  const pub = getPub(pubName)
  return (
    <>
      <Helmet>
        <title>skei.pe | {pub.name}</title>
      </Helmet>
      <Nav />
      <div>
        <img className="pub-image" src={pub.image} alt={pub.name} />
        <p>Willkommen bei {pub.name}</p>
      </div>
      <style>{`
        .pub-image {
          width: 100%;
        }

    `}</style>
    </>
  );
}

export { Pub };
