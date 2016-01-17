(function(){
	'use strict';
	angular
		.module('order')
		.controller('OrdersController',OrdersController);
	OrdersController.$inject = ['OrderService','$mdDialog','$scope'] ;
	function OrdersController(OrderService,$mdDialog,$scope){
		var vm = this ;	//view model
		vm.progress = false;
		vm.selected = [] ;
		vm.openOrderDialog = openOrderDialog;
		activate();
		function activate(){
			findAll();
		}
		//location='#/orders/'+id;
		function findAll(){
			vm.progress = true;
			OrderService.findAll().then(function(result){
				console.log(result);
				vm.orders = result.data.content;
				vm.progress = false;
			});
		}
		
		
		function openOrderDialog($event ,order){
			$mdDialog.show({
				targetEvent: $event,
				hasBackdrop: true,
				clickOutsideToClose :true,
				locals: { order: order },
				templateUrl : 'app/order/orderDialog.html',
				controller: DialogController
		       }).then(function(res){
		    	   
		    	   if(order.orderId){
		    		   updateOrder(res);
		    	   }else{
		    		   createOrder(res);
		    	   }
		    	   
		       });
		}
	}

	
	
	DialogController.$inject = ['$scope','$mdDialog','OrderService','order'];
	function DialogController($scope, $mdDialog,OrderService ,order) {
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








