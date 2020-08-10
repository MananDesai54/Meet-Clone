const socket = io('/');
const myPeer = new Peer(undefined,{
    path:'/peerjs',
    port:'5000',
    host:'/'
});

const peers = {};//store all users that are in

//join use message
myPeer.on('open',id=>{
    socket.emit('join',ROOM_ID,id);
});

//when use disconnect close connection and remove video
socket.on('user-disconnected',(userId)=>{
    console.log(userId,'Disconnected');
    if(peers[userId]) {
        peers[userId].close();
    }
})

const videoGrid = document.querySelector('.video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;
let myVideoStream;

//show video
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo,stream,true);

    //answer the call
    myPeer.on('call',call=>{
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream',userMediaStream=>{
            addVideoStream(video,userMediaStream);
        })
    });

    //other user connected
    socket.on('user-connected',(userId)=>{
        connectToStream(userId,stream);
        console.log(userId,'Connected');
    });
});

//to connect user with others
function connectToStream(userId,stream) {
    // console.log(userId,stream);
    const call = myPeer.call(userId,stream);
    const video = document.createElement('video');
    call.on('stream',userMediaStream=>{
        addVideoStream(video,userMediaStream);
    })
    call.on('close',()=>{
        video.remove();
    })
    peers[userId] = call;
}

//to add video to screen 
function addVideoStream(video,stream,own=false) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',() => {
        video.play();
        if(!own) {
            videoGrid.appendChild(video);
        }else {
            document.querySelector('.you').appendChild(video);
        }
    });
}

function toggleMute() {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    myVideoStream.getAudioTracks()[0].enabled = !enabled;
}

function toggleVideoStream() {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    console.log(enabled);
    myVideoStream.getVideoTracks()[0].enabled = !enabled;
}


//styling
const toggleMic = document.querySelector('.toggle-mic');
const toggleVideo = document.querySelector('.toggle-video');

toggleMic.addEventListener('click',()=>{
    toggleMute();
    toggleMic.classList.toggle('disable');
    if(toggleMic.classList.contains('disable')) {
        toggleMic.innerHTML = `
            <i class="material-icons">
                mic_off
            </i>
        `;
    }else {
        toggleMic.innerHTML = `
            <i class="material-icons">
                mic_none
            </i>
        `;
    }
})

toggleVideo.addEventListener('click',()=>{
    toggleVideoStream();
    toggleVideo.classList.toggle('disable');
    if(toggleVideo.classList.contains('disable')) {
        toggleVideo.innerHTML = `
            <i class="material-icons">
                videocam_off
            </i>
        `;
    }else {
        toggleVideo.innerHTML = `
            <i class="material-icons">
                videocam
            </i>
        `;
    }
})