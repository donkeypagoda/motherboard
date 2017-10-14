(function() {
  'use strict';
  angular.module('app')
<<<<<<< HEAD
    .directive('board', function($compile) {
      const controller = function($scope) {
        const vm = this

        $scope.content = []
        vm.addUnit = function(unit){
          // <disto></disto><chorus></chorus><delay></delay><panner></panner><reverb></reverb>
          $scope.content.push("<reverb></reverb>") // ("<delay config="pedal data from database"></delay><delay></delay>")
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
=======
    .directive('board', function() {
      return {
        controller,
        controllerAs: '$ctrl',
        template: `
          <div>
            <button ng-click="$ctrl.units.addToBoard('delay')">Add Delay</button>
            <button ng-click="$ctrl.units.addToBoard('disto')">Add Disto</button>
          </div>
          <div ng-repeat="u in $ctrl.units.currentUnits track by $index">
            <pedal-holder unit="{{u}}"></pedal-holder>
          </div>
          `
      } // end of link
>>>>>>> dynamicPedals
    }) // end of directive

    controller.inject = ['unitService'];
    function controller(unitService) {
      const vm = this
      vm.units = unitService;
    } // end of controller

}());
