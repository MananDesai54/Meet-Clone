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
});

const tools = document.querySelector('.tools');
const main = document.querySelector('.screen main');
const chatRoom = document.querySelector('.chat-room');
const closeChat = document.getElementById('close-chat');

tools.addEventListener('click',(e)=>{
    if (e.target.id === 'chat' || e.target.id === 'people') {
        tools.style.top = '-100px';
        main.style.width = '100%';
        chatRoom.style.width = '450px';
        chatRoom.style.transitionDelay = '100ms';
        chatRoom.style.padding = '1rem';
        closeChat.style.display = 'block';
    }
});

closeChat.addEventListener('click',()=>{
    tools.style.top = '0px';
    tools.style.transitionDelay = '100ms';
    main.style.width = '100vw';
    chatRoom.style.width = '0vw';
    chatRoom.style.padding = '0';
    closeChat.style.display = 'none';
})

const message = document.getElementById('message');
const sendBtn = document.getElementById('send-message');
message.addEventListener('input',()=>{
    if(message.value.trim() !== '') {
        sendBtn.disabled = false;
    } else {
        sendBtn.disabled = true;
    }
})