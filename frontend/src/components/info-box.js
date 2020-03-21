import React from "react"
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const InfoBox = ({ image, headline, link }) => {
  return (
    <div className="info">
      <img src={image} alt={headline} />
      <h3>{headline}</h3>
      <Link to={link}>
        <a>Zur Kneipe</a>
      </Link>

    </div>
  )
}

InfoBox.propTypes = {
  image: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
}
export { InfoBox }
