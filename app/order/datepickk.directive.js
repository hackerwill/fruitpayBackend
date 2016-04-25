(function(){
	'use strict';
	angular
		.module('order')
		.directive('fdatepickk', FruitpayDatepickk);
		
	var shipmentPulse = "shipmentPulse";
	var shipmentCancel = "shipmentPulse";
	var shipmentDeliver = "shipmentDeliver";
	var shipmentDelivered = "shipmentDelivered";
	
	var configMap = {
		shipmentPulse : {
			circleClassName : "pulseDate",
			color : "#000"
		}, shipmentCancel : {
			circleClassName : "cancelDate",
			color : "#000"
		}, shipmentDeliver : {
			circleClassName : "deliverDate",
			color : "#000"
		}, shipmentOnGoing : {
			shipmentDelivered : "deliveredDate",
			color : "#000"
		}
	};
		
	function FruitpayDatepickk(){
		return {
			restrict: 'EA',
			scope: { highlight: '=' },
			template: '<div style="height:100%;width:100%;max-width: 600px;"></div>',
			replace: true,
			link: function($scope, $element, $attrs) {
				
				var testPeriods = [  
				   {  
					  "applyDate":"2016-04-25 00:00:00",
					  "shipmentChangeType":{  
						 "optionId":34,
						 "optionName":"shipmentPulse",
						 "optionDesc":"暫停",
						 "validFlag":"1",
						 "orderNo":0
					  }
				   },
				   {  
					  "applyDate":"2016-05-02 00:00:00",
					  "shipmentChangeType":{  
						 "optionId":36,
						 "optionName":"shipmentDeliver",
						 "optionDesc":"需配送",
						 "validFlag":"1",
						 "orderNo":0
					  }
				   },
				   {  
					  "applyDate":"2016-05-09 00:00:00",
					  "shipmentChangeType":{  
						 "optionId":35,
						 "optionName":"shipmentCancel",
						 "optionDesc":"取消",
						 "validFlag":"1",
						 "orderNo":0
					  }
				   }];

				var now = new Date();
				var demoPicker = new Datepickk({
					container: $element[0],
					inline:true,
					range: false,
					lang : "zh_TW",
					tooltips: {
						date: new Date(),
						text: 'Tooltip'
					},
					highlight: parseToHeightFormat(testPeriods),
					disabledDates : [new Date(now.getFullYear(),now.getMonth(),1)]
				});		

				function parseToHeightFormat(shipmentPeriods){
					
					var heightMap = {};
					
					for(var i = 0; i < shipmentPeriods.length; i++){
						var shipmentPeriod = shipmentPeriods[i];
						var key = shipmentPeriod.shipmentChangeType.optionName;
						var date = moment(shipmentPeriod.applyDate, "YYYY-MM-DD hh:mm:ss").toDate();
						var dateObject = {
							start : date,
							end : date
						};
						
						if(!(key in heightMap)){
							heightMap[key] = {};
							heightMap[key].legend = shipmentPeriod.shipmentChangeType.optionDesc;
							heightMap[key].dates = [];
						}
						heightMap[key].dates.push(dateObject);
					};
					
					for(var key in configMap){
						if(configMap.hasOwnProperty(key) && key in heightMap){
							for(var keyName in configMap[key]){
								if(configMap[key].hasOwnProperty(keyName)){
									heightMap[key][keyName] = configMap[key][keyName]
								}
							}
						}
					}
					
					console.log(heightMap);
					
					var highlight = [];
					for (var key in heightMap) {
						if (heightMap.hasOwnProperty(key)) {
							highlight.push(heightMap[key]);
						}
					}
					console.log(highlight);
					return highlight;

				}	
					
				//Type: Function
				demoPicker.onSelect = function(checked){
					var state = (checked)?'selected':'unselected';
					alert(this.toLocaleDateString() + ' ' + state);
				};
			}
		};
	};
	
})();








