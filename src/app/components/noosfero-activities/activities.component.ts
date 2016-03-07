(function() {
  'use strict';

  angular
    .module('noosferoApp')
    .component('noosferoActivities', {
      bindings: {
          activities: '<'
      },
      templateUrl: 'app/components/noosfero-activities/activities.html'
    });

})();
