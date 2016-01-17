(function(){
	'use strict';
	angular
		.module('order')
		.controller('EditOrderController',EditOrderController);
	
	EditOrderController.$inject = ['$scope','$mdDialog','OrderService','order'];
	function EditOrderController($scope, $mdDialog,OrderService ,order) {
		$scope.order = angular.copy(order);
	    $scope.save = function() {
	    	if($scope.order.orderId){
	    		update();
	    	}else{
	    		add();
	    	}
	    }
	    /**更新客戶**/
	    function update(){
	    	OrderService.update($scope.order).then(function(res){
	    		$mdDialog.hide($scope.order);
	    	});
	    }
	    /**新增客戶**/
	    function add(){
	    	OrderService.createOrder($scope.order).then(function(res){
	    		$mdDialog.hide(res.data);
	    	});
	    }
	    $scope.closeDialog = function() {
	      $mdDialog.cancel();
	    }
	}
})();








