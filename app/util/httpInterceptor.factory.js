(function() {
  'use strict';

  angular
    .module('util')
    .factory('HttpInterceptor', HttpInterceptor);
  
  HttpInterceptor.$inject = ['$q', 'pendingRequests'];

  function HttpInterceptor($q, pendingRequests) {
    
    
    //Get random key.
    var getReuqestKey = function() {
          var requestKey = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for( var i=0; i < 20; i++ ) {
            requestKey += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return requestKey;
    }

    return {
        request: function (config) {
            
            //Add timeout promise and requestKey into config.
            //Add current request into pendingRequests
            var canceller = $q.defer();
            config.requestKey = getReuqestKey();
            config.timeout = canceller.promise;
            pendingRequests.add(config.requestKey, canceller);
            console.log('HttpInterceptor#request' + config.requestKey);
            
            return config;
        },
        requestError: function (rejection) {
            
            return $q.reject(rejection);
        },
        response: function (response) {
            
            //Remove  request from pendingRequests corresponded to current response
            pendingRequests.remove(response.config.requestKey);
            return response;
        },
        responseError: function (rejection) {
            
            //Remove  request from pendingRequests corresponded to current response
            pendingRequests.remove(rejection.config.requestKey);
            return $q.reject(rejection);
        }
    };
  }

})();