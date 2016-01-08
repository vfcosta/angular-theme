(function() {
  'use strict';

  angular
    .module('angular')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    var profileController = {
      templateUrl: 'app/profile/profile.html',
      controller: 'ProfileController',
      controllerAs: 'vm'
    };
    $routeProvider
      .when('/profile/:profile', {
        redirectTo: '/:profile'
      })
      .when('/:profile', profileController)
      .when('/:profile/:page*', profileController)
      .otherwise({
        redirectTo: '/'
      });
  }

})();
