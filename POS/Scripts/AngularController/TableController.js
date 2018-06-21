app.controller("TableController", function ($scope, $http, Table_Service) {
    debugger
	angular.element(document).ready(function () {

		if (GlobId != 0) {
			$scope.CallHome(GlobId);
		};
	});
	$scope.AllTables = [];
	$scope.CallHome = function (id) {
		Table_Service.getTables(id).then((response) => {
			$scope.AllTables = response.data;

		});
	};
    $scope.loadTable = function (id) {
        debugger
		var tabid = id.data.id;
		var orderid = id.data.orderid;
		window.location.href = '/Home/Category?id=' + tabid + '&orderid=' + orderid;

	};
});