(function() {
  'use strict';
  angular.module('app')
    .service('delayService', service)

    // service.$inject = ["$http", "$stateParams"]

    function service(){

      this.makeAudioAndDelay = function(){
        const audioCtx = new AudioContext();
        if (navigator.mediaDevices.getUserMedia) {
          console.log("yah buddy getUserMedia is down with the plan");
          return navigator.mediaDevices.getUserMedia({audio: { latency: 0.01,
                                                        echoCancellation: false,
                                                        mozNoiseSuppression: false,
                                                        mozAutoGainControl: false
                                              }})
          .then ((stream) => {
            const source = audioCtx.createMediaStreamSource(stream);
            // loop
            new Delay(audioCtx, source)
            // connect output
            return delay.output.connect(audioCtx.destination)
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
