(function(){
  'use strict';
  angular
    .module('shipment')
    .controller('ShipmentRecordController', ShipmentRecordController);
  ShipmentRecordController.$inject = ['$window','OrderService', '$location' ,'ShipmentService', '$mdDialog', '$scope', '$q', 'FileSaverService', 'LogService', 'UtilService', 'SEARCH_CONDITION'] ;
  function ShipmentRecordController($window, OrderService, $location, ShipmentService, $mdDialog, $scope, $q, FileSaverService, LogService, UtilService, SEARCH_CONDITION){
    var vm = this ;  //view model
    vm.selected = [] ;
    vm.resource = {totalElements:0,size: 100,number: 1};//md-table-pagination的初始值
    vm.pageOptions = [100, 500, 1000];
    vm.condition = {};
    
    vm.pagination = pagination;
    vm.invalidate = invalidate;
    vm.search = search;
    vm.openDetailDialog = openDetailDialog;
    
    vm.onSearchClick = onSearchClick;
    setSearchConditionMap();

    function search() {
      if(!vm.condition.date)
        return

      activate()
    }

    function activate(){
      pagination(vm.resource.number, vm.resource.size, vm.condition);
    }
    //location='#/orders/'+id;
    function pagination(page, size, condition){
      vm.selected = [] ;
      
      ShipmentService.shipmentRecord(page - 1, size, condition.date)
        .then(function(result){
          console.log(result);
          if(result && result.data != ''){
            result.data.number = result.data.number+1;
            vm.resource = result.data;
          }else{
            vm.resource = result.data;
          }
        });
    }

    function invalidate(shipmentRecord) {
      ShipmentService.invalidateShipmentRecord(shipmentRecord)
        .then(function(result){
          if(result && result.data){
            $window.location.reload();
          }
        });
    }

    function openDetailDialog($event, shipmentRecord){  
      $mdDialog.show({
        targetEvent: $event,
        hasBackdrop: true,
        clickOutsideToClose :true,
        locals: { shipmentRecord: shipmentRecord },
        templateUrl : 'app/shipment/shipmentRecordDetail.html',
        controller:'ShipmentRecordDetailController as vm'
           });
    }

    function onSearchClick($event) {
      search();
    }
    function setSearchConditionMap() {
      vm.conditionMap ={};
      vm.conditionMap[SEARCH_CONDITION.RECEIVE_DATE] = true;
    }
  }

})();








