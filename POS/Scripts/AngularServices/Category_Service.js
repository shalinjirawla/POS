app.factory("Category_Service", function ($http) {

	var service = {};

	service.getCategories = function () {
		return $http.get("/api/Category/getCategoriesDetail/");
	};

	service.getCategoryById = function (id) {
		return $http.get("/api/Table/GetItemByCategoryId/", { params: {"id":id}});
	};

	service.getItemsByName = function (Name) {
		return $http.get("/api/Item/getItemsByName/", { params: { "Name": Name } });
	};
	service.getTagsById = function (id) {
		return $http.get("/api/Tag/GetTagsById/", { params: { "id": id} });
	};
	return service;
});