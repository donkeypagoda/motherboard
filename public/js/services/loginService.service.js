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
        let password = signIn.password
        const userData = {
          data: JSON.stringify({ email, password }),
          dataType: 'json',
          type: 'GET',
          url: '/token',
        };
        return $http.get(userData)

      }


    }
}());

// const options = {
//       contentType: 'application/json',
//       data: JSON.stringify({ email, password }),
//       dataType: 'json',
//       type: 'POST',
//       url: '/token'
// };
