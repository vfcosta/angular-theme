(function() {
  'use strict';

  angular
    .module('angular')
    .controller('ProfileController', ProfileController);


  /** @ngInject */
  function ProfileController(noosfero, $log, $stateParams) {
    var vm = this;
    vm.boxes = [];
    activate();

    function activate() {
      noosfero.communities().get({identifier: $stateParams.profile, private_token: '1b00325e5f769a0c38550bd35b3f1d64'}).$promise.then(function (profile) {
        $log.log(profile);
        vm.owner = profile.communities[0];
      });
    }

    vm.boxesOrder = function(box) {
      if(box.position==2) return 0;
      return box.position;
    }
  }
})();
