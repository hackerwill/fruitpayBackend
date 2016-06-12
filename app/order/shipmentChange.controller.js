(function(){
	'use strict';
	angular.module('order')
		.controller('ShipmentChangeController',ShipmentChangeController);
	
	ShipmentChangeController.$inject = ['$route', '$scope', '$mdDialog', 'OrderService', '$log', '$q', 'UtilService', 'CustomerService'];
	function ShipmentChangeController($route, $scope, $mdDialog, OrderService , $log, $q, UtilService, CustomerService) {
		
		var vm = this ;	//view model

		vm.order = OrderService.getOrder();

		var configMap = {
				shipmentPulse : {
					circleClassName : "pulseDate",
					color : "#000",
				}, shipmentCancel : {
					circleClassName : "cancelDate",
					color : "#000",
				}, shipmentDeliver : {
					circleClassName : "deliverDate",
					color : "#000",
					onSelect : onSelectCancelPulse,
				}, shipmentDelivered : {
					circleClassName : "deliveredDate",
					color : "#000",
          onSelect : onSelectCancelPulse,
				}, shipmentReady : {
					circleClassName : "readyDate",
					color : "#000",
          onSelect : onSelectCancelPulse,
				}, shipmentReturn : {
          circleClassName : "returnDate",
          color : "#000",
          onSelect : onSelectCancelPulse,
        }, shipmentOther: {
          circleClassName : "otherDate",
          color : "#000",
          onSelect : onSelectCancelPulse,
        },
			};

		OrderService.getAllShipmentStatuses(vm.order.orderId)
			.then(function(result){
				if(result.data){
					vm.shipmentStatuses = result.data;
          vm.shipmentStatuses = vm.shipmentStatuses.concat(getOtherDaysList(vm.shipmentStatuses))
					$scope.highlight = parseToHeightFormat(vm.shipmentStatuses, configMap);
				}
			});


		OrderService.getAllShipmentChanges(vm.order.orderId)
			.then(function(result){
				if(result.data){
					vm.shipmentChanges = result.data;
				}
			});

		vm.updateValidFlag = function(obj){

			$mdDialog.show($mdDialog.confirm({
				    title: 'Attention',
				    content: 'Are you sure?',
				    ok: 'Confirm',
				    cancel: 'Close'
				}))
				.then(function(result){
					if(result){
						OrderService.invalidateShipmentChange(obj)
							.then(function(){
								$mdDialog.show($mdDialog.alert({
								    title: 'Hint',
								    content: 'Success',
								    ok: 'OK',
								}))
								$route.reload();
							});
					}
				});
			
		}

    function onSelectCancelPulse($dialog, date) {
      $dialog.show({
        locals: { 
          shipemntDate: date, 
        },
        hasBackdrop: true,
        clickOutsideToClose :true,
        templateUrl : 'app/order/shipmentCancelPulseDialog.html',
        controller : "ShipmentCancelPulseController as vm",
      }).then(function(res){
        console.log("leave");
      });
    }

    function getOtherDaysList(shipmentPeriods) {
      var otherDayList = [];
      var threeMonthsBeforeNowTime = getNowDate().getTime() - 60 * 60 * 24 * 90 * 1000;
      var startDate = new Date(threeMonthsBeforeNowTime);
      var threeMonthsFromNowTime = getNowDate().getTime() + 60 * 60 * 24 * 90 * 1000;
      var endDate = new Date(threeMonthsFromNowTime);
      var date = startDate;
      while(date <= endDate) {
        var existedDate = false;

        for(var i = 0; i < shipmentPeriods.length; i++){
          var period = shipmentPeriods[i];
          if(isSameDate(period.applyDate, date)) {
            existedDate = true;
            break;
          }
        }

        if(!existedDate) {
          otherDayList.push(getDayObject(date))
        }

        date = new Date(date.getTime() + 60 * 60 * 24 * 1000);
      }
      
      return otherDayList;
    }

    function getNowDate() {
      var currentDate = new Date();
      var day = currentDate.getDate();
      var month = currentDate.getMonth();
      var year = currentDate.getFullYear();
      return new Date(year, month, day);
    }

    function getDayObject(date) {

      return {
        applyDate : date,
        shipmentChangeType: {
          optionName: 'shipmentOther',
          optionDesc: '非配送日',
        }
      }
    }

    function isSameDate(date, pDate) {
      return (
        date.getFullYear() === pDate.getFullYear() &&
        date.getMonth() === pDate.getMonth() &&
        date.getDate() === pDate.getDate()
      );
    }

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








