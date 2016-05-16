(function(){
'use strict';
	angular.module('order')
		.controller('ShipmentCancelPulseController', ShipmentCancelPulseController);
	
	ShipmentCancelPulseController.$inject = ['$route', 'shipemntDate', '$scope', '$mdDialog', 'OrderService', '$log', '$q', 'UtilService', 'CustomerService'];
	
	function ShipmentCancelPulseController($route, shipemntDate, $scope, $mdDialog, OrderService , $log, $q, UtilService, CustomerService) {

		var vm = this;
		vm.order = OrderService.getOrder();

		//得到運送異動項目
		UtilService.getConstant(11)
			.then(function(result){
				vm.shipmentChange = result.data;
			});

		//得到取消暫停原因
		UtilService.getConstant(14)
			.then(function(result){
				vm.shipmentChangeReason = result.data;
				console.log(vm.shipmentChangeReason);
			});

		vm.selected = [];
    vm.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(item);
      }
      console.log(list);
    };

    vm.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };


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
			//原因
			var reasonArray = [];
			for (var i = 0; i < vm.selected.length; i++) {
				var reason = vm.selected[i];
				if(reason.content){
					reasonArray.push(reason.content);
				}else if(reason.optionDesc){
					reasonArray.push(reason.optionDesc);
				}
			};
			if(reasonArray.length) {
				sendChange.reason = reasonArray.join(",");
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