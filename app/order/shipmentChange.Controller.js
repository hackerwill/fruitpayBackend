(function(){
	'use strict';
	angular.module('order')
		.controller('ShipmentChangeController',ShipmentChangeController);
	
	ShipmentChangeController.$inject = ['$scope', '$mdDialog', 'OrderService', '$log', '$q', 'UtilService', 'CustomerService'];
	function ShipmentChangeController($scope, $mdDialog, OrderService , $log, $q, UtilService, CustomerService) {
		
		var vm = this ;	//view model

		vm.order = OrderService.getOrder();

		var configMap = {
				shipmentPulse : {
					circleClassName : "pulseDate",
					color : "#000"
				}, shipmentCancel : {
					circleClassName : "cancelDate",
					color : "#000"
				}, shipmentDeliver : {
					circleClassName : "deliverDate",
					color : "#000",
					onSelect : function($dialog, date){
						$dialog.show({
							locals: { shipemntDate: date },
							hasBackdrop: true,
							clickOutsideToClose :true,
							templateUrl : 'app/order/shipmentCancelPulseDialog.html',
					    	controller : "ShipmentCancelPulseController as vm"
					    }).then(function(res){
					    	console.log("leave");
					    });
					}
				}, shipmentOnGoing : {
					circleClassName : "deliveredDate",
					color : "#000"
				}
			};

		OrderService.getAllShipmentStatuses(vm.order.orderId)
			.then(function(result){
				if(result.data){
					vm.shipmentStatuses = result.data;
					$scope.highlight = parseToHeightFormat(vm.shipmentStatuses, configMap);
				}
			});


		OrderService.getAllShipmentChanges(vm.order.orderId)
			.then(function(result){
				if(result.data){
					vm.shipmentChanges = result.data;
				}
			});

		function parseToHeightFormat(shipmentPeriods, configMap){
					
					var heightMap = {};
					
					for(var i = 0; i < shipmentPeriods.length; i++){
						var shipmentPeriod = shipmentPeriods[i];
						var key = shipmentPeriod.shipmentChangeType.optionName;
						var date = shipmentPeriod.applyDate;
						var dateObject = {
							start : date,
							end : date
						};
						
						if(!(key in heightMap)){
							heightMap[key] = {};
							heightMap[key].legend = shipmentPeriod.shipmentChangeType.optionDesc;
							heightMap[key].dates = [];
						}
						heightMap[key].dates.push(dateObject);
					};
					
					for(var key in configMap){
						if(configMap.hasOwnProperty(key) && key in heightMap){
							for(var keyName in configMap[key]){
								if(configMap[key].hasOwnProperty(keyName)){
									heightMap[key][keyName] = configMap[key][keyName]
								}
							}
						}
					}
	
					var highlight = [];
					for (var key in heightMap) {
						if (heightMap.hasOwnProperty(key)) {
							highlight.push(heightMap[key]);
						}
					}

					return highlight;
				}	
		
	}
})();








