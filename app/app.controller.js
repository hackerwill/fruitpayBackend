(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$mdSidenav', 'fruitpayClient'];

  function MainController($mdSidenav, fruitpayClient) {
    var vm = this;
	  vm.openLeftNav = openLeftNav;
	  vm.closeLeftNav = closeLeftNav;
	  vm.menuButtons = [
	    {
	  	  buttonName: '訂單',
	  	  href: fruitpayClient + '/#/orders',
	    },
	    {
	  	  buttonName: '出貨異動',
	  	  href: fruitpayClient + '/#/shipment/change',
	    },
	    {
	  	  buttonName: '出貨預覽',
	  	  href: fruitpayClient + '/#/shipmentPreview',
	    },
	    {
	  	  buttonName: '會員',
	  	  href: fruitpayClient + '/#/customers',
	    },
	    {
	  	  buttonName: '優惠券',
	  	  href: fruitpayClient + '/#/coupons',
	    },
	    {
	  	  buttonName: '參數維護',
	  	  href: fruitpayClient + '/#/constants',
	    },
	    {
	  	  buttonName: '登出',
	  	  href: fruitpayClient + '/#/logout',
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