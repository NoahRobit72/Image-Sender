const localVideo = document.getElementById('localVideo');
const socket = io.connect('http://localhost:3000');

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
        localVideo.srcObject = stream;
        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    })
    .catch(error => {
        console.error('Error accessing media devices.', error);
    });

const config = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
    ]
};

const peerConnection = new RTCPeerConnection(config);

peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
        socket.emit('candidate', event.candidate);
    }
};

peerConnection.ontrack = (event) => {
    localVideo.srcObject = event.streams[0];
};

socket.on('offer', (offer) => {
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    peerConnection.createAnswer()
        .then(answer => {
            peerConnection.setLocalDescription(answer);
            socket.emit('answer', answer);
        });
});

socket.on('answer', (answer) => {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
});

socket.on('candidate', (candidate) => {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
});

peerConnection.createOffer()
    .then(offer => {
        peerConnection.setLocalDescription(offer);
        socket.emit('offer', offer);
    });