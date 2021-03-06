﻿app.controller("TagListController", function ($scope, $http, Item_Service, Tag_Service) {
    angular.element(document).ready(function () {
        debugger
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
            { name: 'id', field: 'id', width: '10%' },
            { name: 'Name', field: 'Name', width: '30%' },
            { name: 'Description', field: 'Description',width:'40%' },
            { name: 'Price', field: 'TagPrice', width: '10%' },
            {
                name: 'Actions',
                cellTemplate:
                    '<div class="grid-action-cell text-center">' +
                    '<button class="btn btn-outline-warning" ng-click="grid.appScope.EditData(row.entity.id)"><i class="fa fa-edit"></i></button>' +
                    '<button class="btn btn-outline-danger" ng-click="grid.appScope.Delete(row.entity.id)" style="margin-left:10px; margin-bottom: 4px;"><i class="fa fa-trash"></i></button></div>',
                width: '10%'
            }
        ],
        data: []
    };

    $scope.CallHome = function () {
        debugger
        var aa = Tag_Service.GettagsWithoutId().then((response) => {
            $scope.gridOptions.data = response['data'];
            $scope.loading = false;
        });
    };

    $scope.Delete = function (id) {
        Tag_Service.DeleteTag(id).then((response) => {
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
        debugger
        Tag_Service.GettagsWithoutId().then((response) => {
            $scope.Categories = response.data;
        });
    };
    $scope.saveCategory = function () {   
        var tagModel = {
            id: $scope.FormData.id,
            Name: $scope.FormData.Name,
            Description: $scope.FormData.Description,
            ItemId: $scope.FormData.ItemId,
            TagPrice: $scope.FormData.TagPrice
        };
        
        Tag_Service.saveTag(tagModel).then((response) => {
            
            swal("Success", "Data Saved", "success", {
                button: "Aww yiss!",
            });
            $scope.CallHome();
            $scope.getCategories();
            $scope.FormData = [];
        });
    };
    $scope.EditData = function (id) {
        Tag_Service.editTag(id).then((response) => {
            debugger
            response.data.CategoryId = "" + response.data.CategoryId;
            $scope.FormData = response.data;
            $("#myModal").modal("show");
        });
    };
    $scope.ClearData = function () {
        $scope.FormData = [];
    };

});