app.factory("Poss_Service", function ($http) {

	var service = {};

	service.getRooms = function () {
		return $http.get("/api/Room/GetRooms");
	}
	
	return service;
});