(function(){
	'use strict';
	angular
			.module('order')
			.controller('OrdersController',OrdersController);
	OrdersController.$inject = ['OrderService','OrderDetailService' ,'CustomerService'] ;
	function OrdersController(OrderService,OrderDetailService,CustomerService){
		var vm = this ;	//view model

		activate();

		function activate(){

		}
		//location='#/orders/'+id;
	}

})();



