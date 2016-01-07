(function() {
  'use strict';

  angular
    .module('angular')
    .directive('noosferoLinkListBlock', noosferoLinkListBlock);

  /** @ngInject */
  function noosferoLinkListBlock() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/noosfero-blocks/link-list/link-list.html',
      scope: {
          block: '=',
          owner: '='
      },
      controller: LinkListBlockController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function LinkListBlockController() {
      var vm = this;
      vm.links = vm.block.settings.links;
    }
  }

})();
