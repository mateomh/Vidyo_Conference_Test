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
};

const getToken = async (userName) => {
  const url = 'https//localhost:5000/'
  const options = {
    headers: {
      user: userName,
    },
    method: 'GET',
  };

  const resp = fetch(url, options);

  return resp;
};
