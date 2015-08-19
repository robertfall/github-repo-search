(function() {
  angular
    .module('repositories')
    .controller('IssuesController', ['$routeParams', 'githubService', issuesController]);

  function issuesController($routeParams, githubService) {
    var vm = this;

    vm.loading = true;
    vm.issues = [];
    vm.repositoryName = $routeParams.repositoryName;
    loadIssues();

    function loadIssues() {
      githubService.getIssues(vm.repositoryName)
        .then(function(issues) {
          vm.loading = false;
          vm.issues = issues;
        })
        .catch(function(error){
          vm.error = error;
        });
    }
  };
})();
