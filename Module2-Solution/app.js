(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuy)
.controller('AlreadyBoughtController', AlreadyBought)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuy.$inject = ['ShoppingListCheckOffService'];
function ToBuy(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

    toBuy.bought = function(itemIndex) {
        ShoppingListCheckOffService.buyItem(itemIndex);
    };

    toBuy.everythingIsBought = function() {
        return toBuy.itemsToBuy.length === 0;
    };
}

AlreadyBought.$inject = ['ShoppingListCheckOffService'];
function AlreadyBought(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.itemsAlreadyBought = ShoppingListCheckOffService.getAlreadyBoughtItems();

    alreadyBought.nothingBoughtYet = function() {
        return alreadyBought.itemsAlreadyBought.length === 0;
    };
}

function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
        {
            name: "Muffins",
            quantity: 10
        },
        {
            name: "Cookies",
            quantity: 8
        },
        {
            name: "Pastries",
            quantity: 4
        },
        {
            name: "Pies",
            quantity: 2
        },
        {
            name: "Donuts",
            quantity: 6
        }
    ];

    var alreadyBoughtItems = [];

    service.buyItem = function(itemIndex) {
        var itemToBeBought = toBuyItems[itemIndex];
        alreadyBoughtItems.push(itemToBeBought);
        toBuyItems.splice(itemIndex, 1);
    }

    service.getItemsToBuy = function() {
        return toBuyItems;
    }

    service.getAlreadyBoughtItems = function() {
        return alreadyBoughtItems;
    }
}

})();
