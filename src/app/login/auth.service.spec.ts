

import {AuthService, AUTH_EVENTS} from "./";

describe("Services", () => {


    describe("Auth Service", () => {

        let $httpBackend: ng.IHttpBackendService;
        let authService: AuthService;
        let credentials: noosfero.Credentials;
        let $rootScope: ng.IRootScopeService;
        let user: noosfero.User;

        beforeEach(angular.mock.module("noosferoApp", ($translateProvider: angular.translate.ITranslateProvider) => {
            $translateProvider.translations('en', {});
        }));

        beforeEach(inject((_$httpBackend_: ng.IHttpBackendService, _$rootScope_: ng.IRootScopeService, _AuthService_: AuthService) => {
            $httpBackend = _$httpBackend_;
            authService = _AuthService_;
            $rootScope = _$rootScope_;

            user = <noosfero.User>{
                id: 1,
                login: "user"
            };
        }));


        describe("Succesffull login", () => {

            beforeEach(() => {
                credentials = { username: "user", password: "password" };

                $httpBackend.expectPOST("/api/v1/login", "login=user&password=password").respond(200, { user: user });
            });

            it("should return loggedUser", (done) => {
                authService.login(credentials).then((loggedUser) => {
                    expect(loggedUser).toBeDefined();
                    done();
                });
                $httpBackend.flush();
                expect($httpBackend.verifyNoOutstandingRequest());
            });


            it("should emit event loggin successful with user logged data", () => {

                authService.login(credentials);

                let eventEmmited: boolean = false;
                $rootScope.$on(AUTH_EVENTS.loginSuccess, (event: ng.IAngularEvent, userThroughEvent: noosfero.User) => {
                    eventEmmited = true;
                    expect(userThroughEvent).toEqual(user);
                });

                $httpBackend.flush();

                expect(eventEmmited).toBeTruthy(AUTH_EVENTS.loginSuccess + " was not emmited!");
            });

            it("should return the current logged in user", () => {
                authService.login(credentials);
                $httpBackend.flush();
                let actual: noosfero.User = authService.currentUser();
                expect(actual).toEqual(user, "The returned user must be present");
            });

            it("should not return the current user after logout", () => {
                authService.logout();
                let actual: any = authService.currentUser();
                expect(actual).toEqual(undefined, "The returned user must not be defined");
            });
        });


    });
});
