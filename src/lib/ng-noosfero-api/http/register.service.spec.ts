import { RegisterService } from "./register.service";

describe("Services", () => {

    describe("Register Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let registerService: RegisterService;
        let $rootScope: ng.IRootScopeService;
        let user: any = {
            id: 1,
            login: 'test',
            email: 'test@email.com'
        };

        beforeEach(angular.mock.module("main", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService, _RegisterService_: RegisterService, _$rootScope_: ng.IRootScopeService) => {
            $httpBackend = _$httpBackend_;
            registerService = _RegisterService_;
            $rootScope = _$rootScope_;
        }));

        describe("Succesfull requests", () => {

            it("should creaet a new account", (done) => {

                $httpBackend.expectPOST(`/api/v1/register?email=${user.email}&id=${user.id}&login=${user.login}`).respond(201, [{ login: "test" }]);
                registerService.createAccount(user).then((response: restangular.IResponse) => {
                    expect(response.data[0].login).toEqual("test");
                    done();
                });
                $httpBackend.flush();
            });
        });
    });
});
