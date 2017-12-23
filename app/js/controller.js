(function () {
  'use strict';

  angular
    .module('GitHubClient',[])
    .controller('GitHubHomeCtrl', GitHubHomeCtrl)
    .controller('GitHubFavoriteCtrl', GitHubFavoriteCtrl)
    .controller('GitHubContactCtrl', GitHubContactCtrl);

  GitHubHomeCtrl.$inject = ['$scope', 'storage'];
  GitHubFavoriteCtrl.$inject = ['$scope', 'storage'];
  GitHubContactCtrl.$inject = ['$scope', 'storage'];


  function GitHubHomeCtrl($scope,storage) {
    $scope.input = "project";
    $scope.searchClick = searchClick;

    $scope.user = user();
    $scope.repositories = repositories();


    function user() {
      return storage.getUser();
    }

    function repositories() {
      return storage.getRepositories();
    }


    function searchClick() {
      if ($scope.input.length > 0) {
        storage.httpGetRequest($scope.input)
        .then(function (data) {
          $scope.repositories = data;
        })
      }
    }


    $scope.setFavorite = addFavorite;
    function addFavorite(repo) {
      return storage.setFavoriteRepositories(repo);
    }
  }


  function GitHubFavoriteCtrl($scope,storage) {

    $scope.seeFavorite = seeFavorite();
    $scope.delFavorite = delFavorite;

    function seeFavorite(){
      return storage.getFavoriteRepositories();
    }

    function delFavorite(delRepos) {
      return storage.delFavoriteRepositories(delRepos);
    }

  }


  function GitHubContactCtrl($scope,storage) {

  }

})();