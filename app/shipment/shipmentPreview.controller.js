(function(){
  'use strict';
  angular
    .module('shipment')
    .controller('ShipmentPreviewController', ShipmentPreviewController);
  ShipmentPreviewController.$inject = ['OrderService', '$location' ,'ShipmentService', '$mdDialog', '$scope', '$q', 'FileSaverService', 'LogService', 'UtilService', 'SEARCH_CONDITION'] ;
  function ShipmentPreviewController(OrderService, $location, ShipmentService, $mdDialog, $scope, $q, FileSaverService, LogService, UtilService, SEARCH_CONDITION){
    var vm = this ;  //view model
    vm.selected = [] ;
    vm.resource = {totalElements:0,size: 100,number: 1};//md-table-pagination的初始值
    vm.pageOptions = [100, 500, 1000];
    vm.condition = {};
    
    vm.duplicateOrders = [];
    vm.pagination = pagination;
    vm.search =search;
    vm.openEditOrderDialog = openEditOrderDialog;
    vm.moveToShipmentChange = moveToShipmentChange;
    vm.update = update;
    vm.exportFile = exportFile;
    vm.exportShipmentRecord = exportShipmentRecord;
    vm.openduplicated = openduplicated

    $scope.$emit('setSearchCallBack', onSearchClick);
    $scope.$emit('setFunctionButtons', getFunctionButtons());
    
    activate();

    $q.all([
      //得到所有訂單狀態
      UtilService.getAllOrderStatus()
        .then(function(result){
          vm.orderStatuses = result.data;
        }),
      //得到所有運送週期
      UtilService.getAllShipmentPeriods()
        .then(function(result){
          vm.shipmentPeriods = result.data;
        }), 
      //得到配送日
      UtilService.getConstant(6)
        .then(function(result){
          vm.deliveryDay = result.data;
        }),
      //得到有效無效
      UtilService.getConstant(15)
        .then(function(result){
          vm.validFlag = result.data;
        }),
    ]).then(function(){console.log("finished.")});

    function activate(){
      pagination(vm.resource.number, vm.resource.size);
    }
    //location='#/orders/'+id;
    function pagination(page,size){
      vm.selected = [] ;
      
      ShipmentService.shipmentPreview(page-1, size, vm.condition)
        .then(function(result){
          console.log(result);
          if(result && result.data != ''){
            result.data.customerOrders.number = result.data.customerOrders.number+1;
            vm.resource = result.data.customerOrders;
          }else{
            vm.resource = result.data.customerOrders;
          }
          vm.orderIds = result.data.orderIds;
          vm.duplicateOrders = result.data.duplicateOrders;
          $scope.$emit('setFunctionButtons', getFunctionButtons());
        });
    }

    function search(){
      pagination(vm.resource.number, vm.resource.size);
    }


    function moveToShipmentChange(order){
      OrderService.setOrder(order);
      $location.path("/order/shipmentChange/" + order.orderId);
    }

    function openEditOrderDialog($event ,order){
      $mdDialog.show({
        targetEvent: $event,
        hasBackdrop: true,
        clickOutsideToClose :true,
        locals: { order: order },
        templateUrl : 'app/order/editOrderDialog.html',
        controller:'EditOrderController as vm'
           }).then(function(res){
             
             if(order.orderId){
               updateOrder(res);
             }
             
           });
    }

    /**更新客戶**/
      function update(order){
        OrderService.update(order).then(function(res){
          if(res)
            LogService.showSuccess('更新成功');
        });
      }

    /**客戶更新後 替換掉原本list上的customer object**/
    function updateOrder(order){
      console.log('update',order);
      angular.forEach(vm.resource.content, function(value, key) {
        if(vm.resource.content[key].orderId == order.orderId){
          vm.resource.content[key] = order ;
        } 
      });  
    }

    function exportFile(){
      var deferred = $q.defer();
      vm.promise = deferred.promise;
      ShipmentService.exportShipments(vm.orderIds, vm.condition)
        .then(function(response){       
          var filename = response.config.headers.fileName;//"order_" + d.getTime() + ".xls"         
          openSaveAsDialog(filename, response.data, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8');                 
            deferred.resolve();
        });
    }

    function exportShipmentRecord() {
      if(!vm.orderIds || !vm.condition.date) {
        return
      }

      ShipmentService.shipmentRecordByDate(vm.condition.date)
        .then(function(result) {
          if(result.data) {
            return result.data;
          }else{
            return undefined;
          }
        }).then(function(result){
          console.log(result)
          if(result) {
            $mdDialog.show($mdDialog.confirm({
                title: '注意',
                content: '您選擇的出貨日期已有出貨記錄, 確定要覆蓋嗎?',
                ok: '確認',
                cancel: '取消',
            })).then(function(result){
              if(result){
                addShipmentRecord();
              }
            });
          } else {
            addShipmentRecord();
          }
        })

    }

    function addShipmentRecord() {
      ShipmentService.addShipmentRecord(vm.condition.date, vm.orderIds)
        .then(function(result) {
          if(result) {
            LogService.showSuccess('新增成功');
          }
        })
    }

    function openSaveAsDialog(filename, content, mediaType) {
      var blob = new Blob([content], {type: mediaType});
      FileSaverService.saveAs(blob, filename);
    }

    function openduplicated($event) {
       $mdDialog.show({
        targetEvent: $event,
        hasBackdrop: true,
        clickOutsideToClose :true,
         locals: { 
          date: vm.condition.date,  
          duplicatedOrders: vm.duplicateOrders,
        },
        templateUrl : 'app/shipment/shipmentDuplicated.html',
        controller:'ShipmentDuplicatedController as vm'
           });
     }

    function onSearchClick($event) {
      var conditionMap ={};
      conditionMap[SEARCH_CONDITION.RECEIVE_DATE] = true,
      $mdDialog.show({
        targetEvent: $event,
        hasBackdrop: true,
        clickOutsideToClose :true,
        locals: { 
          date: date,  
          duplicatedOrders: duplicatedOrders,
        },
        templateUrl : 'app/shipment/shipmentDuplicated.html',
        controller:'ShipmentDuplicatedController as vm'
           });
        locals: {
          condition: vm.condition,
          conditionMap: conditionMap,
        },
        templateUrl : 'app/util/searchConditions.html',
            controller:'SearchConditionsController as vm',
      }).then(function(res) {
            vm.condition = res;
            pagination(vm.resource.number, vm.resource.size);
      });
    }

    function getFunctionButtons() {
      var functionButtons = [
            {
              ariaLabel: 'exportShipmentRecord',
              onClick: exportShipmentRecord,
              toolTip: '新增出貨紀錄',
              iconName: 'add',
              isShow:
            },
            {
              ariaLabel: 'exportFile',
              onClick: exportFile,
              toolTip: '匯出出貨單',
              iconName: 'launch',
            },
            {
              ariaLabel: 'openduplicated',
              onClick: openduplicated,
              toolTip: '檢視重複紀錄',
              iconName: 'launch',
              isShow: vm.duplicateOrders.length > 1,
            },
      ];
      return functionButtons;
    }

})();








