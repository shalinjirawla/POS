app.controller("RoomController",  function ($scope, $http, Poss_Service) {
	
	angular.element(document).ready(function () {
		$scope.CallHome();
	});
	$scope.DSDasd = [];
	$scope.CallHome = function () {
		
		var aa = Poss_Service.getRooms().then((response) => {
			$scope.DSDasd = response.data;
		});
	};
	$scope.CallME = function (event,name) {
		window.location.pathname = 'Home/Tables/' + event;
		localStorage.setItem("RoomType", name);
	}
});