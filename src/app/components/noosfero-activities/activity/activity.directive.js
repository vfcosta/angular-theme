(function() {
  'use strict';

  angular
    .module('angular')
    .directive('noosferoActivity', noosferoActivity);

  /** @ngInject */
  function noosferoActivity() {
    var directive = {
      restrict: 'E',
      scope: {
          activity: '='
      },
      templateUrl: 'app/components/noosfero-activities/activity/activity.html',
      replace: true,
      controller: ActivityController,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;

    /** @ngInject */
    function ActivityController() {
      var vm = this;
      vm.getActivityTemplate = function(activity) {
        return 'app/components/noosfero-activities/activity/' + activity.verb + '.html';
      }
    }
  }

})();
