import { DomainService } from './domain.service';
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, JsonpModule, HttpModule, BaseRequestOptions} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import * as helpers from '../../../spec/helpers';
import * as _ from "lodash";

describe("Services", () => {
    describe("Domain Service", () => {
        let service: DomainService;
        const mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RestangularModule, BrowserModule, JsonpModule],
                providers: [
                    DomainService,
                ].concat(helpers.provideMockBackend())
            });
            TestBed.get(Restangular).provider.setFullResponse(true);
            TestBed.get(Restangular).provider.setBaseUrl("/api/v1");
            service = TestBed.get(DomainService);
        }));
        const environment = <noosfero.Environment>{ id: 1 };
        const profile = <noosfero.Profile>{ id: 1 };
        const domains = [
            { id: 1, name: "somedomain.net", owner: environment, is_default: true },
            { id: 2, name: "someotherdomain.net", owner: profile, is_default: false }
        ];

        xdescribe("Succesfull requests", () => {
            it("should return all domains", () => {
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/domains`, domains, {}, 200);
                service.list().then((content: noosfero.RestResult<noosfero.Domain[]>) => {
                    expect(_.cloneDeep(content.data)).toEqual(<noosfero.Domain[]>domains);
                });
            });
        });
    });
});
