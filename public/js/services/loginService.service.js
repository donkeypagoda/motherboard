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
            console.log(response.data);
            return response.data
          })

      }


    }
}());
