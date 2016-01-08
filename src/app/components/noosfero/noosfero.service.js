(function() {
  'use strict';
  
  angular.module('angular').service('noosfero', noosfero);
  
  function noosfero() {
    this.communities = communities;
    this.articles = articles;
    function communities() {
      // return $resource('/api/v1/communities/:id');
    }
    function articles() {
      // return $resource('/api/v1/articles/:id');
    }
  }
})();
