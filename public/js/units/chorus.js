class Chorus {
  constructor(audioCtx, input){
    this.audioCtx = audioCtx;
    this.input = input;
    this.output;
    this.bypass = false;
    this.depthControl = document.querySelector("#chorusDepth");
    this.speedControl = document.querySelector("#chorusSpeed");
    this.bypassControl = document.querySelector("#chorusBypass");
    this.delayNode = this.audioCtx.createDelay(1.0);
    this.delayNode.delayTime.value = 0.02;
    this.delayGain = this.audioCtx.createGain();
    this.delayGain.gain.value = 0.7;
    this.cleanGain = this.audioCtx.createGain();
    this.cleanGain.gain.value = 0.5
    this.merger = this.audioCtx.createChannelMerger(1);
    this.makeUpGain = this.audioCtx.createGain();
    this.makeUpGain.gain.value = 1.5;


    // I had to do a BOATLOAD of funky ass shit to stay out of decimal land and avoid that javscript decimal bullshit
    this.modVal = 200;
    this.counter = 0;
    this.depth = 50;
    this.speed = 500;
    this.chorusGo = true;
    this.tableLength = 10;

    this.chorusTable = Array.from(new Array(this.tableLength), (x, i) => this.depth / this.tableLength)
    this.chorusTableRev = Array.from(new Array(this.tableLength), (x, i) => -this.depth / this.tableLength)
    this.chorusTableHalf = this.chorusTable.concat(this.chorusTableRev)
    this.chorusTableHalf2 = this.chorusTableRev.concat(this.chorusTable)
    this.chorusTableFull = this.chorusTableHalf.concat(this.chorusTableHalf2)

    // ROUTING XXXXXXXXXXXXXXXXXXXXXXXXX
    this.input.connect(this.delayGain);
    this.delayGain.connect(this.delayNode);
    this.delayNode.connect(this.merger)
    this.input.connect(this.cleanGain);
    this.cleanGain.connect(this.merger);
    this.merger.connect(this.makeUpGain);
    this.output = this.makeUpGain;

    this.cycle = () => {
      this.modVal += this.chorusTableFull[this.counter++];
      this.delayNode.delayTime.value = this.modVal * 0.0001
      console.log(this.delayNode.delayTime.value)
      if (this.counter === this.chorusTableFull.length){
        this.counter = 0;
        this.cycle();
      }
    }
    if (this.chorusGo){
      this.intervalID = setInterval(this.cycle, this.speed)
    }
    this.depthControl.oninput = () => {
      this.depth = parseInt(this.depthControl.value);
      clearInterval(this.intervalID);
      if (this.chorusGo){
        this.intervalID = setInterval(this.cycle, this.speed);
      }
    };
    this.speedControl.oninput = () => {
      this.speed = parseInt(this.speedControl.value);
      clearInterval(this.intervalID);
      if (this.chorusGo){
        this.intervalID = setInterval(this.cycle, this.speed);
      }
    }

    this.bypassControl.onchange = () => {
      this.bypass = !this.bypass;
      if (this.bypass) {
        clearInterval(this.intervalID);
        this.input.connect(this.output);
      }
      else{
        this.intervalID = setInterval(this.cycle, this.speed)
        this.input.connect(this.delayGain);
        this.delayGain.connect(this.delayNode);
        this.delayNode.connect(this.merger)
        this.input.connect(this.cleanGain);
        this.cleanGain.connect(this.merger);
        this.merger.connect(this.makeUpGain);
        this.output = this.makeUpGain;
      }
    }
  }
}
