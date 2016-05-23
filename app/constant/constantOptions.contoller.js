(function(){
	'use strict';
	angular
	.module('constant')
	.controller('ConstantOptionsController', ConstantOptionsController);

	ConstantOptionsController.$inject = ['ConstantService'];

	function ConstantOptionsController(ConstantService) {

		var vm = this;
	}

})();