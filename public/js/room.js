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

//show video
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:false
}).then(stream => {
    addVideoStream(myVideo,stream);

    //answer the call
    myPeer.on('call',call=>{
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream',userMediaStream=>{
            addVideoStream(video,userMediaStream);
        })
    })

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
function addVideoStream(video,stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',() => {
        video.play();
        videoGrid.appendChild(video);
    });
}