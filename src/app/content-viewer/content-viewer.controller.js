(function() {
  'use strict';

  angular
    .module('angular')
    .controller('ContentViewerController', ContentViewerController);


  /** @ngInject */
  function ContentViewerController($timeout, noosfero, $log, $routeParams) {
    var vm = this;
    vm.article = null;
    activate();

    function activate() {
      $log.log($routeParams.page);
      noosfero.articles().get({path: $routeParams.page, private_token: '1b00325e5f769a0c38550bd35b3f1d64'}).$promise.then(function (article) {
        //FIXME
        vm.article = article.articles[0];
      });
    }
  }
})();
