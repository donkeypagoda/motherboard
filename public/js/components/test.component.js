(function(){
  angular.module('app')
    .component('test', {
      controller,
      templateUrl: "test.template.html"
    })
    .directive('taco', function(){

      return {
        link: function(){
          function sayShit(){
            console.log("shit");
          }
          sayShit();
        },
        templateUrl: "/templates/test.template.html"
      };

    })
    controller.$inject = ['$state', '$http']
    function controller($state, $http){
      console.log("fuck me");
    }
})();
