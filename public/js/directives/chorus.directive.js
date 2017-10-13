(function() {
  'use strict';
  angular.module('app')
    .directive('chorus', function(){
      return {
        controller: controller,
        link: link,
        templateUrl: "templates/chorus.template.html"
      };
    })
    controller.$inject = ["audioCtxService"]
    function controller(audioCtxService){
      const vm = this;
      audioCtxService.add(vm);

      vm.plug = function(audioCtx, source){
        vm.delayNode = audioCtx.createDelay(1.0);
        vm.delayNode.delayTime.value = 0.02;
        vm.delayGain = audioCtx.createGain();
        vm.delayGain.gain.value = 1.2;
        vm.cleanGain = audioCtx.createGain();
        vm.cleanGain.gain.value = 0.7;
        vm.merger = audioCtx.createChannelMerger(1);
        vm.makeUpGain = audioCtx.createGain();
        vm.makeUpGain.gain.value = 1.2;

        vm.output;
        vm.bypass = false;

        vm.modVal = 200;
        vm.counter = 0;
        vm.depth = 50;
        vm.speed = 500;
        vm.chorusGo = true;
        vm.tableLength = 10;

        vm.chorusTable = Array.from(new Array(vm.tableLength), (x, i) => vm.depth / vm.tableLength)
        vm.chorusTableRev = Array.from(new Array(vm.tableLength), (x, i) => -vm.depth / vm.tableLength)
        vm.chorusTableHalf = vm.chorusTable.concat(vm.chorusTableRev)
        vm.chorusTableHalf2 = vm.chorusTableRev.concat(vm.chorusTable)
        vm.chorusTableFull = vm.chorusTableHalf.concat(vm.chorusTableHalf2)

        vm.cycle = () => {
          vm.modVal += vm.chorusTableFull[vm.counter++];
          vm.delayNode.delayTime.value = vm.modVal * 0.0001
          console.log(vm.delayNode.delayTime.value)
          if (vm.counter === vm.chorusTableFull.length){
            vm.counter = 0;
            vm.cycle();
          }
        }
        if (vm.chorusGo){
          vm.intervalID = setInterval(vm.cycle, vm.speed)
        }

        // ROUTING XXXXXXXXXXXXXXXXXXXXXXXXX
        source.connect(vm.delayGain);
        vm.delayGain.connect(vm.delayNode);
        vm.delayNode.connect(vm.merger)
        source.connect(vm.cleanGain);
        vm.cleanGain.connect(vm.merger);
        vm.merger.connect(vm.makeUpGain);
        vm.output = vm.makeUpGain;
      } // end of plug
    }

    function link(scope, iElement, iAttrs, controller, transcludeFn){
      const root = $(iElement);
      controller.depthControl = root.find("#chorusDepth");
      controller.speedControl = root.find("#chorusSpeed");
      controller.bypassControl = root.find("#chorusBypass");

      controller.depthControl.change(() => {
        controller.depth = parseInt(controller.depthControl.val());
        clearInterval(controller.intervalID);
        if (controller.chorusGo){
          controller.intervalID = setInterval(controller.cycle, controller.speed);
        }
      });
      controller.speedControl.change(() => {
        controller.speed = parseInt(controller.speedControl.val());
        clearInterval(controller.intervalID);
        if (controller.chorusGo){
          controller.intervalID = setInterval(controller.cycle, controller.speed);
        }
      });

      controller.bypassControl.change(() => {
        controller.bypass = !controller.bypass;
        if (controller.bypass) {
          clearInterval(controller.intervalID);
          controller.delayGain.gain.value = 0.0;
          controller.cleanGain.gain.value = 1.0;
          controller.makeUpGain.value.gain = 1.0;
        }
        else{
          controller.intervalID = setInterval(controller.cycle, controller.speed)
          controller.delayGain.gain.value = 1.2;
          controller.cleanGain.gain.value = 0.7;
          controller.makeUpGain.value.gain = 1.2;

        }
      });


    }

})();
