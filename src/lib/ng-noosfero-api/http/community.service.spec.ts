import {CommunityService} from "./community.service";


describe("Services", () => {

    describe("Community Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let communityService: CommunityService;

        beforeEach(angular.mock.module("main", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService, _CommunityService_: CommunityService) => {
            $httpBackend = _$httpBackend_;
            communityService = _CommunityService_;
        }));

        describe("Succesfull requests", () => {

            it("should list environment communities", (done) => {
                $httpBackend.expectGET(`/api/v1/communities`).respond(200, { communities: [{ name: "community1" }] });
                communityService.getByEnvironment().then((result: noosfero.RestResult<noosfero.Community[]>) => {
                    expect(result.data).toEqual([{ name: "community1" }]);
                    done();
                });
                $httpBackend.flush();
            });

            it("should list person communities", (done) => {
                $httpBackend.expectGET(`/api/v1/people/1/communities`).respond(200, { communities: [{ name: "community1" }] });
                let person = <any>{ id: 1 };
                communityService.getByPerson(person).then((result: noosfero.RestResult<noosfero.Community[]>) => {
                    expect(result.data).toEqual([{ name: "community1" }]);
                    done();
                });
                $httpBackend.flush();
            });

            it("should list owner communities when it is an environment", (done) => {
                $httpBackend.expectGET(`/api/v1/communities`).respond(200, { communities: [{ name: "community1" }] });
                let owner = <any>{ id: 1 };
                communityService.getByOwner(owner).then((result: noosfero.RestResult<noosfero.Community[]>) => {
                    done();
                });
                $httpBackend.flush();
            });

            it("should list owner communities when it is an person", (done) => {
                $httpBackend.expectGET(`/api/v1/people/1/communities`).respond(200, { communities: [{ name: "community1" }] });
                let owner = <any>{ id: 1, type: "Person" };
                communityService.getByOwner(owner).then((result: noosfero.RestResult<noosfero.Community[]>) => {
                    done();
                });
                $httpBackend.flush();
            });
        });

    });
});
