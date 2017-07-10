import { MockBackend } from '@angular/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import {Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, HttpModule, BaseRequestOptions} from '@angular/http';
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import { RoleService } from './role.service';
import * as helpers from '../../../spec/helpers';

describe("Services", () => {
    describe("Role Service", () => {
        let service: RoleService;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HttpModule, RestangularModule, BrowserModule],
                providers: [
                    RoleService
                ].concat(helpers.provideMockBackend()),
            });
            TestBed.get(Restangular).provider.setFullResponse(true);
            TestBed.get(Restangular).provider.setBaseUrl("/api/v1");
            service = TestBed.get(RoleService);
        }));

        describe("Succesfull requests", () => {
            xit("list organization roles", () => {
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/1/roles`,
                    { roles: [{ id: 1 }] }, {}, 200);
                service.getByProfile(1).then((result: noosfero.RestResult<noosfero.Role[]>) => {
                    expect(result.data).toEqual(<noosfero.Role[]>[{ id: 1 }]);
                });
            });
        });
    });
});
