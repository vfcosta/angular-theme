/* global moment:false */
(function() {
  'use strict';

  angular
    .module('angular')
    .constant('moment', moment)
    .constant('AUTH_EVENTS', {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success'
    });

})();
