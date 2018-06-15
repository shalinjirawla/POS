app.factory("Order_Service", function ($http) {

    var service = {};

    service.getItemLists = function () {
        return $http.get("/api/Order/getOrderDetail/");
    };
    service.deleteCategory = function (id) {
        return $http.delete("/api/Order/deleteOrder/", { params: { "id": id } });
    };
    return service;
});