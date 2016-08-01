import { PasswordService } from "./password.service";

describe("Services", () => {

    describe("Password Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let passwordService: PasswordService;
        let $rootScope: ng.IRootScopeService;
        let data: any;

        beforeEach(angular.mock.module("main", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService,
_PasswordService_: PasswordService, _$rootScope_: ng.IRootScopeService) => {
            $httpBackend = _$httpBackend_;
            passwordService = _PasswordService_;
            $rootScope = _$rootScope_;
        }));

        describe("Succesfull request", () => {

            it("should change user password", (done) => {
               data = {
                  code: '1234567890',
                  password: 'test',
                  password_confirmation: 'test'
                };

                $httpBackend.expectPATCH(`/api/v1/new_password?code=${data.code}&password=${data.password}&password_confirmation=${data.password_confirmation}`).respond(201, [{ login: "test" }]);
                passwordService.new_password('1234567890', 'test', 'test').then((response: restangular.IResponse) => {
                    expect(response.data[0].login).toEqual("test");
                    done();
                });
                $httpBackend.flush();
            });
        });
    });
});
