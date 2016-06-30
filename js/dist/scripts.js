var app = angular.module('websiteApp',['ngAnimate']);

app.controller('NavigationController', function NavigationController($scope, $timeout) {

    $scope.links = [
        { id: "name",    name: "Home"    },
        { id: "about",   name: "About"   },
        { id: "stocks",  name: "Stocks"  },
        { id: "tech",    name: "Tech"    },
        { id: "blog",    name: "Blog"    },
        { id: "contact", name: "Contact" }
    ];

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