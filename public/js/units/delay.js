class Delay {
  constructor(audioCtx, input){
    this.audioCtx = audioCtx;
    this.input = input;
    this.output;
    this.bypass = false;
    this.time = document.querySelector('#delayTime');
    this.feedbackSlider = document.querySelector("#delayFeedback");
    this.delayWetDryMix = document.querySelector("#delayWetDryMix");
    this.delayBypass = document.querySelector("#delayBypass");
    this.delayInputBypass = document.querySelector("#delayInputBypass");
    this.delayInputBypassStatus = false;
    this.feedbackBypass = document.querySelector("#feedbackBypass");
    this.feedbackBypassStatus = false;
    this.delay = audioCtx.createDelay(10.0); // this might be too long, check for memory slowness
    this.delay.delayTime.value = "0.25";
    this.feedback = audioCtx.createGain();
    this.feedback.gain.value = 0.0;
    this.delayMute = audioCtx.createGain();
    this.delayMute.gain.value = 1.0;
    this.feedbackMute = audioCtx.createGain();
    this.feedbackMute.gain.value = 1.0;
    this.delayPassThru = audioCtx.createGain();
    this.delayPassThru.gain.value = 0.5;
    this.delayMixMute = audioCtx.createGain();
    this.delayMixMute.gain.value = 0.5;
    this.merger = this.audioCtx.createChannelMerger(1);

    // ROUTING XXXXXXXXXXXXXXXXXXXXXXXXX
    this.input.connect(this.delayMute);
    this.input.connect(this.delayPassThru);
    this.delayMute.connect(this.delay);
    this.delay.connect(this.feedbackMute);
    this.feedbackMute.connect(this.feedback);
    this.feedback.connect(this.delay);
    this.delay.connect(this.delayMixMute);
    this.delayMixMute.connect(this.merger);
    this.delayPassThru.connect(this.merger);
    this.output = this.merger;

    // UI XXXXXXXXXXXXXXXXXXXXXXXXX
    this.time.onchange = () => {
      this.delay.delayTime.value = parseFloat(this.time.value);
    };
    this.feedbackSlider.oninput = () => {
      this.feedback.gain.value = this.feedbackSlider.value;
    };
    this.delayWetDryMix.oninput = () => {
      this.delayMixMute.gain.value = parseFloat(this.delayWetDryMix.value);
      this.delayPassThru.gain.value = 0.1 / parseFloat(this.delayWetDryMix.value);
    };
    this.delayBypass.onchange = () => {
      this.bypass = !this.bypass;
      if(this.bypass){
        this.input.connect(this.output);
        this.delayMute.gain.value = 0;
        this.feedbackMute.gain.value = 0;
      }
      else{
        this.input.connect(this.delayMute);
        this.input.connect(this.delayPassThru);
        this.delayMute.connect(this.delay);
        this.delay.connect(this.feedbackMute);
        this.feedbackMute.connect(this.feedback);
        this.feedback.connect(this.delay);
        this.delay.connect(this.delayMixMute);
        this.delayMixMute.connect(this.merger)
        this.delayPassThru.connect(this.merger);
        this.output = this.merger;
        this.delayMute.gain.value = 1;
        this.feedbackMute.gain.value = 1;
      }
    };

    this.feedbackBypass.onchange = () => {
      this.feedbackBypassStatus = !this.feedbackBypassStatus
      if (this.feedbackBypassStatus) {
        this.feedbackMute.gain.value = 0;
      }
      else{
        this.feedbackMute.gain.value = 1;
      }
    };

    this.delayInputBypass.onchange = () => {
      this.delayInputBypassStatus = !this.delayInputBypassStatus
      if (this.delayInputBypassStatus) {
        this.delayMute.gain.value = 0;
      }
      else {
        this.delayMute.gain.value = 1;
      }
    }
  }
}
