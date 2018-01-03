(function() {
  'use strict';
  angular.module('app')
    .service('loginService', service)

    service.$inject = ["$http", "$stateParams"]

    function service($http, $stateParams){
      const vm  = this;
      this.loggedIn = false;

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
            this.loggedIn = true;
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
            this.loggedIn = true;
            return response.data
          })
      }


    }
}());
