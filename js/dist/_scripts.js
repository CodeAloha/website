var navigation = [
    { id: "name",    name: "Home"    },
    { id: "about",   name: "About"   },
    { id: "stocks",  name: "Stocks"  },
    { id: "tech",    name: "Tech"    },
    { id: "blog",    name: "Blog"    },
    { id: "contact", name: "Contact" }
];

var app = angular.module('websiteApp',['ngRoute','ngAnimate'])
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {

            _.each(navigation, function(nav) {
                $routeProvider.when('/' + nav.id, {
                    templateUrl:  './views/' + nav.id   + '.html',
                    controller:   nav.name + 'Controller',
                    controllerAs: nav.id
                });
            });
            $routeProvider.otherwise({ redirectTo:'/' });

            $locationProvider.html5Mode(true);
        }]);

app.controller('NavigationController', function NavigationController($scope, $timeout) {

    $scope.links = navigation;

    $scope.navigation = { toggled: false, isAnimating: false, currentTab: "home" };

    $scope.toggleNavigation = function toggleNavigation() {
        function scatteredAnimation() {
            _.each($scope.links, function(link, i) {
                $timeout(function() {
                    link.visible = $scope.navigation.toggled;
                    if (i === 5) { $scope.navigation.isAnimating = false; }
                }, i * 100);
            });
        }

        if (!$scope.navigation.isAnimating) {

            $scope.navigation.isAnimating = true;
            $scope.navigation.toggled = !$scope.navigation.toggled;


            scatteredAnimation();

        }

    }
});