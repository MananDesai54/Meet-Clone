const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const takeScreenShot = () => {

    html2canvas(document.body)
        .then(bodyCanvas => {
            const imageWidth = bodyCanvas.offsetWidth;
            const imageHeight = bodyCanvas.offsetHeight;
            
            canvas.width = imageWidth;
            canvas.height = imageHeight;

            context.drawImage(bodyCanvas,0,0,imageWidth,imageHeight);
            // document.body.innerHTML = '';
            // document.body.appendChild(bodyCanvas);

            const downloadLink = document.createElement('a');
            downloadLink.setAttribute('download',`screenshot${Date.now()}.png`);
            bodyCanvas.toBlob(blob => {
                console.log(blob);
                downloadLink.setAttribute('href',URL.createObjectURL(blob));
                downloadLink.click();
            });
        });
}

const screenCaptureBtn = document.querySelector('.screenshot');
screenCaptureBtn.addEventListener('click',takeScreenShot);