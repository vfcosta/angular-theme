import {BlockService} from "./block.service";


describe("Services", () => {

    describe("Block Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let blockService: BlockService;

        beforeEach(angular.mock.module("noosferoApp", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService, _BlockService_: BlockService) => {
            $httpBackend = _$httpBackend_;
            blockService = _BlockService_;
        }));


        describe("Succesfull requests", () => {

            it("should return api content of a block", (done) => {
                let blockId = 1;
                $httpBackend.expectGET(`/api/v1/blocks/${blockId}`).respond(200, { block: { api_content: [{ name: "article1" }] } });
                blockService.getApiContent(<noosfero.Block>{ id: blockId }).then((content: any) => {
                    expect(content).toEqual([{ name: "article1" }]);
                    done();
                });
                $httpBackend.flush();
            });
        });


    });
});
