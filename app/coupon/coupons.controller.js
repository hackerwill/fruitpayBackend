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
		
        vm.openEditCouponDialog = openEditCouponDialog;
        vm.pagination = pagination;
		
		activate();

		function activate(){
			pagination(1,10);
		}
		
        function pagination(page,size){
        	vm.progress = true;
        	CouponService.findAll(page-1,size).then(function(result){	//spring預設第一頁 index為0
				console.log(result);
				result.data.number = result.data.number+1;
				vm.resource = result.data;
				vm.progress = false;
			});
        }
        
        
        
		function openEditCouponDialog($event ,coupon){
			$mdDialog.show({
				targetEvent: $event,
				hasBackdrop: true,
				clickOutsideToClose :true,
				locals: { coupon: coupon },
				templateUrl : 'app/coupon/editCouponDialog.html',
				controller: 'EditCouponController as vm'
		       }).then(function(res){
		    	   if(coupon.couponId){
		    		   updateCoupon(res);
		    	   }else{
		    		   createCoupon(res);
		    	   }
		    	   
		       });
		}
		/**coupon更新後 替換掉原本list上的coupon object**/
		function updateCoupon(coupon){
			console.log('update',coupon);
			angular.forEach(vm.resource.content, function(value, key) {
				if(vm.resource.content[key].couponId == coupon.couponId){
					vm.resource.content[key] = coupon ;
				} 
			});	
		}
		/**新增coupon後 ,加入list**/
		function createCoupon(coupon){
			console.log('create',coupon);
			//vm.resource.content.push(coupon);
			pagination(vm.resource.totalPages ,vm.resource.size);
		}

    }
    
    
})();