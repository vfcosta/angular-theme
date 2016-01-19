(function() {
  'use strict';
  
  angular.module('angular').factory('noosfero', function(Restangular) {
    return {
      profiles: Restangular.service('profiles'),
      articles: Restangular.service('articles'),
      profile: function(profileId) {
        return Restangular.one('profiles', profileId);
      },
      members: function(profile) {
        return Restangular.service('members', profile);
      },
      boxes: function(profileId) {
        return Restangular.service('boxes', Restangular.one('profiles', profileId))
      }
    }
  });
})();
