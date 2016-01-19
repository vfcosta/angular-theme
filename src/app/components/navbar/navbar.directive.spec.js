(function() {
  'use strict';

  describe('directive navbar', function() {
    var vm;
    var el;
    var AUTH_EVENTS;
    var $state;

    beforeEach(module('angular'));
    beforeEach(inject(function($compile, $rootScope, $httpBackend, _AUTH_EVENTS_, _$state_) {
      $state = _$state_;
      AUTH_EVENTS = _AUTH_EVENTS_;
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

    it('should reload current state after login', function() {
      spyOn($state, 'go');
      el.isolateScope().$broadcast(AUTH_EVENTS.loginSuccess, {});
      expect($state.go).toHaveBeenCalled();
    });

    it('should open login when not logged in', function() {
      spyOn(vm, 'openLogin');
      vm.activate();
      expect(vm.openLogin).toHaveBeenCalled();
    });

  });
})();
