(function() {
  'use strict';
  angular.module('app')
  .directive('pedalHolder', ['$compile', function($compile){
    return {
      scope:{
        unit: '@'
      },
      link: function(scope, element){
          $(element).html(`<${scope.unit}></${scope.unit}>`);
          $compile($(element).contents())(scope)
        }
    }
  }])
}());
