'use strict';
app.controller('registerViewController', function($scope, $http, ModalService) {
	$scope.SendData = function() {
		var data = $scope.patient
		console.log(data);
		var config = {}
		$http.post('/api/register', data, config).then(function(response) {
			console.log(response.data.message);
			ModalService.showModal({
				templateUrl: "modal.html",
				controller: function($scope) {
					$scope.eta = response.data.message;
				}
			}).then(function(modal) {

				modal.element.modal();
				modal.close.then(function(result) {});
				$scope.patient = {};
			});

		});
	};
});