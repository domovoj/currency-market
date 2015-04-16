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

			var newArrCities = [];
			for (var i = 0; i < $scope.cities.length; i++) {
				var flag = true;
				for (var j = i+1; j < $scope.cities.length; j++) {
					if($scope.cities[i].city === $scope.cities[j].city) {
						flag = false;
					}
				}
				if(flag) {
					newArrCities.push($scope.cities[i]);
				}
			}
			$scope.cities = newArrCities;

			//------------------------------------- This code must be one function for each array ----------------//

			$scope.currency = [];
			$.each(data, function(k, v) {
				$scope.currency[k] = {'currency': v.currency};
			});

			var newArrCurrency = [];
			for (var i = 0; i < $scope.currency.length; i++) {
				var flag = true;
				for (var j = i+1; j < $scope.currency.length; j++) {
					if($scope.currency[i].currency === $scope.currency[j].currency) {
						flag = false;
					}
				}
				if(flag) {
					newArrCurrency.push($scope.currency[i]);
				}
			}
			$scope.currency = newArrCurrency;

			//--------------------------------------- end -------------------------------------------------------//

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