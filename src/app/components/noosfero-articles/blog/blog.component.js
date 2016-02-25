(function() {
  'use strict';

  angular
    .module('noosferoApp')
    .component('noosferoBlog', {
      restrict: 'E',
      templateUrl: 'app/components/noosfero-articles/blog/blog.html',
      bindings: {
          article: '<',
          profile: '<'
      },
      controller: BlogController
    });

  /** @ngInject */
  function BlogController(noosfero) {
    var vm = this;
    vm.posts = [];
    vm.perPage = 3;
    vm.currentPage = 1;

    vm.loadPage = function() {
      noosfero.articles.one(vm.article.id).customGET('children', {
        content_type: 'TinyMceArticle',
        per_page: vm.perPage,
        page: vm.currentPage
      }).then(function(response) {
        vm.totalPosts = response.headers('total');
        vm.posts = response.data.articles;
      });
    }
    vm.loadPage();
  }

})();
