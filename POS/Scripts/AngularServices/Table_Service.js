app.factory("Table_Service", function ($http) {

	var service = {};

	service.getTables = function (id) {
		return $http.get("/api/Table/GetTableByRoomID/", { params: {"id":id}});
	};
	service.loadTable = function (id) {
		return $http.get("/api/Table/GetTableById/", { params: { "id": id } });
	};
	service.loadTablewithOrderId = function (data) {
		return $http.get("/api/Table/GetTableById/", { params: { "id": data.id, "orderid": data.orderid } });
	};
	return service;
});