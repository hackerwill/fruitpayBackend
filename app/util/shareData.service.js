(function() {
	angular
		.module('util')
		.service('ShareDataService', ShareDataService);

	ShareDataService.$inject = [];

	function ShareDataService(){
	     var applicationParameter = {};

		 var setParameter = function(key, value) {
	     	applicationParameter[key] = value ;
		 }

		 var getParameter = function(key){
		      return applicationParameter[key];
		 }

		 return {
		    setParameter: setParameter,
		    getParameter: getParameter
		 };
    }

})();