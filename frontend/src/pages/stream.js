import React, { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom';
import { BackgroundBox } from '../components/background-box'
import { StreamOverlay } from '../components/stream-overlay'
import { PayView } from '../components/pay-view'
import { skeipeIcon } from '../helper/base64Icons'
// import '../libs/jitsi_external_api'
import JitsiMeetExternalAPI from '../libs/jitsi_external_api'
import MOCK_get_bars_in_vincity from '../MOCK_get_bars_in_vincity';
import { useApiService } from '../contexts/apiService';

const getPub = (id) => {
  return MOCK_get_bars_in_vincity[0]
}

const Stream = () => {
  const [drankItems, setDrankItems] = useState([])
  const [isPayViewOpen, setPayViewOpen] = useState(false)
  const { pubId } = useParams()
  const [pub, setPub] = useState(null);
  const apiService = useApiService();
  const [jitsiApi, setJitsiApi] = useState(null)

  const updateParticipants = useCallback((api) => {
    const numberOfParticipants = api.getNumberOfParticipants();

  }, [])

  useEffect(() => {
    (async() => {
      const newPub = await apiService.getPub(decodeURIComponent(pubId));
      setPub(newPub)
    })()
  }, [apiService, pubId])
  useEffect(() => {
    const api = new JitsiMeetExternalAPI('jitsi.skei.pe', {
      roomName: 'skeipe',
      // width: "600px",
      height: '600px',
      parentNode: document.getElementById('jitsiroot')
    })

    setJitsiApi(api);

    const listener = () => updateParticipants(api)

    api.addEventListeners({
      'participantJoined': listener,
      'participantKickedOut': listener,
      'participantLeft': listener,
      'readyToClose': listener,
    })


    return () => {
      api.removeAllListeners(['participantJoined', 'participantKickedOut', 'participantLeft', 'readyToClose'])
      api.dispose();
      }

  }, [])

  return <div style={{
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
  }}>
    <BackgroundBox className="stream-header">
      <h2 className="stream-header__headline">{pub && pub.name}</h2>
      <Link to="/">
        <img className="stream-header__logo" src={skeipeIcon} alt="skeipe" />
      </Link>
    </BackgroundBox>
    <div style={{
      display: 'flex',
      minHeight: 0,
    }}>
      <StreamOverlay onPayViewOpen={(ammount) => {
        setPayViewOpen(true)
        if (ammount) setDrankItems([{ name: 'Bier', ammount, price: 3.5 }])
      }} />
      <div id="jitsiroot" style={{
        flex: '1 1 1px'
      }} />
    </div>
    {isPayViewOpen && <PayView items={drankItems} onClose={() => setPayViewOpen(false)} />}
    <style>{`
        html {
          background: #202D3A;
          min-height: 100vh;
        }
        .stream-header{
          align-items: center;
          display: flex;
          position: relative;
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
