'use strict';
app.controller('triageViewController', function($scope, $http, ModalService) {
	Array.prototype.remove = function(from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	};
	console.log('triageViewController invoked');
	$scope.triage = function(id, action) {
		$http.post('http://dev.erqueue.xyz/api/patient', {'_id': id, payload: JSON.stringify({'priority': action})}, {}).then(function(response) {});
	};
	$http.get("http://dev.erqueue.xyz/api/queue").then(function(response) {
		$scope.patients = response.data;
	});
	var socket = io("http://dev.erqueue.xyz");
	socket.on('broadcast', function(data) {
		$http.get("http://dev.erqueue.xyz/api/queue").then(function(response) {
			$scope.patients = response.data;
		});
		navigator.vibrate(3000);
	});
});