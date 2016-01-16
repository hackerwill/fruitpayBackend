(function(){
    'use strict';

    angular
        .module('mdTable')
        .controller('MdTableController',MdTableController);
    MdTableController.$inject = [];
  
    function MdTableController(){
        var vm = this ;	//view model
        vm.books = [{name:"java",author:"bruce"},{name:"uml",author:"wei"},
                    {name:"angular",author:"chou"},{name:"spring",author:"weichou"},
                    {name:"javascript",author:"bruce"}];
        activate();

        function activate(){
        	console.log(123);
        }

    }
    
    
})();