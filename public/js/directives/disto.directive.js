(function() {
  'use strict';
  angular.module('app')
    .directive('disto', function(){
      const link = function (){

        function makeAudioAndDelay(){
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
              return new Disto(audioCtx, source)
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
        makeAudioAndDelay();
}

      return {
        link: link,
        templateUrl: "templates/disto.template.html"
      };

    })
})();
