(function() {
  'use strict';

  angular
    .module('angular')
    .directive('noosferoActivity', noosferoActivity);

  /** @ngInject */
  function noosferoActivity($compile) {
    var directive = {
      restrict: 'E',
      scope: {
          activity: '=',
      },
      templateUrl: 'app/components/noosfero-activities/activity/activity.html',
      replace: true
    };
    return directive;
  }

})();
