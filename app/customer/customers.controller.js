(function(){
    'use strict';

    angular
        .module('customer')
        .controller('CustomersController',CustomersController);
    CustomersController.$inject = ['$scope', 'CustomerService', '$mdDialog', 'UtilService', '$q'];
    function CustomersController($scope, CustomerService, $mdDialog, UtilService, $q){
        var vm = this ;	//view model
		    vm.selected = [] ;
        vm.resource = {totalElements:0,size: 10,number: 1};//md-table-pagination的初始值
		    vm.pageOptions = [10, 20, 50];
        
        vm.openEditCustomerDialog = openEditCustomerDialog;
        vm.pagination = pagination;
        
        activate();

        function activate(){
        	pagination(vm.resource.number, vm.resource.size);
        }

        /**取得所有客戶**/
		function pagination(page,size){
			CustomerService.findAll(page-1,size).then(function(result){	//spring預設第一頁 index為0
				console.log(result);
				result.data.number = result.data.number+1;
				vm.resource = result.data;
			});
		}
		function openEditCustomerDialog($event ,customer){
			$mdDialog.show({
				targetEvent: $event,
				hasBackdrop: true,
				clickOutsideToClose :true,
				locals: { customer: customer},
				templateUrl : 'app/customer/editCustomerDialog.html',
				controller: 'EditCustomerController as vm'
		       }).then(function(res){
		    	   if(customer.customerId){
		    		   updateCustomer(res);
		    	   }else{
		    		   createCustomer(res);
		    	   }
		    	   
		       });
		}
		/**客戶更新後 替換掉原本list上的customer object**/
		function updateCustomer(customer){
			console.log('update',customer);
			angular.forEach(vm.resource.content, function(value, key) {
				if(vm.resource.content[key].customerId == customer.customerId){
					vm.resource.content[key] = customer ;
				} 
			});	
		}
		/**新增客戶後 ,加入list**/
		function createCustomer(customer){
			console.log('create',customer);
			pagination(vm.resource.number, vm.resource.size);
		}
		
    }
    
    
})();