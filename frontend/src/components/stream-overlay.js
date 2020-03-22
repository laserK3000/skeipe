import React from 'react'
import { CigaretteIcon, BeerBottleIcon, ToiletPaperIcon, BeerMapIcon } from '../helper/svgIcons'

const StreamOverlay = () => {
  return <div className="stream-overlay">
    <div>
      <div className="beer-map">
        <div className="beer-map__background">
          <BeerMapIcon />
        </div>
        <div className="beer-map__text">
          <p>
            Spenden statt Deckel zahlen
          </p>
        </div>
      </div>
    </div>
    <div>
      <BeerBottleIcon style={{ fill: "white" }} width="100" height="100" />
      <p>Getränk hinzufügen</p>
    </div>
    <div>
      <ToiletPaperIcon style={{ fill: "white" }} width="100" height="100" />
      <p>Toilettenpause</p>
    </div>
    <div>
      <CigaretteIcon style={{ fill: "white" }} />
      <p>Raucherpause</p>
    </div>

    <style jsx>{`
    .beer-map {
      height: 150px;
      width: 150px;
      position: relative;
    }
    .beer-map__background {
      position: absolute;
      display: flex;
      justify-content: center;
      width: 100%;
    }
    .beer-map__text {
      color: #222;
      position: absolute;
      display: flex;
      justify-content: center;
      width: 150px;
      z-index: 2;
      align-items: center;
      height: 150px;
      text-align: center;
      vertical-align: middle;
    }
    .beer-map__text > p {
      width: 115px;
    }
    .stream-overlay {
      position: absolute;
      color: #fff;
      background: rgba(42, 56, 65, 0.55);
      display: flex;
      flex-direction: column;
      left: 0;
      top: 4em;
      height: calc(100vh - 4em);
      // justify-content: space-evenly;
    }
    .stream-overlay > div {
      cursor: pointer;
      padding: 1em 0;
      align-items: center;
      border-bottom: 1px solid #fff;
      margin: 0 1em;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .stream-overlay > div:hover {
      background: #fff2;
    }

  `}</style>
  </div>
}

export { StreamOverlay }