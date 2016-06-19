(function(){
    'use strict';

    angular
        .module('constant')
        .controller('ConstantsController',ConstantsController);
    ConstantsController.$inject = ['ConstantService', '$q', '$mdDialog' ,'ShareDataService'];
  
    function ConstantsController(ConstantService, $q, $mdDialog, ShareDataService){
    
      var vm = this ;  //view model
      vm.orderBy = "constId";
      vm.selected = [] ;
      vm.resource = {totalElements:0,size: 10,number: 1};//md-table-pagination的初始值
      vm.pageOptions = [10, 20, 50];
      vm.pagination = pagination;

      vm.openEditConstantDialog = openEditConstantDialog;

      ShareDataService.setData('onSearchClick',function(){
      alert('constant');
    });

      activate();

      function activate(){
        pagination(vm.resource.number, vm.resource.size);
      }

      function pagination(page, size) {
          ConstantService.getAllAdminConstants(page-1, size)
          .then(function(result) {
            console.log(result);
            result.data.number++;
            vm.resource = result.data;
          });
      }


      function openEditConstantDialog($event, constant) {
          $mdDialog.show({
            controller: 'EditConstantController as vm',
            templateUrl: 'app/constant/editConstantDialog.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose:true,
            locals: {constant: constant},
          })
          .then(function(res) {
            if(constant.constId){
              updateConstantTable(res.data);
            }else{
              createConstantTable(res.data);
            }
          });

      };

      //更新參數table
      function updateConstantTable(constant) {
        console.log('update',constant);
        angular.forEach(vm.resource.content, function(value, key) {
          if(vm.resource.content[key].constId == constant.constId){
            vm.resource.content[key] = constant ;
          } 
        });  
      }

      function createConstantTable(constant){
        console.log('create',constant);
        if(vm.resource.content.length < vm.resource.size){
              vm.resource.content.push(constant);
          }
          vm.resource.totalElements ++;
      }

    }
    
    
})();