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
      noosfero.communities.one().get({identifier: $stateParams.profile}).then(function(communities) {
        vm.owner = communities.communities[0];
      });
    }

    vm.boxesOrder = function(box) {
      if(box.position==2) return 0;
      return box.position;
    }
  }
})();
