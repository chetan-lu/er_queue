'use strict';
app.controller('triageViewController', function($scope, $http, ModalService) {
	Array.prototype.remove = function(from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	};
	console.log('triageViewController invoked');
	$scope.triage = function(id, action) {
		//$scope.patients.remove(id);
		$http.post('/api/patient', {'_id': id, priority: action}, {}).then(function(response) {});
	};
	$http.get("/api/queue").then(function(response) {
		$scope.patients = response.data;
		console.log(response.data);
	});
	var socket = io();
	socket.on('broadcast', function(data) {
		console.log('Hello');
		$http.get("/api/queue").then(function(response) {
			$scope.patients = response.data;
		});
	});
});