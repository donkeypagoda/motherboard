(function() {
  'use strict';
  angular.module('app')
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
    }) // end of directive

    controller.inject = ['unitService'];
    function controller(unitService) {
      const vm = this
      vm.units = unitService;
    } // end of controller

}());
