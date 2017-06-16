import { BrowserModule } from '@angular/platform-browser';
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import {CommunityService} from "./community.service";
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, HttpModule, BaseRequestOptions} from "@angular/http";
import * as helpers from "../../../spec/helpers";

describe("Services", () => {
    describe("Community Service", () => {
        let service: CommunityService;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HttpModule, RestangularModule, BrowserModule],
                providers: [
                    CommunityService,
                    { provide: "personService", useValue: mocks.personService},
                ].concat(helpers.provideMockBackend()),
            });
            TestBed.get(Restangular).provider.setFullResponse(true);
            TestBed.get(Restangular).provider.setBaseUrl("/api/v1");
            service = TestBed.get(CommunityService);
        }));

        describe("Succesfull requests", () => {
            it("should list environment communities", () => {
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/communities`,
                    { communities: [{ name: "community1" }] }, {}, 200);
                service.getByEnvironment().then((result: noosfero.RestResult<noosfero.Community[]>) => {
                    expect(result.data).toEqual([{ name: "community1" }]);
                });
            });

            // it("should list person communities", (done) => {
            //     $httpBackend.expectGET(`/api/v1/people/1/communities`).respond(200, { communities: [{ name: "community1" }] });
            //     let person = <any>{ id: 1 };
            //     communityService.getByPerson(person).then((result: noosfero.RestResult<noosfero.Community[]>) => {
            //         expect(result.data).toEqual([{ name: "community1" }]);
            //         done();
            //     });
            //     $httpBackend.flush();
            // });

            // it("should list owner communities when it is an environment", (done) => {
            //     $httpBackend.expectGET(`/api/v1/communities`).respond(200, { communities: [{ name: "community1" }] });
            //     let owner = <any>{ id: 1 };
            //     communityService.getByOwner(owner).then((result: noosfero.RestResult<noosfero.Community[]>) => {
            //         done();
            //     });
            //     $httpBackend.flush();
            // });

            // it("should list owner communities when it is an person", (done) => {
            //     $httpBackend.expectGET(`/api/v1/people/1/communities`).respond(200, { communities: [{ name: "community1" }] });
            //     let owner = <any>{ id: 1, type: "Person" };
            //     communityService.getByOwner(owner).then((result: noosfero.RestResult<noosfero.Community[]>) => {
            //         done();
            //     });
            //     $httpBackend.flush();
            // });
        });
    });
});
