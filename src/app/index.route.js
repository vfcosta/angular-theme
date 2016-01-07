(function() {
  'use strict';

  angular
    .module('angular')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/:profile', {
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm'
      })
      .when('/:profile/:page*', {
        templateUrl: 'app/content-viewer/page.html',
        controller: 'ContentViewerController',
        controllerAs: 'vm'
      })
      .when('/profile/:profile', {
        redirectTo: '/:profile'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
