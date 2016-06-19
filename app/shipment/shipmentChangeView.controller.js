(function(){
    'use strict';

    angular
        .module('shipment')
        .controller('ShipmentChangeViewController', shipmentChangeViewController);
    shipmentChangeViewController.$inject = ['FileSaverService', 'ShipmentService', '$q', '$mdDialog', '$scope', 'SEARCH_CONDITION'];
  
    function shipmentChangeViewController(FileSaverService, ShipmentService, $q, $mdDialog, $scope, SEARCH_CONDITION){
      var vm = this ;   //view model
      vm.condition = {};
      vm.selected = [] ;
      vm.resource = {totalElements:0,size: 10,number: 1};//md-table-pagination的初始值
      vm.pageOptions = [10, 20, 50];

      vm.pagination = pagination;
      vm.exportFile= exportFile;
      
      $scope.$emit('setSearchCallBack', onSearchClick);
      $scope.$emit('setFunctionButtons', getFunctionButtons());

      function activate(){
        pagination(vm.resource.number, vm.resource.size, vm.condition);
      }
      
      function pagination(page, size, condition){
       ShipmentService.findAll(page-1,size, condition)
          .then(function(result){   //spring預設第一頁 index為0
             console.log(result);
             result.data.number = result.data.number+1;
             vm.resource = result.data;
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
        conditionMap[SEARCH_CONDITION.START_DATE] = true,
        conditionMap[SEARCH_CONDITION.END_DATE] = true,
        conditionMap[SEARCH_CONDITION.RECEIVER_CELL_PHONE] = true,

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