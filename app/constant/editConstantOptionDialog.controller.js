(function() {
	'use strict';

	angular
		.module('constant')
		.controller('EditConstantOptionController', EditConstantOptionController)

		EditConstantOptionController.$inject = ['constantOption', 'constant', '$mdDialog', 'ConstantService'];

		function EditConstantOptionController(constantOption, constant, $mdDialog, ConstantService){

			var vm = this;
			vm.constantOption = angular.copy(constantOption);
			vm.constantOption.constant = angular.copy(constant);
			vm.validFlags = [
				{name: '有效',validFlagStatus: 1},
				{name: '無效',validFlagStatus: 0}
			];

			vm.closeDialog = closeDialog;
			vm.save = save;



			function closeDialog() {
				$mdDialog.cancel();
			}

			function save() {
				if(vm.constantOption.optionId){
					updateConstantOption();
				}else{
					createConstantOption();
				}
			}

			function updateConstantOption() {
				ConstantService
					.updateConstantOption(vm.constantOption)
					.then(function(res) {
						$mdDialog.hide(res);
					});
			}

			function createConstantOption() {
				ConstantService
					.createConstantOption(vm.constantOption)
					.then(function(res) {
						$mdDialog.hide(res);
					});
			}
		}
})();