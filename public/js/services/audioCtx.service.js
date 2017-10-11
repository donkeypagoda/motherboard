(function() {
  'use strict';
  angular.module('app')
    .service('audioCtx', service)

    // service.$inject = ["$http", "$stateParams"]

    function service(){
      const vm  = this;
      this.audioCtx = new AudioContext();
      this.units = [];


      this.add = function(unit){
        this.units.push(unit);

        this.buildSignalPath(this.units);
      }

      this.remove = function(unit){
        this.units = this.units.filter(ele => ele !== unit);
        this.buildSignalPath(this.units);
      }



      this.buildSignalPath = function(unitArray){
        navigator.mediaDevices.getUserMedia({audio: { latency: 0.01,
                                                      echoCancellation: false,
                                                      mozNoiseSuppression: false,
                                                      mozAutoGainControl: false
                                            }})
        .then ((stream) => {
          let source = vm.audioCtx.createMediaStreamSource(stream);

          for(const unit of this.units){

            unit.plug(vm.audioCtx, source);
            source = unit.output;
          }

          this.units[this.units.length -1].output.connect(vm.audioCtx.destination);
        })
      }
    }
}());
