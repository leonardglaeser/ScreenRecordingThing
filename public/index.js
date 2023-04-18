let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let saveButton = document.getElementById('save');
startButton.disabled = false;
stopButton.disabled = true;
saveButton.disabled = true;

const video = document.getElementById('video');



let stream = null;
let recorder = null;
let chunks = [];
let videoUrl = null;
let filename = null;


startButton.addEventListener('click', async () => {
    stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
            mediaSource: 'screen'
        }
    });
    recorder = new MediaRecorder(stream);
    let name = new Date().toISOString().replace(/:/g, '-');
    filename = `screenRecording-${name}.webm`;
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
        const completeBlob = new Blob(chunks, { type: "video/webm" });
        chunks = [];
        videoUrl = URL.createObjectURL(completeBlob);
        video.src = videoUrl;
    };
    recorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
    saveButton.disabled = true;

});

stopButton.addEventListener('click', () => {
    recorder.stop();
    stream.getVideoTracks()[0].stop();
    startButton.disabled = false;
    stopButton.disabled = true;
    saveButton.disabled = false;
});

saveButton.addEventListener('click', () => {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = videoUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    //todo: remove the object URL (after the file has been downloaded)
    // window.URL.revokeObjectURL(this.downloadUrl); // dispose of the object URL -> later for memory management -> is this needed?
    a.remove();
});

