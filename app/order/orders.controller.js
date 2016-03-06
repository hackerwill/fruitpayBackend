(function(){
	'use strict';
	angular
		.module('order')
		.controller('OrdersController',OrdersController);
	OrdersController.$inject = ['OrderService', '$mdDialog', '$scope', '$q', 'FileSaverService'] ;
	function OrdersController(OrderService, $mdDialog, $scope, $q, FileSaverService){
		var vm = this ;	//view model
		vm.selected = [] ;
		vm.resource = {totalElements:0,size: 10,number: 1};//md-table-pagination的初始值
		vm.pageOptions = [10, 20, 50];
		
		vm.pagination = pagination;
		vm.openEditOrderDialog = openEditOrderDialog;
		vm.exportFile= exportFile;
		
		activate();

		function activate(){
			pagination(1,10);
		}
		//location='#/orders/'+id;
		function pagination(page,size){
			var deferred = $q.defer();
			vm.promise = deferred.promise;
			OrderService.findAll(page-1,size)
				.then(function(result){
					console.log(result);
					result.data.number = result.data.number+1;
					vm.resource = result.data;
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
			OrderService.exportOrders($scope.vm.selected)
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
			pagination(vm.resource.totalPages ,vm.resource.size);
		}
		
		function openSaveAsDialog(filename, content, mediaType) {
			var blob = new Blob([content], {type: mediaType});
			FileSaverService.saveAs(blob, filename);
		}

	}

})();








