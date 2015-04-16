(function(){
	'use strict';

	/* App Module */

	var auctionApp = angular.module('auctionApp', [
		'currencyFilter'
	]);

	auctionApp.controller('currencyController', ['$scope','$http', currencyController]);

	function currencyController($scope,$http) {
		$http.get('server/currencies.json').success(function(data) {
			$scope.currencies = data;
			$scope.regionOrder = '';
			$scope.currencyOrder = '';
			$scope.typeOrder = '';
			$scope.ordering = 'age';

			$scope.cities = [];
			$.each(data, function(k, v) {
				$scope.cities[k] = {'city': v.city};
			});
			$scope.cities = getUniObj($scope.cities,'city');

			$scope.currency = [];
			$.each(data, function(k, v) {
				$scope.currency[k] = {'currency': v.currency};
			});
			$scope.currency = getUniObj($scope.currency,'currency');

			function getUniObj(arr, param) {
				var result = [];
				for (var i = 0; i < arr.length; i++) {
					var flag = true;
					for (var j = i+1; j < arr.length; j++) {
						if(arr[i][param] === arr[j][param]) {
							flag = false;
						}
					}
					if(flag) {
						result.push(arr[i]);
					}
				}
				return result;
			}

			var inv = true;
			var orderValue ='';

			$scope.setOrder = function(field) {
				if (field != orderValue) {
					orderValue = field;
					inv = true;
				}
				if (inv == true) {
					$scope.ordering = field;
					$scope.arrow = inv;
					inv = false;
				} else {
					$scope.ordering = '-' +field;
					$scope.arrow = inv;
					inv = true;
				}
			};
		});
	}

})();