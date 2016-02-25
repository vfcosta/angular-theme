(function() {
  'use strict';

  angular
    .module('noosferoApp')
    .component('noosferoMainBlock', {
      restrict: 'E',
      templateUrl: 'app/components/noosfero-blocks/main-block/main-block.html',
      bindings: {
          block: '<',
          owner: '<'
      },
      controller: MainBlockController
    });

  /** @ngInject */
  function MainBlockController() {
  }

})();
