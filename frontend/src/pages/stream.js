import React, { useState } from 'react'
import { useParams, Link } from "react-router-dom";
import { pubs } from '../helper/pubs'
import { BackgroundBox } from '../components/background-box'
import { StreamOverlay } from '../components/stream-overlay'
import { PayView } from '../components/pay-view'
import { skeipeIcon } from '../helper/base64Icons'

const getPub = (id) => {
  return pubs.filter(pub => pub.id === id)[0]
}

const Stream = () => {
  const [drankItems, setDrankItems] = useState([])
  const [isPayViewOpen, setPayViewOpen] = useState(false)
  const { pubName } = useParams()
  const pub = getPub(pubName)

  return <div>
    <BackgroundBox className="stream-header">
      <h2 className="stream-header__headline">{pub.name}</h2>
      <Link to="/">
        <img className="stream-header__logo" src={skeipeIcon} alt="skeipe" />
      </Link>
    </BackgroundBox>
    <div className="video">
      <video className="video-stream" autoPlay width="750">
        <source src="/jitsi-stream.mp4" type="video/mp4" />
        <p>Sorry, your browser doesn't support embedded videos.</p>
      </video>
    </div>
    <StreamOverlay onPayViewOpen={(ammount) => {
      setPayViewOpen(true)
      if (ammount) setDrankItems([{ name: "Bier", ammount, price: 3.5 }])
    }} />
    {isPayViewOpen && <PayView items={drankItems} onClose={() => setPayViewOpen(false)} />}
    <style>{`
        .video-stream {
          width: 100vw;
        }
        html {
          background: #202D3A;
          min-height: 100vh;
        }
        .stream-header{
          align-items: center;
          display: flex;
          position: relative;
          margin-bottom: -3em;
          width: 100%;
          padding: 1em 2em;
          border-radius: 0 0 1em 1em;
        }
        .stream-header__headline {
          flex-grow: 5;
        }
        .stream-header__logo {
          width: 100px;
        }
    `}</style>
  </div>

}

export { Stream }
