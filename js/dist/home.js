app.controller('HomeController', function($scope, $timeout) {
    $timeout(function() {
        $('.loading-container').addClass('hide');
    }, 2000);
    $timeout(function() {
        $scope.hideLoadingContainer = true;
    }, 2500);
});