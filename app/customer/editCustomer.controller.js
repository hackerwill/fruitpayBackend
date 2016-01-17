(function(){
    'use strict';

    angular
        .module('customer')
        .controller('EditCustomerController',EditCustomerController);
    
    EditCustomerController.$inject = ['$mdDialog','CustomerService','customer','citys','postalCodes'];
    function EditCustomerController( $mdDialog,CustomerService ,customer,citys ,postalCodes) {
    	var vm = this ;	//view model
		vm.customer = angular.copy(customer);
		vm.citys = citys;
		vm.postalCodes = postalCodes ;
		vm.choosePostalCode = choosePostalCode ;
		
		console.log(customer);
		
        vm.save = function() {
        	if(vm.customer.customerId){
        		update();
        	}else{
        		add();
        	}
        }
        /**更新客戶**/
        function update(){
        	CustomerService.update(vm.customer).then(function(res){
        		$mdDialog.hide(vm.customer);
        	});
        }
        /**新增客戶**/
        function add(){
        	CustomerService.createCustomer(vm.customer).then(function(res){
        		$mdDialog.hide(res.data);
        	});
        }
        function choosePostalCode(){
			angular.forEach(postalCodes, function(value, key) {
				if(postalCodes[key].countyName==vm.customer.postalCode.countyName &&
						postalCodes[key].towershipName==vm.customer.postalCode.towershipName 	){
					console.log(postalCodes[key].countyName,vm.customer.postalCode.countyName,postalCodes[key].towershipName,vm.customer.postalCode.towershipName);
					vm.customer.postalCode = angular.copy( postalCodes[key]) ;
				}
					
			});	
        }
        
        vm.closeDialog = function() {
          $mdDialog.cancel();
        }
    }
    
})();