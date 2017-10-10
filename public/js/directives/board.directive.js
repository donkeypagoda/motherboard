(function() {
  'use strict';
  angular.module('app')
    .directive('board', function($compile) {
      return {
        link: function (scope, element, attrs) {
          element.html("<delay></delay>");
          $compile(element.contents())(scope);
        }
      }
    })
}());
