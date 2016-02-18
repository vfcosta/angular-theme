(function() {
  'use strict';

  angular
    .module('angular')
    .component('noosferoRecentDocumentsBlock', {
      restrict: 'E',
      templateUrl: 'app/components/noosfero-blocks/recent-documents/recent-documents.html',
      bindings: {
          block: '<',
          owner: '<'
      },
      controller: RecentDocumentsController
    });

  /** @ngInject */
  function RecentDocumentsController(noosfero, $state) {
    var vm = this;
    vm.profile = vm.owner;
    vm.documents = [];

    vm.openDocument = function(article) {
      $state.go("main.profile.page", {page: article.path, profile: article.profile.identifier}); 
    }

    var limit = vm.block.settings.limit || 5;
    //FIXME get all text articles
    noosfero.profiles.one(vm.profile.id).one('articles').get({content_type: 'TinyMceArticle', per_page: limit}).then(function(response) {
      vm.documents = response.data.articles;
    });
  }

})();
