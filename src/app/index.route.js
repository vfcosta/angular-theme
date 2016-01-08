(function() {
  'use strict';

  angular
    .module('angular')
    .config(routeConfig);

  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('profile', {
        url: '/:profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');

    /*
    var profileController = {
      templateUrl: 'app/profile/profile.html',
      controller: 'ProfileController',
      controllerAs: 'vm'
    };
    $routeProvider
      .when('/profile/:profile', {
        redirectTo: '/:profile'
      })
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
      .otherwise({
        redirectTo: '/'
      });
      */
  }

})();
