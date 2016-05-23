(function() {
	'use strict';

	angular
		.module('constant')
		.controller('EditConstantController', EditConstantController);

	EditConstantController.$inject = ['$mdDialog', 'constant', 'ConstantService' ];

	function EditConstantController($mdDialog, constant, ConstantService) {
		var vm = this;
		vm.constant = angular.copy(constant);

		vm.save = save;
		vm.closeDialog = closeDialog;

		//儲存Constant
		function save() {
			if(constant.constId){
				updateConstant();
			}else{
				addConstant();
			}
		}

		//關閉Dialog
		function closeDialog() {
			$mdDialog.cancel();
		}

		//更新Constant
		function updateConstant() {
			ConstantService
				.update(vm.constant)
				.then(function(res) {
					$mdDialog.hide(res);
				});
		}

		//新增Constant
		function addConstant() {
			ConstantService
				.createConstant(vm.constant)
				.then(function(res) {
					$mdDialog.hide(res);
				});
		}

	}

})();