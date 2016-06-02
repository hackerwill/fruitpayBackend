(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$mdSidenav'];

  function MainController($mdSidenav) {
    var vm = this;
	  vm.openLeftNav = openLeftNav;
	  vm.closeLeftNav = closeLeftNav;
	  vm.menuButtons = [
	    {
	  	  buttonName: '訂單',
	  	  href: '/#/orders',
	    },
	    {
	  	  buttonName: '出貨異動',
	  	  href: '/#/shipment/change',
	    },
	    {
	  	  buttonName: '出貨預覽',
	  	  href: '/#/shipment/shipmentPreview',
	    },
	    {
	  	  buttonName: '會員',
	  	  href: '/#/customers',
	    },
	    {
	  	  buttonName: '優惠券',
	  	  href: '/#/coupons',
	    },
	    {
	  	  buttonName: '參數維護',
	  	  href: '/#/constants',
	    },
	    {
	  	  buttonName: '登出',
	  	  href: '/#/logout',
	    },
	  ];





	  function openLeftNav() {
	  	$mdSidenav('left').open();
	  }
	  function closeLeftNav() {
	  	$mdSidenav('left').close();
	  }
  }
})();