$scope.clickStar = clickStar;

function clickStar(event) {
  if(event.target.tagName === "IMG"){
    favorite(event);
  }
}

function favorite(event) {
  let clickStarId = event.target.dataset.id;
  let vremennaya = null;
  $scope.resultat.forEach((res) =>{
    if(parseInt(clickStarId) === res.id){
      console.log( "res или $scope.resultat",res );
      if($scope.favorit.length === 0){
        $scope.favorit.push(res);
      }
      vremennaya = {...res};
      return;
    }});
  let izbraniy = false;
  $scope.favorit.forEach((fav)=>{
    if(fav.id === parseInt(clickStarId)){
      izbraniy = true;
      return;
    }
  });
  izbraniy?console.log("репозиторий уже в избранном"):$scope.favorit.push(vremennaya);

}