(function () {
  'use strict';

  angular
    .module('GitHubClient',[])
    .controller('GitHubHomeCtrl', GitHubHomeCtrl)
    .controller('GitHubFavoriteCtrl', GitHubFavoriteCtrl)
    .controller('GitHubContactCtrl', GitHubContactCtrl)
    .directive('onFinishRender', onFinishRender);

  GitHubHomeCtrl.$inject = ['$scope', 'storage'];
  GitHubFavoriteCtrl.$inject = ['$scope', 'storage'];
  GitHubContactCtrl.$inject = ['$scope', 'storage'];

   function onFinishRender($timeout) {
     return {
       restrict: 'A',
       link: function (scope, element, attr) {
         if (scope.$last === true) {
           $timeout(function () {
             scope.$emit('ngRepeatFinished');
           });
         }
       }
     }}

     function GitHubHomeCtrl($scope, storage) {

       $scope.$on('ngRepeatFinished', function () {
         storage.checkRepeatFavoriteRepos();
       });

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

       // function checkRepeatFavoriteRepos(){
       // let allList = document.getElementById('list__repos');
       // let list = allList.getElementsByTagName('img');
       // console.log(allList);
       // console.log(list);
       // for(let i;i=list.length;i>0){
       //   storage.$localStorage.favoriteRepositories.forEach((favorit) => {
       //     if( listick.dataset.id === favorit.id){
       //       console.log('sdvs');
       //     }
       //   })
       // }
       //
       //
       // // list.forEach((listick) => {
       // //
       // // })
       // }


     }


     function GitHubFavoriteCtrl($scope, storage) {

       $scope.seeFavorite = seeFavorite();
       $scope.delFavorite = delFavorite;

       function seeFavorite() {
         return storage.getFavoriteRepositories();
       }

       function delFavorite(delRepos) {
         return storage.delFavoriteRepositories(delRepos);
       }

     }


     function GitHubContactCtrl($scope, storage) {

     }

})();