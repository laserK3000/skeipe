import React from 'react';
import { MapBox } from '../components/map'
import { BackgroundBox } from '../components/background-box'
import { skeipeIcon, heartIcon } from '../helper/base64Icons'

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
          <img src={skeipeIcon} alt="skeipe" />
        </div>
      </BackgroundBox>
      <MapBox />
      <BackgroundBox className="notice">
        <img className="heart-icon" src={heartIcon} alt="" />
        <p>Skei.pe ist ein gemeinnützunges Projekt, um deine Kneipen zu unterstützen.</p>
      </BackgroundBox>
      <style jsx>{`
        .hero {
          display: flex;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          z-index: 5;
        }
        .hero__left {
          flex-grow: 3;
          margin-right: 15%;
        }
        .notice {
          display: flex;
          position: absolute;
          left: 16.5%;
          bottom: 2.5%;
          width: 66%;
          z-index: 5;
          padding: .25em 1.5em;
        }
        .heart-icon {
          margin-right: 1em;
        }

    `}</style>
    </div>

  );
}

export { Home };
