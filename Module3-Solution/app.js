(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var ctrl = this;
	ctrl.searchTerm = "";
	
	ctrl.getMenuItems = function() {
		ctrl.nothingFound = false;
		ctrl.found = [];

		if (ctrl.searchTerm === "") {
			ctrl.nothingFound = true;
			return;
		}
		var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
		promise.then(function(result) {
			if (result.length === 0)
			{
				ctrl.nothingFound = true;
			}
			else
			{
				ctrl.found = result;	
			}	
		});			
	}

	ctrl.removeMenuItem = function(index) {
		ctrl.found.splice(index, 1);
	}
}

MenuSearchService.inject = ['$http'];
function MenuSearchService($http) {
	var service = this;

	service.getMatchedMenuItems = function(searchTerm) {		
		return $http({
			method: "GET",
			url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
		})
		.then(function(result){		
			var foundItems = [];
			var items = result.data.A.menu_items;
			for (var i = 0; i < items.length; i++) {				
				if (items[i].description.indexOf(searchTerm) !== -1) {
					foundItems.push(items[i]);
				}
			};
			return foundItems;
		});
	}
}

function FoundItemsDirective() {
	var ddo = {
		templateUrl: 'menuList.html',
		scope: {
			items: '<',
			onRemove: '&',
			nothingFound: '<'
		}		
	} 
	return ddo;
}

})();
