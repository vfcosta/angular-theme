(function() {
  'use strict';

  describe('directive navbar', function() {
    var vm;
    var el;

    beforeEach(module('angular'));
    beforeEach(inject(function($compile, $rootScope, $httpBackend) {
      $httpBackend.when('POST','/api/v1/login_from_cookie').respond({});

      el = angular.element('<acme-navbar></acme-navbar>');

      $compile(el)($rootScope.$new());
      $rootScope.$digest();
      vm = el.isolateScope().vm;
    }));

    it('should be compiled', function() {
      expect(el.html()).not.toEqual(null);
    });

    it('should have isolate scope object with instanciate members', function() {
      expect(vm).toEqual(jasmine.any(Object));
      expect(vm.currentUser).toEqual(undefined);
    });

  });
})();
