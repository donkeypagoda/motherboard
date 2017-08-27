const mainAudio = document.querySelector('audio');
let time = document.querySelector('input');

if (navigator.mediaDevices) {
  console.log("yah buddy getUserMedia is down with the plan");
  navigator.mediaDevices.getUserMedia({audio: true})
  .then ((stream) => {
    let audioCtx = new AudioContext();
    let source = audioCtx.createMediaStreamSource(stream);
    let loPassFilter = audioCtx.createBiquadFilter();
    let delay = audioCtx.createDelay(100);
    delay.delayTime.value = 1;
    loPassFilter.type = "lowpass";
    loPassFilter.frequency.value = 1000;
    // loPassFilter.gain.value = level.value;
    source.connect(loPassFilter);
    loPassFilter.connect(delay);
    delay.connect(audioCtx.destination);
    time.oninput = () => {
      console.log(time.value);
      delay.delayTime.value = time.value;
    };



  })
  .catch(function(err) {
        console.log('The following gUM error occured: ' + err);
    });
}
else {
    console.log('getUserMedia not supported round deez partz');
}
