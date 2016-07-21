'use strict';


function forceHTTPS() {
    var url      = window.location.href;
    var segments = url.split('/');
    var protocol = segments[0];
    if (protocol === 'http') {
        window.location = 'https://javacup.io';
    }
}

var navigation = [
    { id: "home",    url: "/",         name: "Home"     },
    { id: "about",   url: "/about",    name: "About"    },
    { id: "stocks",  url: "/stocks",   name: "Stocks"   },
    { id: "projects",url: "/projects", name: "Projects" },
    { id: "contact", url: "/contact",  name: "Contact"  }
];


var app = angular.module('websiteApp',['ngRoute','ngAnimate'])
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {

            _.each(navigation, function(nav) {
                $routeProvider.when(nav.url, {
                    templateUrl:  '/views/' + nav.id   + '.html',
                    controller:   nav.name + 'Controller',
                    controllerAs: nav.id
                });
            });
            $routeProvider.otherwise({ redirectTo: '/' });

            $locationProvider.html5Mode(true);
        }]);

app.controller('NavigationController', function NavigationController($scope, $timeout, $location) {

    $scope.links = navigation;

    $scope.navigation = { toggled: false, isAnimating: false, currentTab: "home" };

    var numberOfLinks = $scope.links.length;
    $scope.toggleNavigation = function toggleNavigation() {
        function scatteredAnimation() {
            _.each($scope.links, function(link, i) {
                $timeout(function() {
                    link.visible = $scope.navigation.toggled;
                    console.log(numberOfLinks);
                    if (i === (numberOfLinks - 1)) { console.log('canceling'); $scope.navigation.isAnimating = false; }
                }, i * 100);
            });
        }

        if (!$scope.navigation.isAnimating) {

            $scope.navigation.isAnimating = true;
            $scope.navigation.toggled = !$scope.navigation.toggled;


            scatteredAnimation();
        }

    };

    $scope.redirectTo = function redirectTo(link) {
        $location.url(link);
        console.log(link);
        $scope.toggleNavigation();
    };
});