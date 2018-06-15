app.factory("Category_Service", function ($http) {

    var service = {};

    service.getItemLists = function () {
        return $http.get("/api/Category/getCategoriesDetail/");
    };
    service.getCategoryById = function (id) {
        return $http.get("/api/Table/GetItemByCategoryId/", { params: { "id": id } });
    };

    service.getItemsByName = function (Name) {
        return $http.get("/api/Item/getItemsByName/", { params: { "Name": Name } });
    };
    service.getTagsById = function (id) {
        return $http.get("/api/Tag/GetTagsById/", { params: { "id": id } });
    };
    service.saveCategory = function (category) {
        return $http.post("/api/Category/insertCategory/", category);
    };
    service.editCategory = function (id) {
        return $http.get("/api/Category/getCategoryById/", { params: { "id": id } });
    };
    service.deleteCategory = function (id) {
        return $http.delete("/api/Category/deleteCategory/", { params: { "id": id } });
    };
    return service;
});