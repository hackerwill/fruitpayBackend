(function(){
'use strict';
	angular
		.module('order')
		.controller('ShipmentCancelPulseController',ShipmentCancelPulseController);
	
	ShipmentCancelPulseController.$inject = ['$route', 'shipemntDate', '$scope', '$mdDialog', 'OrderService', '$log', '$q', 'UtilService', 'CustomerService'];
	
	function ShipmentCancelPulseController($route, shipemntDate, $scope, $mdDialog, OrderService , $log, $q, UtilService, CustomerService) {
		
		var vm = this;
		vm.order = OrderService.getOrder();

		//得到運送異動項目
		UtilService.getConstant(11)
			.then(function(result){
				vm.shipmentChange = result.data;
			}), 

		vm.closeDialog = function(){
			$mdDialog.hide();
		}

		vm.addChange = function(type){
			var sendChange = {};
			for(var i = 0; i < vm.shipmentChange.constOptions.length; i++){
				var option = vm.shipmentChange.constOptions[i];
				if(option.optionName == type){
					sendChange.shipmentChangeType = option;
				}
					
			}
			sendChange.applyDate = shipemntDate;
			OrderService.addShipmentChange(sendChange, vm.order)
				.then(function(result){
					if(result){
						vm.closeDialog();
						$route.reload();
					}
				});
		}

	}
})();