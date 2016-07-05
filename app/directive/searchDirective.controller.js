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
      vm.condition = {};
      vm.condition.validFlag = 1;
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