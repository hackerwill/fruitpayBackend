(function() {
  'use strict';

  angular
    .module('util')
    .factory('HttpInterceptor', HttpInterceptor);
  
  HttpInterceptor.$inject = ['$q', '$injector'];

  function HttpInterceptor($q, $injector) {
    
    // var $injector = angular.injector();
    var opts = {
          lines: 13 // The number of lines to draw
        , length: 7 // The length of each line
        , width: 7 // The line thickness
        , radius: 23 // The radius of the inner circle
        , scale: 1 // Scales overall size of the spinner
        , corners: 1 // Corner roundness (0..1)
        , color: '#4169E1' // #rgb or #rrggbb or array of colors
        , opacity: 0.15 // Opacity of the lines
        , rotate: 25 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 1.2 // Rounds per second
        , trail: 86 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '50%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
        }
    var spinner = new Spinner(opts);
    var target = document.getElementsByTagName("BODY")[0];
    var xhrCounter = 0;
 
    function isLoading() {
        return xhrCounter != 0;
    }
 
    function updateStatus() {
        if(isLoading()){
            spinner.spin(target);
        }else{
            spinner.stop();
        }
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
            //Avoid circular dependency.
            $injector.invoke(['LogService',function(LogService) {
                console.log(rejection);
                LogService.showError(rejection);
            }]);
            return $q.reject(rejection);
        }
    };
  }

})();