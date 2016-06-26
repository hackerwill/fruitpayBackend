(function(){
  'use strict';
  angular
    .module('shipment')
    .controller('ShipmentPreferencesController', ShipmentPreferencesController);
  ShipmentPreferencesController.$inject = ['$window','OrderService', '$location' ,'ShipmentService', '$mdDialog', '$scope', '$q', 'FileSaverService', 'LogService', 'UtilService', 'SEARCH_CONDITION'] ;
  function ShipmentPreferencesController($window, OrderService, $location, ShipmentService, $mdDialog, $scope, $q, FileSaverService, LogService, UtilService, SEARCH_CONDITION){
    var STATUS = {
      fixed: 'fixed',
      none: 'none',
    }
    var vm = this ;  //view model
    vm.displayErrorRow = true;
    vm.STATUS = STATUS;
    vm.countNotPass = countNotPass;
    vm.condition = {};
    vm.onStatusChange = onStatusChange;
    vm.onRequiredAmountChange = onRequiredAmountChange;
    vm.shouldDisplay = shouldDisplay;


    $scope.$emit('setSearchCallBack', onSearchClick);
    $scope.$emit('setFunctionButtons', getFunctionButtons());

    function shouldDisplay(shipmentInfo) {
      if(vm.displayErrorRow) {
        return shipmentInfo.errorStatus && shipmentInfo.errorStatus.length > 0
      } else {
        return !(shipmentInfo.errorStatus && shipmentInfo.errorStatus.length > 0)
      }
    }

    function convertFromGToJin(shipmentPreference) {
      for(var i = 0; i< shipmentPreference.chosenProductItemBeans.length; i++) {
        var chosenProductItemBean = shipmentPreference.chosenProductItemBeans[i];
        if(chosenProductItemBean.unit == '克') {
          chosenProductItemBean.actualTotalModified = roundDecimal((chosenProductItemBean.actualTotalWithUnit / 600), 1)
          chosenProductItemBean.maxLimitModified = Math.ceil(chosenProductItemBean.maxLimitWithUnit / 600)
        } else {
          chosenProductItemBean.actualTotalModified = chosenProductItemBean.actualTotalWithUnit;
          chosenProductItemBean.maxLimitModified = chosenProductItemBean.maxLimitWithUnit;
        }
      }
      return shipmentPreference;
    }

    function convertFromJinToG(shipmentPreference) {
      for(var i = 0; i< shipmentPreference.chosenProductItemBeans.length; i++) {
        var chosenProductItemBean = shipmentPreference.chosenProductItemBeans[i];
        if(chosenProductItemBean.unit == '克') {
          chosenProductItemBean.actualTotalWithUnit = (chosenProductItemBean.actualTotalModified * 600);
          chosenProductItemBean.maxLimitWithUnit = (chosenProductItemBean.maxLimitModified * 600);
        } else {
          chosenProductItemBean.actualTotalWithUnit = chosenProductItemBean.actualTotalModified;
          chosenProductItemBean.maxLimitWithUnit = chosenProductItemBean.maxLimitModified;
        }
      }
      return shipmentPreference;
    }

    function showErrorRowIfHasError(shipmentPreference) {
      var hasError = false
      for(var i = 0; i< shipmentPreference.shipmentInfoBeans.length; i++) {
        var shipmentInfoBean = shipmentPreference.shipmentInfoBeans[i];
        if(shipmentInfoBean.errorStatus && shipmentInfoBean.errorStatus.length) {
          hasError = true
          break;
        }
      }

      if(hasError) {
        vm.displayErrorRow = true
      } else {
        vm.displayErrorRow = false
      }
    }

    function roundDecimal(val, precision) {
      return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
    }

    function activate(){
      ShipmentService.findInitFruitPreferences(vm.condition)
        .then(function(result) {
          if(result && result.data) {
            vm.shipmentPreference = convertFromGToJin(result.data);
            showErrorRowIfHasError(vm.shipmentPreference)
            console.log(vm.shipmentPreference);
          }
        });
    }

    function recalculate() {
      if(!vm.condition || !vm.shipmentPreference) {
        return;
      }
      ShipmentService.shipmentPreferenceCalculate(vm.condition, convertFromJinToG(vm.shipmentPreference))
        .then(function(result) {
          if(result && result.data) {
            vm.shipmentPreference = convertFromGToJin(result.data);
            showErrorRowIfHasError(vm.shipmentPreference)
            console.log(vm.shipmentPreference);
          }
        })
    }

    function onStatusChange(requiredAmount) {
      if(requiredAmount.status == STATUS.fixed) {
        requiredAmount.status = STATUS.none;
      } else {
        requiredAmount.status = STATUS.fixed;
      }
    }

    function onRequiredAmountChange(requiredAmount) {
      requiredAmount.status = STATUS.fixed;
    }

    function countNotPass(shipmentInfoBeans) {
      if(!shipmentInfoBeans) {
        return 0;
      }
      var count = 0;
      for(var i = 0; i < shipmentInfoBeans.length; i ++) {
        var errorStatus = shipmentInfoBeans[i].errorStatus
        if(errorStatus && errorStatus.length > 0) {
          count++;
        }
      }
      return count;
    }
    
    function onSearchClick($event) {
      var conditionMap ={};
      conditionMap[SEARCH_CONDITION.RECEIVE_DATE] = true,
      conditionMap[SEARCH_CONDITION.PRODUCT_ITEMS] = true,
      
      $mdDialog.show({
        targetEvent: $event,
        hasBackdrop: true,
        clickOutsideToClose :true,
        locals: {
          condition: vm.condition,
          conditionMap: conditionMap,
        },
        templateUrl : 'app/util/searchConditions.html',
        controller:'SearchConditionsController as vm',
      }).then(function(res) {
        vm.condition = res;
        if(!vm.condition.date)
          return
        activate()
      });
    }

    function getFunctionButtons() {
      var functionButtons = [
            {
              ariaLabel: 'recalculate',
              onClick: recalculate,
              toolTip: '重新計算',
              iconName: 'cached',
            },
      ];
      return functionButtons;
    }
  }

})();








