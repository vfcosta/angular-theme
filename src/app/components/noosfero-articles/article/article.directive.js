(function() {
  'use strict';

  angular
    .module('angular')
    .directive('noosferoArticle', noosferoArticle);

  /** @ngInject */
  function noosferoArticle($injector, $compile) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/noosfero-articles/article/article.html',
      scope: {
          article: '=',
          profile: '='
      },
      controller: ArticleController,
      controllerAs: 'vm',
      bindToController: true,
      link: function(scope, element) {
        var specificDirective = 'noosfero'+scope.vm.article.type;
        if($injector.has(specificDirective+'Directive')) {
          var directiveName = specificDirective.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
          element.replaceWith($compile('<'+directiveName+' article="vm.article" profile="vm.profile"></'+directiveName+'>')(scope));          
        }
      }
    };

    return directive;

    /** @ngInject */
    function ArticleController($injector, $compile, $scope) {
      var vm = this;
    }
  }

})();
