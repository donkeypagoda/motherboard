class Disto {
  constructor(audioCtx, input){
    this.audioCtx = audioCtx;
    this.input = input;
    this.output;
    this.bypass = false;

    this.distoSat = document.querySelector('#distoSat')
    this.distoOverdrive = document.querySelector("#distoOverdrive")
    this.distoHPFfreq = document.querySelector("#distoHPFfreq")
    this.distoLPFfreq = document.querySelector("#distoLPFfreq")
    this.distoBypass = document.querySelector("#distoBypass")

    this.distoOver = this.audioCtx.createGain();
    this.disto1 = this.audioCtx.createWaveShaper();
    this.makeDistortionCurve = (amount) => {
      let k = typeof amount === 'number' ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
      for ( ; i < n_samples; ++i ) {
        x = i * 2 / n_samples - 1;
        curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
      }
      return curve;
    }
    this.disto1.curve = this.makeDistortionCurve(400);
    this.disto1.oversample = '4x';

    this.distoHPF = this.audioCtx.createBiquadFilter();
    this.distoHPF.type = "highpass"
    this.distoHPF.frequency.value = 60;
    this.distoLPF = this.audioCtx.createBiquadFilter();
    this.distoLPF.type = "lowpass"
    this.distoLPF.frequency.value = 15000;

    //  ROUTING XXXXXXXXXXXXXXXXXXXXXXXXX
    this.input.connect(this.distoOver)
    this.distoOver.connect(this.disto1)
    this.disto1.connect(this.distoHPF)
    this.distoHPF.connect(this.distoLPF)
    this.output = this.distoLPF

    this.distoSat.oninput = () => {
      // console.log(parseFloat(distoSat.value));
      this.disto1.curve = this.makeDistortionCurve(parseFloat(this.distoSat.value));
    };
    this.distoOverdrive.oninput = () => {
      // console.log(parseFloat(distoOverdrive.value));
      this.distoOver.gain.value = parseFloat(this.distoOverdrive.value);
    };

    this.distoHPFfreq.oninput = () => {
      // console.log(parseFloat(distoHPFfreq.value));
      this.distoHPF.frequency.value = parseFloat(this.distoHPFfreq.value);
    }
    this.distoLPFfreq.oninput = () => {
      // console.log(parseFloat(distoLPFfreq.value));
      this.distoLPF.frequency.value = parseFloat(this.distoLPFfreq.value);
    }
    this.distoBypass.oninput = () => {
      this.bypass = !this.bypass;
      if (this.bypass) {
        this.output = this.input
        this.distoOver.gain.value = 0.0;
      }
      else {
        this.distoOver.gain.value = parseFloat(this.distoOverdrive.value)
        this.input.connect(this.distoOver)
        this.distoOver.connect(this.disto1)
        this.disto1.connect(this.distoHPF)
        this.distoHPF.connect(this.distoLPF)
        this.output = this.distoLPF

      }
    }

  }
}
