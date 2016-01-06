(function() {
  'use strict';
  
  angular.module('angular').service('noosfero', noosfero);
  
  function noosfero($resource) {
    this.communities = communities;
    function communities() {
      return $resource('/api/v1/communities/:id');
    }
    // this.getBoxes = getBoxes;
    // function getBoxes() {
    //   return [{id: 1, blocks: [{id: 1, type: 'test'}]},
    //           {id: 2, blocks: [{id: 2, type: 'test2'}]}];
    // }
  }
})();
