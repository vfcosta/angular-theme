import {BlockService} from "./block.service";
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, JsonpModule, HttpModule, BaseRequestOptions} from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import * as helpers from "../../../spec/helpers";

describe("Services", () => {
    describe("Block Service", () => {
        let service: BlockService;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RestangularModule, BrowserModule, JsonpModule],
                providers: [
                    BlockService,
                ].concat(helpers.provideMockBackend())
            });
            TestBed.get(Restangular).provider.setFullResponse(true);
            TestBed.get(Restangular).provider.setBaseUrl("/api/v1");
            service = TestBed.get(BlockService);
        }));

        xdescribe("Succesfull requests", () => {
            it("should return api content of a block", () => {
                let blockId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/blocks/${blockId}`, { block: { api_content: [{ name: "article1" }] } }, {}, 200);
                service.getApiContent(<noosfero.Block>{ id: blockId }).then((content: any) => {
                    expect(content).toEqual([{ name: "article1" }]);
                });
            });

            it("update block settings", () => {
                let blockId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/blocks/${blockId}`, { block: { id: blockId } }, {}, 200);
                service.update(<any>{ id: blockId, display: 'never' }).then((result: noosfero.RestResult<noosfero.Block>) => {
                    expect(result.data).toEqual(<noosfero.Block>{ id: blockId });
                });
            });
        });
    });
});
