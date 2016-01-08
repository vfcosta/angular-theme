(function() {
  'use strict';

  angular
    .module('angular')
    .config(routeConfig);

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/profile/:profile', '/:profile');

    $stateProvider
      .state('profile', {
        url: '/:profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm'
      })
      .state('profile.page', {
        url: '/{page:.*}',
        templateUrl: 'app/content-viewer/page.html',
        controller: 'ContentViewerController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
