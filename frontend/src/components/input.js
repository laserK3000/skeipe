import React from 'react'

const Input = ({ ...rest }) => {
  return (
    <>
      <input className="input" {...rest} />
      <style>{`
      .input::placeholder {
        color: #F8F5EEAA;
      }
      .input{
        font-size: 1em;
        color: #F8F5EE;
        border: none;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        background: #546067;
        border-radius: 10px;
        outline: none;
        padding: .75em;
        border-bottom: 2px solid #fff;
      }
    `}</style>
    </>
  )
}

export { Input }
