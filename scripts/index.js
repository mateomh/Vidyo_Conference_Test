/*jshint esversion: 6 */

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

  getToken()
  .then(data => data.json())
  .then(token => connectorConnect(connector, token.token));
};

const connectorConnect = (connector, token) => {
  console.log('Token', token);
  // Connect to the room
  connector.Connect({
    host: "prod.vidyo.io",
    // token: 'cHJvdmlzaW9uAHVzZXIxQDg1NjI0Zi52aWR5by5pbwA2Mzc4MDQ4OTIzMQAAMWM1MmU2NDdjYjJlNWU5OTUyMmY3MDc4ODJiMjA3YzFiNmU2OTUxODM3ZWVhMzFmOWE4ZDUxM2M2ODIyNGY2YmE4Y2RkYzEzODUxMGYzZGY0OTE0MjZjMTVlNWVlYWQ3', //Generated Token
    token,
    displayName: "user1", //User Name
    resourceId: "demoroom", //Conference Name
    onSuccess: () => console.log("Sucessfully connected"),
    onFailure: (reason) => console.log("Error while connecting ", reason),
    onDisconnected: (reason) => console.log("Disconnected ", reason),     
  });
};

const getToken = async (userName = 'user1') => {
  const tokenurl = 'https://localhost:3000/'
  // const options = {
  //   headers: {
  //     user: userName,
  //   },
  //   method: 'GET',
  // };

  // console.log(tokenurl)
  // const resp = fetch(tokenurl, options);
  const resp = fetch(tokenurl);
  console.log(resp);
  return resp;
};
