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
      delFavoriteRepositories:delFavoriteRepositories,
      getDetailRepository: getDetailRepository

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
          // setRepositories(response.data.items);
          // return response.data.items

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

    function getDetailRepository() {

    }

  }




  //   let clickStarId = event.target.dataset.id;
  //   let vremennaya = null;
  //
  //   $scope.resultat.forEach((res) => {
  //     if (parseInt(clickStarId) === res.id) {
  //       console.log("res или $scope.resultat", res);
  //       if ($scope.favorit.length === 0) {
  //         $scope.favorit.push(res);
  //         storageAdd();
  //       }
  //       vremennaya = {...res};
  //       return;
  //     }
  //   });
  //
  //
  //   let izbraniy = false;
  //
  //   $scope.favorit.forEach((fav) => {
  //     if (fav.id === parseInt(clickStarId)) {
  //       izbraniy = true;
  //       return;
  //     }
  //   });
  //
  //
  //   izbraniy ? console.log("репозиторий уже в избранном") : $scope.favorit.push(vremennaya);
  //
  //
  //   if (izbraniy !== true) {
  //     storageAdd();
  //   }


})();