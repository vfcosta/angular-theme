(function() {
  'use strict';

  angular
    .module('angular')
    .config(config);

  /** @ngInject */
  function config($logProvider, $locationProvider, RestangularProvider) {
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode({enabled: true});
    RestangularProvider.setBaseUrl('/api/v1');
  }

})();
