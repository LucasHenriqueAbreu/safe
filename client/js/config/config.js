/**
 * @autor -  Lucas Henrique de Abreu - <lucasigual14@gmail.com>
 * Modulo : Módulo de configurações.
 * data: 18/01/2017
 */
(function(angular) {
	'use strict';
	angular.module('app.routes', ['ngRoute', 'ngMaterial'])

	.config(function ($mdDateLocaleProvider, $mdThemingProvider, $mdAriaProvider) {
		$mdDateLocaleProvider.formatDate = function (date) {
			return date ? moment(date).format('DD/MM/YYYY') : '';
		};

		$mdDateLocaleProvider.parseDate = function (dateString) {
			var m = moment(dateString, 'DD/MM/YYYY', true);
			return m.isValid() ? m.toDate() : new Date(NaN);
		};
		$mdThemingProvider.theme('default').primaryPalette('red');
		$mdAriaProvider.disableWarnings();
	})
	.config(['$routeProvider', function (routeProvider) {
		routeProvider.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'HomeController',
			controllerAs: 'ctrl'
		}).otherwise({
			redirectTo: '/crud'
		});
	}])
	.run(function ($rootScope, $location) {
		var history = [];

		$rootScope.$on('$routeChangeSuccess', function () {
			history.push($location.$$path);
		});

		$rootScope.back = function () {
			var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
			$location.path(prevUrl);
		};
	});
})(window.angular);