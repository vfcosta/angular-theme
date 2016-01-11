(function() {
  'use strict';

  angular
    .module('angular')
    .config(config);

  /** @ngInject */
  function config($logProvider, $locationProvider, RestangularProvider, $httpProvider) {
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode({enabled: true});
    RestangularProvider.setBaseUrl('/api/v1');
    $httpProvider.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'};
  }

})();
