(function() {
  'use strict';

  angular
    .module('angular')
    .controller('ContentViewerController', ContentViewerController);


  /** @ngInject */
  function ContentViewerController(noosfero, $log, $stateParams) {
    var vm = this;
    vm.article = null;
    activate();

    function activate() {
      $log.log($stateParams.page);
      noosfero.articles().get({path: $stateParams.page, private_token: '1b00325e5f769a0c38550bd35b3f1d64'}).$promise.then(function (article) {
        //FIXME
        vm.content = article.articles[0];
        console.log(vm.content);
      });
    }
  }
})();
