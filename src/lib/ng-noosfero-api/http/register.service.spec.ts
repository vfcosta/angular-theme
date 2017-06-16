import { RegisterService } from "./register.service";
import * as helpers from "../../../spec/helpers";
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import {Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, HttpModule, BaseRequestOptions} from "@angular/http";

describe("Services", () => {
    describe("Register Service", () => {
        let service: RegisterService;
        let user: any = { id: 1, login: 'test', email: 'test@email.com' };
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HttpModule, RestangularModule, BrowserModule],
                providers: [
                    RegisterService
                ].concat(helpers.provideMockBackend()),
            });
            TestBed.get(Restangular).provider.setFullResponse(true);
            TestBed.get(Restangular).provider.setBaseUrl("/api/v1");
            service = TestBed.get(RegisterService);
        }));

        describe("Succesfull requests", () => {
            xit("should creaet a new account", () => {
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/register?email=${user.email}&id=${user.id}&login=${user.login}`,
                    [{ login: "test" }], {}, 201);
                service.createAccount(user).then((response: restangular.IResponse) => {
                    expect(response.data[0].login).toEqual("test");
                });
            });
        });
    });
});
