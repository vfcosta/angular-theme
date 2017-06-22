import { MockBackend } from '@angular/http/testing';
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import {Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, HttpModule, BaseRequestOptions} from "@angular/http";
import { PasswordService } from "./password.service";
import * as helpers from "../../../spec/helpers";

describe("Services", () => {
    describe("Password Service", () => {
        let service: PasswordService;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HttpModule, RestangularModule, BrowserModule],
                providers: [
                    PasswordService,
                ].concat(helpers.provideMockBackend()),
            });
            TestBed.get(Restangular).provider.setFullResponse(true);
            TestBed.get(Restangular).provider.setBaseUrl("/api/v1");
            service = TestBed.get(PasswordService);
        }));

        describe("Succesfull request", () => {
            xit("should change user password", () => {
                let data = {
                    code: '1234567890',
                    password: 'test',
                    password_confirmation: 'test'
                };
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/new_password?code=${data.code}&password=${data.password}&password_confirmation=${data.password_confirmation}`,
                    [{ login: "test" }], {}, 201);
                service.newPassword('1234567890', 'test', 'test').then((response: restangular.IResponse) => {
                    expect(response.data[0].login).toEqual("test");
                });
            });
        });
    });
});
