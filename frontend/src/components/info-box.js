import React from "react"
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from '../components/button'
import { GuestsIcon } from '../helper/svgIcons'

const InfoBox = ({ guestCount, headline, link }) => {
  return (
    <div className="info">
      <h2>{headline}</h2>
      <div className="info-wrapper">
        <div className="info--list">
          <GuestsIcon height="25" width="25" />
          <p>{guestCount} Gäste</p>
        </div>
        {/*<div className="info--list">*/}
        {/*  <ClockIcon height="25" width="25" />*/}
          {/*<p>{isOpen ? "Geöffnet" : "Geschlossen"} {openingInfo && <span>({openingInfo})</span>}</p>*/}
        {/*</div>*/}
      </div>
      <Link to={link}>
        <Button fullWidth>Kneipe beitreten</Button>
      </Link>
      <style>{`
        .info {
          padding: .25em .75em;
        }
        .info--list {
          display: flex;
          margin: .5em 0 ;
        }
        .info--list > p{
          margin: 0 0 0 1em;
        }
        .info-wrapper{
          margin: 1em 0 ;
        }
      `}</style>
    </div>
  )
}

InfoBox.propTypes = {
  guestCount: PropTypes.number.isRequired,
  headline: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}
InfoBox.defaultProps = {
}

export { InfoBox }
