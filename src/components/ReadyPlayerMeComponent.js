import React, { useEffect, useState } from 'react';

const ReadyPlayerMeComponent = () => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const iframe = document.getElementById('rpm-frame');
    iframe.src = 'https://neonverse.readyplayer.me/avatar?frameApi'; 


    window.addEventListener('message', subscribe);

    function subscribe(event) {
      const json = parseMessage(event);
      if (json?.source !== 'readyplayerme') {
        return;
      }

  
      if (json.eventName === 'v1.avatar.exported') {
        console.log(`Avatar URL: ${json.data.url}`);
        setAvatarUrl(json.data.url); 
      }

      if (json.eventName === 'v1.user.set') {
        console.log(`User with id ${json.data.id} set`);
      }
    }

    const parseMessage = (event) => {
        try {
            const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
            console.log("Parsed message data:", data);
            return data;
        } catch (error) {
            console.error("Error parsing message:", error);
            return null; 
        }
    };
    


    return () => {
      window.removeEventListener('message', subscribe);
    };
  }, []);

  return (
    <div>
      {avatarUrl ? (
        <model-viewer
          src={avatarUrl}
          camera-controls
          shadow-intensity="1"
          alt="Ready Player Me Avatar"
          style={{ width: '100%', height: '600px' }}
        ></model-viewer>
      ) : (
        <iframe
          id="rpm-frame"
          title="Ready Player Me Avatar Creator"
          style={{ width: '100%', height: '600px' }}
          allow="camera *; clipboard-write"
        ></iframe>
      )}
    </div>
  );
};

export default ReadyPlayerMeComponent;
