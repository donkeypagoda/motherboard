(function() {
  'use strict';
  angular.module('app')
    .directive('delay', function(){
      const controller = function (){
        this.makeAudioAndDelay(){
          const audioCtx = new AudioContext();
          if (navigator.mediaDevices.getUserMedia) {
            console.log("yah buddy getUserMedia is down with the plan");
            navigator.mediaDevices.getUserMedia({audio: { latency: 0.01,
                                                          echoCancellation: false,
                                                          mozNoiseSuppression: false,
                                                          mozAutoGainControl: false
                                                }})
            .then ((stream) => {
              const source = audioCtx.createMediaStreamSource(stream);
              return source;
            })
            .then((source) => {
              return new Delay(audioCtx, source)
            })
            .then((delay) => {
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

      return {
        controller: controller,
        // link: link,
        templateUrl: "templates/delay.template.html"
      };

    })
})();
