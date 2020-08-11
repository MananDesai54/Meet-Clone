//set name
const getName = () => {
    let name = prompt('Enter Your name');
    if(!name) {
        alert('Please Provide A name');
        getName();
    }
    return name;
}

let userName = localStorage.getItem('name');
if(!userName) {
    const name = getName();
    console.log(name);
    localStorage.setItem('name',name);
    userName = name;
}
document.querySelector('header .username').textContent = userName;

localStorage.setItem('audio',JSON.stringify(true));
localStorage.setItem('video',JSON.stringify(true));

const option = {
    audio : JSON.parse(localStorage.getItem('audio')) !== null ? JSON.parse(localStorage.getItem('audio')) : true,
    video : JSON.parse(localStorage.getItem('video')) !== null ? JSON.parse(localStorage.getItem('video')) : true
}
const joinNowBtn = document.getElementById('join-now-btn');

const video = document.getElementById('video');
const myVideo = document.createElement('video');
myVideo.muted = true;

let myVideoStream;

navigator.mediaDevices.getUserMedia({
    video:false,
    audio:true
}).then(stream => {
    myVideoStream = stream;
    myVideo.srcObject = stream;
    myVideo.addEventListener('loadedmetadata',()=>{
        myVideo.play();
        video.insertBefore(myVideo,video.childNodes[0]);
    });
    document.querySelector('.controls').style.opacity = 1;
});

function setHref() {
    const videoString = option.video ? 've' : 'vd';
    const audioString = option.audio ? 'ae' : 'ad';
    localStorage.setItem('audio',JSON.stringify(option.audio));
    localStorage.setItem('video',JSON.stringify(option.video));
}

function toggleMute() {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    option.audio = !enabled;
    myVideoStream.getAudioTracks()[0].enabled = !enabled;
    setHref();
}

function toggleVideoStream() {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    option.video = !enabled;
    myVideoStream.getVideoTracks()[0].enabled = !enabled;
    setHref();
}

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