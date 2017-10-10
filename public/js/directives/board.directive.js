(function() {
  'use strict';
  angular.module('app')
    .directive('board', function($compile) {
      const controller = function($scope, delayService) {
        const vm = this
        vm.$onInit = function (){
          delayService.makeAudioAndDelay()
            .then((delay) => {
              console.log(delay);
            })
        }
        $scope.content = []
        this.addDelay = function(){
          $scope.content.push("<delay></delay>")
        }
        this.addDelay();
        // delay.makeAudioAndDelay();
        // this.addDisto = function (){
        //   $scope.content.push("<disto></disto>")
        // }
        // this.addDisto();
      }
      controller.$inject = ["$scope", "delayService"];

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
