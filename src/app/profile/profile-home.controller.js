(function() {
  'use strict';

  angular
    .module('noosferoApp')
    .controller('ProfileHomeController', ProfileHomeController);


  /** @ngInject */
  function ProfileHomeController(noosfero, $log, $stateParams, $scope, $state) {
    var vm = this;
    activate();

    function activate() {
      noosfero.currentProfile.then(function(profile) {
        vm.profile = profile;
        return noosfero.profile(vm.profile.id).customGET('home_page', {fields: 'path'});
      }).then(function(response) {
        if(response.data.article) {
          $state.transitionTo('main.profile.page', {page: response.data.article.path, profile: vm.profile.identifier}, {location: false});
        } else {
          $state.transitionTo('main.profile.info', {profile: vm.profile.identifier}, {location: false});
        }
      });
    }
  }
})();
