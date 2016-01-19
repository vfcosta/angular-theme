(function() {
  'use strict';

  angular
    .module('angular')
    .directive('noosferoRecentDocumentsBlock', noosferoRecentDocumentsBlock);

  /** @ngInject */
  function noosferoRecentDocumentsBlock() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/noosfero-blocks/recent-documents/recent-documents.html',
      scope: {
          block: '=',
          owner: '='
      },
      controller: RecentDocumentsController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function RecentDocumentsController(noosfero, $state) {
      var vm = this;
      vm.profile = vm.owner;
      vm.documents = [];

      vm.openDocument = function(article) {
        $state.go("main.profile.page", {page: article.path, profile: article.profile.identifier}); 
      }

      //FIXME get all text articles
      noosfero.profiles.one(vm.profile.id).one('articles').get({content_type: 'TinyMceArticle'}).then(function(result) {
        vm.documents = result.articles;
      });
    }
  }

})();
