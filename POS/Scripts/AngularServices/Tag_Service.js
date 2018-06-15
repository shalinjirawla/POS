app.factory("Tag_Service", function ($http) {

    var service = {};

    service.GettagsWithoutId = function () {
        return $http.get("/api/tag/getTagsWithoutId")
    }
    service.getItemLists = function (id) {
        return $http.get("/api/tag/GetTagsById/");
    };
    service.saveCategory = function (tagModel) {
        return $http.post("/api/tag/insertTag/", tagModel);
    };
    service.editCategory = function (id) {
        return $http.get("/api/tag/getItemById/", { params: { "id": id } });
    };
    service.DeleteTag = function (id) {
        return $http.delete("/api/tag/deleteItem/", { params: { "id": id } });
    };
    return service;
});