(function(){
    'use strict';

    angular
        .module('coupon')
        .controller('EditCouponController',EditCouponController);
    
    EditCouponController.$inject = ['$mdDialog','CouponService','coupon'];
    function EditCouponController( $mdDialog,CouponService ,coupon) {
    	var vm = this ;	//view model
		vm.coupon = angular.copy(coupon);
		
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