app.controller("OrderListController", function ($scope, $http, Order_Service) {
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
			{ name: 'Id', field: 'orderid', width: '10%' },
            {
                name: 'Date', field: 'Date', width: '30%',
                cellTemplate: "<div class='ngCellText'>{{row.entity.Date | date:'dd/MM/yy h:mm:ss a'}}</div>"
            },
            { name: 'IsPaid', field: 'IsPaid',width:'15%' },
            { name: 'TableNo', field: 'TableNo',width:'15%' },
            { name: 'Amount', field: 'Amount',width:'20%' },
            {
                name: 'Actions',
                cellTemplate:
                    '<div class="grid-action-cell text-center">' +
                    '<button class="btn btn-outline-danger" ng-click="grid.appScope.Delete(row.entity.orderid)" style="margin-left:10px; margin-bottom: 4px;"><i class="fa fa-trash"></i></button></div>',
                width: '10%'
            }
        ],
        data: []
    };

	$scope.CallHome = function () {
		debugger
        var aa = Order_Service.getItemLists().then((response) => {
            $scope.gridOptions.data = response['data'];
            $scope.loading = false;
        });
    };

    $scope.ShowData = function (val) {
        $scope.EditData(val);
    };

    $scope.Delete = function (id) {
        Order_Service.deleteCategory(id).then((response) => {
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

        Order_Service.getItemLists().then((response) => {
            $scope.Categories = response.data;
        });
    };

    $scope.EditData = function (id) {
        Order_Service.editCategory(id).then((response) => {

            response.data.CategoryId = "" + response.data.CategoryId;
            $scope.FormData = response.data;
            $("#myModal").modal("show");
        });
    };
    $scope.ClearData = function () {
        $scope.FormData = [];
    };

});