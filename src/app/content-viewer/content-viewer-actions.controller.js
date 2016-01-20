(function() {
  'use strict';

  angular
    .module('angular')
    .controller('ContentViewerActionsController', ContentViewerActionsController);


  /** @ngInject */
  function ContentViewerActionsController(noosfero, $log, $stateParams, $scope, $state) {
    var vm = this;
    vm.article = null;
    vm.profile = null;
    activate();

    function activate() {
      vm.profile = noosfero.currentProfile;
    }
  }
})();
