const { desktopCapturer } = require('electron')

const {ipcRenderer} = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById("liveBtn").onclick = function(){
    $("#liveBlock").css("display","block");
    ipcRenderer.send('resize-live-open')
    presentDesktop();
  }
});


// presentDesktop();
function presentDesktop(){
  desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
    console.log(sources);
    for (const source of sources) {
      
      if (source.name === 'Screen 1') {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id,
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720
              }
            }
          })
          handleStream(stream)
        } catch (e) {
          handleError(e)
        }
        return
      }
    }
  })
}


function handleStream (stream) {
  const video = document.getElementById('live')
  video.srcObject = stream
  video.onloadedmetadata = (e) => {
    console.log(e);
    console.log("begin live");
    video.play();
  }
}

function handleError (e) {
  console.log(e)
}