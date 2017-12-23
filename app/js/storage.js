(function () {
  'use strict';

  angular
    .module('GitHubClient')
    .factory('storage',storage);

  storage.$inject = ['$http','$localStorage'];

  function storage($http,$localStorage) {
    const services = {
      httpGetRequest: httpGetRequest,
      getUser: getUser,
      setUser: setUser,
      setRepositories: setRepositories,
      getRepositories: getRepositories,
      getFavoriteRepositories: getFavoriteRepositories,
      setFavoriteRepositories: setFavoriteRepositories,
      delFavoriteRepositories:delFavoriteRepositories
    };

    if(!Array.isArray($localStorage.favoriteRepositories)){
       $localStorage.favoriteRepositories = [];
    }

    return services;

    function searchOption() {
      let check = document.getElementById('user');
      let users = document.getElementById('searchInput');
      console.log(check.checked);

      if (check.checked === true) {
        console.log('https://api.github.com/users/'+users.value+'/repos');
        return 'https://api.github.com/users/'+users.value+'/repos';
      }
      else {
        console.log('https://api.github.com/search/repositories?q=' + users.value);
        return 'https://api.github.com/search/repositories?q=' + users.value+"";
      }
    }

    function httpGetRequest(user) {
      setUser(user);
      let url = searchOption();
      return $http.get(url)
        .then(function (response) {

          if(response && response.data && response.data.items) {
            setRepositories(response.data.items);
            return response.data.items
          }
          else if (response && response.data) {
            setRepositories(response.data);
            return response.data
          }

        })
    }

    function getUser() {
      return $localStorage.userName
    }

    function setUser(user) {
      $localStorage.userName = user;
    }

    function setRepositories(repositories) {
      $localStorage.httpRepositories = repositories;
    }

    function getRepositories() {
      return $localStorage.httpRepositories;
    }

    function getFavoriteRepositories() {
      return $localStorage.favoriteRepositories;
    }

    function setFavoriteRepositories(repo) {
      let favoriteRepeats = false;

      if($localStorage.favoriteRepositories.length === 0 ){
        $localStorage.favoriteRepositories.push(repo);
      } else{

        $localStorage.favoriteRepositories.forEach((res) => {
          if(repo.id === res.id) {
            return favoriteRepeats = true;
          }
        });

        favoriteRepeats?console.log("the repository is already added"):$localStorage.favoriteRepositories.push(repo);
      }
    }

    function delFavoriteRepositories(delRepos) {

      let storageItems = $localStorage.favoriteRepositories;

      storageItems.forEach((del,i)=>{
        if(del.id === delRepos.id){

          storageItems.splice(i,1);
          localStorage.removeItem('favoriteRepositories');
          return localStorage.setItem('favoriteRepositories',storageItems);
        }}
      )}

  }



})();