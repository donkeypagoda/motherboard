const mainAudio = document.querySelector('audio');
let level = document.querySelector(".vol");

console.log("dogballs");

if (navigator.mediaDevices) {
  console.log("yah buddy getUserMedia is down with the plan");
  navigator.mediaDevices.getUserMedia({audio: true})
  .then ((stream) => {
    let audioCtx = new AudioContext();
    let source = audioCtx.createMediaStreamSource(stream);
    let loPassFilter = audioCtx.createBiquadFilter();
    loPassFilter.type = "lowpass";
    loPassFilter.frequency.value = 1000;
    loPassFilter.gain.value = level.value;
    source.connect(loPassFilter);
    loPassFilter.connect(audioCtx.destination);
    level.oninput = () => {
      loPassFilter.gain.value = level.value;
    }



  })
  .catch(function(err) {
        console.log('The following gUM error occured: ' + err);
    });
}
else {
    console.log('getUserMedia not supported round deez partz');
}
