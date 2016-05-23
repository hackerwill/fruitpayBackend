(function(){
	'use strict';

	angular
		.module('constant')
		.service('ConstantService',ConstantService);

	ConstantService.$inject = ['$http','fruitpay'];

	function ConstantService($http, fruitpay) {
		this.getAllConstants = function(page, size) {
			return $http.get(fruitpay+'staticDataCtrl/adminConstant?page='+page+'&size='+size);
		}

		this.update = function(constant) {
			return $http.put(fruitpay+'staticDataCtrl/adminConstant',constant);
		}

		this.createConstant = function(constant) {
			return $http.post(fruitpay+'staticDataCtrl/adminConstant',constant);
		}
	}

})();