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
				controller: function DialogController($scope, $mdDialog ,customer) {
					$scope.customer = customer;
					
		            $scope.closeDialog = function() {
		              $mdDialog.hide();
		            }
		          }
		       });
		}
    }
})();