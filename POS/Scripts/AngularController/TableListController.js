app.controller("TableListController", function ($scope, $http, Item_Service, Table_Service, Poss_Service) {
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


    $scope.gridOptions = {
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        enableSorting: true,
        columnDefs: [
            { name: 'id', field: 'id', width: '150' },
            { name: 'TableNo', field: 'TableNo', width: '600' },
            { name: 'NoOfChair', field: 'NoOfChair', width: '200' },
            {
                name: 'Actions',
                cellTemplate:
                    '<div class="grid-action-cell text-center">' +
                    '<button class="btn btn-outline-warning" ng-click="grid.appScope.EditData(row.entity.id)"><i class="fa fa-edit"></i></button>' +
                    '<button class="btn btn-outline-danger" ng-click="grid.appScope.Delete(row.entity.id)" style="margin-left:10px; margin-bottom: 4px;"><i class="fa fa-trash"></i></button></div>',
                width: '140'
            }
        ],
        data: []
    };

    $scope.CallHome = function () {
        var aa = Table_Service.GetItemDetail().then((response) => {
            $scope.gridOptions.data = response['data'];
            $scope.loading = false;
        });
    };

    $scope.ShowData = function (val) {
        debugger
        $scope.EditData(val);
    };

    $scope.Delete = function (id) {
        debugger
        Table_Service.deleteCategory(id).then((response) => {
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
        Poss_Service.getRooms().then((response) => {
            debugger
            $scope.Categories = response.data;
        });
    };
    $scope.SaveData = function () {
        debugger
        var tableManagementModel = {
            id: $scope.FormData.id,
            TableNo: $scope.FormData.TableNo,
            NoOfChair: $scope.FormData.NoOfChair,
            RoomId: $scope.FormData.RoomId
        };
        debugger
        Table_Service.saveCategory(tableManagementModel).then((response) => {
            swal("Success", "Data Saved", "success", {
                button: "Aww yiss!",
            });
            $scope.CallHome();
            $scope.FormData = [];
            $scope.getCategories();
        });
    };
    $scope.EditData = function (id) {
        debugger
        Table_Service.editCategory(id).then((response) => {
            debugger
            response.data.RoomId = "" + response.data.RoomId;
            $scope.FormData = response.data;
            $("#myModal").modal("show");
        });
    };
    $scope.ClearData = function () {
        $scope.FormData = [];
    };

});