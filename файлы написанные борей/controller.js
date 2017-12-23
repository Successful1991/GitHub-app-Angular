angular
  .module('GitHubClient', [])
  .controller('GitHubController', GitHubController);

function GitHubController($scope, $http) {
  const baseUrl = 'https://api.github.com/search/repositories/users?q=';
  const baseUrl2 = 'https://api.github.com/users/';

  $scope.userSearch = 'Successful';
  $scope.updateRepos = updateRepos;
  $scope.repositories = [];
  $scope.clickButton = clickButton;

  function clickButton(){
    getGetRepos(baseUrl2 ,$scope.userSearch);
  }
  function updateRepos(event) {
    if($scope.userSearch.length > 0 && event.keyCode === 13){
      getGetRepos(baseUrl2 ,$scope.userSearch);
    }
  }

  function getGetRepos(baseUrl, input) {
    // $http.get(`${baseUrl}${input}`) вариант 1
    $http.get(`${baseUrl}${input}/repos`)
      .then(response => {
        console.log(response);
        if(response && response.data && response.data) {
        // if(response && response.data && response.data.items) { вариант 1
          $scope.repositories = [...response.data];
        }
      })
      .catch(error => console.warn(error));
  }
}