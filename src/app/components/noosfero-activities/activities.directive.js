(function() {
  'use strict';

  angular
    .module('angular')
    .directive('noosferoActivities', noosferoActivities);

  /** @ngInject */
  function noosferoActivities($compile) {
    var directive = {
      restrict: 'E',
      scope: {
          activities: '=',
      },
      templateUrl: 'app/components/noosfero-activities/activities.html'
    };
    return directive;
  }

})();
