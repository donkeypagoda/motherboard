(function() {
  'use strict';
  angular.module('app')
    .directive('headMenu', function($compile) {
      return {
        controller: controller,
        link: link,
        templateUrl: "templates/headMenu.template.html"
      }
    }) // end of directive
    controller.$inject = []
    function controller(){
    }
    link.$inject = ["$scope"]
    function link($scope, iElement, iAttrs, controller, transcludeFn){
      const root = $(iElement)
      // controller.pedalSelect = root.find("#addPedalSelect")
      // console.log(controller.pedalSelect);
      const pedalSelect = root.find("#addPedalSelect")
      pedalSelect.change(() => {
        console.log(pedalSelect.val());

      })
    }
}());
