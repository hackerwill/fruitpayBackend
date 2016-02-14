(function(){
    'use strict';

    angular
        .module('coupon')
        .controller('EditCouponController',EditCouponController);
    
    EditCouponController.$inject = ['$mdDialog','CouponService','coupon','UtilService'];
    function EditCouponController( $mdDialog,CouponService ,coupon, UtilService) {
    	var vm = this ;	//view model
		vm.coupon = angular.copy(coupon);
		
		UtilService.getConstant(8)
			.then(function(result){
				console.log(result);
				if(result)
					vm.conponType = result.data;
				console.log(vm.conponType);
			});
			
		UtilService.getConstant(7)
			.then(function(result){
				console.log(result);
				if(result)
					vm.yesNoOption = result.data;
			});
			
        vm.save = function() {
        	if(vm.coupon.couponId){ 
        		update();
        	}else{
        		add();
        	}
        }
        /**更新客戶**/
        function update(){
        	CouponService.update(vm.coupon).then(function(res){
        		$mdDialog.hide(vm.coupon);
        	});
        }
        /**新增客戶**/
        function add(){
        	CouponService.createCoupon(vm.coupon).then(function(res){	//TODO
        		$mdDialog.hide(res.data);
        	});
        }
        
        vm.closeDialog = function() {
          $mdDialog.cancel();
        }
    }
    
})();