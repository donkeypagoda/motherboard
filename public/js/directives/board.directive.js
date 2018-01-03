(function() {
  'use strict';
  angular.module('app')
    .directive('board', function() {
      return {
        controller,
        controllerAs: '$ctrl',
        templateUrl: "templates/board.template.html"
      }
    }) // end of directive

    controller.inject = ['unitService', 'audioCtxService', 'loginService'];
    function controller(unitService, audioCtxService, loginService) {
      const vm = this
      vm.units = unitService;
      vm.audioCtxService = audioCtxService;
      vm.loginService = loginService;

      vm.login = function(signIn){
        vm.loginService.login(signIn)
          .then (() =>{
            delete vm.signIn;
          })
      }

      vm.createAccount = function(signUp){
        vm.loginService.createAccount(signUp)
          .then (() => {
            delete vm.signUp;
          })
      }
      vm.logOut = function (){
        vm.loginService.logOut(){
          .then(() => {
            vm.loginService.loggedIn = false;
          })
        }
      }

      vm.removeLastAndRebuild = function(){
        vm.units.removeLast();
        vm.audioCtxService.removeLast();
      }
    } // end of controller

}());
