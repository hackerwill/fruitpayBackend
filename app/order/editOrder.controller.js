(function(){
	'use strict';
	angular
		.module('order')
		.controller('EditOrderController',EditOrderController);
	
	EditOrderController.$inject = ['$mdDialog', 'OrderService', 'order', '$log', '$q', 'UtilService', 'CustomerService'];
	function EditOrderController($mdDialog, OrderService , order, $log, $q, UtilService, CustomerService) {
		
		var vm = this ;	//view model
		vm.order = angular.copy(order);
		vm.progress = true;
		vm.simulateQuery = false;
		vm.isDisabled    = false;
		// list of `state` value/display objects
		vm.querySearch   = querySearch;
		vm.selectedItemChange = selectedItemChange;
		vm.searchTextChange   = searchTextChange;

		//設定基本數據
		if(!vm.order.orderId){
			vm.order.orderDate = vm.order.orderDate ? vm.order.orderDate : new Date();
			vm.order.programNum = 1;
			vm.order.shippingCost = 0;
			vm.order.totalPrice = 699;
			vm.order.allowForeignFruits = 'Y';
		}else{
			OrderService.getOrderPreferences(vm.order.orderId)
				.then(function(result){
					if(result.data)
						vm.order.orderPreferences = result.data;
				});
		}
		
		
		$q.all([
			//得到所有產品
			UtilService.getAllProducts()
				.then(function(result){
					var products = result.data;
					if(!vm.order.orderId){
						var orderPreferences = [];
						for (var i = 0; i< products.length; i++) {
							if(products[i]){
								var obj = {};
								obj.likeDegree = 3; //一般的訂為3
								obj.product = products[i];
								orderPreferences.push(obj);
							}
						}
						vm.order.orderPreferences = orderPreferences;
					}
				}),
			//得到所有郵遞區號
			UtilService.getAllPostalCodes()
				.then(function(result){
					console.log(result.data);
					vm.postalCodes = result.data;
				}), 
			//得到所有訂購平台
			UtilService.getAllOrderPlatforms()
				.then(function(result){
					vm.orderPlatform = result.data;
					if(!vm.order.orderPlatform) vm.order.orderPlatform = vm.orderPlatform[0];
				}),
			//得到所有訂單狀態
			UtilService.getAllOrderStatus()
				.then(function(result){
					vm.orderStatuses = result.data;
					if(!vm.order.orderStatus) vm.order.orderStatus = vm.orderStatuses[0];
				}),
			//得到所有訂購產品
			UtilService.getAllOrderPrograms()
				.then(function(result){
					vm.orderPrograms = result.data;
					if(!vm.order.orderProgram) vm.order.orderProgram = vm.orderPrograms[0];
				}),
			//得到所有訂購方式
			UtilService.getAllPaymentModes()
				.then(function(result){
					vm.paymentModes = result.data;
					if(!vm.order.paymentMode) vm.order.paymentMode = vm.paymentModes[0];
				}), 
			//得到所有運送週期
			UtilService.getAllShipmentPeriods()
				.then(function(result){
					vm.shipmentPeriods = result.data;
					if(!vm.order.shipmentPeriod) vm.order.shipmentPeriod = vm.shipmentPeriods[0];
				}), 
			//得到收貨方式
			UtilService.getConstant(1)
				.then(function(result){
					vm.receiveWay = result.data;
					if(!vm.order.receiveWay) vm.order.receiveWay = vm.receiveWay.constOptions[0];
				}), 
			//得到運送時間
			UtilService.getConstant(2)
				.then(function(result){
					vm.shipmentTime = result.data;
					if(!vm.order.shipmentTime) vm.order.shipmentTime = vm.shipmentTime.constOptions[0];
				}),
			//得到從哪個平台來
			UtilService.getConstant(3)
				.then(function(result){
					vm.comingFrom = result.data;
					if(!vm.order.comingFrom) vm.order.comingFrom = vm.comingFrom.constOptions[0];
				}),
			//得到收據方式
			UtilService.getConstant(4)
				.then(function(result){
					vm.receiptWay = result.data;
					if(!vm.order.receiptWay) vm.order.receiptWay = vm.receiptWay.constOptions[0];
				}),
			//得到配送日
			UtilService.getConstant(6)
				.then(function(result){
					vm.deliveryDay = result.data;
					if(!vm.order.deliveryDay) vm.order.deliveryDay = vm.deliveryDay.constOptions[0];
				}),
			]).then(function(){console.log("finished.")});
		
		if(vm.order.orderId){
			OrderService.getCustomerByOrderId(vm.order.orderId)
				.then(function(result){
					console.log(result.data);
					vm.order.customer = result.data;
					vm.progress = false;
				});
		}else{
			queryAllNames().then(function(result){
				vm.names = result; 
				vm.progress = false;
			});
	
		}
		
		// ******************************
		// Internal methods
		// ******************************
		/**
		 * Search for states... use $timeout to simulate
		 * remote dataservice call.
		 */
		function querySearch (query) {
		  var results = query ? vm.names.filter( createFilterFor(query) ) : vm.names,
			  deferred;
		  if (vm.simulateQuery) {
			deferred = $q.defer();
			queryAllNames().then(function(result){
				deferred.resolve(loadAll(result.data));
			});
			return deferred.promise;
		  } else {
			return results;
		  }
		}
		function searchTextChange(text) {
		  $log.info('Text changed to ' + text);
		}
		function selectedItemChange(item) {
		  $log.info('Item changed to ' + JSON.stringify(item));
		  vm.progress = true;
		  CustomerService.findById(item.customerId)
				.then(function(result){
					console.log(result.data);
					vm.order.customer = result.data;
					setDefaultValue(vm.order.customer);
					vm.progress = false;
				});
		}
		
		function setDefaultValue(customer){
			if(!vm.order.receiverFirstName) vm.order.receiverFirstName = customer.firstName;
			if(!vm.order.receiverLastName) vm.order.receiverLastName = customer.lastName;
			if(!vm.order.receiverGender) vm.order.receiverGender = customer.gender;
			if(!vm.order.receiverCellphone) vm.order.receiverCellphone = customer.cellphone;
			if(!vm.order.receiverHousePhone) vm.order.receiverHousePhone = customer.housePhone;
			if(!vm.order.postalCode) vm.order.postalCode = customer.postalCode;
			if(!vm.order.receiverAddress) vm.order.receiverAddress = customer.address;
		}
		
		function queryAllNames(){
			var deferred = $q.defer();
			OrderService.getAllNameStr()
				.then(function(result){
					deferred.resolve(loadAll(result.data));
				});
			return deferred.promise;
		}
		
		/**
		 * Build `states` list of key/value pairs
		 */
		function loadAll(allNames) {
		  return allNames.split(/,+/g).map( function (name) {
			return {
			  customerId: /\(([^)]+)\)/.exec(name)[1],
			  display: name
			};
		  });
		}
		/**
		 * Create filter function for a query string
		 */
		function createFilterFor(query) {
		  var lowercaseQuery = angular.lowercase(query);
		  return function filterFn(name) {
			return (name.display.indexOf(lowercaseQuery) != -1);
		  };
		}
		
	    vm.save = function() {
			vm.progress = true;
	    	if(vm.order.orderId){
	    		update();
	    	}else{
	    		add();
	    	}
	    }
	    /**更新客戶**/
	    function update(){
	    	OrderService.update(vm.order).then(function(res){
				vm.progress = false;
	    		$mdDialog.hide(vm.order);
	    	});
	    }
	    /**新增客戶**/
	    function add(){
	    	OrderService.createOrder(vm.order).then(function(res){
				vm.progress = false;
	    		$mdDialog.hide(res.data);
	    	});
	    }
	    vm.closeDialog = function() {
	      $mdDialog.cancel();
	    }
	}
})();








