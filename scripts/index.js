function onVidyoClientLoaded(status){
  const { state } = status;

  switch (state) {
    case "READY":
      VC.CreateVidyoConnector({
        viewId: "renderer",
        viewStyle: "VIDYO_CONNECTORVIEWSTYLE_Default",
        remoteParticipants: 8,
        logFileFilter: "warning info@VidyoClient info@VidyoConnector",
        logFileName: "",
        userData: ""
      })
      .then((vidyoConnector) => connectorCofigure(vidyoConnector))
      .catch(error => console.log('Error creating the video connector', error));
      break;
  
    default:
      break;
  }
}

const connectorCofigure = (connector) => {
   // Add empty callbacks to the connector for the camera to work
   connector.RegisterLocalCameraEventListener({
    onAdded: (localCamera) => {},
    onRemoved:(localCamera) => {},
    onSelected: (localCamera) => {},
    onStateUpdated: (localCamera, state) => {}
  })
  .then(() => {
    console.log("RegisterLocalCameraEventListener Success");
  })
  .catch(() => {
    console.error("RegisterLocalCameraEventListener Failed");
  });

  // Add empty callbacks to the connector for the microphone to work
  connector.RegisterLocalMicrophoneEventListener({
    onAdded: (localMicrophone) => {},
    onRemoved: (localMicrophone) => {},
    onSelected: (localMicrophone) => {},
    onStateUpdated: (localMicrophone, state) => {}
  })
  .then(() => {
    console.log("RegisterLocalMicrophoneEventListener Success");
  })
  .catch(() => {
    console.error("RegisterLocalMicrophoneEventListener Failed");
  });

  // Add empty callbacks to the connector for the speakers to work
  connector.RegisterLocalSpeakerEventListener({
    onAdded: (localSpeaker) => {},
    onRemoved: (localSpeaker) => {},
    onSelected: (localSpeaker) => {},
    onStateUpdated: (localSpeaker, state) => {}
  }).then(() => {
    console.log("RegisterLocalSpeakerEventListener Success");
  }).catch(() => {
    console.error("RegisterLocalSpeakerEventListener Failed");
  });

  let userName = document.getElementById('username').value;
  if (userName === '') {
    userName = 'Guest';
  }
  getToken(userName)
  .then(data => data.json())
  .then(token => connectorConnect(connector, token.token));
};

const connectorConnect = (connector, token) => {
  let userName = document.getElementById('username').value;
  let meetingName = document.getElementById('resource').value;
  console.log('Token: ', token);
  if (userName === '') {
    userName = 'Guest';
  }

  if (meetingName === '') {
    meetingName = 'Default';
  }
  
  // Connect to the room
  connector.Connect({
    host: "prod.vidyo.io",
    token,
    displayName: userName, //User Name
    resourceId: meetingName, //Conference Name
    onSuccess: () => console.log("Sucessfully connected"),
    onFailure: (reason) => console.log("Error while connecting ", reason),
    onDisconnected: (reason) => console.log("Disconnected ", reason),     
  });
};

const getToken = async (userName = 'user1') => {
  const tokenurl = 'https://localhost:3000/'
  const options = {
    headers: {
      'user': userName,
      'Content-Type': 'application/json',
    },
    method: 'GET',
    mode: 'cors',
  };

  const resp = await fetch(tokenurl, options);
  // const resp = fetch(tokenurl);
  return resp;
};

const enterMeetingClick = () => {
  const body = document.getElementsByTagName('body')[0];
  const script = document.createElement('script');
  // Loading the SDK
  script.src = 'https://static.vidyo.io/latest/javascript/VidyoClient/VidyoClient.js?onload=onVidyoClientLoaded&webrtc=true&plugin=false'
  body.appendChild(script);
};