(function() {
  'use strict';
  angular.module('app')
    .service('audioCtx', service)

    // service.$inject = ["$http", "$stateParams"]

    function service(){
      this.audioCtx;

      this.buildSignalPath = function(unitArray){
        delete this.audioCtx;
        this.audioCtx = new AudioContext();
        const newChain = new AsyncUnits(audioCtx, unitArray);
        newChain.invoke();

        if (navigator.mediaDevices.getUserMedia) {
          console.log("yah buddy getUserMedia is down with the plan");
          return navigator.mediaDevices.getUserMedia({audio: { latency: 0.01,
                                                        echoCancellation: false,
                                                        mozNoiseSuppression: false,
                                                        mozAutoGainControl: false
                                              }})
          .then ((stream) => {
            const source = audioCtx.createMediaStreamSource(stream);
            return source;
          })






          .then((source) => {
            return source.output.connect(audioCtx.destination)
          })
          .catch(function(err) {
                console.log('The following gUM error occured: ' + err);
            });
        }
        else {
            console.log('getUserMedia not supported round deez partz');
        }
      }



    }


    class AsyncUnits{
      constructor(audioCtx, unitArray){
        this.units = unitArray;
        this.length = unitArray.length;
        this.count = 0;
      }
      invoke(){
        if (this.count < this.length){
          this.units[this.count++](this.invoke.bind(this))
        }
      }
    }
}());
