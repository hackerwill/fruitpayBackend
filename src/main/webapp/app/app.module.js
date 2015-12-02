(function(){
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });
	
	angular
		.module('app',[
			'ngRoute','ngAnimate','order','customer'
		])
		.config(Config);

	Config.$inject = ['$routeProvider'];

	function Config($routeProvider,$mdThemingProvider) {
		$routeProvider.otherwise('/orders');
	}
})();
