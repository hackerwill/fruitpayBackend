(function() {
  'use strict';

  angular
    .module('util')
    .factory('LoadingInterceptor', LoadingInterceptor);
  
  LoadingInterceptor.$inject = ['$q', '$rootScope'];

  function LoadingInterceptor($q, $rootScope) {
    
    var xhrCounter = 0;
 
    function isLoading() {
        return xhrCounter != 0;
    }
 
    function updateStatus() {
        $rootScope.isLoading = isLoading();
    }

    return {
        request: function (config) {
            xhrCounter++;
            updateStatus();
            return config;
        },
        requestError: function (rejection) {
            xhrCounter--;
            updateStatus();
            return $q.reject(rejection);
        },
        response: function (response) {
            xhrCounter--;
            updateStatus();
            return response;
        },
        responseError: function (rejection) {
            xhrCounter--;
            updateStatus();
            return $q.reject(rejection);
        }
    };
  }

})();