(function() {
  'use strict';
  
  angular.module('angular').service('noosfero', noosfero);
  
  function noosfero($resource) {
    this.communities = communities;
    function communities() {
      return $resource('/api/v1/communities/:id');
    }
  }
})();
