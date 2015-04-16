(function(){

	angular.module('currencyFilter', []).filter('arrowFilter', function() {
		return function(input) {
			return input ? '\u2193' : '\u2191';
		};
	});

})();

