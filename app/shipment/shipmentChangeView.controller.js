(function(){
    'use strict';

    angular
        .module('shipment')
        .controller('ShipmentChangeViewController', shipmentChangeViewController);
    shipmentChangeViewController.$inject = ['FileSaverService', 'ShipmentService', '$q', '$mdDialog'];
  
    function shipmentChangeViewController(FileSaverService, ShipmentService, $q, $mdDialog){
      var vm = this ;   //view model
      vm.condition = {};
      vm.selected = [] ;
      vm.resource = {totalElements:0,size: 10,number: 1};//md-table-pagination的初始值
      vm.pageOptions = [10, 20, 50];

      vm.search = search;
      vm.pagination = pagination;
      vm.exportFile= exportFile;

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

      function search() {
        activate()
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

    }
    
})();