(function() {
  'use strict';
  angular.module('app')
    .service('loginService', service)

    service.$inject = ["$http", "$stateParams"]

    function service($http, $stateParams){
      const vm  = this;
      vm.loggedIn = false;

      this.login = function (signIn){
        console.log("attempt" + signIn);
        let email = signIn.email;
        let password = signIn.password;
        const userData = {
          contentType: 'application/json',
          data: JSON.stringify({ email, password }),
          dataType: 'json',
          type: 'POST',
          url: '/token',
        };
        return $http.post("/token", userData)
          .then(function (response) {
            console.log(response);
            vm.loggedIn = true;
            return response.data
          })
      }

      this.createAccount = function (signUp){
        console.log("attempt" + signUp);
        const { username, email, password} = signUp;
        const newUser = {
          contentType: 'application/json',
          data: JSON.stringify({ username, email, password }),
          dataType: 'json',
          type: 'POST',
          url: '/users',
        }
        return $http.post("/users", newUser)
          .then(function (response) {
            console.log(response);
            vm.loggedIn = true;
            return response.data
          })
      }

      this.logOut = function(){
        vm.loggedIn = false;
        // this should delete the cookie/token etc.
        // reseting the loggedIn variable will happen in the board directive
      }


    }
}());
