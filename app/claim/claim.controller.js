(function(){
  'use strict';
  angular
    .module('claim')
    .controller('ClaimController',ClaimController);
  ClaimController.$inject = ['$location' ,'ClaimService', '$mdDialog', '$scope', '$q', 'FileSaverService', 'LogService', 'UtilService', 'SEARCH_CONDITION'] ;
  function ClaimController($location, ClaimService, $mdDialog, $scope, $q, FileSaverService, LogService, UtilService, SEARCH_CONDITION) {
    console.log(SEARCH_CONDITION);
    var vm = this ; //view model
    vm.selected = [] ;
    vm.condition = {};
    vm.constants = {};

    vm.condition.validFlag = 1;
    vm.resource = {totalElements:0,size: 10,number: 1};//md-table-pagination的初始值
    vm.pageOptions = [10, 20, 50, 100, 200, 500, 1000];
    
    vm.pagination = pagination;
    vm.openEditClaimDialog = openEditClaimDialog;
    vm.search = search;
    vm.onSearchClick = onSearchClick;
    setSearchConditionMap();
        
    $scope.$emit('setFunctionButtons', getFunctionButtons());

    $q.all([ 
      //得到客服平台
      UtilService.getConstant(19)
        .then(function(result){
          vm.constants.claimPlatform = result.data;
        }),
      //得到客服問題類型
      UtilService.getConstant(20)
        .then(function(result){
          vm.constants.claimType = result.data;
        }),
      //得到客服處理狀態
      UtilService.getConstant(21)
        .then(function(result){
          vm.constants.claimStatus = result.data;
        }),
    ]).then(function(){console.log("finished.")});

    function activate() {
      pagination(vm.resource.number, vm.resource.size);
    }


    //location='#/orders/'+id;
    function pagination(page, size) {
      vm.selected = [] ;
      ClaimService.findAll(page-1, size, vm.condition)
        .then(function(result){
          console.log(result);
          if(result) {
            result.data.number = result.data.number+1;
            vm.resource = result.data;
          }
        });
    }

    function search(){
      pagination(vm.resource.number, vm.resource.size);
    }
  
    function openEditClaimDialog($event, customerClaim){
      $mdDialog.show({
        targetEvent: $event,
        hasBackdrop: true,
        clickOutsideToClose :true,
        locals: { 
          customerClaim: customerClaim,
          constants: vm.constants,
        },
        templateUrl : 'app/claim/editClaimDialog.html',
        controller:'EditClaimController as vm'
           })
        .then(function(res){
          if(customerClaim.claimId){
            updateClaim(res);
          }else{
            createClaim(res);
          }
        });
    }
    
    /**客戶更新後 替換掉原本list上的customer object**/
    function updateClaim(customerclaim){
      console.log('customerclaim', customerclaim);
      angular.forEach(vm.resource.content, function(value, key) {
        if(vm.resource.content[key].claimId == customerclaim.claimId){
          vm.resource.content[key] = customerclaim ;
        } 
      }); 
    }
    /**新增客戶後 ,加入list**/
    function createClaim(customerclaim){
      console.log('create', customerclaim);
      pagination(vm.resource.number, vm.resource.size);
    }

    function onSearchClick($event) {
      pagination(vm.resource.number, vm.resource.size)
    }

    function getFunctionButtons() {
      var functionButtons = [
            {
              ariaLabel: 'createOrder',
              onClick: openEditClaimDialog,
              toolTip: '新增 +',
              iconName: 'add',
            },
      ];
      return functionButtons;
    }

    function setSearchConditionMap() {
      vm.conditionMap ={};
      vm.conditionMap[SEARCH_CONDITION.ORDER_ID] = true;
      vm.conditionMap[SEARCH_CONDITION.NAME] = true;
      vm.conditionMap[SEARCH_CONDITION.VALD_FLAG] = true;
      vm.conditionMap[SEARCH_CONDITION.START_DATE] = true;
      vm.conditionMap[SEARCH_CONDITION.END_DATE] = true;
      vm.conditionMap[SEARCH_CONDITION.RECEIVER_CELL_PHONE] = true;
      vm.conditionMap[SEARCH_CONDITION.EMAIL] = true;
    }
  
  }

})();








