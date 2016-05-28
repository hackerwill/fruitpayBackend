(function(){
	'use strict';
	angular
		.module('shipment')
		.controller('ShipmentPreviewController', ShipmentPreviewController);
	ShipmentPreviewController.$inject = ['OrderService', '$location' ,'ShipmentService', '$mdDialog', '$scope', '$q', 'FileSaverService', 'LogService', 'UtilService'] ;
	function ShipmentPreviewController(OrderService, $location, ShipmentService, $mdDialog, $scope, $q, FileSaverService, LogService, UtilService){
		var vm = this ;	//view model
		vm.selected = [] ;
		vm.resource = {totalElements:0,size: 100,number: 1};//md-table-pagination的初始值
		vm.pageOptions = [100, 500, 1000];
		vm.condition = {};
		
		vm.pagination = pagination;
		vm.search =search;
		vm.openEditOrderDialog = openEditOrderDialog;
		vm.moveToShipmentChange = moveToShipmentChange;
		vm.update = update;
    vm.exportFile = exportFile;
		
		activate();

		$q.all([
			//得到所有訂單狀態
			UtilService.getAllOrderStatus()
				.then(function(result){
					vm.orderStatuses = result.data;
				}),
			//得到所有運送週期
			UtilService.getAllShipmentPeriods()
				.then(function(result){
					vm.shipmentPeriods = result.data;
				}), 
			//得到配送日
			UtilService.getConstant(6)
				.then(function(result){
					vm.deliveryDay = result.data;
				}),
      //得到有效無效
      UtilService.getConstant(15)
        .then(function(result){
          vm.validFlag = result.data;
        }),
		]).then(function(){console.log("finished.")});

		function activate(){
			pagination(vm.resource.number, vm.resource.size);
		}
		//location='#/orders/'+id;
		function pagination(page,size){
			vm.selected = [] ;
			
			ShipmentService.shipmentPreview(page-1, size, vm.condition)
				.then(function(result){
					console.log(result);
					if(result && result.data != ''){
						result.data.customerOrders.number = result.data.customerOrders.number+1;
						vm.resource = result.data.customerOrders;
					}else{
						vm.resource = result.data.customerOrders;
					}
          			vm.orderIds = result.data.orderIds;
				});
		}

		function search(){
			pagination(vm.resource.number, vm.resource.size);
		}


		function moveToShipmentChange(order){
			OrderService.setOrder(order);
			$location.path("/order/shipmentChange/" + order.orderId);
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
		    	   }
		    	   
		       });
		}

		/**更新客戶**/
	    function update(order){
	    	OrderService.update(order).then(function(res){
	    		if(res)
					LogService.showSuccess('更新成功');
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

    function exportFile(){
      var deferred = $q.defer();
      vm.promise = deferred.promise;
      ShipmentService.exportShipments(vm.orderIds, vm.condition)
        .then(function(response){
          console.log(response);  
          console.log(response.config.url);         
          var filename = response.config.headers.fileName;//"order_" + d.getTime() + ".xls"         
          openSaveAsDialog(filename, response.data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8');                 
            deferred.resolve();
        });
    }

    function openSaveAsDialog(filename, content, mediaType) {
      var blob = new Blob([content], {type: mediaType});
      FileSaverService.saveAs(blob, filename);
    }

	}

})();








