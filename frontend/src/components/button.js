import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, fullWidth }) => {
  return <>
    <button className="button">{children}</button>
    <style jsx>{`
      .button {
        background: #F8F5EE;
        border: none;
        border-radius: 7px;
        color: #153C56;
        cursor: pointer;
        font-size: 1.5em;
        outline: none;
        padding: .5em 1em;
        width: ${fullWidth ? "100%" : "auto"};
      }
      .button:hover {
        background: #F8F5EEEE;
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