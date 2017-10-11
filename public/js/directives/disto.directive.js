(function() {
  'use strict';
  angular.module('app')
    .directive('disto', function(){
      return {
        controller: controller,
        link: link,
        templateUrl: "templates/disto.template.html"
      };
      controller.$inject = ['audioCtxService']
      function controller(audioCtxService){
        const vm = this;
        audioCtxService.add(vm);

        vm.plug = function(audioCtx, source){

          vm.distoOver = audioCtx.createGain();
          vm.disto1 = audioCtx.createWaveShaper();
          vm.makeDistortionCurve = (amount) => {
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
          vm.disto1.curve = this.makeDistortionCurve(400);
          this.disto1.oversample = '4x';

          vm.distoHPF = audioCtx.createBiquadFilter();
          vm.distoHPF.type = "highpass"
          vm.distoHPF.frequency.value = 60;
          vm.distoLPF = .audioCtx.createBiquadFilter();
          vm.distoLPF.type = "lowpass"
          vm.distoLPF.frequency.value = 15000;

          vm.output;
          vm.bypass = false;

          this.distoSat = document.querySelector('#distoSat')
          this.distoOverdrive = document.querySelector("#distoOverdrive")
          this.distoHPFfreq = document.querySelector("#distoHPFfreq")
          this.distoLPFfreq = document.querySelector("#distoLPFfreq")
          this.distoBypass = document.querySelector("#distoBypass")


          //  ROUTING XXXXXXXXXXXXXXXXXXXXXXXXX
          source.connect(vm.distoOver)
          vm.distoOver.connect(vm.disto1)
          vm.disto1.connect(vm.distoHPF)
          vm.distoHPF.connect(vm.distoLPF)
          vm.output = vm.distoLPF

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
              this.output = source
              vm.distoOver.gain.value = 0.0;
            }
            else {
              vm.distoOver.gain.value = parseFloat(this.distoOverdrive.value)
              source.connect(this.distoOver)
              vm.distoOver.connect(vm.disto1)
              vm.disto1.connect(vm.distoHPF)
              vm.distoHPF.connect(vm.distoLPF)
              vm.output = vm.distoLPF

            }
          }






        }
      }

      function link(){

        // $(function() {
        //   $("#distoSat")
        //   .dial({
        //     fgColor:"#222222",
        //     bgColor:"#EEEEEE",
        //     thickness: 0.3,
        //     change : function (value) {
        //       console.log("change : ", value);
        //       disto1.curve = makeDistortionCurve(parseFloat(distoSat.value));
        //     }
        //
        //   })
        //   .css({display:'inline',padding:'0px 10px'});
        //
        //
        // }());
      }



    })
})();
