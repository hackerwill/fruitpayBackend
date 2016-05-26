(function() {
  'use strict';

  angular
    .module('constant')
    .controller('EditConstantOptionController', EditConstantOptionController)

    EditConstantOptionController.$inject = ['constantOption', 'constant', '$mdDialog', 'ConstantService', 'UtilService'];

    function EditConstantOptionController(constantOption, constant, $mdDialog, ConstantService, UtilService){

      var vm = this;
      vm.constantOption = angular.copy(constantOption);
      vm.constantOption.constant = angular.copy(constant);
      vm.closeDialog = closeDialog;
      vm.save = save;

      UtilService.getConstant(15)
        .then(function(result){
          vm.validFlag = result.data;
        });

      function closeDialog() {
        $mdDialog.cancel();
      }

      function save() {
        if(vm.constantOption.optionId){
          updateConstantOption();
        }else{
          createConstantOption();
        }
      }

      function updateConstantOption() {
        ConstantService
          .updateConstantOption(vm.constantOption)
          .then(function(res) {
            $mdDialog.hide(res);
          });
      }

      function createConstantOption() {
        ConstantService
          .createConstantOption(vm.constantOption)
          .then(function(res) {
            $mdDialog.hide(res);
          });
      }
    }
})();