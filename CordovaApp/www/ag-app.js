'use strict';
var app = angular.module('myApp', ['ngRoute', 'angularModalService']);

app.config(function($routeProvider) {
	$routeProvider.when("/", {
		redirectTo: '/queue'
	});
	$routeProvider.when("/queue", {
		templateUrl: "views/queueView.html",
		controller: "queueViewController"
	});
	$routeProvider.when("/update/:param1", {
		templateUrl: "views/updateView.html",
		controller: "updateViewController"
	});
	$routeProvider.when("/triage", {
		templateUrl: "views/triageView.html",
		controller: "triageViewController"
	})
	$routeProvider.otherwise({
		redirectTo: '/queue'
	});
});