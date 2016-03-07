(function() {
  'use strict';
  
  angular.module('noosferoApp').factory('noosfero', function(Restangular, $q) {
    var currentProfile = $q.defer();

    return {
      currentProfile: currentProfile.promise,
      setCurrentProfile: function(profile) { currentProfile.resolve(profile) }
    }
  });
})();
