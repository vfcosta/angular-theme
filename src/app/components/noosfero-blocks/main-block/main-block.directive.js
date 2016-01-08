(function() {
  'use strict';

  angular
    .module('angular')
    .directive('noosferoMainBlock', noosferoMainBlock);

  /** @ngInject */
  function noosferoMainBlock($log, $stateParams, noosfero) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/noosfero-blocks/main-block/main-block.html',
      scope: {
          block: '=',
          owner: '='
      },
      controller: MainBlockController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function MainBlockController() {
      var vm = this;
      $log.log($stateParams.page);
      noosfero.articles().get({path: $stateParams.page, private_token: '1b00325e5f769a0c38550bd35b3f1d64'}).$promise.then(function (article) {
        //FIXME
        vm.article = article.articles[0];
        $log.log(vm.article);
      });
    }
  }

})();
