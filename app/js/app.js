(function () {
  'use strict';

  angular
    .module('GitApp', ['ngStorage','ngRoute','GitHubClient'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'html/home.html',
          controller: 'GitHubHomeCtrl'
        })
        .when('/favorites', {
          templateUrl: 'html/favorites.html',
          controller: 'GitHubFavoriteCtrl'
        })
        .when('/contact', {
          templateUrl: 'html/contact.html',
          controller: 'GitHubContactCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });

    });

})();