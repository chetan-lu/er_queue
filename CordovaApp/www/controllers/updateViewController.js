'use strict';
app.controller('updateViewController', function($scope, $http, $routeParams) {
	$scope.patient_id = $routeParams.param1;
	$http.get("http://dev.erqueue.xyz/api/patient?id=" + $scope.patient_id).then(function(response) {
		$scope.patient = response.data[0];
	});
	$scope.update = function() {
		//$scope.patients.remove(id);
		$http.post('http://dev.erqueue.xyz/api/patient', {
			'_id': $routeParams.param1,
			'payload': JSON.stringify($scope.patient)
		}, {}).then(function(response) {

		});
		window.history.back();
	};
	$scope.delete = function() {
		//$scope.patients.remove(id);
		$http.post('http://dev.erqueue.xyz/api/delete_patient', {
			'_id': $scope.patient_id,
		}, {}).then(function(response) {

		});
		window.history.back();
	};
});