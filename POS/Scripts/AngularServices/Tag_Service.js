app.factory("Tag_Service", function ($http) {

    var service = {};

    service.GettagsWithoutId = function () {
        debugger
        return $http.get("/api/tag/getTagsWithoutId")
    }
    service.getTagLists = function (id) {
		return $http.get("/api/tag/GetTagsById/", { params: { "id": id } });
    };
    service.saveTag = function (tagModel) {
        return $http.post("/api/tag/insertTag/", tagModel);
    };
    service.editTag = function (id) {
        return $http.get("/api/tag/getItemById/", { params: { "id": id } });
    };
    service.DeleteTag = function (id) {
        return $http.delete("/api/tag/deleteItem/", { params: { "id": id } });
    };
    return service;
});