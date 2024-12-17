(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchChecker);

LunchChecker.$inject = ['$scope'];

function LunchChecker($scope) {
  $scope.lunchMenu = "";
  $scope.message = "";
  
  $scope.MenuItemsCount = function() {
    if ($scope.lunchMenu === "") {
      return 0;
    }
    var itemsCount = $scope.lunchMenu.trim(',').split(',').filter(item => item !== "").length;
    return itemsCount;
  }

  $scope.SetDisplayMessage = function(count) {
    if (count === 0)
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
