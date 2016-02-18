(function() {
  'use strict';

  angular
    .module('angular')
    .component('noosferoBoxes', {
      restrict: 'E',
      bindings: {
          boxes: '<',
          owner: '<'
      },
      templateUrl: 'app/components/noosfero-boxes/boxes.html',
      controller: BoxesController
    });

  /** @ngInject */
  function BoxesController() {
    var vm = this;

    vm.boxesOrder = function(box) {
      if(box.position==2) return 0;
      return box.position;
    }
  }

})();
