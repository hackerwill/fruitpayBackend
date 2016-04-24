(function(){
	'use strict';
	angular
		.module('order')
		.directive('fdatepicker', FruitpayDatepickk)
		
	function FruitpayDatepickk(){
		return {
			restrict: 'EA',
			template: '<div style="height:100%;width:100%;max-width: 600px;"></div>',
			replace: true,
			link: function(scope, elem, attrs) {
				var now = new Date();
				var demoPicker = new Datepickk({
					container: elem[0],
					inline:true,
					range: false,
					lang : "zh_TW",
					tooltips: {
						date: new Date(),
						text: 'Tooltip'
					},
					highlight:[
					{
						dates: [
							{
							start: new Date(now.getFullYear(),now.getMonth(),7),
							end: new Date(now.getFullYear(),now.getMonth(),7)
							},
							{
							start: new Date(now.getFullYear(),now.getMonth(),14),
							end: new Date(now.getFullYear(),now.getMonth(),14)
							}
						],
						legend: 'Highlight',
						circleClassName : "redDate",
						color : "#BBB"
					},
					{
						start: new Date(now.getFullYear(),now.getMonth(),1),
						end: new Date(now.getFullYear(),now.getMonth(),3),
						legend: 'Highlight2',
						circleClassName : "greenDate"
					}],
					disabledDates : [new Date(now.getFullYear(),now.getMonth(),1)]
				});
			}
		};
	};
	
})();








