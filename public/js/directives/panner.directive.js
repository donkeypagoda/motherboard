(function() {
  'use strict';
  angular.module('app')
    .directive('panner', function(){
      return {
        controller: controller,
        link: link,
        templateUrl: "templates/panner.template.html"
      };
    })
      controller.$inject = ["audioCtxService"]
      function controller(audioCtxService){
        const vm = this;
        audioCtxService.add(vm);

        vm.plug = function(audioCtx, source){
          vm.pannerGo = true;
          vm.output;
          vm.bypass = false;
          vm.panner = audioCtx.createStereoPanner();
          vm.panner.pan.value = 0;
          vm.passThruGain = audioCtx.createGain();
          vm.passThruGain.gain.value = 0.0;
          vm.panerGain = audioCtx.createGain();
          vm.pannerGain.gain.value = 1.0;
          vm.merger = audioCtx.createChannelMerger(1);
          vm.pannerWidth = [-1, 1];
          vm.pannerTable = Array.from(new Array(50), (x, i) => i/25 + vm.pannerWidth[0]);
          vm.pannerTableRev = Array.from(new Array(51), (x, i) => vm.pannerWidth[1] - i/25);
          vm.pannerFullTable = vm.pannerTable.concat(vm.pannerTableRev)
          vm.counter = 0;

          source.connect(vm.pannerGain)
          source.connect(vm.panner)
          vm.panner.connect(vm.pannerGain)
          vm.pannerGain.connect(vm.merger)
          vm.passThruGain.connect(vm.merger)
          this.output = vm.merger
        }
        // UI STUFF XXXXXXXXXXXXXXXXXXXXXXXXX
        this.pannerSpeedInput = document.querySelector("#pannerSpeed");
        this.pannerSpeed = 500;
        // this.pannerWidthInput = document.querySelector("#pannerWidth");
        this.pannerStartStop = document.querySelector("#pannerStartStop");
        this.pannerBypass = document.querySelector("#pannerBypass");
        // PANNER GUTS XXXXXXXXXXXXXXXXXXXXXXXXX

        // console.log(this.pannerFullTable);


        // ROUTING XXXXXXXXXXXXXXXXXXXXXXXXX

        // THE ACTION XXXXXXXXXXXXXXXXXXXXXXXXX
        this.panInc = () => {
          this.panner.pan.value = this.pannerFullTable[this.counter++]
          console.log(this.panner.pan.value)
          if(this.counter === this.pannerFullTable.length - 1) {
            this.counter = 0;
            this.panInc();
          }
        }

        if (this.pannerGo) {
          this.intervalID = setInterval(this.panInc, this.pannerSpeed)
        }

        this.pannerSpeedInput.oninput = () => {
          this.pannerSpeed = parseInt(this.pannerSpeedInput.value);
          clearInterval(this.intervalID)
          if (this.pannerGo) {
            this.intervalID = setInterval(this.panInc, parseInt(this.pannerSpeedInput.value))
          }
        }

        this.pannerStartStop.onchange = () => {
          this.pannerGo = !this.pannerGo;
          if (this.pannerGo) {
            this.intervalID = setInterval(this.panInc, parseInt(this.pannerSpeedInput.value))
          }
          else{
            console.log(this.intervalID);
            clearInterval(this.intervalID)
          }
        }

        this.pannerBypass.onchange = () => {
          this.bypass = !this.bypass
          if (this.bypass) {
            controller.passThruGain.gain.value = 1.0;
            controller.pannerGain.gain.value = 0.0;
          }
          else {
            controller.passThruGain.gain.value = 0.0;
            controller.pannerGain.gain.value = 1.0;
          }
        }





      } // end of controller

      function link(){

      } // end of link

})();
