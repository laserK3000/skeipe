import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { BeerMapIcon } from '../helper/svgIcons'
import { Button } from './button'

const drawStrokes = (ammount) => {
  let strokes = []
  for (let i = 0; i < ammount; i++) {
    if (i % 5 === 0) strokes.push(<span>&nbsp;</span>)
    strokes.push(<span>|</span>)
  }
  return strokes
}

const PayView = ({ items, onClose }) => {
  let sum = 0
  return <div className="pay-view">
    <div className="overlay" onClick={onClose}></div>
    <div className="pay-view__content">
      <div className="beer-mat">
        <BeerMapIcon width="500" height="500" />
      </div>
      <div className="price">
        <div className="price__list">
          <div className="price__list__items">

            <h3 className="headline">Dein Deckel</h3>
            {items.length ? items.map(({ name, ammount, price }) => {
              sum += ammount * price
              return <p>{name} - je {price} €&nbsp;&nbsp;&nbsp;&nbsp;{drawStrokes(ammount)}</p>
            }) : <p><i>noch nichts getrunken</i></p>}

          </div>
          <p className="sum">
            <span className="sum__underlined">
              <span className="sum__underlined">
                {sum} €
              </span>
            </span>
          </p>
          <div className="pay-actions">
            <Button inverted>Anderen Betrag spenden</Button>
            <Button inverted>Deckel spenden</Button>
          </div>

        </div>
      </div>
    </div>
    <style>{`
    .pay-actions{
      display: flex;
      justify-content: space-between;
    }
    .sum {
      text-align: right;
    }
    .sum__underlined {
      border-bottom: 2px solid #222;
      margin-bottom: 2px;
      display: inline-block;
      padding: 0 .5em;
    }
    .headline{
      text-align: center;
    }
    .pay-view {
      position: absolute;
      top:0;
      left: 0;
      z-index:99;
      height: 100vh;
      width: 100vw;
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      background: #222a;
      height: 100vh;
      width: 100vw;
    }
    .pay-view__content {
      position: absolute;
      left: calc(50% - 250px);
      top:  calc(50% - 250px);
      z-index: 5;
      width: 100vw;
      height: 100vh;
    }
    .beer-mat {
      position: absolute;
    }
    .price {
      position: absolute;
      height: 500px;
      width: 500px;
    }
    .price__list {
      display: flex;
      flex-direction: column;
      width: 70%;
      margin: auto;
      justify-content: center;
      height: 100%;
      z-index: 5;
    }
    .price__list__items{
      border-bottom: 2px solid #222;
    } 
    `}</style>

  </div>
}

PayView.propTypes = {
  items: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    ammount: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  onClose: PropTypes.func
}

PayView.defaultProps = {
  onClose: () => { }
}

export { PayView }
