(function() {
  'use strict';

  angular
    .module('angular')
    .directive('noosferoMembersBlock', noosferoMembersBlock);

  /** @ngInject */
  function noosferoMembersBlock() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/noosfero-blocks/members-block/members-block.html',
      scope: {
          block: '=',
          owner: '='
      },
      controller: MembersBlockController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function MembersBlockController(noosfero) {
      var vm = this;
      vm.members = [];

      noosfero.members(noosfero.profiles.one(vm.owner.id)).one().get({per_page: 6}).then(function(response) {
        vm.members = response.data.people;
      });
    }
  }

})();
