(function() {
  'use strict';

  angular
    .module('angular')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/:profile', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/profile/:profile', {
        redirectTo: '/:profile'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
