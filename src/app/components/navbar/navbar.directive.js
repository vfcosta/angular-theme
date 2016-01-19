(function() {
  'use strict';

  angular
    .module('angular')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {},
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $modal, AuthService, Session, $scope, $state, AUTH_EVENTS) {
      var vm = this;

      vm.currentUser = Session.getCurrentUser();
      vm.modalInstance = null;

      vm.openLogin = function() {
        vm.modalInstance = $modal.open({
          templateUrl: 'app/components/auth/login.html',
          controller: 'AuthController',
          controllerAs: 'vm',
          bindToController: true
        });
      };
      vm.logout = function() {
        AuthService.logout();
        $state.go($state.current, {}, {reload: true});  //TODO move to auth
      };
      $scope.$on(AUTH_EVENTS.loginSuccess, function() {
        if(vm.modalInstance) {
          vm.modalInstance.close();
          vm.modalInstance = null;
        }
        $state.go($state.current, {}, {reload: true}); //TODO move to auth
      });
      $scope.$on(AUTH_EVENTS.logoutSuccess, function() {
        vm.currentUser = Session.getCurrentUser();
      });

      vm.activate = function() {
        if(!vm.currentUser) vm.openLogin();
      }
      vm.activate();
    }
  }

})();
