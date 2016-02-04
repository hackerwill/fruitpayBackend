(function(){
    'use strict';

    angular
        .module('coupon')
        .controller('CouponsController',CouponsController);
    CouponsController.$inject = ['CouponService'];
  
    function CouponsController(CouponService){
        var vm = this ;	//view model
		vm.selected = [] ;
		vm.resource = {totalElements:0,size: 10,number: 1};//md-table-pagination的初始值
		vm.progress = true;
		vm.pagination = pagination;
		
		activate();

		function activate(){
			pagination(1,10);
		}
		
        function pagination(page,size){
        	CouponService.findAll(page-1,size).then(function(result){	//spring預設第一頁 index為0
				console.log(result);
				result.data.number = result.data.number+1;
				vm.resource = result.data;
				vm.progress = false;
			});
        }

    }
    
    
})();