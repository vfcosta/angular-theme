(function() {
  'use strict';

  angular
    .module('angular')
    .config(routeConfig);

  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '',
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
        url: '/:profile',
        abstract: true,
        views: {
          'content': {
            templateUrl: 'app/profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'vm'
          }
        }
      })
      .state('main.profile.home', {
        url: '',
        views: {
          'mainBlockContent': {
            controller: 'ProfileHomeController',
            controllerAs: 'vm'
          }
        }
      })
      .state('main.profile.info', {
        url: '^/profile/:profile',
        views: {
          'mainBlockContent': {
            templateUrl: 'app/profile-info/profile-info.html',
            controller: 'ProfileInfoController',
            controllerAs: 'vm'
          }
        }
      })
      .state('main.profile.page', {
        url: '/{page:any}',
        views: {
          'actions@main': {
            templateUrl: 'app/content-viewer/navbar-actions.html'
          },
          'mainBlockContent': {
            templateUrl: 'app/content-viewer/page.html',
            controller: 'ContentViewerController',
            controllerAs: 'vm'
          }
        }
      })
      .state('main.profile.settings', {
        url: '^/myprofile/:profile'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
