(function() {
  'use strict';
  angular.module('app')
    .service('audioCtxService', service)

    // service.$inject = ["$http", "$stateParams"]

    function service(){
      const vm  = this;
      vm.audioCtx = new AudioContext();
      vm.units = [];

      vm.add = function(unit){
        vm.units.push(unit);
        vm.buildSignalPath(vm.units);
      }

      vm.remove = function(unit){
        vm.units = vm.units.filter(ele => ele !== unit);
        vm.buildSignalPath(vm.units);
      }



      vm.buildSignalPath = function(unitArray){
          navigator.mediaDevices.getUserMedia({audio: { latency: 0.01,
            echoCancellation: false,
            mozNoiseSuppression: false,
            mozAutoGainControl: false
          }})
          .then ((stream) => {
            let source = vm.audioCtx.createMediaStreamSource(stream);
            console.log("audioCtx loaded");
            for(const unit of unitArray){
              unit.plug(vm.audioCtx, source);
              source = unit.output;
            }

            unitArray[unitArray.length -1].output.connect(vm.audioCtx.destination);
          })
      }
    }
}());
