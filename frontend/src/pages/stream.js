import React from 'react'
import { useParams } from "react-router-dom";
import { pubs } from '../helper/pubs'
import { BackgroundBox } from '../components/background-box'
import { StreamOverlay } from '../components/stream-overlay'

const getPub = (id) => {
  return pubs.filter(pub => pub.id === id)[0]
}


const Stream = () => {
  const { pubName } = useParams()
  console.log("pubName", pubName)
  const pub = getPub(pubName)

  return <div>
    <BackgroundBox className="stream-header">
      <h2>{pub.name}</h2>
    </BackgroundBox>
    <div className="video">
      <video className="video-stream" autoPlay width="750">

        <source src="/jitsi-stream.mp4"
          type="video/mp4" />

        <p>Sorry, your browser doesn't support embedded videos.</p>
      </video>
    </div>
    <StreamOverlay/>
    <style jsx>{`
        .video-stream {
          width: 100vw;
        }
        html {
          background: #202D3A;
          min-height: 100vh;
        }
        .stream-header{
          position: relative;
          margin-bottom: -3em;
          width: 100%;
          padding: 1em;
          border-radius: 0 0 1em 1em;
        }

    `}</style>
  </div>

}

export { Stream }