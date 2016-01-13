(function(){
    'use strict';

    angular
        .module('customer')
        .controller('CustomersController',CustomersController);
    CustomersController.$inject = ['CustomerService','$mdDialog','UtilService'];
    //return $filter('filter')(customers, {customerId:customerId});   //filter the customer by id
    function CustomersController(CustomerService,$mdDialog,UtilService){
        var vm = this ;	//view model
        var postalCodes;
        var citys = {};
        vm.openCustomerDialog = openCustomerDialog;
        vm.pageing = pageing;
        activate();

        function activate(){
        	getAllPostalCodes();
        	findAll(1,10);
        }
        function pageing(page,size){
        	console.log(page,size);
        }
        /**取得所有客戶**/
		function findAll(page,size){
			CustomerService.findAll(page-1,size).then(function(result){	//spring預設第一頁 index為0
				console.log(result);
				vm.customers = result.data.content;
				vm.totalElements = result.data.totalElements ;
				vm.page = result.data.number+1 ;
				vm.size = result.data.size ;
				console.log(vm.totalElements,vm.page,vm.size);
			});
		}
		function openCustomerDialog($event ,customer){
			$mdDialog.show({
				targetEvent: $event,
				hasBackdrop: true,
				clickOutsideToClose :true,
				locals: { customer: customer ,citys:citys ,postalCodes:postalCodes},
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
    
    
    DialogController.$inject = ['$scope','$mdDialog','CustomerService','customer','citys','postalCodes'];
    function DialogController($scope, $mdDialog,CustomerService ,customer,citys ,postalCodes) {
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