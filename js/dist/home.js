app.controller('HomeController', function($scope, $timeout) {
    $timeout(function() {
        $('.loading-container').addClass('hide');
    }, 3000);
    $timeout(function() {
        $scope.hideLoadingContainer = true;
    }, 3300);
});