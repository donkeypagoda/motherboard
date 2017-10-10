(function() {
  'use strict';
  angular.module('app')
    .directive('board', function($compile) {
      return {
        link: function (scope, element, attrs) {
          element.html("<disto></disto><chorus></chorus><delay></delay><reverb></reverb><panner></panner>");
          $compile(element.contents())(scope);
        }
      }
    })
}());
