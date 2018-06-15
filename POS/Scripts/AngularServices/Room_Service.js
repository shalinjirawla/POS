app.factory("Room_Service", function ($http) {

    var service = {};

    service.getItemLists = function () {
        return $http.get("/api/Room/GetRooms/");
    };
    service.saveCategory = function (managementModel) {
        return $http.post("/api/Room/InsertRoom/", managementModel);
    };
    service.editCategory = function (id) {
        return $http.get("/api/Room/getRoomById/", { params: { "id": id } });
    };
    service.deleteCategory = function (id) {
        return $http.delete("/api/Room/deleteRoom/", { params: { "id": id } });
    };
    return service;
});