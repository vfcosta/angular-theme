import {RestangularService} from "./restangular_service";

interface ObjectModel extends noosfero.RestModel {

}

describe("Restangular Service", () => {

    class ObjectRestService extends RestangularService<ObjectModel> {
        public getDataKeys() {
            return {
                singular: "object",
                plural: "objects"
            }
        }

        public getResourcePath() {
            return "objects";
        }
    }

    let restangularService: restangular.IService;
    let $httpBackend: ng.IHttpBackendService;
    let objectRestService: ObjectRestService;

    beforeEach(angular.mock.module("noosferoApp", ($translateProvider: angular.translate.ITranslateProvider) => {
        $translateProvider.translations('en', {});
    }));

    beforeEach(inject((_Restangular_: restangular.IService, _$q_: ng.IQService, _$httpBackend_: ng.IHttpBackendService) => {
        restangularService = _Restangular_;
        objectRestService = new ObjectRestService(_Restangular_, _$q_, <any>console);
        $httpBackend = _$httpBackend_;
    }));


    it("calls GET /objects", (done) => {
        $httpBackend.expectGET("/api/v1/objects").respond(200, { objects: [{ id: 1 }, { id: 2 }] });

        objectRestService.list().then((result: noosfero.RestResult<ObjectModel>) => {
            console.log(result);
            expect(result.data).toBeDefined();
            expect((<ObjectModel[]>result.data).length).toEqual(2);
            done();
        });

        $httpBackend.flush();
    });

    it("calls GET /objects", (done) => {
        $httpBackend.expectGET("/api/v1/objects").respond(200, { objects: [{ id: 1 }, { id: 2 }] });

        objectRestService.list().then((result: noosfero.RestResult<ObjectModel>) => {
            console.log(result);
            expect(result.data).toBeDefined();
            console.log("HERE", (<ObjectModel[]>result.data).length);
            expect((<ObjectModel[]>result.data).length).toEqual(2);
        });
        $httpBackend.flush();


        setTimeout(() => {
            $httpBackend.expectGET("/api/v1/objects").respond(200, { objects: [{ id: 1 }, { id: 3 }] });

            objectRestService.list().then((result: noosfero.RestResult<ObjectModel>) => {
                console.log(result);
                expect(result.data).toBeDefined();
                console.log("HERE 2", (<ObjectModel[]>result.data).length);
                expect((<ObjectModel[]>result.data).length).toEqual(2);
                done();
            });
            $httpBackend.flush();
        }, 2000);



    });
});