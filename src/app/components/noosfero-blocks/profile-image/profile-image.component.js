(function() {
  'use strict';

  angular
    .module('noosferoApp')
    .component('noosferoProfileImageBlock', {
      restrict: 'E',
      templateUrl: 'app/components/noosfero-blocks/profile-image/profile-image.html',
      bindings: {
          block: '<',
          owner: '<'
      },
      controller: ProfileImageBlockController
    });

  /** @ngInject */
  function ProfileImageBlockController() {
    var vm = this;
    vm.profile = vm.owner;
  }

})();
