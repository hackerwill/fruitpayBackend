(function(){
  'use strict';

  angular
    .module('claim')
    .controller('EditClaimController',EditClaimController);
    
  EditClaimController.$inject = ['$mdDialog', 'ClaimService', 'constants', 'customerClaim', 'UtilService', 'CommUtils'];
  function EditClaimController( $mdDialog, ClaimService , constants, customerClaim, UtilService, CommUtils) {
    var vm = this ; //view model

    if(!customerClaim){
      customerClaim = {};
      customerClaim.date = new Date();
    }  

    vm.customerClaim = angular.copy(customerClaim);
    vm.constants = constants;
    vm.claimPlatformOptions = [];
    for(var i = 0; i< vm.constants.claimPlatform.constOptions.length; i++) {
      var obj = vm.constants.claimPlatform.constOptions[i];
      vm.claimPlatformOptions.push(obj.optionDesc);
    }
    vm.claimTypeOptions = [];
    for(var i = 0; i< vm.constants.claimType.constOptions.length; i++) {
      var obj = vm.constants.claimType.constOptions[i];
      vm.claimTypeOptions.push(obj.optionDesc);
    }
  
    vm.save = function() {
      if(vm.customerClaim.claimId){
        update();
      }else{
        add();
      }
    }

    /**更新客戶**/
    function update(){
      ClaimService.update(vm.customerClaim).then(function(res){
        $mdDialog.hide(vm.customerClaim);
      });
    }
    /**新增客戶**/
    function add(){

      if(!vm.customerClaim.customerClaimStatuses) {
        vm.customerClaim.customerClaimStatuses = [];
      }

      if(vm.newClaimStatus) {
        vm.customerClaim.customerClaimStatuses.push(vm.newClaimStatus)
      }

      console.log('vm.customerClaim', vm.customerClaim)
      
      ClaimService.add(vm.customerClaim).then(function(res){
        $mdDialog.hide(res.data);
      });
    }
        
    vm.closeDialog = function() {
      $mdDialog.cancel();
    }
  }
    
})();