(function() {
  'use strict';

  angular
    .module('angular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, noosfero, $log) {
    var vm = this;
    vm.boxes = [];
    activate();

    function activate() {
      noosfero.communities().get({id: 67, private_token: '1b00325e5f769a0c38550bd35b3f1d64'}).$promise.then(function (profile) {
        $log.log(profile);
        vm.owner = profile.community;
      });
    }
  }
})();
