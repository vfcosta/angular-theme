(function() {
  'use strict';

  angular
    .module('noosferoApp')
    .component('noosferoProfileImage', {
      restrict: 'E',
      templateUrl: 'app/components/noosfero/profile-image/profile-image.html',
      bindings: {
        profile: '<'
      },
      controller: ProfileImageController
    });

  /** @ngInject */
  function ProfileImageController() {
    var vm = this;
    vm.defaultIcon = 'fa-users';
    if(vm.profile && vm.profile.type==='Person') vm.defaultIcon = 'fa-user';
  }

})();
