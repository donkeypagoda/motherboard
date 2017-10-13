(function() {
  'use strict';
  angular.module('app')
    .directive('board', function($compile) {
      const controller = function($scope) {
        const vm = this
        vm.$onInit = function (){

        }

        $scope.content = []
        this.addUnit = function(unit){
          // <disto></disto><chorus></chorus><delay></delay><panner></panner><reverb></reverb>
          $scope.content.push("<disto></disto>") // ("<delay config="pedal data from database"></delay><delay></delay>")
        }
        this.addUnit();

      }
      controller.$inject = ["$scope"];

      const link = function ($scope, element) {

        element.html($scope.content.join(""));
        $compile(element.contents())($scope);
      }
      link.$inject = ["$scope"]

      return {
        controller: controller,
        link: link,
        template: "templates/board.template.html"
      }
    })
}());
