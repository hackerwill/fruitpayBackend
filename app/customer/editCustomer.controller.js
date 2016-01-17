(function(){
    'use strict';

    angular
        .module('customer')
        .controller('EditCustomerController',EditCustomerController);
    
    EditCustomerController.$inject = ['$scope','$mdDialog','CustomerService','customer','citys','postalCodes'];
    function EditCustomerController($scope, $mdDialog,CustomerService ,customer,citys ,postalCodes) {
		$scope.customer = angular.copy(customer);
		$scope.citys = citys;
		$scope.postalCodes = postalCodes ;
		$scope.choosePostalCode = choosePostalCode ;
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
        function choosePostalCode(){
			angular.forEach(postalCodes, function(value, key) {
				if(postalCodes[key].countyName==$scope.customer.postalCode.countyName &&
						postalCodes[key].towershipName==$scope.customer.postalCode.towershipName 	){
					console.log(postalCodes[key].countyName,$scope.customer.postalCode.countyName,postalCodes[key].towershipName,$scope.customer.postalCode.towershipName);
					$scope.customer.postalCode = angular.copy( postalCodes[key]) ;
				}
					
			});	
        }
        
        $scope.closeDialog = function() {
          $mdDialog.cancel();
        }
    }
    
})();