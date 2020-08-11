const option = {
    audio:true,
    video:true
}
const joinNowBtn = document.getElementById('join-now-btn');
let previousLink = joinNowBtn.getAttribute('href');
joinNowBtn.setAttribute('href',`${joinNowBtn}&veae`);

const video = document.getElementById('video');
const myVideo = document.createElement('video');
myVideo.muted = true;

let myVideoStream;

navigator.mediaDevices.getUserMedia({
    video:true,
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
    joinNowBtn.setAttribute('href',`${previousLink}&${videoString}${audioString}`);
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