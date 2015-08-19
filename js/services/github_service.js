(function() {
  angular
    .module('repositories')
    .factory('githubService', ['$http', githubService]);

  function githubService($http) {
    return {
      getRepos: getRepos,
      getIssues: getIssues
    };

    function getRepos(term, page) {
      page = page || 1;
      return $http.get(repoUrl(term, page))
        .then(getReposComplete);

      function getReposComplete(response) {
        return response.data.items;
      }
    }

    function getIssues(repo) {
      return $http.get(issuesUrl(repo))
        .then(getIssuesComplete);

      function getIssuesComplete(response) {
        return response.data.items;
      }
    };

    function repoUrl(term, page) {
      return 'https://api.github.com/search/repositories?per_page=10&q=' + term + '&page' + page;
    }

    function issuesUrl(repo) {
      return "https://api.github.com/search/issues?per_page=20&q=repo:" + repo;
    }
  };
})();
