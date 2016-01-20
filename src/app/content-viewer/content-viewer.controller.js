(function() {
  'use strict';

  angular
    .module('angular')
    .controller('ContentViewerController', ContentViewerController);


  /** @ngInject */
  function ContentViewerController(noosfero, $log, $stateParams, $scope) {
    var vm = this;
    vm.article = null;
    vm.profile = null;
    activate();

    function activate() {
      vm.profile = noosfero.currentProfile;
      noosfero.profiles.one(vm.profile.id).one('articles').get({path: $stateParams.page}).then(function(response) {
        vm.article = response.data.article;
      });
    }
  }
})();
