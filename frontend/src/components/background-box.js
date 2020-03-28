import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const BackgroundBox = ({ children, className }) => {
  return (
    <div className={classnames("background-box", className)}>
      {children}
      <style>{`
        .background-box {
          color: #F8F5EE;
          background: rgba(42, 56, 65, 0.98);
          padding: 2em;
          border-radius: 20px;
          box-sizing: border-box;
        }
    `}</style>
    </div>
  )
}

BackgroundBox.propTypes = {
  children: PropTypes.node.isRequired
}

export { BackgroundBox }
