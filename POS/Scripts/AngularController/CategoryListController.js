app.controller("CategoryListController", function ($scope, $http, Category_Service, Item_Service) {
    angular.element(document).ready(function () {
        
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
            { name: 'Id', field: 'Id', width: '150' },
            { name: 'Name', field: 'Name', width: '800' },
         
            {
                name: 'Actions',
                cellTemplate:
                    '<div class="grid-action-cell text-center">' +
                    '<button class="btn btn-outline-warning" ng-click="grid.appScope.EditData(row.entity.Id)"><i class="fa fa-edit"></i></button>' +
                    '<button class="btn btn-outline-danger" ng-click="grid.appScope.Delete(row.entity.Id)" style="margin-left:25px; margin-bottom: 4px;"><i class="fa fa-trash"></i></button></div>',
                width: '150'
            }
        ],
        data: []
    };

    //$scope.getCategoryList = function () {
    //    var aa = Item_Service.getItemLists().then((response) => {
    //        $scope.gridOptions.data = response['data'];
    //        $scope.loading = false;
    //    });
    //};

    $scope.ShowData = function (val) {
        $scope.EditData(val);
    };

    $scope.Delete = function (id) {
        debugger
        Category_Service.deleteCategory(id).then((response) => {
            swal("Success", "Data Saved", "success", {
                button: "Aww yiss!",
            });
            $scope.getCategories();
        });
    };

    $scope.OpenModal = function () {
        $("#myModal").modal("show");
        $scope.showModal = true;
    };

    $scope.getCategories = function () {
        Category_Service.getItemLists().then((response) => {
            $scope.Categories = response.data;
            $scope.gridOptions.data = response['data'];
            $scope.loading = false;
        });
    };
    $scope.SaveData = function () {
        var category = {
            Id: $scope.FormData.Id,
            Name: $scope.FormData.Name
        };

        Category_Service.saveCategory(category).then((response) => {
            swal("Success", "Data Saved", "success", {
                button: "Aww yiss!",
            });

            $scope.getCategories();
            $scope.FormData = [];
        });
    };
    $scope.EditData = function (id) {
        debugger
        Category_Service.editCategory(id).then((response) => {
            response.data.CategoryId = "" + response.data.CategoryId;
            $scope.FormData = response.data;
            $("#myModal").modal("show");
        });
    };
    $scope.ClearData = function () {
        $scope.FormData = [];
    };

});