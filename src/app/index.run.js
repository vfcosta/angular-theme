(function() {
  'use strict';

  angular
    .module('angular')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, Restangular, Session) {
    Restangular.addFullRequestInterceptor(function(element, operation, route, url, headers) {
      if(Session.getCurrentUser()) {
        headers['Private-Token'] = Session.getCurrentUser().private_token;
      }
      return { headers: headers };
    });
  }

})();
