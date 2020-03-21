import React from 'react'

const Nav = () => {
  return <nav className="nav">
    <div className="logo">
      SKEI.PE
    </div>


    <style jsx>{`
      .nav {
        background: #fff9;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        width: 100%;
        padding: 1em;
        box-sizing: border-box;
      }

  `}</style>
  </nav>
}

export {Nav}