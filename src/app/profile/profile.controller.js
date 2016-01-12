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
      noosfero.profiles.one().get({identifier: $stateParams.profile}).then(function(profiles) {
        vm.owner = profiles[0];
        return noosfero.boxes(vm.owner.id).one().get();
      }).then(function(response) {
        vm.boxes = response.boxes;
      });
    }

    vm.boxesOrder = function(box) {
      if(box.position==2) return 0;
      return box.position;
    }
  }
})();
