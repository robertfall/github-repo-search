(function() {
  angular
    .module('repositories')
    .controller('RepositoriesController', ['githubService', repositories]);

  function repositories(githubService) {
    var vm = this;
    var debouncedSearch = _.debounce(search, 600);

    vm.searchTerm = "";
    vm.isEmpty = isEmpty;
    vm.isPristine = true;
    vm.termChanged = termChanged;
    vm.repos = [];
    stopSearching();

    function isEmpty(){
      return !vm.isPristine && !vm.isSearching && vm.repos.length === 0;
    }

    function termChanged() {
      if(vm.searchTerm.length === 0) {
        stopSearching();
        vm.isPristine = true;
        vm.repos = [];
        return;
      }
      debouncedSearch(vm.searchTerm);
    }

    function search(searchTerm) {
      vm.isSearching = true;
      vm.isPristine = false;
      githubService.getRepos(searchTerm, vm.page)
        .then(function(repos) {
          stopSearching();
          vm.repos = repos;
        })
        .catch(function(error) {
          stopSearching(error);
        });
    }

    function stopSearching(error) {
      vm.error = error;
      vm.isSearching = false;
    }
  }
})();
