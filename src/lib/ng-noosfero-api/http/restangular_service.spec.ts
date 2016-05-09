import {RestangularService} from "./restangular_service";

interface ObjectModel extends noosfero.RestModel {
}

interface RootObjectModel extends noosfero.RestModel {

}

describe("Restangular Service - base Class", () => {

    class ObjectRestService extends RestangularService<ObjectModel> {
        public getDataKeys() {
            return {
                singular: "object",
                plural: "objects"
            };
        }

        public getResourcePath() {
            return "objects";
        }
    }

    class RootObjectRestService extends RestangularService<ObjectModel> {
        public getDataKeys() {
            return {
                singular: "rootObject",
                plural: "rootObjects"
            };
        }

        public getResourcePath() {
            return "rootObjects";
        }
    }

    let restangularService: restangular.IService;
    let $httpBackend: ng.IHttpBackendService;
    let objectRestService: ObjectRestService;
    let rootObjectRestService: RootObjectRestService;

    beforeEach(angular.mock.module("noosferoApp", ($translateProvider: angular.translate.ITranslateProvider) => {
        $translateProvider.translations('en', {});
    }));

    beforeEach(inject((_Restangular_: restangular.IService, _$q_: ng.IQService, _$httpBackend_: ng.IHttpBackendService) => {
        restangularService = _Restangular_;
        objectRestService = new ObjectRestService(_Restangular_, _$q_, null);
        rootObjectRestService = new RootObjectRestService(_Restangular_, _$q_, null);
        $httpBackend = _$httpBackend_;
    }));

    it("list() calls GET /objects", (done) => {
        $httpBackend.expectGET("/api/v1/objects").respond(200, { objects: [{ id: 1 }, { id: 2 }] });

        objectRestService.list().then((result: noosfero.RestResult<ObjectModel[]>) => {
            expect(result.data).toBeDefined();
            expect((<ObjectModel[]>result.data).length).toEqual(2);
            done();
        });

        $httpBackend.flush();

        $httpBackend.verifyNoOutstandingExpectation();
    });

    it("list(rootObject) calls GET /rootObjects/1/objects", (done) => {

        $httpBackend.expectGET("/api/v1/rootObjects/1/objects").respond(200, { objects: [{ id: 1 }, { id: 2 }] });
        let rootObj: RootObjectModel = rootObjectRestService.getElement(1);

        objectRestService.list(rootObj).then((result: noosfero.RestResult<ObjectModel[]>) => {
            expect(result.data).toBeDefined();
            expect((<ObjectModel[]>result.data).length).toEqual(2);
            done();
        });

        $httpBackend.flush();

        $httpBackend.verifyNoOutstandingExpectation();
    });

    it("get(1) calls GET /objects/1", (done) => {
        $httpBackend.expectGET("/api/v1/objects/1").respond(200, { object: { id: 1 } });

        objectRestService.get(1).then((result: noosfero.RestResult<ObjectModel>) => {
            expect(result.data).toBeDefined();
            expect((<ObjectModel>result.data).id).toEqual(1);
            done();
        });
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it("objectService.get(1, rootObject) calls GET /rootObjects/1/objects/1", (done) => {
        let rootObj: RootObjectModel = rootObjectRestService.getElement(1);
        $httpBackend.expectGET("/api/v1/rootObjects/1/objects/1").respond(200, { object: { id: 1 } });

        objectRestService.get(1, rootObj).then((result: noosfero.RestResult<ObjectModel>) => {
            expect(result.data).toBeDefined();
            expect((<ObjectModel>result.data).id).toEqual(1);
            done();
        });
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it("remove(object) calls DELETE /objects/1", (done) => {
        $httpBackend.expectGET("/api/v1/objects/1").respond(200, { object: { id: 1 } });
        objectRestService.get(1).then((result: noosfero.RestResult<ObjectModel>) => {
            let object: ObjectModel = <ObjectModel>result.data;

            $httpBackend.expectDELETE("/api/v1/objects/1").respond(204, { object: { id: 1 } });

            objectRestService.remove(object).then((result: noosfero.RestResult<ObjectModel>) => {
                expect(result.data).toBeDefined();
                expect((<ObjectModel>result.data).id).toEqual(1);
                done();
            });
        });

        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
    });


    it("remove(object, rootObject) calls DELETE /rootObjects/1/objects/1", (done) => {
        let rootObj: RootObjectModel = rootObjectRestService.getElement(1);

        let obj: ObjectModel = objectRestService.getElement(1, rootObj);

        $httpBackend.expectDELETE("/api/v1/rootObjects/1/objects/1").respond(204, { object: { id: 1, rootId: 1 } });

        objectRestService.remove(obj, rootObj).then((result: noosfero.RestResult<ObjectModel>) => {
            expect(result.data).toBeDefined();
            expect((<ObjectModel>result.data).id).toEqual(1);
            expect((<any>result.data).rootId).toEqual(1);
            done();
        });
        $httpBackend.flush();
    });


    it("update(object) calls PUT /objects/1", (done) => {
        $httpBackend.expectPUT("/api/v1/objects/1").respond(200, { object: { id: 1 } });

        let object: ObjectModel = objectRestService.getElement(1);

        objectRestService.update(object).then((result: noosfero.RestResult<ObjectModel>) => {
            expect(result.data).toBeDefined();
            expect((<ObjectModel>result.data).id).toEqual(1);
            done();
        });

        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
    });


    it("update(object, rootObject) calls PUT /rootObjects/1/objects/1", (done) => {
        let rootObj: RootObjectModel = rootObjectRestService.getElement(1);

        let obj: ObjectModel = objectRestService.getElement(1, rootObj);

        $httpBackend.expectPUT("/api/v1/rootObjects/1/objects/1").respond(200, { object: { id: 1, rootId: 1 } });

        objectRestService.update(obj, rootObj).then((result: noosfero.RestResult<ObjectModel>) => {
            expect(result.data).toBeDefined();
            expect((<ObjectModel>result.data).id).toEqual(1);
            expect((<any>result.data).rootId).toEqual(1);
            done();
        });
        $httpBackend.flush();
    });


    it("save(object) calls POST /objects", (done) => {
        $httpBackend.expectPOST("/api/v1/objects").respond(201, { object: { attr: 1 } });

        let object: ObjectModel = objectRestService.getElement(1);

        objectRestService.create(object).then((result: noosfero.RestResult<ObjectModel>) => {
            expect(result.data).toBeDefined();
            expect((<any>result.data).attr).toEqual(1);
            done();
        });

        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
    });


    it("save(object, rootObject) calls POST /rootObjects/1/objects", (done) => {
        let rootObj: RootObjectModel = rootObjectRestService.getElement(1);

        let obj: ObjectModel = objectRestService.getElement(1, rootObj);

        $httpBackend.expectPOST("/api/v1/rootObjects/1/objects").respond(201, { object: { attr: 1, rootId: 1 } });

        objectRestService.create(obj, rootObj).then((result: noosfero.RestResult<ObjectModel>) => {
            expect(result.data).toBeDefined();
            expect((<any>result.data).attr).toEqual(1);
            expect((<any>result.data).rootId).toEqual(1);
            done();
        });
        $httpBackend.flush();
    });

    it("post('customPath', rootObject) calls POST /rootObjects/1/customPath", (done) => {
        let rootObj: RootObjectModel = rootObjectRestService.getElement(1);
        $httpBackend.expectPOST("/api/v1/rootObjects/1/customPath").respond(201, { object: { attr: 1, rootId: 1 } });
        objectRestService.post('customPath', rootObj).then((result: noosfero.RestResult<ObjectModel>) => {
            expect(result.data).toBeDefined();
            expect((<any>result.data).attr).toEqual(1);
            expect((<any>result.data).rootId).toEqual(1);
            done();
        });
        $httpBackend.flush();
    });

    it("post('customPath') calls POST /objects/customPath", (done) => {
        $httpBackend.expectPOST("/api/v1/objects/customPath").respond(201, { object: { attr: 1, rootId: 1 } });
        objectRestService.post('customPath').then((result: noosfero.RestResult<ObjectModel>) => {
            expect(result.data).toBeDefined();
            expect((<any>result.data).attr).toEqual(1);
            expect((<any>result.data).rootId).toEqual(1);
            done();
        });
        $httpBackend.flush();
    });

});
