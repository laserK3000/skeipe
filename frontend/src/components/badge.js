import React from 'react'


const Badge = ({ counter }) => {
  return (<div className="badge">
    {counter}
    <style>{`
      .badge {
        position: absolute;
        top: 0;
        right: 0;
        height: 1em;
        width: 1em;
        background: #EB9295;
        z-index: 5;
        padding: .25em;
        text-align: center;
        vertical-align: middle;
        line-height: 1em;
        border-radius: 50%;
      }
    `}</style>
  </div>)
}

export { Badge }
