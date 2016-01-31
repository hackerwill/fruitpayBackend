(function(){
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });
	
	angular
		.module('app',[
		   			'ngRoute','ngAnimate','ngMaterial','ngMessages','ngAria','md.data.table',
					'order','customer','util','coupon','login'
		])
		.constant("fruitpay", "${GULP_SERVER_DOMAIN}")
		.config(Config)
		.run(run);

	Config.$inject = ['$routeProvider'];

	function Config($routeProvider) {
		$routeProvider.otherwise('/orders');
	}
	
	
	run.$inject = ['$rootScope', '$location', '$timeout'];
	function run( $rootScope, $location, $timeout) {
		/**
		 *  redirect to login page if not logged in and trying to access a restricted page
		 */
		$rootScope.$on('$routeChangeStart', function (event, toRoute) {
			var loggedIn = true;
			if (!loggedIn) {
				$timeout(function () {				
					$location.path("/login");
				});
			}
		});
	}
})();
