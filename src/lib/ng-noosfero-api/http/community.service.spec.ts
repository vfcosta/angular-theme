import {CommunityService} from "./community.service";


describe("Services", () => {

    describe("Community Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let communityService: CommunityService;

        beforeEach(angular.mock.module("noosferoApp", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService, _CommunityService_: CommunityService) => {
            $httpBackend = _$httpBackend_;
            communityService = _CommunityService_;
        }));

        describe("Succesfull requests", () => {

            it("should list communities", (done) => {
                $httpBackend.expectGET(`/api/v1/communities`).respond(200, { communities: [{ name: "community1" }] });
                communityService.list().then((result: noosfero.RestResult<noosfero.Community[]>) => {
                    expect(result.data).toEqual([{ name: "community1" }]);
                    done();
                });
                $httpBackend.flush();
            });
        });

    });
});
