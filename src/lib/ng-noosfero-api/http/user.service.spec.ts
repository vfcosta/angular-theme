import { UserService } from "./user.service";

describe("Services", () => {

    describe("User Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let userService: UserService;
        let $rootScope: ng.IRootScopeService;
        let data: any;
        let profile = <noosfero.Profile> {id: 1, identifier: 'profile1'};

        beforeEach(angular.mock.module("main", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService,
            _UserService_: UserService, _$rootScope_: ng.IRootScopeService) => {
            $httpBackend = _$httpBackend_;
            userService = _UserService_;
            $rootScope = _$rootScope_;
        }));

        describe("Succesfull request", () => {

            it("should change user password", (done) => {
                data = {
                    current_password: '1234567890',
                    new_password: 'test',
                    new_password_confirmation: 'test'
                };

                $httpBackend.expectPATCH('/api/v1/users/1', data).respond(201, [{ success: true }]);
                userService.changePassword(profile, '1234567890', 'test', 'test').then((response: restangular.IResponse) => {
                    expect(response.data[0].success).toBeTruthy();
                    done();
                });
                $httpBackend.flush();
            });
        });
    });
});
