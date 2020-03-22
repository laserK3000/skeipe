import React from 'react'
import { CigaretteIcon, BeerBottleIcon, ToiletPaperIcon, BeerMapIcon } from '../helper/svgIcons'

const StreamOverlay = () => {
  return <div className="stream-overlay">
    <div>
    <BeerMapIcon/>
    </div>
    <div>
      <BeerBottleIcon style={{ fill: "white" }} width="100" height="100"/>
      <p>Getränk hinzufügen</p>
    </div>
    <div>
      <ToiletPaperIcon style={{ fill: "white" }}  width="100" height="100"/>
      <p>Toilettenpause</p>
    </div>
    <div>
      <CigaretteIcon style={{ fill: "white" }} />
      <p>Raucherpause</p>
    </div>

    <style jsx>{`
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
    .stream-overlay div {
      cursor: pointer;
      padding: 1em 0;
      align-items: center;
      border-bottom: 1px solid #fff;
      margin: 0 1em;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .stream-overlay div:hover {
      background: #fff2;
    }

  `}</style>
  </div>
}

export { StreamOverlay }