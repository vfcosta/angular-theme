(function() {
  'use strict';

  angular
    .module('angular')
    .controller('AuthController', AuthController);


  /** @ngInject */
  function AuthController(noosfero, $log, $stateParams, AuthService) {
    var vm = this;
    vm.credentials = {};
    vm.login = function() {
      AuthService.login(vm.credentials);
    }
  }
})();
