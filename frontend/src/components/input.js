import React from 'react'

const Input = ({ ...rest }) => {
  return (
    <>
      <input className="input" {...rest} />
      <style jsx>{`
      .input{
        font-size: 1em;
        border: none;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        background: #F8F5EE;
        border-radius: 10px;
        outline: none;
        padding: .75em  ;
      }
    `}</style>
    </>
  )
}

export { Input }