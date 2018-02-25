'use strict';
app.controller('queueViewController', function($scope, $http, ModalService) {
	console.log('queueViewController invoked');
	// var patients = new Array();
	// patients.push({
	// 	'name': 'Ramesh 1',
	// 	'age': 23,
	// 	'sex': 'Male',
	// 	priority: 1,
	// 	timestamp: 2
	// });
	// patients.push({
	// 	'name': 'Ramesh 2',
	// 	'age': 23,
	// 	'sex': 'Male',
	// 	priority: 4,
	// 	timestamp: 1
	// });
	// patients.push({
	// 	'name': 'Ramesh 3',
	// 	'age': 23,
	// 	'sex': 'Male',
	// 	priority: 3,
	// 	timestamp: 3
	// });
	// patients.push({
	// 	'name': 'Ramesh 4',
	// 	'age': 23,
	// 	'sex': 'Male',
	// 	priority: 4,
	// 	timestamp: 4
	// });
	// patients.push({
	// 	'name': 'Ramesh 5',
	// 	'age': 23,
	// 	'sex': 'Male',
	// 	priority: 5,
	// 	timestamp: 5
	// });
	// $scope.patients = patients;

	$http.get("/api/queue").then(function(response) {
		$scope.patients = response.data;
	});
	var priority_text = Array('L1: Resuscitation', 'L2: Emergent', 'L3: Urgent', 'L4: Semi-urgent', 'L5: Non-urgent');
	$scope.priority_text = priority_text;
	var socket = io();
	socket.on('broadcast', function(data) {
		$http.get("/api/queue").then(function(response) {
			$scope.patients = response.data;
		});
	});
});