(function() {
  'use strict';

  angular
    .module('angular')
    .controller('CmsController', CmsController);


  /** @ngInject */
  function CmsController(noosfero, $stateParams, $httpParamSerializer, $state) {
    var vm = this;
    vm.article = {};
    vm.profile = null;
    activate();

    function activate() {
      vm.profile = noosfero.currentProfile;
    }

    vm.save = function() {
      noosfero.profiles.one(vm.profile.id).customPOST(
        {article: vm.article},
        'articles',
        {},
        {'Content-Type':'application/json'}
      ).then(function(response) {
        $state.transitionTo('main.profile.page', {page: response.data.article.path, profile: vm.profile.identifier});
      });
    }
    
  }
})();
