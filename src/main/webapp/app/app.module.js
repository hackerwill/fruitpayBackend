(function(){
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });
	
	angular
		.module('app',[
		   			'ngRoute','ngAnimate','ngMaterial','ngMessages','ngAria','md.data.table',
					'order','customer','util','mdTable'
		])
		.constant("fruitpay", "http://localhost:8081/fruitpay/")
		.config(Config);

	Config.$inject = ['$routeProvider'];

	function Config($routeProvider,$mdThemingProvider) {
		$routeProvider.otherwise('/orders');
	}
})();
