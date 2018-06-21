app.controller("RoomListController", function ($scope, $http, Item_Service, Room_Service) {
    angular.element(document).ready(function () {
        $scope.CallHome();
        $scope.getCategories();
    });
    $scope.Data = [];
    $scope.FormData = [];
    $scope.Categories = [];
    $scope.myData = [];
    $scope.loading = true;
    $scope.showModal = false;
    //{
    //	name: 'Action',
    //		cellTemplate: '<div><button class="btn-primary" ng-click="grid.appScope.ShowData(row.entity.Name)">Edit</button></div>',
    //}

    $scope.gridOptions = {
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        enableSorting: true,
        columnDefs: [
            { name: 'id', field: 'id', width: '150' },
            { name: 'Name', field: 'Name', width: '170' },
            { name: 'NoOfTables', field: 'NoOfTables' },
           
            {
                name: 'Actions',
                cellTemplate:
                    '<div class="grid-action-cell text-center">' +
                    '<button class="btn btn-outline-warning" ng-click="grid.appScope.EditData(row.entity.id)"><i class="fa fa-edit"></i></button>' +
                    '<button class="btn btn-outline-danger" ng-click="grid.appScope.Delete(row.entity.id)" style="margin-left:10px; margin-bottom: 4px;"><i class="fa fa-trash"></i></button></div>',
                width: '100'
            }
        ],
        data: []
    };

    $scope.CallHome = function () {
        debugger
        var aa = Room_Service.getItemLists().then((response) => {
            $scope.gridOptions.data = response['data'];
            $scope.loading = false;
        });
    };

    $scope.ShowData = function (val) {
        $scope.EditData(val);
    };

    $scope.Delete = function (id) {
        Room_Service.deleteCategory(id).then((response) => {
            swal("Success", "Data Deleted", "success", {
                button: "Aww yiss!",
            });
            $scope.CallHome();
        });
    };

    $scope.OpenModal = function () {
        $("#myModal").modal("show");
        $scope.showModal = true;
    };

    $scope.getCategories = function () {
        Room_Service.getItemLists().then((response) => {
            $scope.Categories = response.data;
        });
    };
    $scope.SaveData = function () {
        var managementModel = {
            id: $scope.FormData.id,
            Name: $scope.FormData.Name,
            NoOfTables: $scope.FormData.NoOfTables,
         
        };

        Room_Service.saveCategory(managementModel).then((response) => {
            swal("Success", "Data Saved", "success", {
                button: "Aww yiss!",
            });
            $scope.CallHome();
            $scope.getCategories();
            $scope.FormData = [];
        });
    };
    $scope.EditData = function (id) {
        Room_Service.editCategory(id).then((response) => {
            response.data.CategoryId = "" + response.data.CategoryId;
            $scope.FormData = response.data;
            $("#myModal").modal("show");
        });
    };
    $scope.ClearData = function () {
        $scope.FormData = [];
    };

});