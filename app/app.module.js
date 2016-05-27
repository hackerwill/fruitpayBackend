(function(){
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });
	
	angular
		.module('app',[
		   			'ngRoute','ngAnimate','ngMaterial','ngMessages','ngAria','md.data.table',
					'order','customer','util','coupon','login', 'shipment', 'angularjs-datetime-picker', 
					'constant'
		])
		.constant("fruitpay", "${GULP_SERVER_DOMAIN}")
		.directive('moDateInput', function ($window) {
		    return {
		        require:'^ngModel',
		        restrict:'A',
		        link:function (scope, elm, attrs, ctrl) {
		            var moment = $window.moment;
		            var dateFormat = attrs.moDateInput;
		            attrs.$observe('moDateInput', function (newValue) {
		                if (dateFormat == newValue || !ctrl.$modelValue) return;
		                dateFormat = newValue;
		                ctrl.$modelValue = new Date(ctrl.$setViewValue);
		            });

		            ctrl.$formatters.unshift(function (modelValue) {
		                if (!dateFormat || !modelValue) return "";
		                var retVal = moment(modelValue).format(dateFormat);
		                return retVal;
		            });

		            ctrl.$parsers.unshift(function (viewValue) {
		                var date = moment(viewValue, dateFormat);
		                return (date && date.isValid() && date.year() > 1950 ) ? date.toDate() : "";
		            });
		        }
		    };
		})
		.config(Config)
		.run(run);

	Config.$inject = ['$routeProvider', '$httpProvider'];

	function Config($routeProvider, $httpProvider) {
		$routeProvider.otherwise('/orders');
		
		//轉換日期格式從字串轉為日期
		$httpProvider.defaults.transformResponse.push(function(responseData){
			convertDateStringsToDates(responseData);
			return responseData;
		});

		$httpProvider.interceptors.push('LoadingInterceptor');
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
			if(current && current.originalPath.indexOf("/logout") == -1)
				$rootScope.previousState = current;
			$rootScope.currentState = next;
		});
	}
	
	var regexIso8601 = re = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

	function convertDateStringsToDates(input) {
		// Ignore things that aren't objects.
		if (typeof input !== "object") return input;

		for (var key in input) {
			if (!input.hasOwnProperty(key)) continue;

			var value = input[key];
			var match;
			// Check for string properties which look like dates.
			// TODO: Improve this regex to better match ISO 8601 date strings.
			if (typeof value === "string" && checkDateNameConstrants(key) && (match = value.match(regexIso8601))) {
				// Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.
				var milliseconds = Date.parse(match[0]);
				if (!isNaN(milliseconds) ) {
					input[key] = new Date(milliseconds);
				}
			} else if(checkDateNameConstrants(key)
				&& !isNaN(value)){
				input[key] = new Date(value);
			}else if (typeof value === "object") {
				// Recurse into object
				convertDateStringsToDates(value);
			}
		}
	}
	
	function checkDateNameConstrants(key){
		//限制key結尾包含 date 或 time 或 day 則檢查型態才能轉成日期
		return key.toLowerCase().endsWith('day') || key.toLowerCase().endsWith('date') || key.toLowerCase().endsWith('time');
	}
	
})();
