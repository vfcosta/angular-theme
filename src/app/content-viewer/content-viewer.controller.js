(function() {
  'use strict';

  angular
    .module('angular')
    .controller('ContentViewerController', ContentViewerController);


  /** @ngInject */
  function ContentViewerController(noosfero, $log, $stateParams, $state) {
    var vm = this;
    vm.article = null;
    activate();

    function activate() {
      console.log($state.current.data);
      noosfero.communities.one($state.current.data.profile.id).one('articles').get({path: $stateParams.page}).then(function(articles) {
        $log.log(articles);
        vm.content = articles.article;
      });
    }
  }
})();
