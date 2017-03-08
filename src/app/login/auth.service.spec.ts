import {AuthService, AuthEvents} from "./";
import {SessionService} from './session.service';

import {Injectable, Provider, provide, EventEmitter} from "ng-forward";
import {ComponentFixture} from 'ng-forward/cjs/testing/test-component-builder';

import {getAngularServiceFactory, AngularServiceFactory} from "../../spec/helpers";

describe("Services", () => {


    describe("Auth Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let authService: AuthService;
        let credentials: noosfero.Credentials;
        let $rootScope: ng.IRootScopeService;
        let user: noosfero.User;

        beforeEach(angular.mock.module("main", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(() => {

            user = <noosfero.User>{
                id: 1,
                login: "user"
            };
        });

        describe("Succesffull login", () => {

            let factory: AngularServiceFactory;
            let authService: AuthService;
            let $log: ng.ILogService;
            let $http: ng.IHttpBackendService;

            beforeEach(() => {
                credentials = { username: "user", password: "password" };
                factory = getAngularServiceFactory();
                authService = factory.getAngularService("AuthService");
                $httpBackend = factory.getHttpBackendService();
                let data = new FormData();
                data.append('login', 'user');
                data.append('password', 'password');
                $httpBackend.expectPOST("/api/v1/login", data).respond(200, user);
            });

            it("should return loggedUser", (done) => {
                authService.login(credentials).then((loggedUser) => {
                    expect(loggedUser).toBeDefined();
                    done();
                });
                $httpBackend.flush();
                expect($httpBackend.verifyNoOutstandingRequest());
            });

            it("should emit event loggin successful with user logged data", (done: Function) => {
                let successEvent: any = AuthEvents[AuthEvents.loginSuccess];
                (<any>authService)[successEvent].subscribe((userThroughEvent: noosfero.User): any => {
                    expect(userThroughEvent).toEqual(jasmine.objectContaining(user));
                    done();
                });
                authService.login(credentials);
                $httpBackend.flush();

            });

            it("should return the current logged in user", () => {
                authService.login(credentials);
                $httpBackend.flush();
                let actual: noosfero.User = authService.currentUser();
                expect(actual).toEqual(jasmine.objectContaining(user), "The returned user must be present");
            });

            it("should not return the current user after logout", () => {
                authService.logout();
                let actual: any = authService.currentUser();
                expect(actual).toEqual(undefined, "The returned user must not be defined");
            });
        });

    });
});
