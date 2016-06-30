var myApp = angular.module('website',[]);

myApp.controller('DoubleController', ['$scope', function($scope) {
    $scope.double = function(value) { return value * 3; };
}]);