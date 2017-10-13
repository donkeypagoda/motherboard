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
    controller.$inject = ['audioCtxService']
    function controller(audioCtxService){
      const vm = this;
      audioCtxService.add(vm);

      vm.plug = function(audioCtx, source){
        vm.panner = audioCtx.createStereoPanner();
        vm.panner.pan.value = 0;
        vm.passThruGain = audioCtx.createGain();
        vm.passThruGain.gain.value = 0.0;
        vm.pannerGain = audioCtx.createGain();
        vm.pannerGain.gain.value = 1.0;
        vm.merger = audioCtx.createChannelMerger(1);
        vm.pannerWidth = [-1, 1];
        vm.pannerTable = Array.from(new Array(50), (x, i) => i/25 + vm.pannerWidth[0]);
        vm.pannerTableRev = Array.from(new Array(51), (x, i) => vm.pannerWidth[1] - i/25);
        vm.pannerFullTable = vm.pannerTable.concat(vm.pannerTableRev)
        vm.pannerGo = true;
        vm.output;
        vm.bypass = false;
        vm.counter = 0;
        vm.pannerSpeed = 500;

        vm.panInc = () => {
          vm.panner.pan.value = vm.pannerFullTable[vm.counter++]
          console.log(vm.panner.pan.value)
          if(vm.counter === vm.pannerFullTable.length - 1) {
            vm.counter = 0;
            vm.panInc();
          }
        }

        if (vm.pannerGo) {
          vm.intervalID = setInterval(vm.panInc, vm.pannerSpeed)
        }

        source.connect(vm.pannerGain)
        source.connect(vm.passThruGain)
        vm.pannerGain.connect(vm.panner)
        vm.panner.connect(vm.merger)
        vm.passThruGain.connect(vm.merger)
        vm.output = vm.merger
      }


    } // end of controller

    function link(scope, iElement, iAttrs, controller, transcludeFn){
      const root = $(iElement);
      controller.pannerSpeedInput = root.find("#pannerSpeed");
      controller.pannerStartStop = root.find("#pannerStartStop");
      controller.pannerBypass = root.find("#pannerBypass");

      controller.pannerSpeedInput.change(() => {
        controller.pannerSpeed = parseInt(controller.pannerSpeedInput.val());
        clearInterval(controller.intervalID)
        if (controller.pannerGo) {
          controller.intervalID = setInterval(controller.panInc, parseInt(controller.pannerSpeedInput.val()))
        }
      })

      controller.pannerStartStop.change(() => {
        controller.pannerGo = !controller.pannerGo;
        if (controller.pannerGo) {
          controller.intervalID = setInterval(controller.panInc, parseInt(controller.pannerSpeedInput.val()))
        }
        else{
          clearInterval(controller.intervalID)
        }
      })

      controller.pannerBypass.change(() => {
        controller.bypass = !controller.bypass
        if (controller.bypass) {
          controller.passThruGain.gain.value = 1.0;
          controller.pannerGain.gain.value = 0.0;
        }
        else {
          controller.passThruGain.gain.value = 0.0;
          controller.pannerGain.gain.value = 1.0;
        }
      })
    } // end of link

})();
