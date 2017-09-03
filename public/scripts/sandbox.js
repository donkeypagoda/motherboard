const mainAudio = document.querySelector('audio');
let time = document.querySelector('#delayTime');
let feedbackSlider = document.querySelector("#delayFeedback");
let loCut = document.querySelector('#loCut');
let loCutFreq = document.querySelector('#loCutFreq')

if (navigator.mediaDevices) {
  console.log("yah buddy getUserMedia is down with the plan");
  navigator.mediaDevices.getUserMedia({audio: true})
  .then ((stream) => {
    let audioCtx = new AudioContext();
    let source = audioCtx.createMediaStreamSource(stream);
    let loPassFilter = audioCtx.createBiquadFilter();
    let delay = audioCtx.createDelay(100);
    let feedback = audioCtx.createGain();
    
    delay.delayTime.value = 1;
    loPassFilter.type = "highshelf";
    loPassFilter.frequency.value = 1000;
    loPassFilter.gain.value = loCut.value;
    feedback.gain.value = 0.0;

    // routing:
    source.connect(loPassFilter);
    loPassFilter.connect(delay);
    delay.connect(audioCtx.destination);
    delay.connect(feedback);
    feedback.connect(delay);



    time.oninput = () => {
      console.log(time.value);
      delay.delayTime.value = time.value;
    };
    feedbackSlider.oninput = () => {
      console.log(feedbackSlider.value);
      feedback.gain.value = feedbackSlider.value;
    };
    loCut.oninput = () => {
      console.log(loCut.value);
      loPassFilter.gain.value = loCut.value;
    };
    loCutFreq.oninput = () => {
      console.log(loCutFreq.value);
      loPassFilter.frequency.value = loCutFreq.value;
    };



  })
  .catch(function(err) {
        console.log('The following gUM error occured: ' + err);
    });
}
else {
    console.log('getUserMedia not supported round deez partz');
}
