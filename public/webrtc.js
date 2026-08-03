let localStream;
let remoteStream;
let peerConnection;

const servers = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302"
      ]
    }
  ]
};

export async function startCall(localVideo, remoteVideo) {

  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  });

  remoteStream = new MediaStream();

  localVideo.srcObject = localStream;
  remoteVideo.srcObject = remoteStream;

  peerConnection = new RTCPeerConnection(servers);

  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = event => {
    event.streams[0].getTracks().forEach(track => {
      remoteStream.addTrack(track);
    });
  };

}

export function endCall() {

  if (peerConnection) peerConnection.close();

  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
  }

}
