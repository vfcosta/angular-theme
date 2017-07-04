import { EnvironmentService } from "./environment.service";
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, JsonpModule, HttpModule, BaseRequestOptions} from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import * as helpers from "../../../spec/helpers";

describe("Services", () => {
    describe("Environment Service", () => {
        let service: EnvironmentService;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            spyOn(mocks.sessionService, "destroy");
            TestBed.configureTestingModule({
                imports: [RestangularModule, BrowserModule, JsonpModule],
                providers: [
                    EnvironmentService,
                ].concat(helpers.provideMockBackend())
            });
            TestBed.get(Restangular).provider.setFullResponse(true);
            TestBed.get(Restangular).provider.setBaseUrl("/api/v1");
            service = TestBed.get(EnvironmentService);
        }));

        xdescribe("Succesfull requests", () => {
            it("should return the boxes of environment ", () => {
                let environmentId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/environments/${environmentId}/boxes`, [{ position: 1 }], {}, 200);
                service.getBoxes(environmentId).then((response: any) => {
                    expect(response.data[0]).toEqual({ position: 1 });
                });
            });

            it("should return the tags of environment ", () => {
                let environmentId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/environments/${environmentId}/tags`, [{ position: 1 }], {}, 200);
                service.getTags(environmentId).then((response: any) => {
                    expect(response.data[0]).toEqual({ position: 1 });
                });
            });

            it("should resolve the current environment", () => {
                let environment = { id: 1, identifier: "environment1" };
                service.getCurrentEnvironment().then((currentEnvironment: noosfero.Environment) => {
                    expect(currentEnvironment).toEqual(currentEnvironment);
                });
                service.setCurrentEnvironment(<any>environment);
            });

            it("should return all people of environment", () => {
                let environmentId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/environments/${environmentId}/people`, [{ id: 2 }], {}, 200);
                service.getEnvironmentPeople(environmentId).then((response: any) => {
                    expect(response.data).toEqual(jasmine.objectContaining([{ id: 2 }]));
                });
            });
        });
    });
});
