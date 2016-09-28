angular.module('DJournalApp')
.config(["$locationProvider", "$routeProvider", function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/', {
		templateUrl: '/views/home.html',
		controller: 'HomeController'
	})
	.when('/sign-up', {
		templateUrl: '/views/sign-up.html',
		controller: 'HomeController'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);
