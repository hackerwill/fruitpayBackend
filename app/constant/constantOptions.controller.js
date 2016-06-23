(function(){
  'use strict';
  angular
  .module('constant')
  .controller('ConstantOptionsController', ConstantOptionsController);

  ConstantOptionsController.$inject = ['ConstantService','$routeParams', '$mdDialog', '$scope'];

  function ConstantOptionsController(ConstantService, $routeParams, $mdDialog, $scope) {
    var vm = this;
    vm.orderBy = "optionId";
    vm.selected = [] ;
    vm.resource = {totalElements:0,size: 10,number: 1};//md-table-pagination的初始值
    vm.pageOptions = [10, 20, 50];
    vm.pagination = pagination;
    vm.openEditConstantOptionDialog = openEditConstantOptionDialog;

    $scope.$emit('setFunctionButtons', getFunctionButtons());
    activate();

    function activate(){
      ConstantService.getAdminConstantByConstId($routeParams.constId)
        .then(function(res) {
          console.log(res);
          vm.constant = res.data;
        });

      pagination(vm.resource.number, vm.resource.size);
    }

    function pagination(page, size){
      ConstantService.getAllConstantOptionsByConstId(page-1, size, $routeParams.constId)
        .then(function(res) {
          console.log(res);
          res.data.number ++;
          vm.resource = res.data;
        });
    }

    function openEditConstantOptionDialog($event, constantOption) {
      if(!constantOption){
        constantOption = {};
      }
      $mdDialog.show({
        templateUrl :'app/constant/editConstantOptionDialog.html',
        controller :'EditConstantOptionController as vm',
        targetEvent :$event,
        clickOutsideToClose :true,
        locals :{
          constantOption :constantOption,
          constant :vm.constant,
        },
      }).then(function(res) {
        if(constantOption.optionId){
          updateConstantOptionTable(res.data);
        }else{
          createConstantOptionTable(res.data);
        }
      });
    }

    function updateConstantOptionTable(constantOption) {
      console.log('update constantOption: ' + constantOption);
      angular.forEach(vm.resource.content, function(value, key) {
        if(vm.resource.content[key].optionId == constantOption.optionId){
          vm.resource.content[key] = constantOption;
        }
      });
    }

    function createConstantOptionTable(constantOption) {
      console.log('create constantOption: ' + constantOption);
      if(vm.resource.content.length < vm.resource.size) {
        vm.resource.content.push(constantOption);
      }
      vm.resource.totalElements ++;
    }

    function getFunctionButtons() {
      var functionButtons = [
      {
        ariaLabel: 'createConstantOption',
        onClick: openEditConstantOptionDialog,
        toolTip: '新增',
        iconName: 'add',
      },
      ];
      return functionButtons;
    }

  }

})();