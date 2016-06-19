(function(){
'use strict';
  angular.module('shipment')
    .controller('ShipmentDuplicatedController', ShipmentDuplicatedController);
  
  ShipmentDuplicatedController.$inject = ['date','duplicatedOrders', '$route', '$scope', '$mdDialog', '$log', '$q', 'UtilService'];
  
  function ShipmentDuplicatedController(date, duplicatedOrders, $route, $scope, $mdDialog, $log, $q, UtilService) {

    var vm = this;
    vm.duplicatedOrders = duplicatedOrders;

    console.log(duplicatedOrders);

    vm.closeDialog = function(){
      $mdDialog.hide();
    }

  }
})();