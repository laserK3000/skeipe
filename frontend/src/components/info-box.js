import React from "react"
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from '../components/button'

const InfoBox = ({ guestCount, headline, link }) => {
  return (
    <div className="info">
      <h2>{headline}</h2>
      <ul className="info--list">
        <li>
          <p>{guestCount} Gäste</p>
        </li>
      </ul>
      <Link to={link}>
        <Button fullWidth>Kneipe beitreten</Button>
      </Link>
      <style jsx>{`
        .info {
          padding: .25em .75em;
        }
        .info--list{
          padding-left: 1.25em;
        }
      `}</style>
    </div>
  )
}

InfoBox.propTypes = {
  guestCount: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
}
export { InfoBox }
