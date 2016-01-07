(function() {
  'use strict';

  angular
    .module('angular')
    .directive('noosferoProfileImageBlock', noosferoProfileImageBlock);

  /** @ngInject */
  function noosferoProfileImageBlock() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/noosfero-blocks/profile-image/profile-image.html',
      scope: {
          block: '=',
          owner: '='
      },
      controller: ProfileImageBlockController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ProfileImageBlockController() {
      var vm = this;
      vm.profile = vm.owner;
    }
  }

})();
