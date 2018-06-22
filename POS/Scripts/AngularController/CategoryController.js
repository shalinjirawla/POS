app.controller("CategoryController", function ($scope, $http, Table_Service, Category_Service) {
    angular.element(document).ready(function () {
        
		localStorage.setItem("TableId", TabId)
		localStorage.setItem("OrderId", OrderID);

		if (OrderID != 0) {
			var data = {
				"id": TabId,
				"orderid": OrderID
            };
            $scope.MainOrderID = OrderID;
			$scope.TableAndOrder(data);

		} else {
			$scope.TableByID(TabId);
		};
        $scope.getAllCat();
        //$scope.addOrders();
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
    $scope.ShowitemsList = false;

	$scope.FilteredData = [];

	$scope.finalMenu = [];

	$scope.cateitems = [];

	$scope.tagsList = [];
    $scope.itemsList = [];
    
    $scope.TableByID = function (id) {
		Table_Service.loadTable(id).then((response) => {
			$scope.currentTable = [];
			$scope.currentTable = response.data;
		});
    };

    $scope.MainOrderID = 0;

    $scope.TableAndOrder = function (data) {  
        Table_Service.loadTablewithOrderId(data).then((response) => {
            $scope.itemsList = [];
            $scope.tagsList = [];
			//$scope.currentTable = response.data;
            for (var i = 0; i < response.data.Item.length; i++) {
                
                var itemsData = {};
                itemsData["orderItemId"] = response.data.Item[i].orderItemId;
                itemsData["ItemPrice"] = response.data.Item[i].ItemPrice;
                //itemsData["Amount"] = total;
                itemsData["Qty"] = response.data.Item[i].Qty;
                itemsData["ItemName"] = response.data.Item[i].ItemName;
                itemsData["ItemID"] = response.data.Item[i].ItemID;

                $scope.itemsList.push(itemsData);

                if (response.data.Item[i].Tag.length > 0) {
                    for (var j = 0; j < response.data.Item[i].Tag.length; j++) {
                        // here we will add tags in array
                        var tagsData = {};
                        tagsData["TagId"] = response.data.Item[i].Tag[j].TagId;
                        tagsData["Tagprice"] = response.data.Item[i].Tag[j].TagPrice;
                        tagsData["TagName"] = response.data.Item[i].Tag[j].TagName;
                        tagsData["Qty"] = response.data.Item[i].Tag[j].Qty;
                        $scope.tagsList.push(tagsData);
                    }
                }
            }
            for (var i = 0; i < $scope.itemsList.length; i++) {
                $scope.itemsList[i].IsOrdered = true;
            };
            for (var i = 0; i < $scope.tagsList.length; i++) {
                $scope.tagsList[i].IsOrdered = true;
            };

            if (response.data.Item.length > 0) {
                $scope.ShowitemsList = true;
            }
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
			if (b == 0) {
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

			var tagsData = {};
			tagsData["TagId"] = $scope.itemofSelectedTab[i].id;
			tagsData["Tagprice"] = $scope.itemofSelectedTab[i].TagPrice;
			tagsData["ItemId"] = $scope.itemofSelectedTab[i].ItemId;
			tagsData["Qty"] = parseInt(noOfItem);
			tagsData["TagName"] = $scope.itemofSelectedTab[i].Name;

			total += parseInt($scope.itemofSelectedTab[i].TagPrice * parseInt(noOfItem));

			$scope.tagsList.push(tagsData);
        }
        total += $scope.SelectedTable[0].ItemPrice;
		var itemsData = {};
		itemsData["orderItemId"] = $scope.SelectedTable[0].Id;
		itemsData["ItemPrice"] = $scope.SelectedTable[0].ItemPrice;
		itemsData["Amount"] = total;
		itemsData["Qty"] = 1;
		itemsData["ItemName"] = $scope.SelectedTable[0].Name;
		itemsData["ItemID"] = 0;

        $scope.itemsList.push(itemsData);
        var iTemData = {};
		iTemData["orderItemId"] = $scope.SelectedTable[0].Id;
		iTemData["ItemPrice"] = $scope.SelectedTable[0].ItemPrice;

		var asc = $scope.Categories.filter(x => x.Id == $scope.SelectedTable[0].CategoryId);
		iTemData["CategoryId"] = asc[0].Id;
		iTemData["CategoryName"] = asc[0].Name;
		iTemData["Qty"] = 1;
        iTemData["ItemName"] = $scope.SelectedTable[0].Name;

        $scope.ShowitemsList = true;

		$scope.FilteredData = angular.copy($scope.tagsList);

		$scope.FilteredData = $scope.FilteredData.filter(x => x.ItemId == iTemData.orderItemId);
		
		iTemData["Tag"] = angular.copy($scope.FilteredData);
		$scope.FilteredData = [];
        $scope.cateitems.push(iTemData);
        
		var FinalData = {};
		FinalData["Id"] = $scope.SelectedTable[0].Id;
		FinalData["Amount"] = total;
		var tableid = parseInt(localStorage.getItem("TableId"));
		var orderid = parseInt(localStorage.getItem("OrderId"));
		FinalData["TableNo"] = tableid;
		FinalData["orderid"] = orderid;
		$scope.finalMenu = FinalData;
		$scope.finalMenu.Item = [];
		$scope.finalMenu.Item = $scope.cateitems;
		$scope.itemofSelectedTab = [];
		$scope.SelectedTable = [];
		$("span[id^=orTagId_]").remove();
	};

    $scope.getTotal = function () {
		var aa = 0;
		$scope.tagsList.forEach((e) => {
			aa += e.Tagprice * e.Qty;
		});
		$scope.itemsList.forEach((e) => {
			aa += e.ItemPrice * e.Qty;
		});
		return aa;
	};

    $scope.changeData = function (num, qn) {
		$scope.itemsList.filter(x => x == qn).map(function (x) {
			return x.Qty = num;
		});
	};

    $scope.changetagData = function (num, qn) {
		$scope.tagsList.filter(x => x == qn).map(function (x) {
			return x.Qty = num;
		});
	};

	$scope.deleteTagItem = function (qn) {
		$scope.tagsList = $scope.tagsList.filter(x => x != qn);
	}
	$scope.deleteItem = function (qn) {
		$scope.itemsList = $scope.itemsList.filter(x => x != qn);
	}
    $scope.addOrders = function () {       
		var currDate = CurrentDate();
		$scope.finalMenu["Date"] = currDate;
        $scope.finalMenu["IsPaid"] = false;
  
        Table_Service.SaveOrderDetail($scope.finalMenu).then((response) => {
            
            $scope.MainOrderID = response.data.OrderId;
            for (var i = 0; i < $scope.finalMenu.Item.length; i++) {
                $scope.finalMenu.Item[i].IsOrdered = true;
            };
            for (var i = 0; i < $scope.itemsList.length; i++) {
                $scope.itemsList[i].IsOrdered = true;
            };
            for (var i = 0; i < $scope.tagsList.length; i++) {
                $scope.tagsList[i].IsOrdered = true;
            };

            $scope.finalMenu.Item = [];
		});
	};
    function CurrentDate() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!

		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		var today = dd + '/' + mm + '/' + yyyy;
		return today;
    };

    $scope.Paymentfunction = function () {
        var OrderId = $scope.MainOrderID;
        window.location.href = '/Home/GetReport?id=' + OrderId;
    }
});