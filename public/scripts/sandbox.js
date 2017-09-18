let time = document.querySelector('#delayTime');
let feedbackSlider = document.querySelector("#delayFeedback");
let delayFilter = document.querySelector('#delayFilter');
let loCutFreq = document.querySelector("#loCutFreq");

if (navigator.mediaDevices) {
  console.log("yah buddy getUserMedia is down with the plan");
  navigator.mediaDevices.getUserMedia({audio: true})
  .then ((stream) => {
    let audioCtx = new AudioContext();
    let source = audioCtx.createMediaStreamSource(stream);
    let delay = audioCtx.createDelay();
    let feedbackFilter = audioCtx.createBiquadFilter();
    let feedback = audioCtx.createGain();

    // delay.delayTime.value = 1;

    feedbackFilter.frequency.value = 1000;
    feedbackFilter.gain.value = -10;

    feedback.gain.value = 0.0;

    // routing:
    source.connect(delay);
    delay.connect(audioCtx.destination);
    delay.connect(feedback);
    feedback.connect(feedbackFilter);
    feedbackFilter.connect(audioCtx.destination);

    time.oninput = () => {
      console.log(time.value);
      delay.delayTime.value = time.value;
    };
    feedbackSlider.oninput = () => {
      console.log(feedbackSlider.value);
      feedback.gain.value = feedbackSlider.value;
    };

    loCutFreq.oninput = () => {
      console.log(loCutFreq.value);
      feedbackFilter.frequency.value = loCutFreq.value;
    };
 
  })
  .catch(function(err) {
        console.log('The following gUM error occured: ' + err);
    });
}
else {
    console.log('getUserMedia not supported round deez partz');
}
