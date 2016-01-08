(function() {
  'use strict';

  angular
    .module('angular')
    .directive('noosferoBlog', noosferoBlog);

  /** @ngInject */
  function noosferoBlog() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/noosfero-articles/blog/blog.html',
      scope: {
          article: '=',
          owner: '='
      },
      controller: BlogController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function BlogController() {
      var vm = this;
    }
  }

})();
