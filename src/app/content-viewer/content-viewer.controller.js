(function() {
  'use strict';

  angular
    .module('angular')
    .controller('ContentViewerController', ContentViewerController);


  /** @ngInject */
  function ContentViewerController(noosfero, $log, $stateParams, Restangular, $state) {
    var vm = this;
    vm.article = null;
    activate();

    function activate() {
      Restangular.one('communities', $state.current.data.profile.id).one('articles').get({path: $stateParams.page}).then(function(articles) {
        $log.log(articles);
        vm.content = articles.article;
      });
    }
  }
})();
