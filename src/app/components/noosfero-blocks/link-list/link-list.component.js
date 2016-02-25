(function() {
  'use strict';

  angular
    .module('noosferoApp')
    .component('noosferoLinkListBlock', {
      restrict: 'E',
      templateUrl: 'app/components/noosfero-blocks/link-list/link-list.html',
      bindings: {
          block: '<',
          owner: '<'
      },
      controller: LinkListBlockController
    });

  /** @ngInject */
  function LinkListBlockController() {
    this.links = this.block.settings.links;
  }

})();
