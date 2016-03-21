(function(){
    'use strict';

    angular
        .module('util')
        .service('LogService', LogService);
    LogService.$inject = ['$mdDialog','$timeout'] ;
    function LogService($mdDialog, $timeout){
		
		function dialogHide(){
			$mdDialog.hide();
		}
		
		this.showError = function(response){
			var message = response.data.message;
			if(!message)
				return;
			
			$mdDialog.show({
				template:
					'<md-dialog>' +
					'	<md-content class="md-dialog-content">' + 
					' 		<h2>警告</h2>' + 
					' 		<div>' + message + '</div>' + 
					'  	</md-content>' +
					'	<md-dialog-actions>' +
					'   	<md-button ng-click="closeDialog()">' +
					'      		確定' +
					'    	</md-button>' +
					'  	</md-dialog-actions>' +
					'</md-dialog>',
				onComplete: function(){
					$timeout(dialogHide, 2000);
				},
				controller: function DialogController($scope, $mdDialog) {
				  $scope.closeDialog = function() {
					$mdDialog.hide();
				  };
				}
			});
		}

		this.showSuccess = function(message){
			if(!message)
				return;
			
			$mdDialog.show({
				template:
					'<md-dialog>' +
					'	<md-content class="md-dialog-content">' + 
					' 		<h2>提示</h2>' + 
					' 		<div>' + message + '</div>' + 
					'  	</md-content>' +
					'	<md-dialog-actions>' +
					'   	<md-button ng-click="closeDialog()">' +
					'      		確定' +
					'    	</md-button>' +
					'  	</md-dialog-actions>' +
					'</md-dialog>',
				onComplete: function(){
					$timeout(dialogHide, 2000);
				},
				controller: function DialogController($scope, $mdDialog) {
				  $scope.closeDialog = function() {
					$mdDialog.hide();
				  };
				}
			});
		}
		
    }

})();