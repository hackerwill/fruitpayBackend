(function(){
    'use strict';

    angular
        .module('shipment')
        .controller('ShipmentChangeViewController', shipmentChangeViewController);
    shipmentChangeViewController.$inject = ['ShipmentService', '$q', '$mdDialog'];
  
    function shipmentChangeViewController(ShipmentService, $q, $mdDialog){
		
    var vm = this ;	//view model
		vm.selected = [] ;
		vm.resource = {totalElements:0,size: 10,number: 1};//md-table-pagination的初始值
		vm.pageOptions = [10, 20, 50];
		
        vm.pagination = pagination;
		
		activate();

		function activate(){
			pagination(vm.resource.number, vm.resource.size, vm.condition.validFlag);
		}
		
        function pagination(page,size){
			var deferred = $q.defer();
			vm.promise = deferred.promise;
        	ShipmentService.findAll(page-1,size)
				.then(function(result){	//spring預設第一頁 index為0
					console.log(result);
					result.data.number = result.data.number+1;
					vm.resource = result.data;
					deferred.resolve();
				})
        }

    }
    
    
})();