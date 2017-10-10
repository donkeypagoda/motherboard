(function() {
  'use strict';
  angular.module('app')
    .service('delayService', service)

    // service.$inject = ["$http", "$stateParams"]

    function service(){
      class AsyncUnits{
        constructor(audioCtx, unitArray){
          this.units = unitArray;
          this.length = unitArray.length;
          this.count = 0;
          this.invoke = () =>{
            if (this.count < this.length){
              this.units[this.count++](this.invoke.bind(this))
            }
          }
        }
      }

      this.buildSignalPath = function(unitArray){
        const audioCtx = new AudioContext();
        const newChain = new AsyncUnits(audioCtx, unitArray);

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


          newChain.invoke();



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
}());
