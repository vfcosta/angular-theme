(function() {
  'use strict';

  angular
    .module('angular')
    .component('noosferoMembersBlock', {
      restrict: 'E',
      templateUrl: 'app/components/noosfero-blocks/members-block/members-block.html',
      bindings: {
          block: '<',
          owner: '<'
      },
      controller: MembersBlockController
    });

  /** @ngInject */
  function MembersBlockController(noosfero) {
    var vm = this;
    vm.members = [];

    noosfero.members(noosfero.profiles.one(vm.owner.id)).one().get({per_page: 6}).then(function(response) {
      vm.members = response.data.people;
    });
  }

})();
