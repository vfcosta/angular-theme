(function() {
  'use strict';

  angular
    .module('noosferoApp')
    .component('noosferoActivity', {
      restrict: 'E',
      bindings: {
          activity: '<'
      },
      templateUrl: 'app/components/noosfero-activities/activity/activity.html',
      replace: true,
      controller: ActivityController
    });

  /** @ngInject */
  function ActivityController() {
    var vm = this;
    vm.getActivityTemplate = function(activity) {
      return 'app/components/noosfero-activities/activity/' + activity.verb + '.html';
    }
  }

})();
