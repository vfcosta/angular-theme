(function() {
  'use strict';

  angular
    .module('angular')
    .config(config);

  /** @ngInject */
  function config($logProvider, $locationProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $locationProvider.html5Mode({enabled: true});
  }

})();
