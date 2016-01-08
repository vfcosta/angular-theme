(function() {
  'use strict';

  angular
    .module('angular')
    .directive('noosferoArticle', noosferoArticle);

  /** @ngInject */
  function noosferoArticle() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/noosfero-articles/article/article.html',
      scope: {
          article: '=',
          owner: '='
      },
      controller: ArticleController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ArticleController() {
      var vm = this;
    }
  }

})();
