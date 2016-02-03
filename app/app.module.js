(function(){
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });
	
	angular
		.module('app',[
		   			'ngRoute','ngAnimate','ngMaterial','ngMessages','ngAria','md.data.table',
					'order','customer','util','mdTable','login'
		])
		.constant("fruitpay", "${GULP_SERVER_DOMAIN}")
		.config(Config)
		.run(run);

	Config.$inject = ['$routeProvider'];

	function Config($routeProvider) {
		$routeProvider.otherwise('/orders');
	}
	
	
	run.$inject = ['$rootScope', '$location', '$timeout', 'AuthenticationService'];
	function run( $rootScope, $location, $timeout, AuthenticationService) {
		/**
		 *  redirect to login page if not logged in and trying to access a restricted page
		 */
		$rootScope.$on('$routeChangeStart', function (event, next, current) {
			
			AuthenticationService.validateAccount()
				.then(function(result){
					var loggedIn = result;
					if (!loggedIn) {
						$timeout(function () {				
							$location.path("/login");
						});
					}
				});
		});
		
		$rootScope.$on('$routeChangeSuccess', function(event, next, current) {
			delete $rootScope.previousState;
			delete $rootScope.currentState;
			if(current && current.originalPath.indexOf("/logout") != -1)
				$rootScope.previousState = current;
			$rootScope.currentState = next;
		});
	}
})();
