(function() {
  'use strict';

  angular
    .module('angular')
    .controller('ProfileInfoController', ProfileInfoController);


  /** @ngInject */
  function ProfileInfoController(noosfero, $log, $stateParams, $scope) {
    var vm = this;
    vm.profile = null;
    vm.activities = [];
    activate();

    function activate() {
      vm.profile = $scope.vm.owner;
      noosfero.profiles.one(vm.profile.id).one('activities').get().then(function(result) {
        vm.activities = result.activities;
      });
    }
  }
})();
