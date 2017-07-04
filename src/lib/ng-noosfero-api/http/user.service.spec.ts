import { MockBackend } from '@angular/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import {Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, HttpModule, BaseRequestOptions} from "@angular/http";
import { UserService } from "./user.service";
import * as helpers from "../../../spec/helpers";

describe("Services", () => {
    describe("User Service", () => {
        let service: UserService;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HttpModule, RestangularModule, BrowserModule],
                providers: [
                    UserService,
                ].concat(helpers.provideMockBackend()),
            });
            TestBed.get(Restangular).provider.setFullResponse(true);
            TestBed.get(Restangular).provider.setBaseUrl("/api/v1");
            service = TestBed.get(UserService);
        }));

        let data: any;
        let profile = <noosfero.Profile> {id: 1, identifier: 'profile1'};

        describe("Succesfull request", () => {
            xit("should change user password", () => {
                data = {
                    current_password: '1234567890',
                    new_password: 'test',
                    new_password_confirmation: 'test'
                };
                helpers.mockBackendConnection(TestBed.get(MockBackend), '/api/v1/users/1',
                    [{ success: true }], {}, 201);
                service.changePassword(profile, '1234567890', 'test', 'test').then((response: any) => {
                    expect(response.data[0].success).toBeTruthy();
                });
            });
        });
    });
});
