(function() {
  'use strict';

  angular
    .module('angular')
    .controller('ContentViewerController', ContentViewerController);


  /** @ngInject */
  function ContentViewerController(noosfero, $log, $stateParams, $scope) {
    var vm = this;
    vm.article = null;
    activate();

    function activate() {
      noosfero.communities.one($scope.vm.owner.id).one('articles').get({path: $stateParams.page}).then(function(articles) {
        vm.article = articles.article;
      });
    }
  }
})();
