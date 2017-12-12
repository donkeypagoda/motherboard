(function() {
  'use strict';
  angular.module('app')
    .service('loginService', service)

    service.$inject = ["$http", "$stateParams"]

    function service($http, $stateParams){
      const vm  = this;

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
            return response.data
          })
      }

      this.createAccount = function (signUp){
        console.log("attempt" + signUp);
        let email = signUp.email;
        let password = signUp.password;
        const newUser = {
          contentType: 'application/json',
          data: JSON.stringify({ email, password }),
          dataType: 'json',
          type: 'POST',
          url: '/users',
        }
        return $http.post("/users", newUser)
          .then(function (response) {
            console.log(response);
            return response.data
          })
      }


    }
}());
