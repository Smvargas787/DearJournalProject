DJournalApp = angular.module('DJournalApp')
.config(function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/', {
		templateUrl: '/views/home.html',
		controller: 'HomeController'
	})
	.when('/sign-up', {
		templateUrl: '/views/sign-up.html',
		controller: 'SignUpController'
	})
	.when('/feed', {
		templateUrl: '/views/feed.html',
		controller: 'FeedController'
	})
	.when('/login', {
		templateUrl: '/views/login.html',
		controller: 'LoginController'
	})
	.when('/chat', {
		templateUrl: '/views/chat.html',
		controller: 'ChatController'
	})
	.when('/live-view', {
		templateUrl: '/views/live-view.html',
		controller: 'LiveViewController'
	})
	.otherwise({
		redirectTo: '/'
	});
});
