(function() {
  'use strict';

  angular
    .module('constant')
    .controller('EditConstantController', EditConstantController);

  EditConstantController.$inject = ['$mdDialog', 'constant', 'ConstantService' ];

  function EditConstantController($mdDialog, constant, ConstantService) {
    var vm = this;
    vm.constant = angular.copy(constant);

    vm.save = save;
    vm.closeDialog = closeDialog;

    //儲存Constant
    function save() {
      if(constant.constId){
        updateConstant();
      }else{
        createConstant();
      }
    }

    //關閉Dialog
    function closeDialog() {
      $mdDialog.cancel();
    }

    //更新Constant
    function updateConstant() {
      ConstantService
        .updateConstant(vm.constant)
        .then(function(res) {
          $mdDialog.hide(res);
        });
    }

    //新增Constant
    function createConstant() {
      ConstantService
        .createConstant(vm.constant)
        .then(function(res) {
          $mdDialog.hide(res);
        });
    }

  }

})();