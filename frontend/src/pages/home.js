import React from 'react';
import { MapBox } from '../components/map'
import { BackgroundBox } from '../components/background-box'
import { skeipeIcon, heartIcon } from '../helper/base64Icons'
import { Input } from '../components/input'
import txt from '../imprintText';

const Home = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }}>
      <BackgroundBox className="hero">
        <div className="hero__left">
          <h1>SKEI.PE</h1>
          <h2>Die online Kneipe deines Vertrauens</h2>
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
        <p>Skei.pe ist ein soziales Projekt, um deine Kneipen zu unterstützen. - <a href="#">Als Kneipe anmelden</a> - <a onClick={() => {
          const win = window.open(
            "",
            "Impressum",
            "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top="+(window.screen.height-400)+",left="+(window.screen.width-840));
          win.document.body.innerHTML = txt;
        }}>Impressum</a></p>
      </BackgroundBox>
      <style>{`
        .hero {
          border-radius: 0 0 20px 20px;
          display: flex;
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
