app.factory("Item_Service", function ($http) {

	var service = {};

	service.getItemLists = function () {
		return $http.get("/api/Item/getItemDetail/");
	};
	service.saveCategory = function (itemModel) {
		return $http.post("/api/Item/insertItem/", itemModel);
	};
	service.editCategory = function (id) {
		return $http.get("/api/Item/getItemById/", { params: {"id":id}});
	};
	service.deleteCategory = function (id) {
		return $http.delete("/api/Item/deleteItem/", { params: { "id": id } });
	};
	return service;
});