import { Observable } from 'rxjs/Observable';
import { PersonService } from './../../lib/ng-noosfero-api/http/person.service';
import {AuthService, AuthEvents} from './';
import {SessionService} from './session.service';
import { RestangularModule, RestangularHttp, Restangular } from 'ngx-restangular';
import { async, fakeAsync, tick, TestBed, ComponentFixture, flushMicrotasks } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod, JsonpModule, HttpModule, BaseRequestOptions} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import * as helpers from '../../spec/helpers';

describe("Services", () => {
    describe("Auth Service", () => {
        let credentials: noosfero.Credentials;
        let user: noosfero.User;
        let service: AuthService;
        const mocks = helpers.getMocks();

        beforeEach(async(() => {
            spyOn(mocks.sessionService, "destroy");
            user = <noosfero.User>{ id: 1, login: "user" };
            TestBed.configureTestingModule({
                imports: [RestangularModule, BrowserModule, JsonpModule],
                providers: [
                    { provide: PersonService, useValue: mocks.personService},
                    { provide: SessionService, useValue: mocks.sessionService},
                    AuthService,
                ].concat(helpers.provideMockBackend())
            });
            TestBed.get(Restangular).provider.setFullResponse(true);
            TestBed.get(Restangular).provider.setBaseUrl("/api/v1");
            service = TestBed.get(AuthService);
        }));

        describe("Succesffull login", () => {
            beforeEach(() => {
                credentials = { username: "user", password: "password" };
                const data = new FormData();
                data.append('login', 'user');
                data.append('password', 'password');
                helpers.mockBackendConnection(TestBed.get(MockBackend), `/api/v1/login`, user, {}, 200);
            });

            xit("should return loggedUser", async(() => {
                service.login(credentials).then((loggedUser) => {
                    expect(loggedUser).toBeDefined();
                });
            }));

            xit("should emit event loggin successful with user logged data", (done: Function) => {
                const successEvent: any = AuthEvents[AuthEvents.loginSuccess];
                (<any>service)[successEvent].subscribe((userThroughEvent: noosfero.User): any => {
                    expect(userThroughEvent).toEqual(jasmine.objectContaining(user));
                    done();
                });
                service.login(credentials);
            });

            xit("should return the current logged in user", () => {
                service.login(credentials);
                const actual: noosfero.User = service.currentUser();
                expect(actual.person).toEqual(jasmine.objectContaining(user), "The returned user must be present");
            });

            it("should destroy session after logout", () => {
                service.logout();
                expect(service['sessionService'].destroy).toHaveBeenCalled();
            });
        });

    });
});
