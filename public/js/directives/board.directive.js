(function() {
  'use strict';
  angular.module('app')
    .directive('board', function($compile) {
      const controller = function($scope) {
        $scope.content = []
        this.addDelay = function(){
          $scope.content.push("<delay></delay>")
        }
        this.addDelay();
      }
      controller.$inject = ["$scope"];

      const link = function ($scope, element) {

        element.html($scope.content.join(""));
        $compile(element.contents())($scope);
      }
      link.$inject = ["$scope"]

      return {
        controller: controller,
        link: link
      }
    })
}());
