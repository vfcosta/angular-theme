import {ProfileService} from "./profile.service";
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, JsonpModule, HttpModule, BaseRequestOptions} from "@angular/http";
import { BrowserModule } from '@angular/platform-browser';
import * as helpers from "../../../spec/helpers";

describe("Services", () => {
    describe("Profile Service", () => {
        let service: ProfileService;
        let mocks = helpers.getMocks();

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RestangularModule, BrowserModule, JsonpModule],
                providers: [
                    ProfileService,
                ].concat(helpers.provideMockBackend())
            });
            TestBed.get(Restangular).provider.setFullResponse(true);
            TestBed.get(Restangular).provider.setBaseUrl("/api/v1");
            service = TestBed.get(ProfileService);
        }));

        xdescribe("Succesfull requests", () => {
            it("should return profile by its identifier", () => {
                let identifier = 'profile1';
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${identifier}?key=identifier`, { name: "profile1" }, {}, 200);
                service.getByIdentifier(identifier).then((profile: noosfero.Profile) => {
                    expect(profile).toEqual(jasmine.objectContaining({ name: "profile1" }));
                });
            });

            it("should reject the promise if the profile wasn't found", (done) => {
                let identifier = 'profile1';
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${identifier}?key=identifier`, {}, {}, 404);
                service.getByIdentifier(identifier).catch(() => {
                    done();
                });
            });

            it("should return the members of a profile", () => {
                let profileId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${profileId}/members`, [{ name: "profile1" }], {}, 200);
                service.getProfileMembers(profileId).then((response: restangular.IResponse) => {
                    expect(response.data[0]).toEqual({ name: "profile1" });
                });
            });

            it("should return the boxes of a profile", () => {
                let profileId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${profileId}/boxes`, [{ position: 1 }], {}, 200);
                service.getBoxes(profileId).then((response: restangular.IResponse) => {
                    expect(response.data[0]).toEqual({ position: 1 });
                });
            });

            it("should return activities of a profile", () => {
                let profileId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${profileId}/activities`, [{ verb: "create_article" }], {}, 200);
                service.getActivities(profileId).then((response: restangular.IResponse) => {
                    expect(response.data[0]).toEqual({ verb: "create_article" });
                });
            });

            it("should resolve the current profile", () => {
                let profile = { id: 1, identifier: "profile1" };
                service.getCurrentProfile().then((currentProfile: noosfero.Profile) => {
                    expect(currentProfile).toEqual(currentProfile);
                });
                service.setCurrentProfile(<any>profile);
            });

            it("should return the profile home page", () => {
                let profileId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${profileId}/home_page`, { path: "/something" }, {}, 200);
                service.getHomePage(profileId).then((response: restangular.IResponse) => {
                    expect(response.data).toEqual(jasmine.objectContaining({ path: "/something" }));
                });
            });

            it("should find the profile by identifier, set and resolve the current profile", () => {
                let identifier = 'profile1';
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${identifier}?key=identifier`, { name: "profile1" }, {}, 200);
                service.setCurrentProfileByIdentifier(identifier).then((profile: noosfero.Profile) => {
                    expect(profile).toEqual(jasmine.objectContaining({ name: "profile1" }));
                    service.getCurrentProfile().then((profile: noosfero.Profile) => {
                        expect(profile).toEqual(jasmine.objectContaining({ name: "profile1" }));
                    });
                });
            });

            it("should update the profile attributes", () => {
                let profileId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${profileId}`, { custom_header: "something" }, {}, 200);
                service.update(<any>{ id: profileId, custom_header: "something" }).then((response: restangular.IResponse) => {
                    expect(response.data.custom_header).toEqual("something");
                });
            });

            it("should return the profile members", () => {
                let profileId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${profileId}/members`, [{id: 2}], {}, 200);
                service.getMembers(<any>{ id: profileId }).then((response: restangular.IResponse) => {
                    expect(response.data).toEqual(jasmine.objectContaining([{ id: 2 }]));
                });
            });

            it("should return true if the person is a profile member", () => {
                let profileId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${profileId}/members`, [{id: 2}], {}, 200);
                service.isMember(<any>{ id: 2 }, <any>{ id: profileId }).then((response: restangular.IResponse) => {
                    expect(response).toEqual(true);
                });
            });

            it("should return false if the person is a profile member", () => {
                let profileId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${profileId}/members`, [], {}, 200);
                service.isMember(<any>{ id: 2 }, <any>{ id: profileId }).then((response: restangular.IResponse) => {
                    expect(response).toEqual(false);
                });
            });

            it("should add member to profile", () => {
                let profileId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${profileId}/members`, {pending: false}, {}, 200);
                service.addMember(<any>{ id: 2 }, <any>{ id: profileId }).then((response: restangular.IResponse) => {
                    expect(response.data.pending).toEqual(false);
                });
            });

            it("should remove member from profile", () => {
                let profileId = 1;
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/profiles/${profileId}/members`, {id: 2}, {}, 200);
                service.removeMember(<any>{ id: 2 }, <any>{ id: profileId }).then((response: restangular.IResponse) => {
                    expect(response.data).toEqual(jasmine.objectContaining({ id: 2 }));
                });
            });
        });
    });
});
