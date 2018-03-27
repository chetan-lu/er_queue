'use strict';
app.controller('queueViewController', function($scope, $http, ModalService) {
	console.log('queueViewController invoked');
	$http.get("http://dev.erqueue.xyz/api/queue").then(function(response) {
		$scope.patients = response.data;
	});
	var priority_text = Array('L1: Resuscitation', 'L2: Emergent', 'L3: Urgent', 'L4: Semi-urgent', 'L5: Non-urgent');
	$scope.priority_text = priority_text;
	var socket = io("http://dev.erqueue.xyz");
	socket.on('broadcast', function(data) {
		$http.get("http://dev.erqueue.xyz/api/queue").then(function(response) {
			$scope.patients = response.data;
		});
	});
	$scope.elapsed = function(timestamp) {
		return (Math.floor((Math.floor(Date.now()) - timestamp) / 1000) / 60).toFixed(2);
	};
	$scope.formatTimestamp = function(timestamp) {
		var newDate = new Date();
		newDate.setTime(timestamp);
		return newDate.toLocaleTimeString() + " " + newDate.toLocaleDateString();
	}
	$scope.sent_patient = function(id) {
		$http.post('http://dev.erqueue.xyz/api/patient', {'_id': id, payload: JSON.stringify({'priority': -2})}, {}).then(function(response) {});
	};
});