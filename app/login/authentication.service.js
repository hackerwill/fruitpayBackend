(function(){
'use strict';
 
angular.module('login')
	.service('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = 
	[ '$q', '$http', '$rootScope', 'LoginService'];
function AuthenticationService($q, $http, $rootScope, LoginService) {
	
	this.login = function (manager) {
		
		var uId = getUniqueId(manager);
		$http.defaults.headers.common.uId = uId;
		/* Use this for real authentication
		 ----------------------------------------------*/
		return LoginService.login(manager)
			.then(function(result) {
				if(result){
					sessionStorage.uId = uId;
					setCredentials(result);
				}
				return result;
			});
	}
	
	this.validateAccount = function(){
		return $q(function(resolve, reject){
			if(sessionStorage.uId && sessionStorage.authorization){
				$http.defaults.headers.common.uId = sessionStorage.uId;
				$http.defaults.headers.common.authorization = sessionStorage.authorization;
			}else{
				resolve(false);
				return ;
			}
			
			var encodeManager = sessionStorage.encodeManager;
			if(!encodeManager){
				resolve(false);
				return ;
			}
				
			
			encodeManager = Base64.decode(encodeManager);
			var data = encodeManager.split("==");
			if(!data[0] || !data[1]){
				resolve(false);
				return ;
			}
			
			var manager = {
				managerId : data[0],
				password : data[1]
			};
			
			return LoginService.validate(manager)
				.then(function(result) {
					if(result)
						resolve(true);
					else
						resolve(false);
				});
		});
	}
	
	this.clearCredentials = function(){
		if(sessionStorage.uId && sessionStorage.authorization){
			$http.defaults.headers.common.uId = sessionStorage.uId;
			$http.defaults.headers.common.authorization = sessionStorage.authorization;
		}else{
			resolve(false);
		}
		
		return LoginService.logout()
			.then(function(result){
				delete sessionStorage.encodeManager;
				delete sessionStorage.authorization;
				delete sessionStorage.uId;
			});
	}
	
	function setCredentials(result){
		var str = result.managerId + "==" + result.password;
		var encodeManager = Base64.encode(str);
		sessionStorage.encodeManager = encodeManager;
		sessionStorage.authorization = result.token;
	}
	
	function getUniqueId(manager){
		var key = manager.managerId + ':' + manager.password;
		var uId = Base64.encode(key + ':' + new Date().getTime());
		return uId;
	}
	
}

// Base64 encoding service used by AuthenticationService
var Base64 = {

	keyStr : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

	encode : function(input) {
		var output = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;

		do {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output + this.keyStr.charAt(enc1)
					+ this.keyStr.charAt(enc2) + this.keyStr.charAt(enc3)
					+ this.keyStr.charAt(enc4);
			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";
		} while (i < input.length);

		return output;
	},

	decode : function(input) {
		var output = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;

		// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
		var base64test = /[^A-Za-z0-9\+\/\=]/g;
		if (base64test.exec(input)) {
			window
					.alert("There were invalid base64 characters in the input text.\n"
							+ "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n"
							+ "Expect errors in decoding.");
		}
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		do {
			enc1 = this.keyStr.indexOf(input.charAt(i++));
			enc2 = this.keyStr.indexOf(input.charAt(i++));
			enc3 = this.keyStr.indexOf(input.charAt(i++));
			enc4 = this.keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";

		} while (i < input.length);

		return output;
	}
};

})();
