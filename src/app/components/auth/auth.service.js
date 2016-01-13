(function() {
  'use strict';

  angular
    .module('angular')
    .factory('Session', Session)
    .factory('AuthService', AuthService);

  /** @ngInject */
  function AuthService($q, $http, $rootScope, Session, $log, AUTH_EVENTS) {

    function login (credentials) {
      var url = '/api/v1/login';
      var encodedData = 'login=' + credentials.username + '&password=' + credentials.password;
      return $http.post(url, encodedData).then(loginSuccessCallback, loginFailedCallback);
    }

    function loginFromCookie() {
      var url = '/api/v1/login_from_cookie';
      return $http.post(url).then(loginSuccessCallback, loginFailedCallback);
    }
    
    function loginSuccessCallback(response) {
      $log.debug('AuthService.login [SUCCESS] response', response);
      var currentUser = Session.create(response.data);
      $rootScope.currentUser = currentUser;
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, currentUser);
      return currentUser;
    }
    
    function loginFailedCallback(response) {
      $log.debug('AuthService.login [FAIL] response', response);
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      // return $q.reject(response);
      return null;
    }

    function logout () {
      Session.destroy();
      $rootScope.currentUser = undefined;
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      $http.jsonp('/account/logout'); //FIXME logout from noosfero to sync login state
    }

    function isAuthenticated () {
      return !!Session.userId;
    }

    function isAuthorized (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (service.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
    }

    var service = {
      login: login,
      loginFromCookie: loginFromCookie,
      logout: logout,
      isAuthenticated: isAuthenticated,
      isAuthorized: isAuthorized
    };
    return service;
  }

  /** @ngInject */
  function Session($localStorage, $log) {
    var service = {};

    service.create = function(data) {
      $localStorage.currentUser = data.user;
      $log.debug('User session created.', $localStorage.currentUser);
      return $localStorage.currentUser;
    };

    service.destroy = function() {
      delete $localStorage.currentUser;
      $log.debug('User session destroyed.');
    };

    service.getCurrentUser = function () {
      return $localStorage.currentUser;
    };

    return service;
  }

})();
