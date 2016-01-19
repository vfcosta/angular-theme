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
    function BlogController(noosfero) {
      var vm = this;
      vm.posts = [];

      noosfero.articles.one(vm.article.id).customGET('children', {content_type: 'TinyMceArticle'}).then(function(result) {
        vm.posts = result.articles;
      });
    }
  }

})();
