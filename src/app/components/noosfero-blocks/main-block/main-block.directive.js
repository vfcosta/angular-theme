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
    }
  }

})();
