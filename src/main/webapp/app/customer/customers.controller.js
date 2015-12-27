(function(){
    'use strict';

    angular
        .module('customer')
        .controller('CustomersController',CustomersController);
    CustomersController.$inject = ['CustomerService','$mdDialog'];
    //return $filter('filter')(customers, {customerId:customerId});   //filter the customer by id
    function CustomersController(CustomerService,$mdDialog){
        var vm = this ;	//view model
        vm.openCustomerDialog = openCustomerDialog;
        activate();

        function activate(){
        	findAll();
        }
        /**取得所有客戶**/
		function findAll(){
			CustomerService.findAll().then(function(result){
				console.log(result);
				vm.customers = result.data;
			});
		}
		function openCustomerDialog($event ,customer){
			$mdDialog.show({
				targetEvent: $event,
				hasBackdrop: true,
				clickOutsideToClose :true,
				locals: { customer: customer },
				templateUrl : 'app/customer/customerDialog.html',
				controller: DialogController
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
			vm.customers.push(customer);
		}
		
    }
    
    
    DialogController.$inject = ['$scope','$mdDialog','CustomerService','customer'];
    function DialogController($scope, $mdDialog,CustomerService ,customer) {
		$scope.customer = angular.copy(customer);
        $scope.save = function() {
        	if($scope.customer.customerId){
        		update();
        	}else{
        		add();
        	}
        }
        /**更新客戶**/
        function update(){
        	CustomerService.update($scope.customer).then(function(res){
        		$mdDialog.hide($scope.customer);
        	});
        }
        /**新增客戶**/
        function add(){
        	CustomerService.createCustomer($scope.customer).then(function(res){
        		$mdDialog.hide(res.data);
        	});
        }
        $scope.closeDialog = function() {
          $mdDialog.cancel();
        }
    }
    
})();