(function() {
  'use strict';
  angular
    .module('myDirective',[])
    .controller('MySearchPanelController', MySearchPanelController);
  
  function MySearchPanelController($scope,SEARCH_CONDITION,UtilService){
    var vm = this;
    vm.search = $scope.onSearchClick;
    vm.clear = clear;
    vm.constants = {};
    vm.condition = $scope.condition;
    vm.conditionMap = $scope.conditionMap;
    vm.SEARCH_CONDITION = SEARCH_CONDITION;
    vm.showPanel = false;

    //得到異動原因
    UtilService.getConstant(14)
      .then(function(result){
        vm.constants.shipmentChangeReason = result.data;
      }), 

    //得到異動類型
    UtilService.getConstant(11)
      .then(function(result){
        vm.constants.shipmentChangeType = result.data;
      }), 
      
    UtilService.getAllOrderStatus()
      .then(function(result){
      console.log(result);
      vm.constants.orderStatuses = result.data;
    });

    UtilService.getAllProductItems()
       .then(function(result){
        console.log(result);
        vm.productItems = result.data;
      });

    function clear() {
      $scope.condition = {};
      $scope.condition.validFlag = 1;
      vm.condition = $scope.condition;
    }
  }
  
  angular
    .module('myDirective')
    .directive('mySearchPanel',mySearchPanel);

  function mySearchPanel() {
    return {
      restrict: 'E',
      scope: {
        condition: '=',
        conditionMap: '=',
        onSearchClick: '=',
      },
      templateUrl: 'app/directive/searchDirective.html',
      controller: 'MySearchPanelController as vm',
    };
  }

})();