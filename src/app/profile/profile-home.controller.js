(function() {
  'use strict';

  angular
    .module('angular')
    .controller('ProfileHomeController', ProfileHomeController);


  /** @ngInject */
  function ProfileHomeController(noosfero, $log, $stateParams, $scope, $state) {
    var vm = this;
    activate();

    function activate() {
      vm.profile = $scope.vm.owner;
      noosfero.profile(vm.profile.id).customGET('home_page', {fields: 'path'}).then(function(result) {
        if(result.article) {
          $state.transitionTo('main.profile.page', {page: result.article.path, profile: vm.profile.identifier}, {location: false});
        } else {
          $state.transitionTo('main.profile.info', {profile: vm.profile.identifier}, {location: false});
        }
      });
    }
  }
})();
