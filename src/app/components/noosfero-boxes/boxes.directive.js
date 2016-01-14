(function() {
  'use strict';

  angular
    .module('angular')
    .directive('noosferoBoxes', noosferoBoxes);

  /** @ngInject */
  function noosferoBoxes() {
    var directive = {
      restrict: 'E',
      scope: {
          boxes: '=',
          owner: '='
      },
      templateUrl: 'app/components/noosfero-boxes/boxes.html',
      controller: BoxesController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function BoxesController() {
      var vm = this;

      vm.boxesOrder = function(box) {
        if(box.position==2) return 0;
        return box.position;
      }
    }
  }

})();
