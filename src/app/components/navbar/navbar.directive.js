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
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $modal, AuthService, Session, $scope, AUTH_EVENTS) {
      var vm = this;

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
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
      };
      $scope.$on(AUTH_EVENTS.loginSuccess, function() {
        if(vm.modalInstance) {
          vm.modalInstance.close();
          vm.modalInstance = null;
        }
        vm.currentUser = Session.getCurrentUser();
      });
      $scope.$on(AUTH_EVENTS.logoutSuccess, function() {
        vm.currentUser = Session.getCurrentUser();
      });
    }
  }

})();
