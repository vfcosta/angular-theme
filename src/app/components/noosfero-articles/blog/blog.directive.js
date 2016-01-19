(function() {
  'use strict';

  angular
    .module('angular')
    .directive('noosferoBlog', noosferoBlog);

  /** @ngInject */
  function noosferoBlog() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/noosfero-articles/blog/blog.html',
      scope: {
          article: '=',
          profile: '='
      },
      controller: BlogController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function BlogController(noosfero, Restangular) {
      var vm = this;
      vm.posts = [];
      vm.perPage = 3;
      vm.currentPage = 1;

      vm.loadPage = function() {
        Restangular.setFullResponse(true);
        noosfero.articles.one(vm.article.id).customGET('children', {
          content_type: 'TinyMceArticle',
          per_page: vm.perPage,
          page: vm.currentPage
        }).then(function(result) {
          vm.totalPosts = result.headers('total');
          vm.posts = result.data.articles;
        });
      }
      vm.loadPage();
    }
  }

})();
