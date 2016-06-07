(function(){
'use strict';
  angular.module('shipment')
    .controller('ShipmentRecordDetailController', ShipmentRecordDetailController);
  
  ShipmentRecordDetailController.$inject = ['shipmentRecord', '$route', '$scope', '$mdDialog', '$log', '$q', 'UtilService'];
  
  function ShipmentRecordDetailController(shipmentRecord, $route, $scope, $mdDialog, $log, $q, UtilService) {

    var vm = this;
    vm.shipmentRecord = shipmentRecord;

    console.log(shipmentRecord);

    vm.closeDialog = function(){
      $mdDialog.hide();
    }

  }
})();