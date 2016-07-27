(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$location', '$mdSidenav', 'fruitpayClient', '$scope'];

  function MainController($location, $mdSidenav, fruitpayClient, $scope) {
    var vm = this;

	  vm.openLeftNav = openLeftNav;
	  vm.closeLeftNav = closeLeftNav;
    vm.setRouterName = setRouterName;

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
	  	  href: fruitpayClient + '/#/shipment/shipmentPreview',
	    },
      {
        buttonName: '出貨記錄',
        href: fruitpayClient + '/#/shipment/shipmentRecord',
      },
      {
        buttonName: '出貨水果排配',
        href: fruitpayClient + '/#/shipment/shipmentPreferences',
      },
      {
        buttonName: '客戶服務',
        href: fruitpayClient + '/#/customerClaim',
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

    setInitialRouterName();

    function setInitialRouterName() {
      var url = $location.url()
      for(var i = 0; i < vm.menuButtons.length; i ++) {
        var menuButton = vm.menuButtons[i];        
        if(menuButton.href.indexOf(url) != -1) {
          vm.routerName = menuButton.buttonName;
          break;
        }
      }
    }

    function setRouterName(name) {
      vm.routerName = name;
    }

	  function openLeftNav() {
	  	$mdSidenav('left').open();
	  }
	  function closeLeftNav() {
	  	$mdSidenav('left').close();
	  }
	  
      $scope.$on('setFunctionButtons', function (event, data) {
        vm.functionButtons = data;
      });
  }
})();