(function() {
  'use strict';

  angular
    .module('angular')
    .directive('noosferoProfileImage', noosferoProfileImage);

  /** @ngInject */
  function noosferoProfileImage() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/noosfero/profile-image/profile-image.html',
      scope: {
        profile: '='
      },
      controller: ProfileImageController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ProfileImageController() {
      var vm = this;
      vm.defaultIcon = 'fa-users';
      if(vm.profile && vm.profile.type==='Person') vm.defaultIcon = 'fa-user';
    }
  }

})();
