(function() {
  'use strict';
  angular.module('app')
    .directive('delay', function(){
      return {
        controller: controller,
        link: link,
        templateUrl: "templates/delay.template.html"
      };

    })

    controller.$inject = ['audioCtxService']
    function controller(audioCtxService){
      const vm = this;
      audioCtxService.add(vm);

      vm.plug = function(audioCtx, source){
        vm.delayInputBypassStatus = false;
        vm.feedbackBypassStatus = false;
        vm.delay = audioCtx.createDelay(10.0); // this might be too long, check for memory slowness
        vm.delay.delayTime.value = "0.25";
        vm.feedback = audioCtx.createGain();
        vm.feedback.gain.value = 0.0;
        vm.delayMute = audioCtx.createGain();
        vm.delayMute.gain.value = 1.0;
        vm.feedbackMute = audioCtx.createGain();
        vm.feedbackMute.gain.value = 1.0;
        vm.delayPassThru = audioCtx.createGain();
        vm.delayPassThru.gain.value = 0.5;
        vm.delayMixMute = audioCtx.createGain();
        vm.delayMixMute.gain.value = 0.5;
        vm.merger = audioCtx.createChannelMerger(1);


        // ROUTING XXXXXXXXXXXXXXXXXXXXXXXXX
        source.connect(vm.delayMute);
        source.connect(vm.delayPassThru);
        vm.delayMute.connect(vm.delay);
        vm.delay.connect(vm.feedbackMute);
        vm.feedbackMute.connect(vm.feedback);
        vm.feedback.connect(vm.delay);
        vm.delay.connect(vm.delayMixMute);
        vm.delayMixMute.connect(vm.merger);
        vm.delayPassThru.connect(vm.merger);
        vm.output = vm.merger;
      }
    }

    function link(scope, iElement, iAttrs, controller, transcludeFn){
      const root = $(iElement)
      controller.time = root.find('#delayTime');
      controller.feedbackSlider = root.find("#delayFeedback");
      controller.delayWetDryMix = root.find("#delayWetDryMix");
      controller.delayBypass = root.find("#delayBypass");
      controller.delayInputBypass = root.find("#delayInputBypass");
      controller.feedbackBypass = root.find("#feedbackBypass");
      // console.log(controller.time);



      // UI XXXXXXXXXXXXXXXXXXXXXXXXX
      // controller.time.change(() => {
      //   console.log(controller.time.val());
      //   controller.delay.delayTime.value = parseFloat(controller.time.val());
      // });
      // controller.feedbackSlider.change(() => {
      //   controller.feedback.gain.value = parseFloat(controller.feedbackSlider.val());
      // });
      // controller.delayWetDryMix.change(() => {
      //   controller.delayMixMute.gain.value = parseFloat(controller.delayWetDryMix.val());
      //   controller.delayPassThru.gain.value = 0.1 / parseFloat(controller.delayWetDryMix.val());
      // });
      controller.delayBypass.change(() => {
        controller.bypass = !controller.bypass;
        if(controller.bypass){
          controller.delayMute.gain.value = 0;
          controller.feedbackMute.gain.value = 0;
          controller.delayPassThru.gain.value = 1;
        }
        else{
          controller.delayMute.gain.value = 1;
          controller.feedbackMute.gain.value = 1;
          controller.delayPassThru.gain.value = 0.1 / parseFloat(controller.delayWetDryMix.val());
        }
      });

      controller.feedbackBypass.change(() => {
        controller.feedbackBypassStatus = !controller.feedbackBypassStatus
        if (controller.feedbackBypassStatus) {
          controller.feedbackMute.gain.value = 0;
        }
        else{
          controller.feedbackMute.gain.value = 1;
        }
      });

      controller.delayInputBypass.change(() => {
        controller.delayInputBypassStatus = !controller.delayInputBypassStatus
        if (controller.delayInputBypassStatus) {
          controller.delayMute.gain.value = 0;
        }
        else {
          controller.delayMute.gain.value = 1;
        }
      });
      controller.time.knob({
        fgColor:"#222222",
        bgColor:"#EEEEEE",
        thickness: 0.3,
        angleOffset: -130,
        angleArc: 260,
        min: 0.0,
        step: 0.05,
        max: 7.0,
        width: 100,
        height: 100,
        change : function (value) {
          console.log("change : ", value);
          controller.delay.delayTime.value = parseFloat(controller.time.val());
        }
      })
      controller.feedbackSlider.knob({
        fgColor:"#222222",
        bgColor:"#EEEEEE",
        thickness: 0.3,
        angleOffset: -130,
        angleArc: 260,
        min: 0.0,
        step: 0.05,
        max: 1.2,
        width: 100,
        height: 100,
        change : function (value) {
          console.log("change : ", value);
          controller.feedback.gain.value = parseFloat(controller.feedbackSlider.val());
        }
      })
      controller.delayWetDryMix.knob({
        fgColor:"#222222",
        bgColor:"#EEEEEE",
        thickness: 0.3,
        angleOffset: -130,
        angleArc: 260,
        min: 0.0,
        step: 0.01,
        max: 0.9,
        width: 100,
        height: 100,
        change : function (value) {
          console.log("change : ", value);
          controller.delayMixMute.gain.value = parseFloat(controller.delayWetDryMix.val());
          controller.delayPassThru.gain.value = 0.1 / parseFloat(controller.delayWetDryMix.val());
        }
      })


    } // end of link
})();
