(function() {
  'use strict';

  angular
    .module('noosferoApp')
    .component('noosferoActivities', {
      restrict: 'E',
      bindings: {
          activities: '<'
      },
      templateUrl: 'app/components/noosfero-activities/activities.html'
    });

})();
