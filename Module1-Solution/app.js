(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchChecker);

LunchChecker.$inject = ['$scope'];

function LunchChecker($scope) {
  $scope.lunchMenu = "";
  $scope.message = "";

  $scope.MenuItemsCount = function() {
    var itemsCount = $scope.lunchMenu.split(',').length;
    return itemsCount;
  }

  $scope.SetDisplayMessage = function(count) {
    if (count == 0)
    {
      $scope.message = "Please enter data first";
      return;
    }    
    if (count <= 3)
    {
      $scope.message = "Enjoy!";
      return;
    }
    $scope.message = "Too much!";      
  }

  $scope.CheckMenuItemsCount = function() {   
    var itemsCount = $scope.MenuItemsCount();
    $scope.SetDisplayMessage(itemsCount);
  }
}

})();
