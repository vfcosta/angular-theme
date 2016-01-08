(function() {
  'use strict';

  angular
    .module('angular')
    .controller('ProfileController', ProfileController);


  /** @ngInject */
  function ProfileController(noosfero, $log, $stateParams, $state, Restangular) {
    var vm = this;
    vm.boxes = [];
    activate();

    function activate() {
      Restangular.one('communities').get({private_token: '1b00325e5f769a0c38550bd35b3f1d64', identifier: $stateParams.profile}).then(function(communities) {
        $log.log(communities);
        vm.owner = communities.communities[0];
        $state.current.data.profile = vm.owner;
      });
    }

    vm.boxesOrder = function(box) {
      if(box.position==2) return 0;
      return box.position;
    }
  }
})();
