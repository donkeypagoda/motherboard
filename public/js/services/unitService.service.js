(function() {
  'use strict';

  angular.module('app')
  .service('unitService', function(){
    const vm = this;

    vm.availableUnits = ['delay', 'chorus', 'disto', 'panner', 'reverb']

    vm.currentUnits = [];

    vm.addToBoard = function(unit){
      vm.currentUnits.push(unit)
    }
    vm.removeLast = function(){
      vm.currentUnits = vm.currentUnits.slice(0, vm.currentUnits.length - 1)
      console.log(vm.currentUnits);
    }
  })

}());
