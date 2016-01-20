(function() {
  'use strict';

  angular
    .module('angular')
    .controller('CmsController', CmsController);


  /** @ngInject */
  function CmsController(noosfero, $log, $stateParams, $scope) {
    var vm = this;
    vm.article = null;
    vm.profile = null;
    activate();

    function activate() {
    }
    
  }
})();
