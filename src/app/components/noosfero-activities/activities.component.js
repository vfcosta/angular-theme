(function() {
  'use strict';

  angular
    .module('angular')
    .component('noosferoActivities', {
      restrict: 'E',
      bindings: {
          activities: '<'
      },
      templateUrl: 'app/components/noosfero-activities/activities.html'
    });

})();
