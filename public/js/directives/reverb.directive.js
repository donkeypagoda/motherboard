(function() {
  'use strict';
  angular.module('app')
    .directive('reverb', function(){
      return {
        controller: controller,
        link: link,
        templateUrl: "templates/reverb.template.html"
      }
    })
    controller.$inject = ["audioCtxService"]
    function controller(audioCtxService){
      const vm = this;
      audioCtxService.add(vm);

      vm.plug = function(audioCtx, source){
        vm.output;
        vm.bypass = false;
        vm.audioCtx = audioCtx;
        vm.reverbBypassStatus = false;
        vm.reverb = audioCtx.createConvolver();
        vm.reverbInputGain = audioCtx.createGain();
        vm.reverbInputGain.gain.value = 0.5;
        vm.reverbOutputGain = audioCtx.createGain();
        vm.reverbOutputGain.gain.value = 1.0;
        vm.cleanGain = audioCtx.createGain();
        vm.cleanGain.gain.value = 0.5;
        vm.hiPass = audioCtx.createBiquadFilter();
        vm.hiPass.type = "highpass";
        vm.loPass = audioCtx.createBiquadFilter();
        vm.loPass.type = "lowpass";
        vm.merger = audioCtx.createChannelMerger(1);
        vm.reverbChoice = {
          "plate": "../media/concert-crowd.ogg",
          "hall": "../media/concert-crowd.ogg",
          "dungeon": "../media/concert-crowd.ogg"
        }

        vm.getImpulseResponse = new XMLHttpRequest()
          vm.getImpulseResponse.open("GET", vm.reverbChoice.plate, true);
          vm.getImpulseResponse.responseType = "arraybuffer";
          vm.getImpulseResponse.onload = () => {
            console.log("tacos")
            return audioCtx.decodeAudioData(vm.getImpulseResponse.response,
              (buffer) => {
                console.log("are good")
                return vm.reverb.buffer = buffer
              });
          }
        vm.getImpulseResponse.send();


        // ROUTING XXXXXXXXXXXXXXXXXXXXXXXXX
        source.connect(vm.reverbInputGain);
        source.connect(vm.cleanGain);
        vm.reverbInputGain.connect(vm.reverb);
        vm.cleanGain.connect(vm.merger);
        vm.reverb.connect(vm.reverbOutputGain);
        vm.reverbOutputGain.connect(vm.hiPass);
        vm.hiPass.connect(vm.loPass);
        vm.loPass.connect(vm.merger);
        vm.output = vm.merger;
      }
    } // end of controller
    function link(scope, iElement, iAttrs, controller, transcludeFn){
      const root = $(iElement)
      controller.reverbSelect = root.find("#reverbSelect");
      controller.reverbAmount = root.find("#reverbAmount");
      controller.reverbMix = root.find("#reverbMix");
      controller.reverbHiPass = root.find("#reverbHiPass");
      controller.reverbLoPass = root.find("#reverbLoPass");
      controller.reverbInputBypass = root.find("#reverbInputBypass");
      controller.reverbBypass = root.find("#reverbBypass");

      controller.reverbSelect.change(() => {
        // console.log(controller.reverbSelect.value);
        controller.getImpulseResponse = new XMLHttpRequest()
          controller.getImpulseResponse.open("GET", controller.reverbChoice[controller.reverbSelect.val()], true);
          controller.getImpulseResponse.responseType = "arraybuffer";
          controller.getImpulseResponse.onload = () => {
            console.log("tacos")
            return controller.audioCtx.decodeAudioData(controller.getImpulseResponse.response,
              (buffer) => {
                console.log("are good")
                return controller.reverb.buffer = buffer });
          }
        controller.getImpulseResponse.send();
      })

      controller.reverbAmount.change(() => {
        // console.log(parseFloat(controller.reverbAmount.val()));
        controller.reverbInputGain.gain.value = parseFloat(controller.reverbAmount.val());
      })

      controller.reverbMix.change(() => {
        // console.log(parseFloat(controller.reverbMix.val()));
        controller.reverbOutputGain.gain.value = parseFloat(controller.reverbMix.val());
        controller.cleanGain.gain.value = 0.1 / parseFloat(controller.reverbMix.val());
      })

      controller.reverbLoPass.change(() => {
        // console.log(parseFloat(controller.reverbLoPass.val()));
        controller.loPass.frequency.value = parseFloat(controller.reverbLoPass.val());
      })

      controller.reverbHiPass.change(() => {
        // console.log(parseFloat(controller.reverbHiPass.val()));
        controller.hiPass.frequency.value = parseFloat(controller.reverbHiPass.val());
      })

      controller.reverbInputBypass.change(() => {
        controller.reverbBypassStatus = !controller.reverbBypassStatus
        if (controller.reverbBypassStatus){
          controller.reverbInputGain.gain.value = 0.0;
          // console.log(controller.reverbBypassStatus);
        }
        else {
          controller.reverbInputGain.gain.value = parseFloat(controller.reverbAmount.val());
        }
      })

      controller.reverbBypass.change(() => {
        controller.bypass = !controller.bypass;
        if (controller.bypass) {
          controller.reverbOutputGain.gain.value = 0.0;
        }
        else {
          controller.reverbOutputGain.gain.value = parseFloat(controller.reverbMix.val())
        }
      })

    } //end of link

})();
