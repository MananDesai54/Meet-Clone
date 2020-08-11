const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new speechRecognition();

recognition.onstart = () => {
    console.log('Hello');
}

recognition.start();

recognition.onresult = (e) => {
    console.log(e)
}