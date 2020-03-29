import React from 'react'
import { Link } from 'react-router-dom'
const Nav = () => {
  return <nav className="nav">
    <div className="logo">
      <Link to="/">
        <a>
          SKEI.PE
      </a>
      </Link>
    </div>

    <style>{`
      .nav {
        background: #fff9;
        top: 0;
        left: 0;
        z-index: 9;
        width: 100%;
        padding: 1em;
        box-sizing: border-box;
      }
      .logo a{
        text-decoration: none;
        color: inherit;
      }
      .logo a:hover{
        opacity: .8;
      }

  `}</style>
  </nav>
}

export { Nav }
