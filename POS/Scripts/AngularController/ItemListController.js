app.controller("ItemListController", function ($scope, $http, Item_Service, Category_Service) {
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
			{ name: 'Id', field: 'Id', width: '10%'  },
			{ name: 'Name', field: 'Name', width: '30%'  },
			{ name: 'Description', field: 'Description', width:'40%' },
			{ name: 'Price', field: 'ItemPrice',width:'10%' },
			{
				name: 'Actions',
				cellTemplate:
					'<div class="grid-action-cell text-center">' +
					'<button class="btn btn-outline-warning" ng-click="grid.appScope.EditData(row.entity.Id)"><i class="fa fa-edit"></i></button>' +
				'<button class="btn btn-outline-danger" ng-click="grid.appScope.Delete(row.entity.Id)" style="margin-left:10px;"><i class="fa fa-trash"></i></button></div>',
                width: '10%' 
			}	
		],
		data: []
	};

    $scope.CallHome = function () {        
		var aa = Item_Service.getItemLists().then((response) => {
			$scope.gridOptions.data = response['data'];
			$scope.loading = false;
		});
	};

    $scope.ShowData = function (val) {        
		$scope.EditData(val);
	};

	$scope.Delete = function (id) {
        Item_Service.deleteCategory(id).then((response) => {
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
        Category_Service.getItemLists().then((response) => {
			$scope.Categories = response.data;
		});
	};
	$scope.SaveData = function () {
		var itemModel = {
			Id: $scope.FormData.Id,
			Name: $scope.FormData.Name,
			Description: $scope.FormData.Description,
			CategoryId: $scope.FormData.CategoryId,
			ItemPrice: $scope.FormData.ItemPrice
		};

        Item_Service.saveCategory(itemModel).then((response) => {
            swal("Success", "Data Saved", "success", {
                button: "Aww yiss!",
            });
			$scope.CallHome();
            $scope.getCategories();
            $scope.FormData = [];
		});
	};
	$scope.EditData = function (id) {
		Item_Service.editCategory(id).then((response) => {
			
			response.data.CategoryId = "" + response.data.CategoryId;
			$scope.FormData = response.data;
			$("#myModal").modal("show");
		});
    };
    $scope.ClearData = function () {
        $scope.FormData = [];
    };

});
