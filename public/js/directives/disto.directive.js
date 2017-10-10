(function() {
  'use strict';
  angular.module('app')
    .directive('disto', function(){

      const link = $(function() {
        $("#distoSat")
          .dial({
            fgColor:"#222222",
            bgColor:"#EEEEEE",
            thickness: 0.3,
            change : function (value) {
                console.log("change : ", value);
                disto1.curve = makeDistortionCurve(parseFloat(distoSat.value));
            }

            })
          .css({display:'inline',padding:'0px 10px'});


      }());

      const controller = function (){

        function makeAudioAndDisto(){
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
        makeAudioAndDisto();
}

      return {
        controller: controller,
        link: link,
        templateUrl: "templates/disto.template.html"
      };

    })
})();
