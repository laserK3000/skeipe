import React from 'react';
import { MapBox } from '../components/map'
import { BackgroundBox } from '../components/background-box'
import { skeipeIcon, heartIcon } from '../helper/base64Icons'
import { Input } from '../components/input'

const Home = () => {
  return (
    <div>
      <BackgroundBox className="hero">
        <div className="hero__left">
          <h1>SKEI.PE</h1>
          <h3>Die online Kneipe deines Vertrauens</h3>
          <p>Schön, dass du da bist. Wähle deine Lieblingskneipe aus und treffe dort deinen Stammtisch oder mache neue Bekanntschaften.</p>
          <Input type="text" size="35" placeholder="Suche deine Lieblingskneipe" />
        </div>
        <div className="hero__right">
          <img src={skeipeIcon} alt="skeipe" />
        </div>
      </BackgroundBox>
      <MapBox />
      <BackgroundBox className="notice">
        <img className="heart-icon" src={heartIcon} alt="" />
        <p>Skei.pe ist ein soziales Projekt, um deine Kneipen zu unterstützen. - <a href="#">Als Kneipe anmelden</a></p>
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
        .hero__right {
          font-family: Barrio;
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
        .notice p {
          font-size: .75em;
        }
        .heart-icon {
          margin-right: 1em;
        }

    `}</style>
    </div>

  );
}

export { Home };
