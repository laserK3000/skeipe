import React from 'react'

const input = ({ children, ...rest }) => {

  return (
    <input {...rest}>{children}</input>
  )
}