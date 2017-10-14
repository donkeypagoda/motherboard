(function() {
  'use strict';
  angular.module('app')
    .directive('headMenu', function($compile) {
      return {
        controller: controller,
        link: link,
        templateUrl: "templates/headMenu.template.html"
      }
    }) // end of directive
    controller.$inject = []
    function controller(){
      const vm = this
    }
    link.$inject = ["$scope", "audioCtxService"]
    function link($scope, iElement, iAttrs, controller, transcludeFn){
      const root = $(iElement)
      // controller.pedalSelect = root.find("#addPedalSelect")
      // console.log(controller.pedalSelect);
      controller.pedalSelect = root.find("#addPedalSelect")
      controller.pedalSelect.change(() => {
        console.log(controller.pedalSelect.val());
        $scope.content.push(controller.pedalSelect.val())
        console.log($scope.content);
        // element.html($scope.content.join(""));
        // $compile(element.contents())($scope);

          // <disto></disto><chorus></chorus><delay></delay><panner></panner><reverb></reverb>
          // ("<delay config="pedal data from database"></delay><delay></delay>")

      })
    }
}());
