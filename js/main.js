(function(){
  var app = angular.module('repositoriesApp', []);

  app.controller('RepositoriesController', ['$http', '$scope', function($http, $scope) {
    var repos = this;
    repos.resetState = function() {
      repos.repositories = [];
      repos.error = false;
      repos.isSearching = false;
    };

    repos.searchTerm = '';
    repos.resetState();


    repos.isEmpty = function() {
      return repos.repositories.length === 0;
    };


    repos.search = _.debounce(function() {
      if(!repos.searchTerm && repos.searchTerm.length > 0) {return;}
      repos.isSearching = true;

      $http.get('https://api.github.com/search/repositories?q='+repos.searchTerm+'&per_page=10').
        success(function(data){
          repos.resetState();
          repos.repositories = data.items;
        }).
        catch(function(data) {
          repos.isSearching = false;
          repos.error = data;
        });
    }, 1000);

  }]);
})()
