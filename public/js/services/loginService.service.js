(function() {
  'use strict';
  angular.module('app')
    .service('loginService', service)

    function service(){
      const vm  = this;

      this.login = function (signIn){
        const userData = {
          data: JSON.stringify({ signIn.email, signIn.password }),
          dataType: 'json',
          type: 'POST',
          url: '/token'
        };
        return $http.get(userData)

      }


    }
}());
