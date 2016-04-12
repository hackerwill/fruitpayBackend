(function(){
	'use strict';
	angular
		.module('order')
		.controller('OrdersController',OrdersController);
	OrdersController.$inject = ['OrderService', '$mdDialog', '$scope', '$q', 'FileSaverService', 'LogService', 'UtilService'] ;
	function OrdersController(OrderService, $mdDialog, $scope, $q, FileSaverService, LogService, UtilService){
		var vm = this ;	//view model
		vm.selected = [] ;
		vm.condition = {};

		vm.condition.validFlag = 1;
		vm.resource = {totalElements:0,size: 10,number: 1};//md-table-pagination的初始值
		vm.pageOptions = [10, 20, 50, 100];
		
		vm.pagination = pagination;
		vm.openEditOrderDialog = openEditOrderDialog;
		vm.exportFile= exportFile;
		vm.moveOrders= moveOrders;
		vm.changeVlagAndFreshPage = changeVlagAndFreshPage;
		vm.search =search;

		UtilService.getAllOrderStatus()
			.then(function(result){
				vm.orderStatuses = result.data;
			})
		
		activate();

		function activate(){
			pagination(1, 10, vm.condition.validFlag);
		}
		//location='#/orders/'+id;
		function pagination(page,size){
			vm.selected = [] ;
			var deferred = $q.defer();
			vm.promise = deferred.promise;
			OrderService.findAll(page-1, size, vm.condition)
				.then(function(result){
					console.log(result);
					result.data.number = result.data.number+1;
					vm.resource = result.data;
					deferred.resolve();
				});
		}

		function search(){
			pagination(vm.resource.number, vm.resource.size);
		}

		function changeVlagAndFreshPage(){
			if(vm.condition.validFlag == 1){
				vm.condition.validFlag = 0;
			}else{
				vm.condition.validFlag = 1;
			} 
			pagination(vm.resource.number, vm.resource.size);
		}
		
		function moveOrders(){
			console.log(vm.selected);
			if(vm.selected.length == 0)
				return;
			$scope.masked = true;
			var deferred = $q.defer();
				vm.promise = deferred.promise;
				OrderService.moveOrders(vm.selected, vm.condition.validFlag)
					.then(function(response){
						console.log(response);	
						$scope.masked = false;
						pagination(vm.resource.number,vm.resource.size);
						LogService.showSuccess("訂單移動成功");
						deferred.resolve();
					});
		}
		
		function openEditOrderDialog($event ,order){
			$mdDialog.show({
				targetEvent: $event,
				hasBackdrop: true,
				clickOutsideToClose :true,
				locals: { order: order },
				templateUrl : 'app/order/editOrderDialog.html',
				controller:'EditOrderController as vm'
		       }).then(function(res){
		    	   
		    	   if(order.orderId){
		    		   updateOrder(res);
		    	   }else{
		    		   createOrder(res);
		    	   }
		    	   
		       });
		}
		
		function exportFile(){
		console.log($scope.vm.selected);
		 $scope.masked = true;
		var deferred = $q.defer();
			vm.promise = deferred.promise;
			OrderService.exportOrders($scope.vm.selected, vm.condition)
				.then(function(response){
					console.log(response);	
					console.log(response.config.url);					
					var filename = response.config.headers.fileName;//"order_" + d.getTime() + ".xls"					
					openSaveAsDialog(filename, response.data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8');									
						deferred.resolve();
						$scope.masked = false;
				});
		}
		
		/**客戶更新後 替換掉原本list上的customer object**/
		function updateOrder(order){
			console.log('update',order);
			angular.forEach(vm.resource.content, function(value, key) {
				if(vm.resource.content[key].orderId == order.orderId){
					vm.resource.content[key] = order ;
				} 
			});	
		}
		/**新增客戶後 ,加入list**/
		function createOrder(order){
			console.log('create',order);
			pagination(1, 10);
		}
		
		function openSaveAsDialog(filename, content, mediaType) {
			var blob = new Blob([content], {type: mediaType});
			FileSaverService.saveAs(blob, filename);
		}

	}

})();








