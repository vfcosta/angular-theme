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
      noosfero.profiles.one().get({identifier: $stateParams.profile}).then(function(response) {
        vm.profile = response.data[0];
        noosfero.currentProfile = vm.profile;
        return noosfero.boxes(vm.profile.id).one().get();
      }).then(function(response) {
        vm.boxes = response.data.boxes;
      });
    }
  }
})();
