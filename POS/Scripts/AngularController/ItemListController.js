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
	//{
	//	name: 'Action',
	//		cellTemplate: '<div><button class="btn-primary" ng-click="grid.appScope.ShowData(row.entity.Name)">Edit</button></div>',
	//}

	$scope.gridOptions = {
		paginationPageSizes: [25, 50, 75],
		paginationPageSize: 25,
		enableSorting: true,
		columnDefs: [
			{ name: 'Id', field: 'Id', width: '50'  },
			{ name: 'Name', field: 'Name', width: '170'  },
			{ name: 'Description', field: 'Description' },
			{ name: 'Price', field: 'ItemPrice',width:'80' },
			{
				name: 'Actions',
				cellTemplate:
					'<div class="grid-action-cell text-center">' +
					'<button class="btn btn-outline-warning" ng-click="grid.appScope.EditData(row.entity.Id)"><i class="fa fa-edit"></i></button>' +
				'<button class="btn btn-outline-danger" ng-click="grid.appScope.Delete(row.entity.Id)" style="margin-left:10px;"><i class="fa fa-remove"></i></button></div>',
				width: '100' 
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
			$scope.CallHome();
		});
	};

	$scope.OpenModal = function () {
		$("#myModal").modal("show");
		$scope.showModal = true;
	};

	$scope.getCategories = function () {
		Category_Service.getCategories().then((response) => {
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
			$scope.CallHome();
			$scope.getCategories();
		});
	};
	$scope.EditData = function (id) {
		Item_Service.editCategory(id).then((response) => {
			debugger
			response.data.CategoryId = "" + response.data.CategoryId;
			$scope.FormData = response.data;
			$("#myModal").modal("show");
		});
	};

});
