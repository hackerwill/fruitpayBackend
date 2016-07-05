(function(){
    'use strict';

    angular
        .module('shipment')
        .controller('ShipmentChangeViewController', shipmentChangeViewController);
    shipmentChangeViewController.$inject = ['UtilService', 'FileSaverService', 'ShipmentService', '$q', '$mdDialog', '$scope', 'SEARCH_CONDITION'];
  
    function shipmentChangeViewController(UtilService, FileSaverService, ShipmentService, $q, $mdDialog, $scope, SEARCH_CONDITION){
      var vm = this ;   //view model
      vm.condition = {};
      vm.selected = [] ;
      vm.resource = {totalElements:0,size: 10,number: 1};//md-table-pagination的初始值
      vm.pageOptions = [10, 20, 50];

      vm.changeStatus = changeStatus;
      vm.pagination = pagination;
      vm.exportFile= exportFile;
      
      $scope.$emit('setSearchCallBack', onSearchClick);
      $scope.$emit('setFunctionButtons', getFunctionButtons());

      //得到異動原因
      UtilService.getConstant(18)
      .then(function(result){
        vm.shipmentChangeStatus = result.data;
      });

      function activate(){
        pagination(vm.resource.number, vm.resource.size);
      }
      
      function pagination(page, size){
       ShipmentService.findAll(page-1,size, vm.condition)
          .then(function(result){   //spring預設第一頁 index為0
             console.log(result);
             result.data.number = result.data.number+1;
             vm.resource = result.data;
          })
      }

      function changeStatus(shipmentChange) {
        ShipmentService.updateShipmentChange(shipmentChange)
          .then(function(result) {
            console.log(result);
          })
      }

      function exportFile(){
        console.log(vm.selected);
        var deferred = $q.defer();
          vm.promise = deferred.promise;
          ShipmentService.exportShipmentChanges(vm.selected, vm.condition)
            .then(function(response){
              console.log(response);  
              console.log(response.config.url);         
              var filename = response.config.headers.fileName;//"order_" + d.getTime() + ".xls"         
              openSaveAsDialog(filename, response.data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8');                 
                deferred.resolve()
            });
      }

      function openSaveAsDialog(filename, content, mediaType) {
        var blob = new Blob([content], {type: mediaType});
        FileSaverService.saveAs(blob, filename);
      }

      function onSearchClick($event) {
        var conditionMap ={};
        conditionMap[SEARCH_CONDITION.ORDER_ID] = true,
        conditionMap[SEARCH_CONDITION.NAME] = true,
        conditionMap[SEARCH_CONDITION.VALD_FLAG] = true,
        conditionMap[SEARCH_CONDITION.DELIVER_START_DATE] = true,
        conditionMap[SEARCH_CONDITION.DELIVER_END_DATE] = true,
        conditionMap[SEARCH_CONDITION.UPDATE_START_DATE] = true,
        conditionMap[SEARCH_CONDITION.UPDATE_END_DATE] = true,
        conditionMap[SEARCH_CONDITION.RECEIVER_CELL_PHONE] = true,
        conditionMap[SEARCH_CONDITION.SHIPMENT_CHANGE_TYPE] = true,

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
          activate();
        });
      }

      function getFunctionButtons() {
        var functionButtons = [
        {
          ariaLabel: 'exportOrderFile',
          onClick: exportFile,
          toolTip: '匯出 +',
          iconName: 'launch',
        },
        ];
        return functionButtons;
      }
    }
    
})();