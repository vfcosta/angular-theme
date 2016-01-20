(function() {
  'use strict';

  angular
    .module('angular')
    .controller('CmsController', CmsController);


  /** @ngInject */
  function CmsController(noosfero, $stateParams, $httpParamSerializer, $state, SweetAlert) {
    var vm = this;
    vm.article = {};
    vm.profile = null;

    vm.save = function() {
      noosfero.currentProfile.then(function(profile) {
        return noosfero.profiles.one(profile.id).customPOST(
          {article: vm.article},
          'articles',
          {},
          {'Content-Type':'application/json'}
        )
      }).then(function(response) {
        $state.transitionTo('main.profile.page', {page: response.data.article.path, profile: response.data.article.profile.identifier});
        SweetAlert.swal({
          title: "Good job!",
          text: "Article saved!",
          type: "success",
          timer: 1000
        });
      });
    }
    
  }
})();
