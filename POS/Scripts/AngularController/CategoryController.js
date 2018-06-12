app.controller("CategoryController", function ($scope, $http, Table_Service, Category_Service) {

	angular.element(document).ready(function () {
		if (OrderID != 0) {
			var data = {
				"id": TabId,
				"orderid" : OrderID
			};
			$scope.TableAndOrder(data);
			
		} else {
			$scope.TableByID(TabId);
		};
		$scope.getAllCat();
	});

	$scope.Categories = [];
	$scope.currentTable = [];
	$scope.ShowData = false;
	$scope.ShowItems = false;
	$scope.Items = [];
	$scope.Extras = [];
	$scope.counterVal = 0;
	$scope.SelectedTable = [];
	$scope.itemofSelectedTab = [];
	$scope.orderList = [];

	$scope.TableByID = function (id) {
		Table_Service.loadTable(id).then((response) => {
			$scope.currentTable = [];
			$scope.currentTable = response.data;
		});
	};

	$scope.TableAndOrder = function (data) {
		Table_Service.loadTablewithOrderId(data).then((response) => {
			$scope.currentTable = response.data;
		});
	};

	$scope.getAllCat = function () {
		Category_Service.getCategories().then((response) => {
			$scope.Categories = response.data;
		});
	};

	$scope.LoadItems = function (id) {
		Category_Service.getCategoryById(id).then((response) => {
			$scope.Items = response.data;
			$scope.ShowData = true;
		});
	};

	$scope.FetchData = function (val) {
		Category_Service.getItemsByName(val).then((response) => {
			$scope.Items = response.data;
			$scope.ShowData = true;
		});
	};

	$scope.loadTable = function (dat) {
		
		$scope.SelectedTable = [];
		$scope.itemofSelectedTab = [];

		$scope.SelectedTable.push(dat);
		var id = dat.Id;
		Category_Service.getTagsById(id).then((response) => {
			$scope.Extras = response.data;
			$scope.ShowItems = true;
		});
	};
	$scope.addBanner = function (val) {
		
		var elementPos = $scope.itemofSelectedTab.map(function (x) { return x.id; }).indexOf(val.id);
		var objectFound = $scope.itemofSelectedTab[elementPos];
		
		if (objectFound == null) {
			$scope.itemofSelectedTab.push(val);
		}
		var id = val.id;
		
		var a = $('#orTagId_' + id).text();
		if (a == "") {
			a = 0;	
			$('.orderTag_id' + id).parent().append('<span class="notify-badge" id="orTagId_' + id + '">' + 1 + '</span>');
		} else {
			var b = parseInt(a);
			b++;
			$('#orTagId_' + id).text(b);
		}

	};

	$scope.removeTagItems = function (id) {
		
		var a = $('#orTagId_' + id).text();
		if (a != "") {
			var b = parseInt(a);
			b--;
			if (b >= 0) {
				$('#orTagId_' + id).text(b);
			}
			if (b == 0){
				$('span[id=orTagId_' + id + ']').remove();
			}

			for (var i = 0; i < $scope.itemofSelectedTab.length; i++) {
				if ($scope.itemofSelectedTab[i].id == id) {
					if (b == 0) {
						$scope.itemofSelectedTab.splice(i, 1);
					}
				}
			}
		}
	};
	$scope.addOrder = function () {
		var total = 0;
				
		for (var i = 0; i < $scope.itemofSelectedTab.length; i++) {
			var itemPrice = $scope.itemofSelectedTab[i].TagPrice;
			var id = $scope.itemofSelectedTab[i].id;
			var noOfItem = $('#orTagId_' + id).text();

			var customData = {};
			customData["Id"] = $scope.itemofSelectedTab[i].id;
			customData["ItemPrice"] = $scope.itemofSelectedTab[i].TagPrice;
			customData["Main"] = false;
			customData["ItemId"] = $scope.itemofSelectedTab[i].ItemId;
			customData["Quantity"] = parseInt(noOfItem);
			customData["Name"] = $scope.itemofSelectedTab[i].Name;
			$scope.orderList.push(customData);
		}

		var customData = {};
		customData["Id"] = $scope.SelectedTable[0].Id;
		customData["ItemPrice"] = $scope.SelectedTable[0].ItemPrice;
		customData["Main"] = true;
		customData["Quantity"] = 1;
		customData["Name"] = $scope.SelectedTable[0].Name;
		customData["ItemId"] = 0;
		$scope.orderList.push(customData);
		$scope.itemofSelectedTab = [];
		$scope.SelectedTable = [];
		$("span[id^=orTagId_]").remove();
	};
	$scope.getTotal = function () {
		var aa = 0;
		$scope.orderList.forEach((e) => {
			aa += e.ItemPrice * e.Quantity;
		});
		return aa;
	};
	$scope.changeData = function (num,qn) {
		$scope.orderList.filter(x => x == qn).map(function (x) {
			return x.Quantity = num;
		});
	};
	$scope.deleteItem = function (qn) {
		if (qn.Main == true) {
			$scope.orderList = $scope.orderList.filter(x => x != qn);
			$scope.orderList = $scope.orderList.filter(x => x.ItemId != qn.Id);
		} else {
			$scope.orderList = $scope.orderList.filter(x => x != qn);
		}
	}
});