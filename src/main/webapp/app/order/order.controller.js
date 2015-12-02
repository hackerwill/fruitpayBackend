(function(){
	'use strict';
	angular
			.module('order')
			.controller('OrderController',OrderController);
	OrderController.$inject = ['$scope','$routeParams','OrderService','CustomerService'] ;
	function OrderController($scope,$routeParams,OrderService,CustomerService){
		console.log("orderId:"+$routeParams.orderId);
		var vm = this ;


		activate();
		function activate(){

		}
	
	}

})();



