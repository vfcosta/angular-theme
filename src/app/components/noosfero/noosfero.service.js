(function() {
  'use strict';
  
  angular.module('angular').factory('noosfero', function(Restangular) {
    return {
      communities: Restangular.service('communities')
    }
  });
})();
