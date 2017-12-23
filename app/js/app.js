(function () {
  'use strict';

  angular
    .module('GitApp', ['ngStorage','ngRoute','GitHubClient'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'app/html/home.html',
          controller: 'GitHubHomeCtrl'
        })
        .when('/favorites', {
          templateUrl: 'app/html/favorites.html',
          controller: 'GitHubFavoriteCtrl'
        })
        .when('/contact', {
          templateUrl: 'app/html/contact.html',
          controller: 'GitHubContactCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });

    });

})();