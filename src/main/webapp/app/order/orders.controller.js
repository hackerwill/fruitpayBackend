(function(){
	'use strict';
	angular
			.module('order')
			.controller('OrdersController',OrdersController);
	OrdersController.$inject = ['OrderService'] ;
	function OrdersController(OrderService){
		var vm = this ;	//view model

		activate();

		function activate(){
			findAll();
		}
		//location='#/orders/'+id;
		function findAll(){
			OrderService.findAll().then(function(result){
				console.log(result);
				vm.orders = result.data.content;
			});
		}
	}

})();



