class Reverb {
  constructor(audioCtx, input){
    this.audioCtx = audioCtx;
    this.input = input;
    this.output;
    this.bypass = false;
    this.reverbSelect = document.querySelector("#reverbSelect");
    this.reverbAmount = document.querySelector("#reverbAmount");
    this.reverbMix = document.querySelector("#reverbMix");
    this.reverbHiPass = document.querySelector("#reverbHiPass");
    this.reverbLoPass = document.querySelector("#reverbLoPass");
    this.reverbInputBypass = document.querySelector("#reverbInputBypass");
    this.reverbBypass = document.querySelector("#reverbBypass");
    this.reverbBypassStatus = false;
    this.reverb = this.audioCtx.createConvolver();
    this.reverbInputGain = this.audioCtx.createGain();
    this.reverbInputGain.gain.value = 0.5;
    this.reverbOutputGain = this.audioCtx.createGain();
    this.reverbOutputGain.gain.value = 1.0;
    this.cleanGain = this.audioCtx.createGain();
    this.cleanGain.gain.value = 0.5;
    this.hiPass = this.audioCtx.createBiquadFilter();
    this.hiPass.type = "highpass";
    this.loPass = this.audioCtx.createBiquadFilter();
    this.loPass.type = "lowpass";
    this.merger = this.audioCtx.createChannelMerger(1);
    this.reverbChoice = {
      "plate": "/media/concert-crowd.ogg",
      "hall": "/media/concert-crowd.ogg",
      "dungeon": "/media/concert-crowd.ogg"
    }

    this.getImpulseResponse = new XMLHttpRequest()
      this.getImpulseResponse.open("GET", this.reverbChoice.plate, true);
      this.getImpulseResponse.responseType = "arraybuffer";
      this.getImpulseResponse.onload = () => {
        this.audioCtx.decodeAudioData(this.getImpulseResponse.response,
          (buffer) => { this.reverb.buffer = buffer });
      }
    this.getImpulseResponse.send();


    // ROUTING XXXXXXXXXXXXXXXXXXXXXXXXX
    this.input.connect(this.reverbInputGain);
    this.input.connect(this.cleanGain);
    this.reverbInputGain.connect(this.reverb);
    this.cleanGain.connect(this.merger);
    this.reverb.connect(this.reverbOutputGain);
    this.reverbOutputGain.connect(this.hiPass);
    this.hiPass.connect(this.loPass);
    this.loPass.connect(this.merger);
    this.output = this.merger;

    this.reverbSelect.onchange = () => {
      // console.log(this.reverbSelect.value);
      this.getImpulseResponse = new XMLHttpRequest()
        this.getImpulseResponse.open("GET", this.reverbChoice[this.reverbSelect.value], true);
        this.getImpulseResponse.responseType = "arraybuffer";
        this.getImpulseResponse.onload = () => {
          this.audioCtx.decodeAudioData(this.getImpulseResponse.response,
            (buffer) => { this.reverb.buffer = buffer });
        }
      this.getImpulseResponse.send();
    }

    this.reverbAmount.oninput = () => {
      // console.log(parseFloat(this.reverbAmount.value));
      this.reverbInputGain.gain.value = parseFloat(this.reverbAmount.value);
    }

    this.reverbMix.oninput = () => {
      // console.log(parseFloat(this.reverbMix.value));
      this.reverbOutputGain.gain.value = parseFloat(this.reverbMix.value);
      this.cleanGain.gain.value = 0.1 / parseFloat(this.reverbMix.value);
    }

    this.reverbLoPass.oninput = () => {
      // console.log(parseFloat(this.reverbLoPass.value));
      this.loPass.frequency.value = parseFloat(this.reverbLoPass.value);
    }

    this.reverbHiPass.oninput = () => {
      // console.log(parseFloat(this.reverbHiPass.value));
      this.hiPass.frequency.value = parseFloat(this.reverbHiPass.value);
    }

    this.reverbInputBypass.onchange = () => {
      this.reverbBypassStatus = !this.reverbBypassStatus
      if (this.reverbBypassStatus){
        this.reverbInputGain.gain.value = 0.0;
        // console.log(this.reverbBypassStatus);
      }
      else {
        this.reverbInputGain.gain.value = parseFloat(this.reverbAmount.value);
      }
    }

    this.reverbBypass.onchange = () => {
      this.bypass = !this.bypass;
      if (this.bypass) {
        this.reverbOutputGain.gain.value = 0.0;
      }
      else {
        this.reverbOutputGain.gain.value = parseFloat(this.reverbMix.value)
      }
    }

  }
}
