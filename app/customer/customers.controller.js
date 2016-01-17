(function(){
    'use strict';

    angular
        .module('customer')
        .controller('CustomersController',CustomersController);
    CustomersController.$inject = ['$scope','CustomerService','$mdDialog','UtilService'];
    //return $filter('filter')(customers, {customerId:customerId});   //filter the customer by id
    function CustomersController($scope,CustomerService,$mdDialog,UtilService){
        var vm = this ;	//view model
        vm.resource = {totalElements:0,size: 10,number: 1};//md-table-pagination的初始值
        vm.progress = false;
        var postalCodes;
        var citys = {};
        
        vm.openEditCustomerDialog = openEditCustomerDialog;
        vm.pagination = pagination;
        
        activate();

        function activate(){
        	getAllPostalCodes();
        	pagination(1,10);
        }

        /**取得所有客戶**/
		function pagination(page,size){
			vm.progress = true;
			CustomerService.findAll(page-1,size).then(function(result){	//spring預設第一頁 index為0
				console.log(result);
				result.data.number = result.data.number+1;
				vm.resource = result.data;
				vm.progress = false;
			});
		}
		function openEditCustomerDialog($event ,customer){
			$mdDialog.show({
				targetEvent: $event,
				hasBackdrop: true,
				clickOutsideToClose :true,
				locals: { customer: customer ,citys:citys ,postalCodes:postalCodes},
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
			angular.forEach(vm.customers, function(value, key) {
				if(vm.customers[key].customerId == customer.customerId){
					vm.customers[key] = customer ;
				} 
			});	
		}
		/**新增客戶後 ,加入list**/
		function createCustomer(customer){
			console.log('create',customer);
			//vm.resource.content.push(customer);
			pagination(vm.resource.totalPages ,vm.resource.size);
		}
		
		/**取得郵遞區號清單**/
		function getAllPostalCodes(){
        	UtilService.getAllPostalCodes().then(function(result){
        		postalCodes = result.data;
    			angular.forEach(postalCodes, function(value, key) {
    				citys[postalCodes[key].countyName] = postalCodes[key].countyName ;
    			});	
        	});
		}
		
    }
    
    
})();