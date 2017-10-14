(function() {
  'use strict';
  angular.module('app')
    .directive('board', function($compile) {
      const controller = function($scope) {
        const vm = this

        $scope.content = []
        vm.addUnit = function(unit){
          // <disto></disto><chorus></chorus><delay></delay><panner></panner><reverb></reverb>
          $scope.content.push("<delay></delay>") // ("<delay config="pedal data from database"></delay><delay></delay>")
        }
        vm.addUnit();
      } // end of controller

      controller.$inject = ["$scope"];

      function link($scope, element, iElement) {
        const root = $(iElement)
        // const pedalSelect = root.find("#addPedalSelect")
        // console.log(pedalSelect.val());
        // pedalSelect.change(() => {
        //
        // })
        element.html($scope.content.join(""));
        $compile(element.contents())($scope);
      }
      link.$inject = ["$scope"]
      // end of link

      return {
        controller: controller,
        link: link
        // templateUrl: "templates/board.template.html"
      }
    }) // end of directive
}());
