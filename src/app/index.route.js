(function() {
  'use strict';

  angular
    .module('angular')
    .config(routeConfig);

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/:profile', '/profile/:profile');
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        resolve: {
          currentUser: function(AuthService) {
            return AuthService.loginFromCookie();
          }
        }
      })
      .state('main.profile', {
        url: ':profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm'
      })
      .state('main.profile.info', {
        url: '^/profile/:profile',
        templateUrl: 'app/profile-info/profile-info.html',
        controller: 'ProfileInfoController',
        controllerAs: 'vm'
      })
      .state('main.profile.page', {
        url: '/{page:.*}',
        templateUrl: 'app/content-viewer/page.html',
        controller: 'ContentViewerController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
