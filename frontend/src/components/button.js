import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, fullWidth}) => {
  return <>
    <button className="button">{children}</button>
    <style jsx>{`
      .button {
        background: #222;
        border: none;
        border-radius: 0;
        color: #fff;
        cursor: pointer;
        font-size: 1em;
        outline: none;
        padding: 1.25em 1.5em;
        width: ${fullWidth ? "100%" : "auto"};
      }
      .button:hover {
        background: #222e;
      }
    `}
    </style>
  </>
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool
}

Button.defaultProps = {
  fullWidth: false
}

export { Button }