(function(){
  angular.module('app')
    .component('test', {
      controller,
      templateUrl: "test.template.html"
    })

    controller.$inject = ['$state', '$http']
    function controller($state, $http, postService, commentService){
      console.log("fuck me");

    }
})();
