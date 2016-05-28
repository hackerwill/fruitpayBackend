(function() {
	angular
		.module('util')
		.service('pendingRequests', pendingRequests);

	pendingRequests.$inject = [];

	function pendingRequests(){
	  var pending = {};
	  
	  this.get = function() {
	    return pending;
	  };
	  this.add = function(key, value) {
	    pending[key] = value;
	  };
	  this.remove = function(key) {
	    delete pending[key] ;
	  };
	  //Resolve all pending request.
	  this.cancelAll = function() {
	  	for (var i in pending) {
		  pending[i].resolve();
		}
	    pending = {};
	  };
    }

})();