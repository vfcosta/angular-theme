(function() {
  'use strict';

  angular
    .module('angular')
    .directive('noosferoBlock', noosferoBlock);

  /** @ngInject */
  function noosferoBlock($compile) {
    var directive = {
      restrict: 'E',
      scope: {
          block: '='
      },
      link: function(scope, element, attrs) {
        var blockName = scope.block.type.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        element.replaceWith($compile('<noosfero-'+blockName+' block="block"></noosfero-'+blockName+'>')(scope));
      }
    };
    return directive;
  }

})();
