import React from 'react';
import { MapBox } from '../components/map'
import { BackgroundBox } from '../components/background-box'
import {skeipeIcon} from '../helper/base64Icons'

const Home = () => {
  return (
    <div>
      <BackgroundBox className="hero">
        <div className="hero__left">
          <h1>SKEI.PE</h1>
          <h3>Die online Kneipe deines Vertrauens</h3>
          <p>Schön, dass du da bist. Wähle deine Lieblingskneipe aus und treffe dort deinen Stammtisch oder mache neue Bekanntschaften.</p>
        </div>
        <div className="hero__right">
          <img src={skeipeIcon} alt="skeipe"/>
        </div>
      </BackgroundBox>
      <MapBox />
      <style jsx>{`
        .hero {
          display: flex;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          z-index: 5;
        }

    `}</style>
    </div>

  );
}

export { Home };
