(function() {
  angular
    .module('repositories')
    .directive('repositoriesSearch', function() {
      return {
        restrict: 'E',
        templateUrl: 'templates/repositories/search.html',
        controller: 'RepositoriesController',
        controllerAs: 'vm'
      };
    })
    .directive('repositoryIssues', function() {
      return {
        restrict: 'E',
        templateUrl: 'templates/repositories/issues.html',
        scope: {
          issues: "="
        }
      };
    });
})();
