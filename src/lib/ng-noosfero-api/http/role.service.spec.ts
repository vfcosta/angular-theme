import { RoleService } from "./role.service";

describe("Services", () => {

    describe("Role Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let roleService: RoleService;

        beforeEach(angular.mock.module("main", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService, _RoleService_: RoleService) => {
            $httpBackend = _$httpBackend_;
            roleService = _RoleService_;
        }));


        describe("Succesfull requests", () => {

            it("list organization roles", (done) => {
                $httpBackend.expectGET(`/api/v1/profiles/1/roles`).respond(200, { roles: [{ id: 1 }] });
                roleService.getByProfile(1).then((result: noosfero.RestResult<noosfero.Role[]>) => {
                    expect(result.data).toEqual([{ id: 1 }]);
                    done();
                });
                $httpBackend.flush();
            });
        });

    });
});
