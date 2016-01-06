(function() {
  'use strict';

  angular
    .module('angular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, noosfero, toastr) {
    var vm = this;
    vm.boxes = [];
    activate();

    function activate() {
      // vm.boxes = noosfero.getBoxes();
    }
  }
})();
