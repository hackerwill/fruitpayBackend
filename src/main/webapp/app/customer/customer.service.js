(function(){
    'use strict';

    angular
        .module('customer')
        .service('CustomerService',CustomerService);
    CustomerService.$inject = ['$filter','$q'] ;
    function CustomerService($filter,$q){

    }

})();