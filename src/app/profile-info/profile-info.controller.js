(function() {
  'use strict';

  angular
    .module('angular')
    .controller('ProfileInfoController', ProfileInfoController);


  /** @ngInject */
  function ProfileInfoController(noosfero) {
    var vm = this;
    vm.profile = null;
    vm.activities = [];
    activate();

    function activate() {
      noosfero.currentProfile.then(function(profile) {
        vm.profile = profile;
        return noosfero.profiles.one(vm.profile.id).one('activities').get();
      }).then(function(response) {
        vm.activities = response.data.activities;
      });
    }
  }
})();
