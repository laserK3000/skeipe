import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, fullWidth, inverted }) => {
  console.log("iverted", inverted)
  return <>
    <button className="button">{children}</button>
    <style jsx>{`
      .button {
        background: ${inverted ? "#153C56" : "#F8F5EE"};
        border: none;
        border-radius: 7px;
        color: ${inverted ? "#F8F5EE" : "#153C56"};
        cursor: pointer;
        font-size: 1em;
        outline: none;
        padding: .5em 1em;
        width: ${fullWidth ? "100%" : "auto"};
      }
      .button:hover {
        background: ${inverted ? "#153C56EE" : "#F8F5EEEE"};
      }
    `}
    </style>
  </>
}

Button.propTypes = {
  inverted: PropTypes.bool,
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool
}

Button.defaultProps = {
  inverted: false,
  fullWidth: false
}

export { Button }