import React, { useEffect, useState, useCallback } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom';
import { BackgroundBox } from '../components/background-box'
import { StreamOverlay } from '../components/stream-overlay'
import { PayView } from '../components/pay-view'
import { skeipeIcon } from '../helper/base64Icons'
import JitsiMeetExternalAPI from '../libs/jitsi_external_api'
import { useApiService } from '../contexts/apiService';


const Stream = () => {
  const [drankItems, setDrankItems] = useState([])
  const [isPayViewOpen, setPayViewOpen] = useState(false)
  const { pubId } = useParams()
  const [pub, setPub] = useState(null);
  const apiService = useApiService();
  const [jitsiApi, setJitsiApi] = useState(null)
  const history = useHistory();


  const updateParticipants = useCallback(async () => {
    const { _participants: jitsiParticipants } = jitsiApi;
    const visitors = Object.keys(jitsiParticipants).reduce((red, participantId) => {
      const participant = jitsiApi._participants[participantId];
      const { displayName } = participant;
      red.push({
        id: participantId,
        displayName,
      });
      return red
    }, [])
    await apiService.updatePubVisitors(pub.id, 'counter', visitors);
  }, [apiService, pub, jitsiApi])

  useEffect(() => {
    (async () => {
      const newPub = await apiService.getPub(decodeURIComponent(pubId));
      setPub(newPub)
    })()
  }, [apiService, pubId])

  useEffect(() => {

    if (!pub) {
      return;
    }
    const api = new JitsiMeetExternalAPI('jitsi.skei.pe', {
      roomName: ('skeipe_' + pub.id + '_counter').replace(/[^0-9a-z]/gi, ''),
      parentNode: document.getElementById('jitsiroot')
    })

    setJitsiApi(api);

    return () => {
      api.dispose();
    }

  }, [pub])

  useEffect(() => {
    if (!jitsiApi) {
      return;
    }

    jitsiApi.addEventListeners({
      'participantJoined': updateParticipants,
      'participantKickedOut': updateParticipants,
      'participantLeft': updateParticipants,
    })


    return () => {
      jitsiApi.removeAllListeners(['participantJoined', 'participantKickedOut', 'participantLeft', 'readyToClose'])
    };
  }, [jitsiApi, updateParticipants]);
  useEffect(() => {

    if (!jitsiApi) {
      return;
    }

    jitsiApi.on('readyToClose', () => {
      history.push('/');
    })

    return () => {
      jitsiApi.removeAllListeners(['readyToClose'])
    }
  }, [jitsiApi, history])


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
