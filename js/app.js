(function() {
  angular.module('mainApp', ['repositories', 'ngRoute'])
    .config(['$routeProvider', '$locationProvider', config]);

  function config($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .when('/issues/:repositoryName\*', {
        templateUrl: 'templates/repositories/issues.html',
        controller: 'IssuesController',
        controllerAs: 'vm'
      })
      .otherwise({
        templateUrl: 'templates/repositories/search.html',
        controller: 'RepositoriesController',
        controllerAs: 'vm'
      });
  };
})();
