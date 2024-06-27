// src/components/JitsiMeet.tsx
import React, { useEffect } from 'react';
import { JitsiMeetExternalAPI } from 'lib-jitsi-meet';

interface JitsiMeetProps {
  roomName: string;
  userInfo: {
    email: string;
    displayName: string;
  };
}

const JitsiMeet: React.FC<JitsiMeetProps> = ({ roomName, userInfo }) => {
  useEffect(() => {
    const domain = '8x8.vc';
    const options = {
      roomName,
      width: 700,
      height: 700,
      parentNode: document.getElementById('jitsi-container'),
      userInfo,
    };

    const api = new JitsiMeetExternalAPI(domain, options);

    api.addEventListener('participantJoined', (participant: any) => {
      console.log('Participant joined:', participant);
    });

    return () => api.dispose();
  }, [roomName, userInfo]);

  return <div id="jitsi-container" style={{ height: '700px', width: '700px' }} />;
};

export default JitsiMeet;
