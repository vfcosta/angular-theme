import { DomainService } from "./domain.service";

describe("Services", () => {

    describe("Domain Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let domainService: DomainService;
        let environment = <noosfero.Environment>{ id: 1 };
        let profile = <noosfero.Profile>{ id: 1 };
        let domains = [
            { id: 1, name: "somedomain.net", owner: environment, is_default: true },
            { id: 2, name: "someotherdomain.net", owner: profile, is_default: false }
        ];

        beforeEach(angular.mock.module("main", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService, _DomainService_: DomainService) => {
            $httpBackend = _$httpBackend_;
            domainService = _DomainService_;
        }));

        describe("Succesfull requests", () => {

            it("should return all domains", (done: Function) => {
                $httpBackend.expectGET(`/api/v1/domains`).respond(200, domains);
                domainService.list().then((content: noosfero.RestResult<noosfero.Domain[]>) => {
                    expect(angular.copy(content.data)).toEqual(domains);
                    done();
                });
                $httpBackend.flush();
            });

        });

    });
});
