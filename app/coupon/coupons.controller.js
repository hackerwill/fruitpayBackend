(function(){
    'use strict';

    angular
        .module('coupon')
        .controller('CouponsController',CouponsController);
    CouponsController.$inject = ['CouponService'];
  
    function CouponsController(CouponService){
        var vm = this ;	//view model
        vm.books = [{name:"java",author:"bruce"},{name:"uml",author:"wei"},
                    {name:"angular",author:"chou"},{name:"spring",author:"weichou"},
                    {name:"javascript",author:"bruce"}];
        activate();

        function activate(){
        	pagination(1,10);
        }
        function pagination(page,size){
        	CouponService.findAll(page-1,size).then(function(result){	//spring預設第一頁 index為0
				console.log(result);

			});
        }

    }
    
    
})();