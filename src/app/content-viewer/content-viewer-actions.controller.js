(function() {
  'use strict';

  angular
    .module('angular')
    .controller('ContentViewerActionsController', ContentViewerActionsController);


  /** @ngInject */
  function ContentViewerActionsController(noosfero, $scope) {
    var vm = this;
    vm.article = null;
    vm.profile = null;
    activate();

    function activate() {
      $scope.$watch(function() { return noosfero.currentProfile },
        function() {
          vm.profile = noosfero.currentProfile;
        }
      );
    }
  }
})();
