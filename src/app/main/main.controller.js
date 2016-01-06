(function() {
  'use strict';

  angular
    .module('angular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, noosfero, toastr) {
    var vm = this;
    vm.boxes = [];
    activate();

    function activate() {
      var profile = noosfero.communities().get({id: 67, private_token: '1b00325e5f769a0c38550bd35b3f1d64'}, function () {
        console.log(profile);
      });
      // vm.boxes = noosfero.getBoxes();
    }
  }
})();
