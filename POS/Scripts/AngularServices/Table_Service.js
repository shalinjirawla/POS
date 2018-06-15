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
    service.GetItemDetail = function () {
        return $http.get("/api/Table/GetItemDetail/");
    };
    service.saveCategory = function (tableManagementModel) {
        return $http.post("/api/Table/insertTable/", tableManagementModel);
    };
    service.editCategory = function (id) {
        return $http.get("/api/Table/GetTableById/", { params: { "id": id } });
    };
    service.deleteCategory = function (id) {
        return $http.delete("/api/Table/deleteTable/", { params: { "id": id } });
    };
	return service;
});