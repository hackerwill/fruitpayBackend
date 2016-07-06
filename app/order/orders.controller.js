(function(){
	'use strict';
	angular
		.module('order')
		.controller('OrdersController',OrdersController);
	OrdersController.$inject = ['$location' ,'OrderService', '$mdDialog', '$scope', '$q', 'FileSaverService', 'LogService', 'UtilService', 'SEARCH_CONDITION'] ;
	function OrdersController($location, OrderService, $mdDialog, $scope, $q, FileSaverService, LogService, UtilService, SEARCH_CONDITION) {
		console.log(SEARCH_CONDITION);
		var vm = this ;	//view model
		vm.selected = [] ;
		vm.condition = {};
    vm.constants = {};

		vm.condition.validFlag = 1;
		vm.resource = {totalElements:0,size: 10,number: 1};//md-table-pagination的初始值
		vm.pageOptions = [10, 20, 50, 100, 200, 500, 1000];
		
		vm.pagination = pagination;
		vm.openEditOrderDialog = openEditOrderDialog;
		vm.exportFile= exportFile;
		vm.moveOrders= moveOrders;
		vm.changeVlagAndFreshPage = changeVlagAndFreshPage;
		vm.search =search;
		vm.moveToShipmentChange = moveToShipmentChange;
    var cachePageOrders = OrderService.getCachePageOrders()
    if(cachePageOrders) {
      vm.resource = cachePageOrders;
      vm.searchTime = OrderService.getSearchTime()
    }

    vm.onSearchClick = onSearchClick;
    setSearchConditionMap();
        
    $scope.$emit('setFunctionButtons', getFunctionButtons());

    $q.all([
      //得到所有產品
      UtilService.getAllProducts()
        .then(function(result){
          vm.constants.products = result.data;
        }),
      //得到所有郵遞區號
      UtilService.getAllPostalCodes()
        .then(function(result){
          vm.constants.postalCodes = result.data;
        }), 
      //得到所有訂購平台
      UtilService.getAllOrderPlatforms()
        .then(function(result){
          vm.constants.orderPlatform = result.data;
        }),
      //得到所有訂單狀態
      UtilService.getAllOrderStatus()
        .then(function(result){
          vm.constants.orderStatuses = result.data;
        }),
      //得到所有訂購產品
      UtilService.getAllOrderPrograms()
        .then(function(result){
          vm.constants.orderPrograms = result.data;
        }),
      //得到所有訂購方式
      UtilService.getAllPaymentModes()
        .then(function(result){
          vm.constants.paymentModes = result.data;
        }), 
      //得到所有運送週期
      UtilService.getAllShipmentPeriods()
        .then(function(result){
          vm.constants.shipmentPeriods = result.data;
        }), 
      //得到收貨方式
      UtilService.getConstant(1)
        .then(function(result){
          vm.constants.receiveWay = result.data;
        }), 
      //得到運送時間
      UtilService.getConstant(2)
        .then(function(result){
          vm.constants.shipmentTime = result.data;
        }),
      //得到從哪個平台來
      UtilService.getConstant(3)
        .then(function(result){
          vm.constants.comingFrom = result.data;
        }),
      //得到收據方式
      UtilService.getConstant(4)
        .then(function(result){
          vm.constants.receiptWay = result.data;
        }),
      //得到配送日
      UtilService.getConstant(6)
        .then(function(result){
          vm.constants.deliveryDay = result.data;
        }),
      ]).then(function(){console.log("finished.")});

		function activate(){
      pagination(vm.resource.number, vm.resource.size);
		}
		//location='#/orders/'+id;
		function pagination(page,size){
			vm.selected = [] ;
			OrderService.findAll(page-1, size, vm.condition)
				.then(function(result){
					console.log(result);
          if(result) {
            result.data.number = result.data.number+1;
            vm.resource = result.data;
            OrderService.setCachePageOrders(vm.resource)
            OrderService.setSearchTime(new Date())
            vm.searchTime = OrderService.getSearchTime()
          }
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
			$scope.$emit('setFunctionButtons', getFunctionButtons());
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

		function moveToShipmentChange(order){
			OrderService.setOrder(order);
			$location.path("/order/shipmentChange/" + order.orderId);
		}
		
		function openEditOrderDialog($event ,order){
		  if(!order){
            order = {};
		  }  
			$mdDialog.show({
				targetEvent: $event,
				hasBackdrop: true,
				clickOutsideToClose :true,
				locals: { 
          order: order,
          constants: vm.constants,
        },
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
			pagination(vm.resource.number, vm.resource.size, vm.condition.validFlag);
		}
		
		function openSaveAsDialog(filename, content, mediaType) {
			var blob = new Blob([content], {type: mediaType});
			FileSaverService.saveAs(blob, filename);
		}

		function onSearchClick($event) {
      pagination(vm.resource.number, vm.resource.size)
		}

		function getFunctionButtons() {
		  var functionButtons = [
            {
              ariaLabel: 'exportOrderFile',
              onClick: exportFile,
              toolTip: '匯出 +',
              iconName: 'launch',
            },
            {
              ariaLabel: 'importOrderFile',
              toolTip: '匯入 +',
              iconName: 'input',
            },
            {
              ariaLabel: 'deleteOrder',
              onClick: changeVlagAndFreshPage,
              toolTip: vm.condition.validFlag? '垃圾桶的訂單': '有效訂單',
              iconName: 'compare_arrows',
            },
            {
              ariaLabel: 'deleteOrder',
              onClick: moveOrders,
              toolTip: vm.condition.validFlag? '移至垃圾桶': '移至有效訂單',
              iconName: vm.condition.validFlag? 'delete': 'undo',
            },
            {
              ariaLabel: 'createOrder',
              onClick: openEditOrderDialog,
              toolTip: '新增 +',
              iconName: 'add',
            },
		  ];
		  return functionButtons;
		}

		function setSearchConditionMap() {
		  vm.conditionMap ={};
		  vm.conditionMap[SEARCH_CONDITION.ORDER_ID] = true;
		  vm.conditionMap[SEARCH_CONDITION.NAME] = true;
		  vm.conditionMap[SEARCH_CONDITION.VALD_FLAG] = true;
		  vm.conditionMap[SEARCH_CONDITION.ALLOW_FOREIGN_FRUITS] = true;
		  vm.conditionMap[SEARCH_CONDITION.START_DATE] = true;
		  vm.conditionMap[SEARCH_CONDITION.END_DATE] = true;
		  vm.conditionMap[SEARCH_CONDITION.ORDER_STATUS] = true;
		  vm.conditionMap[SEARCH_CONDITION.RECEIVER_CELL_PHONE] = true;
      vm.conditionMap[SEARCH_CONDITION.SHIPMENT_CHANGE_REASON] = true;
      vm.conditionMap[SEARCH_CONDITION.EMAIL] = true;
		}
  
  }

})();








