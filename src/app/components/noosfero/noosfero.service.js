(function() {
  'use strict';
  
  angular.module('angular').factory('noosfero', function(Restangular) {
    return {
      communities: Restangular.service('communities'),
      boxes: function(profileId) {
        return Restangular.service('boxes', Restangular.one('profiles', profileId))
      }
    }
  });
})();
