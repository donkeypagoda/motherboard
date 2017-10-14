(function() {
  'use strict';
  angular.module('app')
    .directive('disto', function(){
      return {
        controller: controller,
        link: link,
        templateUrl: "templates/disto.template.html"
      };

    })

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
          vm.disto1.curve = vm.makeDistortionCurve(400);
          vm.disto1.oversample = '4x';
          vm.distoHPF = audioCtx.createBiquadFilter();
          vm.distoHPF.type = "highpass"
          vm.distoHPF.frequency.value = 60;
          vm.distoLPF = audioCtx.createBiquadFilter();
          vm.distoLPF.type = "lowpass"
          vm.distoLPF.frequency.value = 15000;
          vm.distoPassThru = audioCtx.createGain();
          vm.distoPassThru.gain.value = 0.0;
          vm.merger = audioCtx.createChannelMerger(1);

          vm.output;
          vm.bypass = false;



          //  ROUTING XXXXXXXXXXXXXXXXXXXXXXXXX
          source.connect(vm.distoOver)
          source.connect(vm.distoPassThru)
          vm.distoOver.connect(vm.disto1)
          vm.disto1.connect(vm.distoHPF)
          vm.distoHPF.connect(vm.distoLPF)
          vm.distoLPF.connect(vm.merger)
          vm.distoPassThru.connect(vm.merger)
          this.output = vm.merger




        }
      }

      function link(scope, iElement, iAttrs, controller, transcludeFn){
        const root = $(iElement)
        controller.distoSat = root.find("#distoSat")
        controller.distoOverdrive = root.find("#distoOverdrive")
        controller.distoHPFfreq = root.find("#distoHPFfreq")
        controller.distoLPFfreq = root.find("#distoLPFfreq")
        controller.distoBypass = root.find("#distoBypass")

        // controller.distoSat.change(() => {
        //   // console.log(parseFloat(distoSat.value));
        //   controller.disto1.curve = controller.makeDistortionCurve(parseFloat(controller.distoSat.val()));
        // });
        // controller.distoOverdrive.change(() => {
        //   // console.log(parseFloat(distoOverdrive.value));
        //   controller.distoOver.gain.value = parseFloat(controller.distoOverdrive.val());
        // });

        // controller.distoHPFfreq.change(() => {
        //   // console.log(parseFloat(distoHPFfreq.value));
        //   controller.distoHPF.frequency.value = parseFloat(controller.distoHPFfreq.val());
        // })
        controller.distoLPFfreq.change(() => {
          // console.log(parseFloat(distoLPFfreq.value));
          controller.distoLPF.frequency.value = parseFloat(controller.distoLPFfreq.val());
        })
        controller.distoBypass.change(() => {
          controller.bypass = !controller.bypass;
          if (controller.bypass) {
              // controller.output = source
              controller.distoOver.gain.value = 0.0;
              controller.distoPassThru.gain.value = 1.0;

          }
          else {
            controller.distoOver.gain.value = parseFloat(controller.distoOverdrive.val())
            controller.distoPassThru.gain.value = 0.0

          }
        })

          controller.distoSat.knob({
            fgColor:"#222222",
            bgColor:"#EEEEEE",
            thickness: 0.3,
            angleOffset: -130,
            angleArc: 260,
            min: 50,
            step: 25,
            max: 4000,
            width: 100,
            height: 100,
            change : function (value) {
              console.log("change : ", value);
              controller.disto1.curve = controller.makeDistortionCurve(parseFloat(controller.distoSat.val()));
            }
          })
          .css({display:'inline',padding:'0px 10px'});

          controller.distoOverdrive.knob({
            fgColor:"#222222",
            bgColor:"#EEEEEE",
            thickness: 0.3,
            angleOffset: -130,
            angleArc: 260,
            min: 0.1,
            step: 0.1,
            max: 7.0,
            width: 100,
            height: 100,
            change : function (value) {
              console.log("change : ", value);
              controller.distoOver.gain.value = parseFloat(controller.distoOverdrive.val());
            }
          })
          .css({display:'inline',padding:'0px 10px'});

          controller.distoHPFfreq.knob({
            fgColor:"#222222",
            bgColor:"#EEEEEE",
            thickness: 0.3,
            angleOffset: -130,
            angleArc: 260,
            min: 10,
            step: 25,
            max: 4000,
            width: 100,
            height: 100,
            change : function (value) {
              console.log("change : ", value);
              controller.distoHPF.frequency.value = parseFloat(controller.distoHPFfreq.val());
            }
          })
          .css({display:'inline',padding:'0px 10px'});

          controller.distoLPFfreq.knob({
            fgColor:"#222222",
            bgColor:"#EEEEEE",
            thickness: 0.3,
            angleOffset: -130,
            angleArc: 260,
            min: 2000,
            step: 25,
            max: 15000,
            width: 100,
            height: 100,
            change : function (value) {
              console.log("change : ", value);
              controller.distoLPF.frequency.value = parseFloat(controller.distoLPFfreq.val());
            }
          })
          .css({display:'inline',padding:'0px 10px'});

      }



})();
