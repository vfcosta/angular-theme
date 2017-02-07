import {EnvironmentService} from "./environment.service";

describe("Services", () => {

    describe("Environment Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let environmentService: EnvironmentService;
        let $rootScope: ng.IRootScopeService;

        beforeEach(angular.mock.module("main", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService, _EnvironmentService_: EnvironmentService, _$rootScope_: ng.IRootScopeService) => {
            $httpBackend = _$httpBackend_;
            environmentService = _EnvironmentService_;
            $rootScope = _$rootScope_;
        }));

        describe("Succesfull requests", () => {

            it("should return the boxes of environment ", (done) => {
                let environmentId = 1;
                $httpBackend.expectGET(`/api/v1/environment/${environmentId}/boxes`).respond(200, [{ position: 1 }]);
                environmentService.getBoxes(environmentId).then((response: restangular.IResponse) => {
                    expect(response.data[0]).toEqual({ position: 1 });
                    done();
                });
                $httpBackend.flush();
            });

            it("should resolve the current environment", (done) => {
                let environment = { id: 1, identifier: "environment1" };
                environmentService.getCurrentEnvironment().then((currentEnvironment: noosfero.Environment) => {
                    expect(currentEnvironment).toEqual(currentEnvironment);
                    done();
                });
                environmentService.setCurrentEnvironment(<any>environment);
                $rootScope.$apply();
            });

            it("should return all people of environment", (done) => {
                let environmentId = 1;
                $httpBackend.expectGET(`/api/v1/people`).respond(200, { people: [{ id: 2 }] });
                environmentService.getEnvironmentPeople(<any>{ id: environmentId }).then((response: restangular.IResponse) => {
                    expect(response.data.people).toEqual([{ id: 2 }]);
                    done();
                });
                $httpBackend.flush();
            });

        });


    });
});
