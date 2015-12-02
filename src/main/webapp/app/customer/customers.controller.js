(function(){
    'use strict';

    angular
        .module('customer')
        .controller('CustomersController',CustomersController);
    CustomersController.$inject = ['CustomerService'];
    //return $filter('filter')(customers, {customerId:customerId});   //filter the customer by id
    function CustomersController(CustomerService){
        var vm = this ;	//view model

        activate();

        function activate(){

        }

    }
})();