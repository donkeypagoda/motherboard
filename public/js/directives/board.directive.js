(function() {
  'use strict';
  angular.module('app')
    .directive('board', function() {
      return {
        controller,
        controllerAs: '$ctrl',
        templateUrl: "templates/board.template.html"
      }
    }) // end of directive

    controller.inject = ['unitService', 'audioCtxService'];
    function controller(unitService, audioCtxService) {
      const vm = this
      vm.units = unitService;
      vm.audioCtxService = audioCtxService;
      vm.removeLastAndRebuild = function(){
        vm.units.removeLast();
        vm.audioCtxService.removeLast();
      }
    } // end of controller

}());
