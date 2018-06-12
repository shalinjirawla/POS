app.controller("TableController", function ($scope, $http, Table_Service) {

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

		//if (orderid != 0) {
		//	var data = {
		//		"id": tabid,
		//		"orderid": orderid
		//	};
		//	Table_Service.loadTablewithOrderId(id).then((response) => {
		//		debugger
		//	});
		//}
		//else {
		//	Table_Service.loadTable(tabid).then((response) => {
		//		debugger
		//	});
		//}
	};

	//$scope.goToCat = function (id) {
	//	window.location.pathname = 'Home/Category/?id=' + id + '&orderid=' + orderid;
	//}
});